-- Создаю бд
CREATE SCHEMA `secretSanta` ;

-- Талица с пользывателями
CREATE TABLE `secretSanta`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `aboutMe` TEXT NULL,
  `Name` TEXT NULL,
  `wishList` TEXT NULL,
  `dontLike` TEXT NULL,
  `password` TEXT NULL,
  `gmail` TEXT NULL,
  `branch` TEXT NULL,
  `department` TEXT NULL,
  PRIMARY KEY (`id`));
