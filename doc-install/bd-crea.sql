DROP DATABASE  IF EXISTS doodlme;

CREATE DATABASE doodlme ;

USE   doodlme;
 CREATE TABLE Users (
	ID int(11) AUTO_INCREMENT,
	firstName varchar(250) ,
	lastName varchar(250),
	pseudo varchar(50) NOT NULL ,
	registrationDate TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
	passHash varchar(250),
	UNIQUE(pseudo),
	PRIMARY KEY (ID)
) ENGINE=INNODB  ;

CREATE TABLE Events (
	ID int(11) AUTO_INCREMENT,
	title varchar(40) NOT NULL,
	description varchar(250),
	address varchar(250),
	creatorID int(11) NOT NULL,
	closedSlotID int(11),
	PRIMARY KEY (ID)
	)  ENGINE=INNODB;

CREATE TABLE EventAnswers (
	userID int(11) NOT NULL,
  EventSlotID int(11) NOT NULL,
  isAvailable boolean NOT NULL,
	PRIMARY KEY (userID, EventSlotID)
)  ENGINE=INNODB;
 
CREATE TABLE EventSlots (
  ID    int(11) AUTO_INCREMENT,
  eventID int(11),
  eventDate DATETIME NOT NULL,
  comment varchar(250),
	UNIQUE KEY (eventID, eventDate),
	PRIMARY KEY (ID)
)  ENGINE=INNODB;

CREATE TABLE ReadNotifications (
	userID int(11),
	eventID int(11),
	PRIMARY KEY (userID, eventID)
) ENGINE=INNODB;

ALTER TABLE ReadNotifications
ADD  CONSTRAINT FOREIGN KEY (eventID) REFERENCES Events(ID)  ON DELETE CASCADE ;

ALTER TABLE ReadNotifications
ADD  CONSTRAINT FOREIGN KEY (userID) REFERENCES Users(ID)  ON DELETE CASCADE ;

ALTER TABLE EventSlots 
ADD  CONSTRAINT FOREIGN KEY (eventID) REFERENCES Events(ID) ON DELETE CASCADE  ;

ALTER TABLE  Events
ADD CONSTRAINT FOREIGN KEY (creatorID) REFERENCES Users(ID) ON DELETE CASCADE ;

ALTER TABLE  Events
ADD CONSTRAINT FOREIGN KEY (closedSlotID) REFERENCES EventSlots(ID)  ON DELETE CASCADE;

 
ALTER TABLE EventAnswers
ADD CONSTRAINT FOREIGN KEY (userID) REFERENCES Users(ID) ON DELETE CASCADE ;

ALTER TABLE EventAnswers
ADD CONSTRAINT FOREIGN KEY (EventSlotID) REFERENCES EventSlots(ID) ON DELETE CASCADE  ;


CREATE OR REPLACE VIEW archivedEvents
AS
SELECT events.*, DATE_FORMAT(eventSlots.eventDate, '%m-%d-%Y') AS day, DATE_FORMAT(eventSlots.eventDate, '%h:%i') as time, eventslots.ID as slotID, eventslots.eventDate, eventslots.comment, max(eventSlots.eventDate) as latestSlot
FROM events, eventSlots 
WHERE  eventSlots.eventID =events.ID 
AND 
(
(events.closedSlotID IS NULL 
 ) 
OR 
(
events.closedSlotID IS NOT NULL 
AND eventSlots.ID=events.closedSlotID
)
)
group by (events.ID)
having (events.closedSlotID IS NULL AND latestSlot<NOW() ) OR (events.closedSlotID IS NOT NULL AND eventSlots.eventDate <NOW() ) ;

CREATE OR REPLACE VIEW upcomingEvents
AS
SELECT events.*, DATE_FORMAT(eventSlots.eventDate, '%m-%d-%Y') AS day, DATE_FORMAT(eventSlots.eventDate, '%h:%i') as time, eventslots.ID as slotID, eventslots.eventDate, eventslots.comment, max(eventSlots.eventDate) as latestSlot
FROM events, eventSlots 
WHERE  eventSlots.eventID =events.ID 
AND 
(
(events.closedSlotID IS NULL 
 ) 
OR 
(
events.closedSlotID IS NOT NULL 
AND eventSlots.ID=events.closedSlotID
)
)
group by (events.ID)
having (events.closedSlotID IS NULL AND latestSlot>NOW() ) OR (events.closedSlotID IS NOT NULL AND events.eventDate >NOW() ) ;


DROP PROCEDURE IF EXISTS GetEventSlots;

DELIMITER //
CREATE PROCEDURE GetEventSlots
(IN iEventID int(11))
BEGIN
	DROP TEMPORARY TABLE IF EXISTS eventSlotsDetails;
	CREATE TEMPORARY TABLE eventSlotsDetails  
  SELECT S.ID as ID, S.comment, 
  DATE_FORMAT(S.eventDate,'%m-%d-%Y') as day,
  DATE_FORMAT(S.eventDate,'%h:%i') as time , 
  SUM(case when A.isAvailable=1 then 1 else 0 end) as positiveAnswers,
  SUM(case when A.isAvailable=0 then 1 else 0 end) as negativeAnswers 
  
 FROM events as E, eventSlots as S LEFT JOIN eventanswers as A 
 ON  A.EventSlotID=S.ID 
 WHERE S.eventID= iEventID
 AND S.eventID = E.ID
 AND (E.closedSlotID IS NULL OR S.ID=E.closedSlotID)
 GROUP BY S.ID ;
END //
DELIMITER ;
