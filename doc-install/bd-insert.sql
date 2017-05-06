INSERT INTO `users` (`ID`, `firstName`, `lastName`, `pseudo`, `registrationDate`, `passHash`) VALUES
(17, 'Mahdi', 'Hentati', 'mh', '2017-05-06 09:14:55', 'todo'),
(18, 'Lucas', 'Uzan', 'luke', '2017-05-06 09:14:55', 'todo'),
(19, 'David', 'Toutain', 'david', '2017-05-06 09:15:21', 'todo');

INSERT INTO `events` (`ID`, `title`, `description`, `address`, `creatorID`, `closedSlotID`) VALUES
(1, 'Travail en groupe', 'Ma description', 'BU', 17, NULL),
(2, 'Tiser', 'à la mort', 'VNB', 19, NULL);

INSERT INTO `eventslots` (`ID`, `eventID`, `eventDate`, `comment`) VALUES
(1, 1, '2017-05-31 05:19:00', 'commentaire sur le créneau ... '),
(2, 1, '2017-06-01 10:00:00', NULL);


INSERT INTO `eventanswers` (`userID`, `EventSlotID`, `isAvailable`) VALUES
(17, 1, 1),
(18, 2, 0);