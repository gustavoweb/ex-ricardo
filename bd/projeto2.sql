-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema projeto1
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema projeto1
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `projeto1` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
-- -----------------------------------------------------
-- Schema projeto2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema projeto2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `projeto2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `projeto1` ;

-- -----------------------------------------------------
-- Table `projeto1`.`produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto1`.`produtos` (
  `pro_id` INT NOT NULL AUTO_INCREMENT,
  `pro_nome` VARCHAR(160) NOT NULL,
  `pro_marca` VARCHAR(100) NOT NULL,
  `pro_modelo` VARCHAR(70) NOT NULL,
  `pro_descricao` TEXT NULL DEFAULT NULL,
  `pro_foto` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`pro_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `projeto1`.`produtos2`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto1`.`produtos2` (
  `pro_id` INT NOT NULL AUTO_INCREMENT,
  `pro_nome` VARCHAR(100) NOT NULL,
  `pro_preco` FLOAT(6,2) NOT NULL,
  PRIMARY KEY (`pro_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `projeto1`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto1`.`usuarios` (
  `usu_id` INT NOT NULL AUTO_INCREMENT,
  `usu_usuario` VARCHAR(12) NOT NULL,
  `usu_nome` VARCHAR(120) NOT NULL,
  `usu_email` VARCHAR(100) NOT NULL,
  `usu_senha` VARCHAR(128) NOT NULL,
  `usu_tipo` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`usu_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `projeto2` ;

-- -----------------------------------------------------
-- Table `projeto2`.`produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto2`.`produtos` (
  `pro_id` INT NOT NULL AUTO_INCREMENT,
  `pro_nome` VARCHAR(160) NOT NULL,
  `pro_marca` VARCHAR(100) NOT NULL,
  `pro_modelo` VARCHAR(70) NOT NULL,
  `pro_descricao` TEXT NULL DEFAULT NULL,
  `pro_foto` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`pro_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `projeto2`.`produtos2`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto2`.`produtos2` (
  `pro_id` INT NOT NULL AUTO_INCREMENT,
  `pro_nome` VARCHAR(100) NOT NULL,
  `pro_preco` FLOAT(6,2) NOT NULL,
  PRIMARY KEY (`pro_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `projeto2`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto2`.`usuarios` (
  `usu_id` INT NOT NULL AUTO_INCREMENT,
  `usu_usuario` VARCHAR(12) NOT NULL,
  `usu_nome` VARCHAR(120) NOT NULL,
  `usu_email` VARCHAR(100) NOT NULL,
  `usu_senha` VARCHAR(128) NOT NULL,
  `usu_tipo` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`usu_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 30
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
