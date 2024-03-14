-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema service_proj
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema service_proj
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `service_proj` DEFAULT CHARACTER SET utf8 ;
USE `service` ;

-- -----------------------------------------------------
-- Table `service_proj`.`type_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `service_proj`.`type_users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type_users` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `service_proj`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `service_proj`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `avatar` VARCHAR(500) NULL,
  `type_users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_type_users_idx` (`type_users_id` ASC),
  CONSTRAINT `fk_users_type_users`
    FOREIGN KEY (`type_users_id`)
    REFERENCES `service_proj`.`type_users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `service_proj`.`services`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `service_proj`.`services` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `price` DOUBLE NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `profession` VARCHAR(100) NOT NULL,
  `image` VARCHAR(500) NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_services_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_services_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `service_proj`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
