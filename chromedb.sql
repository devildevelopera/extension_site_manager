/*
SQLyog Community v12.3.2 (64 bit)
MySQL - 10.3.15-MariaDB : Database - chromedb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`chromedb` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `chromedb`;

/*Table structure for table `company` */

DROP TABLE IF EXISTS `company`;

CREATE TABLE `company` (
  `comid` int(255) NOT NULL AUTO_INCREMENT,
  `firmenname` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `strasse` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `plz` int(255) DEFAULT NULL,
  `ort` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `vorname` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `nachname` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `web` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `gender` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `optradio` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `titel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`comid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `company` */

insert  into `company`(`comid`,`firmenname`,`strasse`,`plz`,`ort`,`vorname`,`nachname`,`web`,`gender`,`optradio`,`titel`) values 
(1,'Fa. Huber 11','Ladehofstraße 28',93049,'Regensburg','','Huber','www.apple.com','Herr','','Dr'),
(3,'Fa. Huber 30','Puricellistraße 30',93049,'Regensburg','That','Müller','abc.com','','','Dr'),
(6,'Fa. Huber 20','Großprüfening 9',93049,'Regensburg','This','Anders','','','','');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
