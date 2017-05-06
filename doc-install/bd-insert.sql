--
-- Base de données :  `doodlme`
--

--
-- Contenu de la table `eventanswers`
--

INSERT INTO `eventanswers` (`userID`, `EventSlotID`, `isAvailable`) VALUES
(17, 1, 1),
(18, 2, 0);

--
-- Contenu de la table `events`
--

INSERT INTO `events` (`ID`, `title`, `description`, `address`, `creatorID`, `closedSlotID`) VALUES
(1, 'Travail en groupe', 'Ma description de l\'event..', 'BU', 17, NULL),
(2, 'Tiser', 'à la mort', 'VNB', 19, NULL);

--
-- Contenu de la table `eventslots`
--

INSERT INTO `eventslots` (`ID`, `eventID`, `eventDate`, `comment`) VALUES
(1, 1, '2017-05-31 14:00:00', 'un commentaire non NULL, 31-05 ... '),
(2, 1, '2017-05-30 16:31:00', NULL);

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`ID`, `firstName`, `lastName`, `pseudo`, `registrationDate`, `passHash`) VALUES
(17, 'Mahdi', 'Hentati', 'mh', '2017-05-06 11:14:55', 'todo'),
(18, 'Lucas', 'Uzan', 'luke', '2017-05-06 11:14:55', 'todo'),
(19, 'David', 'Toutain', 'david', '2017-05-06 11:15:21', 'todo');
