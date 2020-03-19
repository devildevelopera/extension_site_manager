/*
SQLyog Community v12.3.2 (64 bit)
MySQL - 10.3.15-MariaDB : Database - usr_p547650_1
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`usr_p547650_1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `usr_p547650_1`;

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`migration`,`batch`) values 
(1,'2014_10_12_000000_create_users_table',1),
(2,'2019_08_19_000000_create_failed_jobs_table',1),
(3,'2020_03_17_034912_create_data_table',1),
(4,'2020_03_17_111608_create_records_table',2),
(5,'2020_03_18_030624_create_records_table',3),
(6,'2020_03_18_031014_create_records_table',4),
(7,'2020_03_18_031226_create_records_table',5),
(8,'2020_03_18_035227_create_records_table',6),
(9,'2014_10_12_100000_create_password_resets_table',7);

/*Table structure for table `password_resets` */

DROP TABLE IF EXISTS `password_resets`;

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `password_resets` */

insert  into `password_resets`(`email`,`token`,`created_at`) values 
('miguelhoffmannsmart@gmail.com','$2y$10$6GGc8MpAb5H5p4TF1ztdr.93IYI3vfrrY.4ZOWo8elP7q2harGhWW','2020-03-18 07:09:01');

/*Table structure for table `records` */

DROP TABLE IF EXISTS `records`;

CREATE TABLE `records` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `firmenname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `strasse` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `plz` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ort` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vorname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nachname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `web` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `anrede` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `freifeld_1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `titel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `typ` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kundennummer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `branche` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `abteilung` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `geburtsdatum` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `betreuer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefax` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobil` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `urlkurzel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `freifeld_2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `freifeld_3` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `freifeld_4` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `freifeld_5` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `freifeld_6` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `freifeld_7` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `freifeld_8` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `freifeld_9` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `freifeld_10` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `freifeld_11` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `freifeld_12` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `freifeld_13` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `freifeld_14` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `freifeld_15` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `records` */

insert  into `records`(`id`,`firmenname`,`strasse`,`plz`,`ort`,`vorname`,`nachname`,`web`,`anrede`,`freifeld_1`,`titel`,`typ`,`kundennummer`,`branche`,`position`,`abteilung`,`geburtsdatum`,`betreuer`,`telefon`,`telefax`,`mobil`,`email`,`urlkurzel`,`freifeld_2`,`freifeld_3`,`freifeld_4`,`freifeld_5`,`freifeld_6`,`freifeld_7`,`freifeld_8`,`freifeld_9`,`freifeld_10`,`freifeld_11`,`freifeld_12`,`freifeld_13`,`freifeld_14`,`freifeld_15`,`created_at`,`updated_at`) values 
(19,'Landschaftsbau Meier','Mauerstr. 3','23456','Münster','','Hermann','www.meyer-landschaftsbau.de','Frau','','','Kunde','5445','Handwerk',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-03-18 06:53:27','2020-03-18 06:53:27'),
(21,'agentur Huber','Marktplatz 3','10237','Berlin','Josef','Huber','','Herr','','','Kunde','1234','Werbeagentur','Geschäftsführer','Intern','12.12.2000','Manfred Müller','09602 / 37080-60','09602/616959','1234/65543434','info@example.com','agentur-meier','Text-Freifeld 2','Text-Freifeld 3','Text-Freifeld 4','Text-Freifeld 5','Text-Freifeld 6','Text-Freifeld 7','Text-Freifeld 8','Text-Freifeld 9','Text-Freifeld 10','Text-Freifeld 11','Text-Freifeld 12','Text-Freifeld 13','Text-Freifeld 14','Text-Freifeld 15','2020-03-18 06:56:27','2020-03-18 06:56:27'),
(22,'Installationsbetrieb Meyer','Hauptstraße 3333','20146','Hamburg','','Meyer','www.rickmeyer.de','Herr','','','Interessent','6543','Installation',NULL,'Buchhaltung',NULL,'Max Muster','0961/1234567',NULL,'12345678',NULL,'meyer-installation',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-03-18 06:56:27','2020-03-18 06:56:27'),
(24,'Gerüstbau Bernd','Hochstraße 4','34598','Hofstatt','','Bernd','www.geruestbau-kiefer.de','Herr','','Prof.',NULL,'4455','Handwerk',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-03-18 06:56:27','2020-03-18 06:56:27');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`email`,`email_verified_at`,`password`,`remember_token`,`created_at`,`updated_at`) values 
(118,'miguel','miguelhoffmannsmart@gmail.com',NULL,'$2y$10$fz3R8HPEDZ3vEf3VUYX0dO5t/VsbTsyIyUs6orv9UXxKPM9Y5pJpG',NULL,'2020-03-18 04:36:08','2020-03-18 12:59:21');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
