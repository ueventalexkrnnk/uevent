CREATE DATABASE IF NOT EXISTS `uevent`;

-- use `uevent`;

CREATE TABLE IF NOT EXISTS `uevent`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `firstName` VARCHAR(45) NOT NULL,
  `middleName` VARCHAR(45),
  `lastName` VARCHAR(45) NOT NULL,
  `token` VARCHAR(1000),
  `profile_pic` VARCHAR(255) NULL,
  `status` ENUM ('user', 'admin', 'organiser') NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `uevent`.`organiser` (
  `organiser_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`organiser_id`),
    INDEX `user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_organiser`
    FOREIGN KEY (`user_id`)
    REFERENCES `uevent`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `uevent`.`event` (
  `event_id` INT NOT NULL AUTO_INCREMENT,
  `organiser_id` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  `type` ENUM ('discoveries', 'exhibition', 'trade_fairs', 'presentations', 'holidays', 'press_events',
  'master_class', 'training', 'seminar', 'festivals', 'concerts') NOT NULL,
  `price` FLOAT NULL,
  `startDate` TIMESTAMP NOT NULL,
  `endDate` TIMESTAMP NOT NULL,
  `event_pic` VARCHAR(255) NULL,
  PRIMARY KEY (`event_id`),
   INDEX `organiser_idx` (`organiser_id` ASC) VISIBLE,
  CONSTRAINT `organiser_event`
    FOREIGN KEY (`organiser_id`)
    REFERENCES `uevent`.`organiser` (`organiser_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `uevent`.`tickets` (
	`ticket_id` INT NOT NULL AUTO_INCREMENT,
    `event_id` INT NOT NULL,
    `tickets_count` INT NULL,
    PRIMARY KEY(`ticket_id`),
     INDEX `event_idx` (`event_id` ASC) VISIBLE,
  CONSTRAINT `event_tickets`
    FOREIGN KEY (`event_id`)
    REFERENCES `uevent`.`event` (`event_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `uevent`.`events_tickets`(
	`event_id` INT NOT NULL,
	`ticket_id` INT NOT NULL,
    PRIMARY KEY (`event_id`, `ticket_id`),
    INDEX `event_idx` (`event_id` ASC) VISIBLE,
  CONSTRAINT `event`
    FOREIGN KEY (`event_id`)
    REFERENCES `uevent`.`event` (`event_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    
    INDEX `ticket_idx` (`ticket_id` ASC) VISIBLE,
  CONSTRAINT `tickets`
    FOREIGN KEY (`ticket_id`)
    REFERENCES `uevent`.`tickets` (`ticket_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `uevent`.`comment` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `content` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`comment_id`),
   INDEX `user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_comment`
    FOREIGN KEY (`user_id`)
    REFERENCES `uevent`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `uevent`.`comment_event` (
  `event_id` INT NOT NULL,
  `comment_id` INT NOT NULL,
  PRIMARY KEY (`event_id`, `comment_id`),
   INDEX `event_idx` (`event_id` ASC) VISIBLE,
  CONSTRAINT `event_comment`
    FOREIGN KEY (`event_id`)
    REFERENCES `uevent`.`event` (`event_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

     INDEX `comment_idx` (`comment_id` ASC) VISIBLE,
  CONSTRAINT `comment`
    FOREIGN KEY (`comment_id`)
    REFERENCES `uevent`.`comment` (`comment_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `uevent`.`user_organiser_sub` (
  `user_id` INT NOT NULL,
  `organiser_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `organiser_id`),
   INDEX `user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_org_sub`
    FOREIGN KEY (`user_id`)
    REFERENCES `uevent`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    
     INDEX `organiser_idx` (`organiser_id` ASC) VISIBLE,
  CONSTRAINT `org_sub`
    FOREIGN KEY (`organiser_id`)
    REFERENCES `uevent`.`organiser` (`organiser_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
  ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `uevent`.`user_event_sub` (
  `user_id` INT NOT NULL,
  `event_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `event_id`),
   INDEX `user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_ev_sub`
    FOREIGN KEY (`user_id`)
    REFERENCES `uevent`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    
     INDEX `event_idx` (`event_id` ASC) VISIBLE,
  CONSTRAINT `ev_sub`
    FOREIGN KEY (`event_id`)
    REFERENCES `uevent`.`event` (`event_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;