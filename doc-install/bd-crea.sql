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

 
ALTER TABLE EventSlots 
ADD  CONSTRAINT FOREIGN KEY (eventID) REFERENCES Events(ID) ON DELETE CASCADE ;

ALTER TABLE  Events
ADD CONSTRAINT FOREIGN KEY (creatorID) REFERENCES Users(ID) ;

ALTER TABLE  Events
ADD CONSTRAINT FOREIGN KEY (closedSlotID) REFERENCES EventSlots(ID) ;

 
ALTER TABLE EventAnswers
ADD CONSTRAINT FOREIGN KEY (userID) REFERENCES Users(ID) ON DELETE CASCADE;

ALTER TABLE EventAnswers
ADD CONSTRAINT FOREIGN KEY (EventSlotID) REFERENCES EventSlots(ID) ON DELETE CASCADE;



