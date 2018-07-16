CREATE DATABASE  IF NOT EXISTS `pn` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `pn`;
-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pn
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blocks`
--

DROP TABLE IF EXISTS `blocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `blocks` (
  `block_id` tinyint(4) NOT NULL,
  `block_name` varchar(45) NOT NULL,
  `no_of_rooms` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`block_id`),
  UNIQUE KEY `BlockID_UNIQUE` (`block_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blocks`
--

LOCK TABLES `blocks` WRITE;
/*!40000 ALTER TABLE `blocks` DISABLE KEYS */;
INSERT INTO `blocks` VALUES (1,'Ganga Block',NULL),(2,'Ganga Basement',NULL),(3,'Ganga Base Common',NULL),(4,'Ganga Dharshan',NULL),(5,'Yamuna Block',NULL),(6,'Yamuna Block Ext',NULL),(7,'Alakananda Block',NULL),(8,'Alakananda Block Ext',NULL),(9,'Gomti Block',NULL),(10,'Yoga Flats',NULL),(11,'Yoga Village',NULL),(12,'Saraswati',NULL),(13,'Behind / Opposite Yamuna',NULL);
/*!40000 ALTER TABLE `blocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `countries` (
  `country_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `country_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`country_id`),
  UNIQUE KEY `country_id_UNIQUE` (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=295 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (1,'Afghanistan'),(2,'Albania'),(3,'Algeria'),(4,'Andorra'),(5,'Angola'),(6,'Antigua and Barbuda'),(7,'Argentina'),(8,'Armenia'),(9,'Australia'),(10,'Austria'),(11,'Azerbaijan'),(12,'Bahamas'),(13,'Bahrain'),(14,'Bangladesh'),(15,'Barbados'),(16,'Belarus'),(17,'Belgium'),(18,'Belize'),(19,'Benin'),(20,'Bhutan'),(21,'Bolivia'),(22,'Bosnia and Herzegovina'),(23,'Botswana'),(24,'Brazil'),(25,'Brunei'),(26,'Bulgaria'),(27,'Burkina Faso'),(28,'Burundi'),(29,'Cabo Verde'),(30,'Cambodia'),(31,'Cameroon'),(32,'Canada'),(33,'Central African Republic (CAR)'),(34,'Chad'),(35,'Chile'),(36,'China'),(37,'Colombia'),(38,'Comoros'),(39,'Democratic Republic of the Congo'),(40,'Republic of the Congo'),(41,'Costa Rica'),(42,'Cote d/\'Ivoire'),(43,'Croatia'),(44,'Cuba'),(45,'Cyprus'),(46,'Czech Republic'),(47,'Denmark'),(48,'Djibouti'),(49,'Dominica'),(50,'Dominican Republic'),(51,'Ecuador'),(52,'Egypt'),(53,'El Salvador'),(54,'Equatorial Guinea'),(55,'Eritrea'),(56,'Estonia'),(57,'Eswatini'),(58,'Ethiopia'),(59,'Fiji'),(60,'Finland'),(61,'France'),(62,'Gabon'),(63,'Gambia'),(64,'Georgia'),(65,'Germany'),(66,'Ghana'),(67,'Greece'),(68,'Grenada'),(69,'Guatemala'),(70,'Guinea'),(71,'Guinea-Bissau'),(72,'Guyana'),(73,'Haiti'),(74,'Honduras'),(75,'Hungary'),(76,'Iceland'),(77,'India'),(78,'Indonesia'),(79,'Iran'),(80,'Iraq'),(81,'Ireland'),(82,'Israel'),(83,'Italy'),(84,'Jamaica'),(85,'Japan'),(86,'Jordan'),(87,'Kazakhstan'),(88,'Kenya'),(89,'Kiribati'),(90,'Kosovo'),(91,'Kuwait'),(92,'Kyrgyzstan'),(93,'Laos'),(94,'Latvia'),(95,'Lebanon'),(96,'Lesotho'),(97,'Liberia'),(98,'Libya'),(99,'Liechtenstein'),(100,'Lithuania'),(101,'Luxembourg'),(102,'Macedonia'),(103,'Madagascar'),(104,'Malawi'),(105,'Malaysia'),(106,'Maldives'),(107,'Mali'),(108,'Malta'),(109,'Marshall Islands'),(110,'Mauritania'),(111,'Mauritius'),(112,'Mexico'),(113,'Micronesia'),(114,'Moldova'),(115,'Monaco'),(116,'Mongolia'),(117,'Montenegro'),(118,'Morocco'),(119,'Mozambique'),(120,'Myanmar'),(121,'Namibia'),(122,'Nauru'),(123,'Nepal'),(124,'Netherlands'),(125,'New Zealand'),(126,'Nicaragua'),(127,'Niger'),(128,'Nigeria'),(129,'North Korea'),(130,'Norway'),(131,'Oman'),(132,'Pakistan'),(133,'Palau'),(134,'Palestine'),(135,'Panama'),(136,'Papua New Guinea'),(137,'Paraguay'),(138,'Peru'),(139,'Philippines'),(140,'Poland'),(141,'Portugal'),(142,'Qatar'),(143,'Romania'),(144,'Russia'),(145,'Rwanda'),(146,'Saint Kitts and Nevis'),(147,'Saint Lucia'),(148,'Saint Vincent and the Grenadines'),(149,'Samoa'),(150,'San Marino'),(151,'Sao Tome and Principe'),(152,'Saudi Arabia'),(153,'Senegal'),(154,'Serbia'),(155,'Seychelles'),(156,'Sierra Leone'),(157,'Singapore'),(158,'Slovakia'),(159,'Slovenia'),(160,'Solomon Islands'),(161,'Somalia'),(162,'South Africa'),(163,'South Korea'),(164,'South Sudan'),(165,'Spain'),(166,'Sri Lanka'),(167,'Sudan'),(168,'Suriname'),(169,'Sweden'),(170,'Switzerland'),(171,'Syria'),(172,'Taiwan'),(173,'Tajikistan'),(174,'Tanzania'),(175,'Thailand'),(176,'Timor-Leste'),(177,'Togo'),(178,'Tonga'),(179,'Trinidad and Tobago'),(180,'Tunisia'),(181,'Turkey'),(182,'Turkmenistan'),(183,'Tuvalu'),(184,'Uganda'),(185,'Ukraine'),(186,'United Arab Emirates (UAE)'),(187,'United Kingdom (UK)'),(188,'United States of America (USA)'),(189,'Uruguay'),(190,'Uzbekistan'),(191,'Vanuatu'),(192,'Vatican City (Holy See)'),(193,'Venezuela'),(194,'Vietnam'),(195,'Yemen'),(196,'Zambia'),(197,'Zimbabwe');
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS `donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `donations` (
  `donation_id` int(6) NOT NULL AUTO_INCREMENT,
  `reservation_id` int(6) NOT NULL,
  `guest_id` int(6) NOT NULL,
  `received_on` date NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `receipt_no` varchar(20) NOT NULL,
  `is_advance` tinyint(2) NOT NULL DEFAULT '1',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`donation_id`),
  UNIQUE KEY `advance_donation_id_UNIQUE` (`donation_id`),
  KEY `fk_guests_donations` (`guest_id`),
  KEY `fk_reservations_donations` (`reservation_id`),
  CONSTRAINT `fk_guests_donations` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`guest_id`),
  CONSTRAINT `fk_reservations_donations` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`reservation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donations`
--

LOCK TABLES `donations` WRITE;
/*!40000 ALTER TABLE `donations` DISABLE KEYS */;
INSERT INTO `donations` VALUES (3,2,2,'2018-05-25',9999,'R888',1,'2018-05-25 21:48:50'),(4,17,41,'2018-06-25',100,'R123',1,'2018-06-21 19:59:46'),(5,17,41,'2018-06-27',200,'R234',1,'2018-06-21 20:19:25'),(6,31,69,'2018-06-24',1001,'R1001',1,'2018-06-24 16:13:12'),(7,31,69,'2018-06-18',99,'R99',1,'2018-06-24 16:30:46'),(8,2,2,'2018-07-14',12800,'aaa',0,'2018-07-14 22:49:37'),(9,51,69,'2018-07-14',16200,'bbb',0,'2018-07-14 22:56:36'),(10,2,3,'2018-07-14',111,'ddd',0,'2018-07-14 23:24:51'),(11,2,1,'2018-07-14',100,'ccc',0,'2018-07-14 23:25:05'),(12,3,1,'2018-07-14',111,'111',0,'2018-07-14 23:25:56'),(13,51,69,'2018-07-14',16200,'116',0,'2018-07-14 23:26:15'),(14,2,3,'2018-07-14',12800,'111',0,'2018-07-14 23:26:49'),(15,51,69,'2018-07-14',16200,'111',0,'2018-07-14 23:27:15'),(16,2,2,'2018-07-14',0,'',0,'2018-07-14 23:52:03'),(17,51,69,'2018-07-15',16200,'',0,'2018-07-15 11:23:59'),(18,2,2,'2018-07-15',12800,'',0,'2018-07-15 11:26:23'),(19,2,2,'2018-07-15',12800,'',0,'2018-07-15 11:27:00'),(20,2,3,'2018-07-15',12800,'',0,'2018-07-15 11:33:08'),(21,2,2,'2018-07-15',12800,'',0,'2018-07-15 11:33:59'),(22,51,69,'2018-07-15',6600,'',0,'2018-07-15 11:34:03');
/*!40000 ALTER TABLE `donations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `error_logs`
--

DROP TABLE IF EXISTS `error_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `error_logs` (
  `error_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `error_message` varchar(1000) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`error_log_id`),
  UNIQUE KEY `error_log_id_UNIQUE` (`error_log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=586 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `error_logs`
--

LOCK TABLES `error_logs` WRITE;
/*!40000 ALTER TABLE `error_logs` DISABLE KEYS */;
INSERT INTO `error_logs` VALUES (1,'Error: ER_SP_DOES_NOT_EXIST: PROCEDURE pn.sp_GetGuestDetailsByEmailID123 does not exist','2018-06-21 10:20:43'),(2,'Error: ER_SP_DOES_NOT_EXIST: PROCEDURE pn.sp_GetGuestDetailsByEmailID123 does not exist','2018-06-21 10:32:40'),(3,'Error: ER_SP_DOES_NOT_EXIST: PROCEDURE pn.sp_GetGuestDetailsByEmailID123 does not exist','2018-06-21 10:36:48'),(4,'Error: ER_SP_DOES_NOT_EXIST: PROCEDURE pn.sp_GetGuestDetailsByEmailID123 does not exist','2018-06-21 10:38:03'),(5,'[object Object]','2018-06-21 11:05:14'),(6,'[object Object]','2018-06-21 11:07:42'),(7,'undefined','2018-06-21 11:11:07'),(8,'[object Object]','2018-06-21 11:13:04'),(9,'[object Object]','2018-06-21 11:15:15'),(10,'[object Object]','2018-06-21 11:16:40'),(11,'[object Object]','2018-06-21 11:18:29'),(12,'{}','2018-06-21 11:24:46'),(13,'TypeError: Cannot read property \"bind\" of undefined','2018-06-21 11:30:45'),(14,'TypeError: Cannot read property \"bind\" of undefined','2018-06-21 11:33:18'),(15,'TypeError: Cannot read property \"style\" of undefined','2018-06-21 11:34:18'),(16,'TypeError: date.clone is not a function','2018-06-21 16:49:43'),(17,'TypeError: date.clone is not a function','2018-06-21 16:53:11'),(18,'TypeError: aDate.format is not a function','2018-06-21 17:00:15'),(19,'TypeError: date.clone is not a function','2018-06-21 17:04:07'),(20,'TypeError: date.clone is not a function','2018-06-21 17:04:08'),(21,'ReferenceError: notValidClasses is not defined','2018-06-21 21:07:50'),(22,'TypeError: Cannot set property \"value\" of undefined','2018-06-21 21:09:49'),(23,'Error: No recipients defined','2018-06-21 22:13:09'),(24,'Error: No recipients defined','2018-06-21 22:18:45'),(25,'Error: No recipients defined','2018-06-21 22:20:18'),(26,'Error: No recipients defined','2018-06-21 22:29:16'),(27,'Error: No recipients defined','2018-06-21 22:30:15'),(28,'Error: No recipients defined','2018-06-21 22:33:38'),(29,'TypeError: Cannot read property \"reservation_id\" of undefined','2018-06-22 11:00:11'),(30,'TypeError: Cannot read property \"reservation_id\" of undefined','2018-06-22 11:00:28'),(31,'TypeError: Cannot read property \"reservation_id\" of undefined','2018-06-22 11:02:28'),(32,'Error: The `Checkbox` component must be used as a child of `CheckboxGroup`.','2018-06-22 13:46:05'),(33,'Error: The `Checkbox` component must be used as a child of `CheckboxGroup`.','2018-06-22 13:46:08'),(34,'Error: The `Checkbox` component must be used as a child of `CheckboxGroup`.','2018-06-22 13:48:11'),(35,'Error: The `Checkbox` component must be used as a child of `CheckboxGroup`.','2018-06-22 13:50:12'),(36,'Error: The `Checkbox` component must be used as a child of `CheckboxGroup`.','2018-06-22 14:07:26'),(37,'Error: The `Checkbox` component must be used as a child of `CheckboxGroup`.','2018-06-22 14:09:26'),(38,'Error: The `Checkbox` component must be used as a child of `CheckboxGroup`.','2018-06-22 14:12:18'),(39,'Error: The `Checkbox` component must be used as a child of `CheckboxGroup`.','2018-06-22 14:14:19'),(40,'TypeError: Cannot read property \"bind\" of undefined','2018-06-22 15:49:23'),(41,'Error: The `Checkbox` component must be used as a child of `CheckboxGroup`.','2018-06-22 19:53:26'),(42,'Error: The `Checkbox` component must be used as a child of `CheckboxGroup`.','2018-06-22 20:17:42'),(43,'Error: The `Checkbox` component must be used as a child of `CheckboxGroup`.','2018-06-22 20:17:43'),(44,'Error: The `Checkbox` component must be used as a child of `CheckboxGroup`.','2018-06-22 20:18:04'),(45,'Invariant Violation: Objects are not valid as a React child (found: Error: Something went wrong). If you meant to render a collection of children, use an array instead.\n    in div (created by CheckOuts)\n    in CheckOuts (created by Dashboard)\n    in td (created by Dashboard)\n    in tr (created by Dashboard)\n    in tbody (created by Dashboard)\n    in table (created by Dashboard)\n    in div (created by Dashboard)\n    in ErrorBoundary (created by Dashboard)\n    in div (created by Dashboard)\n    in Dashboard (created by Home)\n    in div (created by TabContent)\n    in TabContent (created by Home)\n    in div (created by Tabs)\n    in Tabs (created by Home)\n    in div (created by Home)\n    in ErrorBoundary (created by Home)\n    in div (created by Home)\n    in Home','2018-06-22 22:54:09'),(46,'Error: Not Found','2018-06-22 23:22:22'),(47,'Error: Not Found','2018-06-22 23:24:23'),(48,'Error: Not Found','2018-06-22 23:24:54'),(49,'Error: Not Found','2018-06-22 23:25:02'),(50,'CheckOutsError: Not Found','2018-06-22 23:25:42'),(51,'CheckOuts SyntaxError: Unexpected token E in JSON at position 0','2018-06-22 23:27:13'),(52,'CheckOuts Error: Not Found','2018-06-22 23:33:23'),(53,'TypeError: Cannot read property \"length\" of undefined','2018-06-22 23:34:08'),(54,'TypeError: Cannot read property \"length\" of undefined','2018-06-22 23:35:37'),(55,'TypeError: Cannot read property \"length\" of undefined','2018-06-22 23:37:32'),(56,'TypeError: Cannot read property \"length\" of undefined','2018-06-22 23:38:52'),(57,'TypeError: Cannot read property \"length\" of undefined','2018-06-22 23:40:53'),(58,'TypeError: Cannot read property \"length\" of undefined','2018-06-22 23:42:37'),(59,'CheckOuts TypeError: Failed to fetch','2018-06-22 23:55:14'),(60,'Error: The `Checkbox` component must be used as a child of `CheckboxGroup`.','2018-06-23 00:08:25'),(61,'Error: The `Checkbox` component must be used as a child of `CheckboxGroup`.','2018-06-23 00:08:26'),(62,'Error: The `Checkbox` component must be used as a child of `CheckboxGroup`.','2018-06-23 00:08:30'),(63,'Error: The `Checkbox` component must be used as a child of `CheckboxGroup`.','2018-06-23 00:08:31'),(64,'CheckOuts TypeError: Failed to fetch','2018-06-23 00:14:54'),(65,'CheckOuts TypeError: Failed to fetch','2018-06-23 00:16:40'),(66,'ReferenceError: error is not defined','2018-06-23 00:57:56'),(67,'ReferenceError: error is not defined','2018-06-23 00:59:23'),(68,'ReferenceError: error is not defined','2018-06-23 01:01:21'),(69,'Error: The `Checkbox` component must be used as a child of `CheckboxGroup`.','2018-06-23 11:20:59'),(70,'Error: The `Checkbox` component must be used as a child of `CheckboxGroup`.','2018-06-23 11:21:02'),(71,'Error: The `Checkbox` component must be used as a child of `CheckboxGroup`.','2018-06-23 11:23:03'),(72,'TypeError: Failed to fetch','2018-06-23 13:09:57'),(73,'TypeError: Failed to fetch','2018-06-23 13:11:11'),(74,'TypeError: Failed to fetch','2018-06-23 14:24:04'),(75,'TypeError: Failed to fetch','2018-06-23 14:40:28'),(76,'TypeError: this.sampleStore.getStore is not a function','2018-06-23 16:10:08'),(77,'TypeError: Failed to fetch','2018-06-23 17:07:48'),(78,'TypeError: Failed to fetch','2018-06-23 17:08:48'),(79,'TypeError: reservationSearch.indexOf is not a function','2018-06-23 17:12:15'),(80,'TypeError: aDate.format is not a function','2018-06-23 17:21:21'),(81,'TypeError: Failed to fetch','2018-06-23 17:24:33'),(82,'TypeError: Failed to fetch','2018-06-23 17:24:33'),(83,'SyntaxError: Unexpected token E in JSON at position 0','2018-06-23 17:25:10'),(84,'SyntaxError: Unexpected token E in JSON at position 0','2018-06-23 17:27:11'),(85,'TypeError: Failed to fetch','2018-06-23 17:27:58'),(86,'TypeError: Failed to fetch','2018-06-23 17:27:59'),(87,'TypeError: Failed to fetch','2018-06-23 17:28:33'),(88,'TypeError: Failed to fetch','2018-06-23 17:28:33'),(89,'SyntaxError: Unexpected token E in JSON at position 0','2018-06-23 17:29:12'),(90,'TypeError: Failed to fetch','2018-06-23 17:29:24'),(91,'TypeError: Failed to fetch','2018-06-23 17:29:24'),(92,'TypeError: Failed to fetch','2018-06-23 17:30:49'),(93,'TypeError: Failed to fetch','2018-06-23 17:30:49'),(94,'TypeError: Failed to fetch','2018-06-23 17:30:50'),(95,'TypeError: Failed to fetch','2018-06-23 17:41:25'),(96,'SyntaxError: Unexpected token E in JSON at position 0','2018-06-23 18:00:33'),(97,'TypeError: Failed to fetch','2018-06-23 18:00:41'),(98,'TypeError: Failed to fetch','2018-06-23 18:00:41'),(99,'TypeError: Failed to fetch','2018-06-23 18:00:42'),(100,'TypeError: Cannot read property \"component\" of undefined','2018-06-23 18:00:43'),(101,'TypeError: Cannot read property \"style\" of undefined','2018-06-23 18:00:45'),(102,'TypeError: Cannot read property \"component\" of undefined','2018-06-23 18:00:49'),(103,'TypeError: Cannot read property \"style\" of undefined','2018-06-23 18:00:50'),(104,'TypeError: Cannot read property \"component\" of undefined','2018-06-23 18:01:29'),(105,'TypeError: Cannot read property \"style\" of undefined','2018-06-23 18:01:37'),(106,'TypeError: Cannot read property \"bind\" of undefined','2018-06-23 22:38:35'),(107,'TypeError: Cannot set property \"visibility\" of undefined','2018-06-23 22:57:37'),(108,'TypeError: Cannot read property \"style\" of undefined','2018-06-23 23:01:38'),(109,'TypeError: Cannot read property \"style\" of null','2018-06-23 23:02:56'),(110,'TypeError: Failed to fetch','2018-06-24 00:38:11'),(111,'TypeError: Failed to fetch','2018-06-24 00:38:11'),(112,'TypeError: Failed to fetch','2018-06-24 09:18:18'),(113,'TypeError: Cannot set property \"className\" of undefined','2018-06-24 10:14:49'),(114,'TypeError: Cannot read property \"style\" of undefined','2018-06-24 10:14:50'),(115,'TypeError: Failed to fetch','2018-06-24 10:17:29'),(116,'TypeError: Failed to fetch','2018-06-24 10:17:30'),(117,'TypeError: Failed to fetch','2018-06-24 10:21:01'),(118,'TypeError: Failed to fetch','2018-06-24 10:26:07'),(119,'TypeError: Failed to fetch','2018-06-24 12:18:33'),(120,'TypeError: Failed to fetch','2018-06-24 12:18:33'),(121,'TypeError: Failed to fetch','2018-06-24 13:45:46'),(122,'TypeError: Failed to fetch','2018-06-24 13:50:54'),(123,'TypeError: Failed to fetch','2018-06-24 13:50:55'),(124,'TypeError: Failed to fetch','2018-06-24 13:52:54'),(125,'SyntaxError: Unexpected token E in JSON at position 0','2018-06-24 15:18:40'),(126,'SyntaxError: Unexpected token E in JSON at position 0','2018-06-24 15:20:41'),(127,'TypeError: Failed to fetch','2018-06-24 15:23:27'),(128,'TypeError: Failed to fetch','2018-06-24 15:23:28'),(129,'TypeError: Failed to fetch','2018-06-24 15:34:37'),(130,'TypeError: Failed to fetch','2018-06-24 15:34:38'),(131,'SyntaxError: Unexpected token E in JSON at position 0','2018-06-24 15:35:53'),(132,'SyntaxError: Unexpected token E in JSON at position 0','2018-06-24 15:36:42'),(133,'SyntaxError: Unexpected token E in JSON at position 0','2018-06-24 15:38:42'),(134,'SyntaxError: Unexpected token E in JSON at position 0','2018-06-24 15:39:28'),(135,'TypeError: Failed to fetch','2018-06-24 15:40:15'),(136,'TypeError: Failed to fetch','2018-06-24 15:40:18'),(137,'SyntaxError: Unexpected token E in JSON at position 0','2018-06-24 16:05:04'),(138,'SyntaxError: Unexpected token E in JSON at position 0','2018-06-24 16:07:06'),(139,'TypeError: Failed to fetch','2018-06-24 16:08:56'),(140,'TypeError: Failed to fetch','2018-06-24 16:08:57'),(141,'SyntaxError: Unexpected token E in JSON at position 0','2018-06-24 16:12:55'),(142,'TypeError: Failed to fetch','2018-06-24 16:14:35'),(143,'TypeError: Failed to fetch','2018-06-24 16:14:36'),(144,'TypeError: Failed to fetch','2018-06-24 16:14:36'),(145,'SyntaxError: Unexpected token E in JSON at position 0','2018-06-24 16:14:58'),(146,'TypeError: Failed to fetch','2018-06-24 16:15:03'),(147,'TypeError: Failed to fetch','2018-06-24 16:17:03'),(148,'SyntaxError: Unexpected token E in JSON at position 0','2018-06-24 16:24:42'),(149,'TypeError: Failed to fetch','2018-06-24 16:24:43'),(150,'TypeError: Failed to fetch','2018-06-24 16:24:44'),(151,'TypeError: Failed to fetch','2018-06-24 16:26:43'),(152,'ReferenceError: isLoaded is not defined','2018-06-24 19:09:08'),(153,'TypeError: Cannot read property \"style\" of undefined','2018-06-24 19:09:09'),(154,'ReferenceError: isLoaded is not defined','2018-06-24 19:09:14'),(155,'TypeError: Cannot read property \"style\" of undefined','2018-06-24 19:09:16'),(156,'ReferenceError: isLoaded is not defined','2018-06-24 19:10:58'),(157,'TypeError: Cannot read property \"style\" of undefined','2018-06-24 19:11:00'),(158,'ReferenceError: arrAdvanceDonations is not defined','2018-06-24 19:12:29'),(159,'ReferenceError: arrAdvanceDonations is not defined','2018-06-24 19:15:18'),(160,'TypeError: Failed to fetch','2018-06-24 19:15:19'),(161,'TypeError: Failed to fetch','2018-06-24 19:15:19'),(162,'TypeError: Failed to fetch','2018-06-24 19:15:20'),(163,'TypeError: Failed to fetch','2018-06-24 19:17:01'),(164,'TypeError: Failed to fetch','2018-06-24 19:17:02'),(165,'TypeError: Failed to fetch','2018-06-24 19:17:02'),(166,'TypeError: Failed to fetch','2018-06-24 19:17:50'),(167,'TypeError: Failed to fetch','2018-06-24 19:17:50'),(168,'TypeError: Failed to fetch','2018-06-24 19:17:51'),(169,'TypeError: Failed to fetch','2018-06-24 19:17:52'),(170,'TypeError: Failed to fetch','2018-06-24 19:18:32'),(171,'TypeError: Failed to fetch','2018-06-24 19:18:32'),(172,'ReservationDetails TypeError: Failed to fetch','2018-06-24 19:18:33'),(173,'TypeError: Failed to fetch','2018-06-24 19:18:34'),(174,'TypeError: Failed to fetch','2018-06-24 19:19:22'),(175,'TypeError: Failed to fetch','2018-06-24 19:19:37'),(176,'TypeError: Failed to fetch','2018-06-24 19:56:28'),(177,'TypeError: Failed to fetch','2018-06-24 19:56:28'),(178,'TypeError: Failed to fetch','2018-06-24 19:56:29'),(179,'TypeError: Failed to fetch','2018-06-24 20:01:16'),(180,'TypeError: Failed to fetch','2018-06-24 20:01:16'),(181,'TypeError: Failed to fetch','2018-06-24 20:01:17'),(182,'TypeError: Failed to fetch','2018-06-24 20:03:17'),(183,'TypeError: Failed to fetch','2018-06-24 20:07:46'),(184,'TypeError: Failed to fetch','2018-06-24 20:09:22'),(185,'TypeError: Failed to fetch','2018-06-24 20:10:14'),(186,'TypeError: Failed to fetch','2018-06-24 20:10:15'),(187,'TypeError: Failed to fetch','2018-06-24 20:10:15'),(188,'TypeError: Failed to fetch','2018-06-24 20:11:55'),(189,'TypeError: Failed to fetch','2018-06-24 20:23:10'),(190,'TypeError: Failed to fetch','2018-06-24 20:23:41'),(191,'TypeError: Failed to fetch','2018-06-24 22:17:15'),(192,'TypeError: Failed to fetch','2018-06-24 22:17:16'),(193,'TypeError: Failed to fetch','2018-06-24 22:17:20'),(194,'TypeError: Failed to fetch','2018-06-24 22:27:20'),(195,'TypeError: Failed to fetch','2018-06-24 22:27:20'),(196,'TypeError: Failed to fetch','2018-06-24 22:27:21'),(197,'TypeError: Failed to fetch','2018-06-24 22:34:14'),(198,'TypeError: Failed to fetch','2018-06-24 22:34:15'),(199,'TypeError: Failed to fetch','2018-06-24 22:34:16'),(200,'SyntaxError: Unexpected token E in JSON at position 0','2018-06-24 22:36:55'),(201,'SyntaxError: Unexpected token E in JSON at position 0','2018-06-24 22:37:45'),(202,'TypeError: Failed to fetch','2018-06-24 22:38:25'),(203,'TypeError: Failed to fetch','2018-06-24 22:38:26'),(204,'TypeError: Failed to fetch','2018-06-24 22:38:26'),(205,'TypeError: Failed to fetch','2018-06-24 22:38:27'),(206,'TypeError: Failed to fetch','2018-06-24 22:38:30'),(207,'TypeError: Failed to fetch','2018-06-24 22:41:56'),(208,'TypeError: Failed to fetch','2018-06-24 22:42:03'),(209,'TypeError: Failed to fetch','2018-06-24 22:46:28'),(210,'TypeError: Failed to fetch','2018-06-24 22:46:51'),(211,'TypeError: Failed to fetch','2018-06-24 22:48:02'),(212,'TypeError: Failed to fetch','2018-06-24 22:51:53'),(213,'TypeError: Failed to fetch','2018-06-24 22:58:54'),(214,'TypeError: date.clone is not a function','2018-06-24 23:07:59'),(215,'TypeError: date.clone is not a function','2018-06-24 23:09:45'),(216,'TypeError: date.clone is not a function','2018-06-24 23:14:30'),(217,'TypeError: date.clone is not a function','2018-06-24 23:23:33'),(218,'TypeError: date.clone is not a function','2018-06-24 23:25:33'),(219,'TypeError: date.clone is not a function','2018-06-24 23:26:21'),(220,'TypeError: Failed to fetch','2018-06-24 23:31:37'),(221,'TypeError: Failed to fetch','2018-06-24 23:37:14'),(222,'TypeError: Failed to fetch','2018-06-24 23:47:36'),(223,'TypeError: Failed to fetch','2018-06-24 23:52:46'),(224,'Login Error: Not Found','2018-06-25 20:03:26'),(225,'TypeError: Failed to fetch','2018-06-25 20:11:48'),(226,'SyntaxError: Unexpected token E in JSON at position 0','2018-06-25 20:25:43'),(227,'TypeError: Cannot read property \"bind\" of undefined','2018-06-25 23:51:15'),(228,'TypeError: Cannot read property \"bind\" of undefined','2018-06-25 23:52:04'),(229,'TypeError: Cannot read property \"bind\" of undefined','2018-06-25 23:52:46'),(230,'TypeError: Cannot read property \"bind\" of undefined','2018-06-25 23:54:12'),(231,'TypeError: Failed to fetch','2018-06-27 11:45:35'),(232,'TypeError: Failed to fetch','2018-06-27 11:53:48'),(233,'TypeError: this.populateNoOfRooms is not a function','2018-06-27 19:25:56'),(234,'TypeError: Cannot read property \"bind\" of undefined','2018-06-27 19:27:02'),(235,'TypeError: Cannot read property \"style\" of undefined','2018-06-27 19:27:02'),(236,'TypeError: Cannot read property \"bind\" of undefined','2018-06-27 19:28:06'),(237,'TypeError: Cannot read property \"style\" of undefined','2018-06-27 19:28:06'),(238,'TypeError: Cannot read property \"bind\" of undefined','2018-06-27 19:28:38'),(239,'URooms TypeError: Failed to fetch','2018-06-27 21:08:27'),(240,'CheckOuts TypeError: Failed to fetch','2018-06-27 21:08:27'),(241,'CheckIns TypeError: Failed to fetch','2018-06-27 21:08:27'),(242,'TodayAvailability TypeError: Failed to fetch','2018-06-27 21:08:27'),(243,'TypeError: Cannot read property \"bind\" of undefined','2018-06-28 13:11:58'),(244,'TypeError: Cannot read property \"style\" of undefined','2018-06-28 13:11:58'),(245,'ReferenceError: notValidClasses is not defined','2018-06-28 13:12:46'),(246,'TypeError: Cannot read property \"style\" of undefined','2018-06-28 13:12:46'),(247,'TypeError: props.getStore is not a function','2018-06-28 16:28:50'),(248,'TypeError: Cannot read property \"style\" of undefined','2018-06-28 16:28:50'),(249,'BookRooms SyntaxError: Unexpected token < in JSON at position 0','2018-06-28 16:34:44'),(250,'BookRooms SyntaxError: Unexpected token < in JSON at position 0','2018-06-28 16:35:41'),(251,'BookRooms SyntaxError: Unexpected token < in JSON at position 0','2018-06-28 16:37:41'),(252,'BookRooms SyntaxError: Unexpected token < in JSON at position 0','2018-06-28 16:39:22'),(253,'BookRooms SyntaxError: Unexpected token < in JSON at position 0','2018-06-28 16:39:27'),(254,'BookRooms SyntaxError: Unexpected token < in JSON at position 0','2018-06-28 16:41:36'),(255,'BookRooms SyntaxError: Unexpected token < in JSON at position 0','2018-06-28 16:43:37'),(256,'BookRooms SyntaxError: Unexpected token E in JSON at position 0','2018-06-28 16:45:20'),(257,'BookRooms SyntaxError: Unexpected token E in JSON at position 0','2018-06-28 16:47:20'),(258,'BookRooms SyntaxError: Unexpected token E in JSON at position 0','2018-06-28 17:27:20'),(259,'TypeError: Cannot read property \"length\" of undefined','2018-06-28 19:54:56'),(260,'TypeError: Cannot read property \"style\" of undefined','2018-06-28 19:54:56'),(261,'BookRooms SyntaxError: Unexpected token E in JSON at position 0','2018-06-29 10:27:31'),(262,'TypeError: props.getStore is not a function','2018-06-29 10:31:13'),(263,'TypeError: Cannot read property \"style\" of undefined','2018-06-29 10:31:13'),(264,'BookRooms SyntaxError: Unexpected token E in JSON at position 0','2018-06-29 10:34:35'),(265,'BookRooms TypeError: Failed to fetch','2018-07-01 11:31:48'),(266,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-01 18:55:54'),(267,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-01 18:57:54'),(268,'BookRooms TypeError: Failed to fetch','2018-07-02 18:42:51'),(269,'BookRooms TypeError: Failed to fetch','2018-07-02 19:18:50'),(270,'TypeError: Failed to fetch','2018-07-02 19:21:44'),(271,'BookRooms TypeError: Failed to fetch','2018-07-02 19:24:35'),(272,'BookRooms TypeError: Failed to fetch','2018-07-02 19:24:40'),(273,'ReferenceError: items is not defined','2018-07-02 19:51:13'),(274,'TypeError: uniqueRooms.filter is not a function','2018-07-02 19:52:30'),(275,'TypeError: uniqueRooms.filter is not a function','2018-07-02 19:55:04'),(276,'TypeError: uniqueRooms.filter is not a function','2018-07-02 20:04:50'),(277,'TypeError: Cannot read property \"style\" of undefined','2018-07-02 20:12:58'),(278,'TypeError: Cannot read property \"length\" of null','2018-07-02 20:24:06'),(279,'TypeError: this.populateRoomType is not a function','2018-07-02 20:36:14'),(280,'TypeError: Cannot read property \"style\" of undefined','2018-07-02 20:36:14'),(281,'ReferenceError: i is not defined','2018-07-02 22:11:39'),(282,'TypeError: Cannot read property \"style\" of undefined','2018-07-02 22:11:39'),(283,'TypeError: uniqueRooms.filter is not a function','2018-07-03 11:59:49'),(284,'TypeError: Cannot read property \"style\" of null','2018-07-03 12:50:00'),(285,'TypeError: Cannot read property \"style\" of undefined','2018-07-03 12:50:00'),(286,'TypeError: Cannot set property \"checked\" of null','2018-07-03 12:51:45'),(287,'TypeError: Cannot set property \"checked\" of null','2018-07-03 12:53:30'),(288,'TypeError: Cannot set property \"checked\" of null','2018-07-03 12:58:47'),(289,'TypeError: Cannot set property \"checked\" of null','2018-07-03 12:59:49'),(290,'TypeError: Cannot set property \"checked\" of null','2018-07-03 13:03:31'),(291,'TypeError: Cannot set property \"checked\" of null','2018-07-03 13:04:38'),(292,'TypeError: Cannot set property \"checked\" of null','2018-07-03 13:05:48'),(293,'TypeError: Cannot set property \"checked\" of null','2018-07-03 13:06:12'),(294,'TypeError: Cannot set property \"checked\" of null','2018-07-03 13:09:45'),(295,'TypeError: Cannot set property \"checked\" of null','2018-07-03 13:09:48'),(296,'TypeError: Cannot set property \"checked\" of null','2018-07-03 13:10:09'),(297,'TypeError: Cannot set property \"checked\" of null','2018-07-03 13:11:41'),(298,'TypeError: Cannot set property \"checked\" of null','2018-07-03 13:11:58'),(299,'TypeError: Cannot set property \"checked\" of null','2018-07-03 13:12:02'),(300,'TypeError: Cannot set property \"checked\" of null','2018-07-03 13:12:07'),(301,'TypeError: Cannot set property \"checked\" of null','2018-07-03 13:14:22'),(302,'TypeError: Cannot read property \"value\" of null','2018-07-03 13:16:41'),(303,'TypeError: Cannot read property \"value\" of null','2018-07-03 13:17:24'),(304,'TypeError: Cannot read property \"value\" of null','2018-07-03 13:17:31'),(305,'TypeError: Cannot read property \"value\" of null','2018-07-03 13:17:32'),(306,'TypeError: Cannot read property \"checked\" of null','2018-07-03 13:19:25'),(307,'TypeError: Cannot read property \"name\" of null','2018-07-03 13:25:08'),(308,'TypeError: Cannot read property \"style\" of undefined','2018-07-03 13:25:08'),(309,'TypeError: Cannot read property \"name\" of null','2018-07-03 13:35:35'),(310,'TypeError: Cannot set property \"checked\" of null','2018-07-03 18:45:09'),(311,'TypeError: Cannot set property \"checked\" of null','2018-07-03 18:47:52'),(312,'TypeError: Cannot set property \"checked\" of null','2018-07-03 18:50:36'),(313,'TypeError: Cannot set property \"checked\" of null','2018-07-03 18:51:48'),(314,'TypeError: Cannot set property \"checked\" of null','2018-07-03 18:55:00'),(315,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-03 19:43:29'),(316,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-03 19:45:29'),(317,'TypeError: Failed to fetch','2018-07-03 19:55:46'),(318,'TypeError: Cannot read property \"bind\" of undefined','2018-07-03 19:57:28'),(319,'ReferenceError: uRoomsNeedRefresh is not defined','2018-07-03 19:58:27'),(320,'TypeError: Cannot read property \"bind\" of undefined','2018-07-03 20:01:35'),(321,'TypeError: Failed to fetch','2018-07-03 20:08:55'),(322,'TypeError: Failed to fetch','2018-07-03 20:21:42'),(323,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-04 21:21:46'),(324,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-04 21:23:46'),(325,'ReferenceError: floors is not defined','2018-07-07 14:35:44'),(326,'ReferenceError: moment is not defined','2018-07-07 17:29:36'),(327,'ReferenceError: blocks is not defined','2018-07-07 18:28:29'),(328,'TypeError: Cannot read property \"style\" of undefined','2018-07-07 18:28:29'),(329,'TypeError: Cannot read property \"searchLoaded\" of undefined','2018-07-07 18:39:50'),(330,'TypeError: Cannot read property \"style\" of undefined','2018-07-07 18:39:50'),(331,'TypeError: this.props.getSearchStore is not a function','2018-07-07 18:45:43'),(332,'TypeError: Cannot read property \"style\" of undefined','2018-07-07 18:45:43'),(333,'ReferenceError: props is not defined','2018-07-07 18:46:18'),(334,'TypeError: Cannot read property \"style\" of undefined','2018-07-07 18:46:18'),(335,'TypeError: Cannot read property \"searchLoaded\" of undefined','2018-07-07 18:47:55'),(336,'TypeError: Cannot read property \"style\" of undefined','2018-07-07 18:47:55'),(337,'TypeError: Cannot read property \"searchLoaded\" of undefined','2018-07-07 18:51:11'),(338,'TypeError: Cannot read property \"style\" of undefined','2018-07-07 18:51:11'),(339,'TypeError: Cannot read property \"searchLoaded\" of undefined','2018-07-07 18:54:30'),(340,'TypeError: Cannot read property \"style\" of undefined','2018-07-07 18:54:30'),(341,'TypeError: Cannot read property \"searchLoaded\" of undefined','2018-07-07 18:59:35'),(342,'TypeError: Cannot read property \"style\" of undefined','2018-07-07 18:59:35'),(343,'TypeError: Cannot read property \"searchLoaded\" of undefined','2018-07-07 19:02:57'),(344,'TypeError: Cannot read property \"style\" of undefined','2018-07-07 19:02:58'),(345,'TypeError: Cannot read property \"searchLoaded\" of undefined','2018-07-07 19:05:51'),(346,'TypeError: Cannot read property \"style\" of undefined','2018-07-07 19:05:51'),(347,'TypeError: Cannot read property \"searchLoaded\" of undefined','2018-07-07 19:06:16'),(348,'TypeError: Cannot read property \"style\" of undefined','2018-07-07 19:06:16'),(349,'TypeError: Cannot read property \"uniqueBlocks\" of undefined','2018-07-07 20:04:32'),(350,'TypeError: Cannot read property \"style\" of undefined','2018-07-07 20:04:32'),(351,'TypeError: _this.searchStore.bind is not a function','2018-07-07 20:10:31'),(352,'TypeError: Cannot read property \"style\" of undefined','2018-07-07 20:10:31'),(353,'TypeError: Cannot read property \"uniqueBlocks\" of undefined','2018-07-07 20:11:10'),(354,'TypeError: Cannot read property \"style\" of undefined','2018-07-07 20:11:10'),(355,'TypeError: Cannot read property \"uniqueBlocks\" of undefined','2018-07-07 20:15:06'),(356,'TypeError: Cannot read property \"style\" of undefined','2018-07-07 20:15:06'),(357,'TypeError: props.getStore is not a function','2018-07-07 20:22:32'),(358,'TypeError: Cannot read property \"style\" of undefined','2018-07-07 20:22:32'),(359,'TypeError: Cannot read property \"uniqueBlocks\" of undefined','2018-07-07 20:23:08'),(360,'TypeError: Cannot read property \"uniqueBlocks\" of undefined','2018-07-07 20:26:12'),(361,'ReferenceError: props is not defined','2018-07-07 20:26:59'),(362,'TypeError: Cannot read property \"style\" of undefined','2018-07-07 20:26:59'),(363,'BookRooms SyntaxError: Unexpected token E in JSON at position 0','2018-07-07 20:32:40'),(364,'TypeError: Cannot read property \"uniqueBlocks\" of undefined','2018-07-07 20:34:39'),(365,'TypeError: Cannot read property \"uniqueBlocks\" of undefined','2018-07-07 20:36:39'),(366,'TypeError: this.props.getSearchStore(...).uniqueBlocks is not a function','2018-07-07 21:10:52'),(367,'TypeError: [object Array] is not a function','2018-07-07 22:38:33'),(368,'TypeError: [object Array] is not a function','2018-07-07 22:40:33'),(369,'ReferenceError: isReRender is not defined','2018-07-07 22:58:20'),(370,'TypeError: Cannot read property \"uniqueRooms\" of undefined','2018-07-07 23:27:13'),(371,'ReferenceError: moment is not defined','2018-07-08 00:44:34'),(372,'ReferenceError: moment is not defined','2018-07-08 00:44:35'),(373,'TypeError: Cannot read property \"style\" of undefined','2018-07-08 00:44:35'),(374,'BookRooms SyntaxError: Unexpected token E in JSON at position 0','2018-07-08 00:51:14'),(375,'BookRooms SyntaxError: Unexpected token E in JSON at position 0','2018-07-08 00:52:05'),(376,'TypeError: Cannot read property \"arrivalDateVal\" of null','2018-07-08 00:59:42'),(377,'TypeError: Cannot read property \"style\" of undefined','2018-07-08 00:59:42'),(378,'TypeError: date.clone is not a function','2018-07-08 01:03:23'),(379,'TypeError: date.clone is not a function','2018-07-08 01:03:23'),(380,'TypeError: Cannot read property \"style\" of undefined','2018-07-08 01:03:23'),(381,'TypeError: date.clone is not a function','2018-07-08 01:06:24'),(382,'TypeError: date.clone is not a function','2018-07-08 01:09:02'),(383,'TypeError: date.clone is not a function','2018-07-08 01:10:26'),(384,'TypeError: Cannot read property \"length\" of null','2018-07-08 01:11:36'),(385,'TypeError: Cannot read property \"length\" of null','2018-07-08 01:11:38'),(386,'TypeError: Cannot read property \"length\" of null','2018-07-08 01:11:52'),(387,'TypeError: Cannot read property \"length\" of null','2018-07-08 01:12:09'),(388,'TypeError: Failed to fetch','2018-07-08 01:32:55'),(389,'TypeError: date.clone is not a function','2018-07-08 01:34:00'),(390,'Invariant Violation: AdvanceDonations(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.','2018-07-08 01:35:59'),(391,'Invariant Violation: AdvanceDonations(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.','2018-07-08 01:39:05'),(392,'Invariant Violation: AdvanceDonations(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.','2018-07-08 01:40:42'),(393,'TypeError: Failed to fetch','2018-07-08 01:40:49'),(394,'Invariant Violation: AdvanceDonations(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.','2018-07-08 01:47:57'),(395,'TypeError: Failed to fetch','2018-07-08 01:52:40'),(396,'Error: ER_SP_WRONG_NO_OF_ARGS: Incorrect number of arguments for PROCEDURE pn.sp_InsertGuestDetails; expected 9, got 13','2018-07-08 10:41:04'),(397,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-08 10:41:04'),(398,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-08 10:43:05'),(399,'Invariant Violation: AdvanceDonations(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.','2018-07-08 10:49:07'),(400,'Invariant Violation: AdvanceDonations(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.','2018-07-08 10:51:07'),(401,'TypeError: Failed to fetch','2018-07-08 11:00:44'),(402,'TypeError: Failed to fetch','2018-07-08 11:39:09'),(403,'TypeError: Failed to fetch','2018-07-08 11:51:11'),(404,'TypeError: Failed to fetch','2018-07-08 12:00:05'),(405,'TypeError: Cannot read property \"bind\" of undefined','2018-07-08 12:03:38'),(406,'TypeError: Failed to fetch','2018-07-08 12:05:11'),(407,'TypeError: Cannot read property \"map\" of null','2018-07-08 13:47:21'),(408,'TypeError: Cannot read property \"style\" of undefined','2018-07-08 13:47:21'),(409,'TypeError: Cannot read property \"map\" of null','2018-07-08 13:50:20'),(410,'TypeError: Cannot read property \"style\" of undefined','2018-07-08 13:50:20'),(411,'TypeError: date.clone is not a function','2018-07-08 16:25:32'),(412,'TypeError: date.clone is not a function','2018-07-08 16:25:32'),(413,'TypeError: Failed to fetch','2018-07-08 18:52:39'),(414,'TypeError: props.getStore is not a function','2018-07-08 19:50:17'),(415,'TypeError: Cannot read property \"style\" of undefined','2018-07-08 19:50:17'),(416,'TypeError: _this6.getStore is not a function','2018-07-08 19:51:53'),(417,'TypeError: Cannot read property \"style\" of undefined','2018-07-08 19:51:53'),(418,'TypeError: props.getStore is not a function','2018-07-08 19:54:15'),(419,'TypeError: Cannot read property \"style\" of undefined','2018-07-08 19:54:15'),(420,'ReferenceError: roomItems is not defined','2018-07-08 19:55:40'),(421,'TypeError: Cannot read property \"style\" of undefined','2018-07-08 19:55:40'),(422,'TypeError: Cannot read property \"reservationId\" of undefined','2018-07-08 20:00:34'),(423,'TypeError: Cannot read property \"style\" of undefined','2018-07-08 20:00:34'),(424,'TypeError: Cannot read property \"reservationId\" of undefined','2018-07-08 20:01:35'),(425,'Invariant Violation: RoomBookings(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.','2018-07-08 20:13:02'),(426,'TypeError: Cannot read property \"style\" of undefined','2018-07-08 20:13:02'),(427,'Invariant Violation: RoomBookings(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.','2018-07-08 20:15:09'),(428,'TypeError: Cannot read property \"style\" of undefined','2018-07-08 20:15:09'),(429,'Invariant Violation: RoomBookings(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.','2018-07-08 20:16:39'),(430,'TypeError: Cannot read property \"style\" of undefined','2018-07-08 20:16:39'),(431,'TypeError: Failed to fetch','2018-07-08 20:22:42'),(432,'TypeError: Failed to fetch','2018-07-08 20:40:25'),(433,'TypeError: Failed to fetch','2018-07-08 21:23:52'),(434,'TypeError: Failed to fetch','2018-07-08 21:25:17'),(435,'TypeError: Failed to fetch','2018-07-08 21:25:24'),(436,'URooms TypeError: Failed to fetch','2018-07-08 22:01:49'),(437,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-10 19:18:26'),(438,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-10 19:20:26'),(439,'TypeError: Cannot read property \"displayName\" of undefined','2018-07-10 19:44:47'),(440,'TypeError: Cannot read property \"displayName\" of undefined','2018-07-10 19:45:32'),(441,'TypeError: Cannot read property \"displayName\" of undefined','2018-07-10 19:46:23'),(442,'TypeError: Cannot read property \"displayName\" of undefined','2018-07-10 19:48:41'),(443,'ReferenceError: Available is not defined','2018-07-11 20:43:20'),(444,'TypeError: Cannot set property \"selected\" of undefined','2018-07-12 18:06:50'),(445,'TypeError: Cannot set property \"selected\" of null','2018-07-12 18:08:51'),(446,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-12 18:35:01'),(447,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-12 18:36:46'),(448,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-12 18:37:49'),(449,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-12 18:38:43'),(450,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-12 18:39:48'),(451,'ReferenceError: Button is not defined','2018-07-13 20:29:31'),(452,'TypeError: Cannot read property \"displayName\" of undefined','2018-07-13 20:38:59'),(453,'TypeError: Cannot read property \"displayName\" of undefined','2018-07-13 20:40:59'),(454,'TypeError: this.props.getHomeStore is not a function','2018-07-14 12:59:03'),(455,'ReferenceError: pageLis is not defined','2018-07-14 13:11:49'),(456,'TypeError: this.props.jumpToStep is not a function','2018-07-14 13:27:58'),(457,'TypeError: this.jumpToStep is not a function','2018-07-14 13:29:10'),(458,'TypeError: Failed to fetch','2018-07-14 13:41:35'),(459,'ReferenceError: fetchUncleanRooms is not defined','2018-07-14 14:09:00'),(460,'TypeError: Failed to fetch','2018-07-14 14:11:37'),(461,'URooms TypeError: Failed to fetch','2018-07-14 14:18:50'),(462,'URooms TypeError: Failed to fetch','2018-07-14 14:18:50'),(463,'URooms TypeError: Failed to fetch','2018-07-14 14:20:17'),(464,'URooms TypeError: Failed to fetch','2018-07-14 14:21:38'),(465,'URooms TypeError: Failed to fetch','2018-07-14 14:21:38'),(466,'URooms TypeError: Failed to fetch','2018-07-14 14:23:03'),(467,'URooms TypeError: Failed to fetch','2018-07-14 14:23:03'),(468,'URooms TypeError: Failed to fetch','2018-07-14 14:24:24'),(469,'URooms TypeError: Failed to fetch','2018-07-14 14:24:24'),(470,'URooms TypeError: Failed to fetch','2018-07-14 14:24:57'),(471,'URooms TypeError: Failed to fetch','2018-07-14 14:24:57'),(472,'URooms TypeError: Failed to fetch','2018-07-14 14:25:42'),(473,'URooms TypeError: Failed to fetch','2018-07-14 14:25:42'),(474,'URooms TypeError: Failed to fetch','2018-07-14 14:26:40'),(475,'URooms TypeError: Failed to fetch','2018-07-14 14:26:40'),(476,'URooms TypeError: Failed to fetch','2018-07-14 14:29:01'),(477,'URooms TypeError: Failed to fetch','2018-07-14 14:29:01'),(478,'URooms TypeError: Failed to fetch','2018-07-14 14:32:28'),(479,'URooms TypeError: Failed to fetch','2018-07-14 14:32:28'),(480,'URooms TypeError: Failed to fetch','2018-07-14 14:33:17'),(481,'URooms TypeError: Failed to fetch','2018-07-14 14:33:17'),(482,'URooms TypeError: Failed to fetch','2018-07-14 14:35:16'),(483,'URooms TypeError: Failed to fetch','2018-07-14 14:35:17'),(484,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:35:17'),(485,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:35:17'),(486,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:35:17'),(487,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:35:17'),(488,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:37:17'),(489,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:37:17'),(490,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:37:17'),(491,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:37:17'),(492,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:37:17'),(493,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:37:17'),(494,'URooms TypeError: Failed to fetch','2018-07-14 14:37:34'),(495,'URooms TypeError: Failed to fetch','2018-07-14 14:37:34'),(496,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:37:34'),(497,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:37:34'),(498,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:37:34'),(499,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:37:35'),(500,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:39:21'),(501,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:39:21'),(502,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:39:21'),(503,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:39:21'),(504,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:39:21'),(505,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:39:22'),(506,'URooms TypeError: Failed to fetch','2018-07-14 14:39:38'),(507,'URooms TypeError: Failed to fetch','2018-07-14 14:39:39'),(508,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:39:39'),(509,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:39:39'),(510,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:39:39'),(511,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:39:39'),(512,'URooms TypeError: Failed to fetch','2018-07-14 14:40:46'),(513,'URooms TypeError: Failed to fetch','2018-07-14 14:40:46'),(514,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:40:46'),(515,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:40:46'),(516,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:40:46'),(517,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:40:47'),(518,'URooms TypeError: Failed to fetch','2018-07-14 14:45:07'),(519,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:45:07'),(520,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:45:07'),(521,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:45:07'),(522,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:45:08'),(523,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 14:45:08'),(524,'TypeError: this.props.getHomeStore is not a function','2018-07-14 15:01:01'),(525,'URooms SyntaxError: Unexpected token < in JSON at position 0','2018-07-14 15:03:21'),(526,'ReferenceError: TodayAvailability is not defined','2018-07-14 15:24:05'),(527,'TypeError: this.props.updateDashboardStore is not a function','2018-07-14 15:51:12'),(528,'TypeError: Failed to fetch','2018-07-14 16:30:08'),(529,'TypeError: Failed to fetch','2018-07-14 17:09:12'),(530,'TypeError: Failed to fetch','2018-07-14 17:21:25'),(531,'TypeError: Failed to fetch','2018-07-14 17:34:53'),(532,'TypeError: Failed to fetch','2018-07-14 18:13:16'),(533,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-14 22:57:26'),(534,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-14 22:59:23'),(535,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-14 23:01:23'),(536,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-14 23:01:59'),(537,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-14 23:03:59'),(538,'TypeError: Cannot read property \"donationAmount\" of undefined','2018-07-14 23:27:38'),(539,'SyntaxError: Unexpected token W in JSON at position 0','2018-07-14 23:46:13'),(540,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-14 23:49:44'),(541,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-15 11:19:58'),(542,'ReferenceError: jumpToStep is not defined','2018-07-15 11:56:20'),(543,'ReferenceError: jumpToStep is not defined','2018-07-15 11:58:20'),(544,'TypeError: this.props.updatHomeStore is not a function','2018-07-15 14:13:24'),(545,'TypeError: Cannot set property \"value\" of undefined','2018-07-15 14:34:41'),(546,'TypeError: Cannot read property \"style\" of undefined','2018-07-15 14:34:41'),(547,'ReferenceError: his is not defined','2018-07-15 14:39:32'),(548,'TypeError: Cannot read property \"style\" of undefined','2018-07-15 14:39:32'),(549,'TypeError: Cannot set property \"innerHTML\" of undefined','2018-07-15 15:23:32'),(550,'TypeError: Cannot add property stepsNavigation, object is not extensible','2018-07-15 15:36:29'),(551,'TypeError: Cannot read property \"style\" of undefined','2018-07-15 15:50:26'),(552,'TypeError: Cannot read property \"style\" of undefined','2018-07-15 15:50:26'),(553,'TypeError: Cannot read property \"style\" of undefined','2018-07-15 15:52:06'),(554,'TypeError: Cannot read property \"style\" of undefined','2018-07-15 15:52:06'),(555,'TypeError: Cannot read property \"style\" of undefined','2018-07-15 15:54:14'),(556,'TypeError: Cannot read property \"style\" of undefined','2018-07-15 15:54:14'),(557,'TypeError: Cannot read property \"style\" of null','2018-07-15 15:58:27'),(558,'TypeError: Cannot read property \"style\" of undefined','2018-07-15 15:58:27'),(559,'TypeError: Cannot read property \"style\" of null','2018-07-15 16:07:11'),(560,'TypeError: Cannot read property \"style\" of undefined','2018-07-15 16:07:11'),(561,'TypeError: Cannot read property \"style\" of null','2018-07-15 16:07:52'),(562,'TypeError: Cannot read property \"style\" of undefined','2018-07-15 16:07:52'),(563,'TypeError: Cannot read property \"style\" of undefined','2018-07-15 16:10:56'),(564,'TypeError: Cannot read property \"style\" of undefined','2018-07-15 16:10:56'),(565,'TypeError: Failed to fetch','2018-07-15 16:28:25'),(566,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-15 16:38:01'),(567,'SyntaxError: Unexpected token E in JSON at position 0','2018-07-15 16:40:01'),(568,'TypeError: Cannot read property \"length\" of null','2018-07-15 20:31:01'),(569,'TypeError: this.props.getStore is not a function','2018-07-15 20:57:32'),(570,'TypeError: Cannot set property \"selected\" of undefined','2018-07-15 20:59:26'),(571,'TypeError: Cannot set property \"selected\" of undefined','2018-07-15 21:13:30'),(572,'BookRooms SyntaxError: Unexpected token E in JSON at position 0','2018-07-15 21:53:24'),(573,'TypeError: Cannot read property \"bind\" of undefined','2018-07-15 22:21:28'),(574,'TypeError: Cannot read property \"style\" of undefined','2018-07-15 22:21:28'),(575,'TypeError: Cannot set property \"visibility\" of undefined','2018-07-15 22:24:56'),(576,'TypeError: Cannot set property \"disabled\" of null','2018-07-15 23:55:04'),(577,'TypeError: Cannot set property \"disabled\" of null','2018-07-15 23:56:45'),(578,'BookRooms SyntaxError: Unexpected token E in JSON at position 0','2018-07-15 23:58:53'),(579,'BookRooms SyntaxError: Unexpected token E in JSON at position 0','2018-07-16 00:01:09'),(580,'BookRooms SyntaxError: Unexpected token E in JSON at position 0','2018-07-16 00:03:10'),(581,'BookRooms SyntaxError: Unexpected token E in JSON at position 0','2018-07-16 00:05:16'),(582,'TypeError: Cannot read property \"length\" of null','2018-07-16 00:53:32'),(583,'TypeError: Cannot set property \"className\" of null','2018-07-16 01:09:26'),(584,'TypeError: Cannot read property \"style\" of undefined','2018-07-16 01:09:27'),(585,'TypeError: Cannot set property \"className\" of null','2018-07-16 01:14:34');
/*!40000 ALTER TABLE `error_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest_emergency_contacts`
--

DROP TABLE IF EXISTS `guest_emergency_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `guest_emergency_contacts` (
  `guest_emergency_contact_id` int(6) NOT NULL AUTO_INCREMENT,
  `guest_id` int(6) NOT NULL,
  `e_first_name` varchar(45) NOT NULL,
  `e_last_name` varchar(45) NOT NULL,
  `e_phone_no` varchar(20) NOT NULL,
  `e_relationship` varchar(45) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`guest_emergency_contact_id`),
  UNIQUE KEY `guest_emergency_contact_id_UNIQUE` (`guest_emergency_contact_id`),
  KEY `fk_guests_guest_emergency_contacts` (`guest_id`),
  CONSTRAINT `fk_guests_guest_emergency_contacts` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`guest_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_emergency_contacts`
--

LOCK TABLES `guest_emergency_contacts` WRITE;
/*!40000 ALTER TABLE `guest_emergency_contacts` DISABLE KEYS */;
INSERT INTO `guest_emergency_contacts` VALUES (1,1,'Madhava Rao','T R','23762274','Father','2018-05-20 13:33:21'),(2,3,'Rakuma','Sholapur','999333','Mother','2018-05-25 12:06:38'),(3,27,'Arun','Bhandarkar','222','Husband','2018-06-15 16:45:54'),(4,27,'Arun','Bhandarkar','222','Husband','2018-06-15 16:54:19'),(5,28,'Arun','Bhandarkar','222','Husband','2018-06-15 16:54:27'),(6,29,'Arun','Bhandarkar','222','Husband','2018-06-15 16:54:32'),(7,28,'Arun','Bhandarkar','222','Husband','2018-06-15 16:56:27'),(8,29,'Arun','Bhandarkar','222','Husband','2018-06-15 16:56:32'),(9,30,'Sandhya T M','Rajesh','sss','ss','2018-06-15 17:11:19'),(10,30,'Sandhya T M','Rajesh','sss','ss','2018-06-15 17:13:19'),(11,31,'Sandhya T M','Rajesh','22','ss','2018-06-15 17:17:56'),(12,32,'Sandhya T M','Rajesh','aaa','aaa','2018-06-15 17:19:40'),(13,35,'Sandhya T M','Rajesh','sfsf','asdf','2018-06-15 17:29:10'),(14,37,'Sandhya T M','Rajesh','dd','dd','2018-06-15 17:41:59'),(15,37,'Sandhya T M','Rajesh','dd','dd','2018-06-15 17:44:00'),(16,39,'Sandhya T M','Rajesh','ss','333','2018-06-15 18:54:52'),(17,41,'Rajamani','V','22','Father','2018-06-16 15:43:53'),(18,42,'M','Meir','333','Sister','2018-06-16 15:45:59'),(19,42,'','','','','2018-06-16 15:47:21'),(20,42,'','','','','2018-06-16 15:49:21'),(21,42,'','','','','2018-06-16 16:00:16'),(22,42,'','','','','2018-06-16 16:01:19'),(23,42,'','','','','2018-06-16 16:03:19'),(24,42,'','','','','2018-06-16 16:23:13'),(25,42,'123','Meir','333','Sister','2018-06-16 16:29:02'),(26,42,'','','','','2018-06-16 16:33:28'),(27,43,'Son','Nery','333','Son','2018-06-16 16:35:38'),(28,43,'Son','Nery','333','Son','2018-06-16 16:37:38'),(29,43,'Son','Nery','333','Son','2018-06-16 16:38:55'),(30,43,'Son','Nery','333','Son','2018-06-16 16:40:56'),(31,44,'Son','Kapur','123','Son','2018-06-16 17:16:53'),(32,44,'Son','Kapur','123','Son','2018-06-16 17:18:53'),(33,44,'Son from London','Kapoor','12345678','Son','2018-06-16 17:20:53'),(34,58,'777','777','777','777','2018-06-18 15:45:47'),(35,59,'000','000','000','000','2018-06-18 16:22:21'),(36,60,'2','2','2','2','2018-06-18 16:46:38'),(37,61,'6','6','6','6','2018-06-18 16:55:29'),(38,62,'4','4','4','4','2018-06-18 17:00:28'),(39,63,'Test again','Test Last Name','23232','Sister','2018-06-23 12:01:31'),(40,64,'adasdf','asdfasdf','323232','23232','2018-06-23 12:04:34'),(41,65,'adsasdf','adfasdf','343434','dsfafaf','2018-06-23 12:07:17'),(42,66,'2','2','2','2','2018-06-23 12:34:18'),(43,69,'24','June','12345','Someone','2018-06-24 09:47:19'),(44,70,'Bharathi','tM','343','sister','2018-06-24 10:05:27'),(45,71,'Srinivas','Patri','111','Uncle','2018-07-01 06:47:10'),(46,72,'fn again','ln again','333','someone','2018-07-01 13:19:47'),(47,73,'1','2','333','ww','2018-07-01 13:23:12'),(48,74,'111','111','111','111','2018-07-01 13:25:30'),(49,75,'1','1','1','1','2018-07-04 15:51:27');
/*!40000 ALTER TABLE `guest_emergency_contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guests`
--

DROP TABLE IF EXISTS `guests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `guests` (
  `guest_id` int(6) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email_id` varchar(45) DEFAULT NULL,
  `phone_no` varchar(20) NOT NULL,
  `address` varchar(200) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `city` varchar(45) NOT NULL,
  `zip_code` varchar(10) NOT NULL,
  `state` varchar(45) NOT NULL,
  `country_id` smallint(6) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`guest_id`),
  UNIQUE KEY `idguests_UNIQUE` (`guest_id`),
  KEY `fk_countries_guests` (`country_id`),
  CONSTRAINT `fk_countries_guests` FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guests`
--

LOCK TABLES `guests` WRITE;
/*!40000 ALTER TABLE `guests` DISABLE KEYS */;
INSERT INTO `guests` VALUES (1,'Bharathi','T M','bharathitm@gmail.com','9884350777','Besant Nagar','Chennai','90','Tamil Nadu',77,'2018-05-19 18:30:00'),(2,'Sandhya','T M','tm.sandhya@gmail.com','000','Shastri Nagar','Chennai','600090','T N',77,'2018-05-20 09:39:46'),(3,'Radhika','Sholapur','radhika@gmail.com','9884350777','Patri House','Kakinada','90','Andhra Pradesh',77,'2018-05-25 05:18:03'),(4,'FirstName','Last Name','someone@gmail.com','888','Besant Nagar','Chennai','00','T N',77,'2018-05-26 16:05:06'),(5,'James','Bond',NULL,'007','Somewhere','New York','007','NY',188,'2018-05-27 13:59:45'),(8,'Madhava','Rao','madhava36@yahoo.com','23762274','Durai Arasan St','Chennai','600093','Tamil Nadu',77,'2018-06-15 14:38:20'),(9,'Vijayalakshmi','T M','vijju@gmail.com','999','Durai Arasan St','Chennai','999','TN',77,'2018-06-15 14:44:03'),(10,'Alankhya','Rajesh','tipu@gmail.com','000','Dev Apts','Chennai','600041','TN',77,'2018-06-15 14:46:17'),(11,'Krishna','Kumar','kichu@gmail.com','111','Parakala House','Kakinada','3','AP',77,'2018-06-15 14:50:12'),(12,'Vasanthi','Kona','vasanthi@gmail.com','222','Somewhere','Pennysvania','01','Philadelphia',188,'2018-06-15 14:58:52'),(13,'Rajesh','Bhaskar','rajesh@gmail.com','44','Dev Apts','Chennai','99','TN',77,'2018-06-15 15:02:44'),(14,'Anand','Krishnamoorthy','anand@gmail.com','777','Thiruverkadu','Chennai','777','TN',77,'2018-06-15 15:04:27'),(15,'Vaidehi','Srinivasan','vaidehi@gmail.com','888','K K Nagar','Chennai','99','TN',77,'2018-06-15 15:10:06'),(16,'Mathangi','Jeypal','mathangi@gmail.com','666','Guindy','Chennai','77','TN',77,'2018-06-15 15:18:48'),(17,'Nandini','Ashokumar','nandini@gmail.com','444','Ramapuram','Chennai','777','TN',77,'2018-06-15 15:21:45'),(18,'Parthasarathy','Gopalan','partha@gmail.com','666','Siruseri','Chennai','66','TN',77,'2018-06-15 15:26:59'),(19,'Preethi','Srinivasan','preethi@gmail.com','333','Horamavu','Bangalore','77','Karnataka',77,'2018-06-15 15:33:45'),(20,'Ganga','Devi','ganga@gmail.com','333','Perumbur','Chennai','333','TN',77,'2018-06-15 15:36:22'),(21,'Deepthi','Muvva','deepthi@gmail.com','333','3343','Hyderabad','77','Telangana',77,'2018-06-15 16:00:23'),(22,'Mahesh','Varadharajan','mahesh@gmail.com','33','ddd','Chennai','777','TN',77,'2018-06-15 16:06:55'),(23,'Venkatesh','Rajamani','venkat@gmail.com','333','343','Chennai','777','TN',77,'2018-06-15 16:14:33'),(24,'Arun','Jayaraman','arun@gmail.com','333','333','Chennai','333','TN',77,'2018-06-15 16:21:38'),(25,'Bhaskar','Rao','bhaskar@gmail.com','333','333','Hyderabad','777','Telangana',77,'2018-06-15 16:23:50'),(26,'Mohammed','Shaik','shaik@gmail.com','333','223','Singapore','333','Singapore',157,'2018-06-15 16:39:09'),(27,'Chandrani','Chakraborthy','chandrani@gmail.com','3333','333','Chennai','333','TN',77,'2018-06-15 16:45:41'),(28,'Chandrani','Chakraborthy','chandrani@gmail.com','3333','333','Chennai','333','TN',77,'2018-06-15 16:54:24'),(29,'Chandrani','Chakraborthy','chandrani@gmail.com','3333','333','Chennai','333','TN',77,'2018-06-15 16:54:31'),(30,'Bharathi','M','bharathitm@gmail.com','+919884350777','116/2, Durai Arasan St','Chennai','600093','Tamil Nadu',77,'2018-06-15 17:11:14'),(31,'Bharathi','M','bharathitm@gmail.com','+919884350777','2A, Green Inns Apartments','Chennai','600090','Tamil Nadu',77,'2018-06-15 17:17:49'),(32,'Bharathi','M','bharathitm@gmail.com','+919884350777','116/2, Durai Arasan St','Chennai','600093','Tamil Nadu',77,'2018-06-15 17:19:36'),(33,'Bharathi','M','bharathitm@gmail.com','+919884350777','116/2, Durai Arasan St','Chennai','600093','Tamil Nadu',77,'2018-06-15 17:21:46'),(34,'Bharathi','M','bharathitm@gmail.com','+919884350777','116/2, Durai Arasan St','Chennai','600093','Tamil Nadu',77,'2018-06-15 17:22:04'),(35,'Bharathi','M','bharathitm@gmail.com','+919884350777','116/2, Durai Arasan St','Chennai','600093','Tamil Nadu',77,'2018-06-15 17:29:01'),(36,'Bharathi','M','bharathitm@gmail.com','+919884350777','116/2, Durai Arasan St','Chennai','600093','Tamil Nadu',77,'2018-06-15 17:32:17'),(37,'Bharathi','M','bharathitm@gmail.com','+919884350777','116/2, Durai Arasan St','Chennai','600093','Tamil Nadu',77,'2018-06-15 17:41:51'),(38,'Bharathi','M','bharathitm@gmail.com','+919884350777','116/2, Durai Arasan St','Chennai','600093','Tamil Nadu',77,'2018-06-15 17:54:43'),(39,'Bharathi','M','bharathitm@gmail.com','+919884350777','116/2, Durai Arasan St','Chennai','600093','Tamil Nadu',77,'2018-06-15 18:54:48'),(40,'Mohammed','Shaik','shaik@gmail.com','333','223','Singapore','333','Singapore',157,'2018-06-16 07:59:07'),(41,'Venkatesh','Rajamani','venkat@gmail.com','333','343','Chennai','777','TN',77,'2018-06-16 15:43:40'),(42,'Noga','Meir','noga@gmail.com','333','Parmarth Niketan','Rishikesh','333','Utharakhand',77,'2018-06-16 15:45:49'),(43,'Stela','Nery','stela@gmail.com','333','Somewhere in Brazil','City','333','State',24,'2018-06-16 16:35:28'),(44,'Indu','Kapoor','indu@gmail.com','000','Parmarth Niketan','Rishikesh','123','Utharakhand',77,'2018-06-16 17:16:43'),(45,'Padma','Parakala','p@gmail.com','909','123','Kakinada','000','AP',77,'2018-06-18 11:49:45'),(46,'Nikhila','Parakala','n@gmail.com','111','111','Kakinada','9999','AP',77,'2018-06-18 11:55:51'),(47,'Pramila','Parakala','pramila@gmail.com','1222','123','Kakinada','111','AP',77,'2018-06-18 12:11:04'),(48,'Someone','Somename','someone@gmail.com','111','2323','Chennai','9888','TN',77,'2018-06-18 12:13:19'),(49,'324234','234234','s@gmail.com','23232','34343','Chennai','34343','TN',77,'2018-06-18 12:19:22'),(50,'234234','234234','something@gmail.com','2323','23232','asdfasf','342343','dfasdf',77,'2018-06-18 12:21:19'),(51,'vasdf','asdf','somdsfasdf','32434','asdfasdf','asdf','asdf','adsf',9,'2018-06-18 14:47:02'),(52,'asdf','asdf','2@gmail.com','234','adfasdf','asdf','adsf','asdf',17,'2018-06-18 14:51:58'),(53,'asdgsdgf','asdfsdf','asdf@asdsadf.com','asdf','adsf','asdf','asdf','asdf',17,'2018-06-18 15:21:54'),(54,'Bharathi','M','bharathitm@gmail.com','+919884350777','116/2, Durai Arasan St','Chennai','600093','Tamil Nadu',77,'2018-06-18 15:28:16'),(55,'5677','447474','asdfsf@asdfsadf.com','324343','dsfasdf','Chennai','34243','TN',77,'2018-06-18 15:32:58'),(56,'123','456','123@gmail.com','123','456','123','456','123',76,'2018-06-18 15:37:06'),(57,'999','999','999@gmail.com','32','324324','34','34','34',17,'2018-06-18 15:42:56'),(58,'777','777','777@gmail.com','777','777','777','777','777',76,'2018-06-18 15:45:35'),(59,'000','000','000@gmail.com','000','000','000','000','000',77,'2018-06-18 16:22:15'),(60,'Bharathi','T M','bharathitm@gmail.com','222','2222','2','2','2',76,'2018-06-18 16:46:34'),(61,'666','6','6@gmail.com','6','6','6','6','6',1,'2018-06-18 16:55:23'),(62,'44','4','bhatm@paypal.com','4','4','44','4','4',17,'2018-06-18 17:00:23'),(63,'Test','1','somethingsomeone@gmail.com','2222','dfadsf','Chennai','324343','TN',77,'2018-06-23 12:01:20'),(64,'sadfsadf','sfasdfsd','sadsdf@sdfsdf.com','343433','eeee','sdafasdf','334343','TN',77,'2018-06-23 12:04:27'),(65,'asdfsad','asefsadfsafjlk','sadfsd@gasdasdf.com','34343','sdfasd','sfasdf','34343','sfasd',77,'2018-06-23 12:07:12'),(66,'sdfasdfaszxzc','cvzv','cxvzxcv@gmail.com','3434','2','2','2','2',17,'2018-06-23 12:34:14'),(67,'rtest','test','venkat@gmail.com','34343','34343as','asdfasdf','34343','sadfasdf',77,'2018-06-24 09:37:19'),(68,'test','test','venkat@mgila.com','343434','asdf','sfsadf','3434','tn',77,'2018-06-24 09:44:14'),(69,'June','Sunday','june@gmail.com','12345','Test for new validation control','Chennai','12345','TN',77,'2018-06-24 09:46:59'),(70,'june again','test','test@test.com','22323','dasdf','asdfs','344','dsf',77,'2018-06-24 10:05:14'),(71,'Kichu','Parakala','kichu@yahoo.com','000','LB Nagar','Kakinada','90','AP',77,'2018-07-01 06:46:50'),(72,'fn','ln','email@email.com','111','address','city','999','TN',77,'2018-07-01 13:18:49'),(73,'test1','2','3@gmail.com','222','a','c','88','a',77,'2018-07-01 13:23:06'),(74,'1111','111','111@gmail.com','111','111','111','111','111',1,'2018-07-01 13:25:23'),(75,'1','1','1@gmail.com','1','1','1','1','1',16,'2018-07-04 15:51:23'),(76,'test','test again','12345@gmail.com','34343','3434','Chennai','34343','TN',77,'2018-07-08 05:12:37');
/*!40000 ALTER TABLE `guests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations_lock`
--

DROP TABLE IF EXISTS `migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `migrations_lock` (
  `is_locked` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations_lock`
--

LOCK TABLES `migrations_lock` WRITE;
/*!40000 ALTER TABLE `migrations_lock` DISABLE KEYS */;
INSERT INTO `migrations_lock` VALUES (0);
/*!40000 ALTER TABLE `migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_statuses`
--

DROP TABLE IF EXISTS `reservation_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `reservation_statuses` (
  `reservation_status_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`reservation_status_id`),
  UNIQUE KEY `reservation_status_id_UNIQUE` (`reservation_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_statuses`
--

LOCK TABLES `reservation_statuses` WRITE;
/*!40000 ALTER TABLE `reservation_statuses` DISABLE KEYS */;
INSERT INTO `reservation_statuses` VALUES (1,'New'),(2,'Booked'),(3,'Checked In'),(4,'Checked Out'),(5,'Cancelled'),(6,'No Show');
/*!40000 ALTER TABLE `reservation_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_types`
--

DROP TABLE IF EXISTS `reservation_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `reservation_types` (
  `reservation_type_id` tinyint(4) NOT NULL,
  `type_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`reservation_type_id`),
  UNIQUE KEY `reservation_type_id_UNIQUE` (`reservation_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_types`
--

LOCK TABLES `reservation_types` WRITE;
/*!40000 ALTER TABLE `reservation_types` DISABLE KEYS */;
INSERT INTO `reservation_types` VALUES (1,'General'),(2,'Group Retreat'),(3,'Sanskara'),(4,'Travel Agent'),(5,'Yoga Course'),(6,'Katha');
/*!40000 ALTER TABLE `reservation_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `reservations` (
  `reservation_id` int(6) NOT NULL AUTO_INCREMENT,
  `guest_id` int(6) NOT NULL,
  `date_of_arrival` datetime NOT NULL,
  `date_of_departure` date NOT NULL,
  `no_of_people` varchar(4) NOT NULL,
  `reservation_comments` varchar(500) DEFAULT NULL,
  `reservation_type_id` tinyint(4) NOT NULL,
  `reservation_status_id` tinyint(4) NOT NULL,
  `sanskara_id` tinyint(4) DEFAULT NULL,
  `is_a_reference` tinyint(2) NOT NULL,
  `advance_reminder_on` date DEFAULT NULL,
  `total_amount` decimal(10,0) DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_on` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  UNIQUE KEY `reservation_id_UNIQUE` (`reservation_id`),
  KEY `fk_resevation_statuses_reservations` (`reservation_status_id`),
  KEY `fk_resevation_types_reservations` (`reservation_type_id`),
  KEY `fk_guests_reservations` (`guest_id`),
  KEY `fk_sanskaras_reservations` (`sanskara_id`),
  CONSTRAINT `fk_guests_reservations` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`guest_id`),
  CONSTRAINT `fk_resevation_statuses_reservations` FOREIGN KEY (`reservation_status_id`) REFERENCES `reservation_statuses` (`reservation_status_id`),
  CONSTRAINT `fk_resevation_types_reservations` FOREIGN KEY (`reservation_type_id`) REFERENCES `reservation_types` (`reservation_type_id`),
  CONSTRAINT `fk_sanskaras_reservations` FOREIGN KEY (`sanskara_id`) REFERENCES `sanskaras` (`sanskara_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,1,'2018-05-22 00:00:00','2018-10-27','99','99 ppl are coming',1,6,NULL,0,'2018-06-26',NULL,'2018-05-20 09:41:13','2018-06-26 13:55:59'),(2,2,'2018-05-21 00:00:00','2018-05-31','100',NULL,6,4,NULL,0,'2018-06-26',NULL,'2018-05-20 09:42:21','2018-07-15 06:03:59'),(3,2,'2018-05-25 00:00:00','2018-10-27','99','99 ppl are coming',1,4,1,0,'2018-06-26',NULL,'2018-05-24 14:27:24','2018-07-15 06:03:21'),(4,62,'2018-10-08 00:00:00','2018-10-16','199','199 ppl are coming now',1,4,1,0,'2018-06-26',NULL,'2018-05-24 14:41:40','2018-07-02 13:51:53'),(5,5,'2018-06-01 00:00:00','2018-06-05','10','10 ppl are coming',1,4,1,0,NULL,NULL,'2018-05-27 15:26:00','2018-06-22 18:44:50'),(6,5,'2018-06-11 00:00:00','2018-06-15','8','8 ppl are coming',1,4,1,0,NULL,NULL,'2018-05-27 16:03:29','2018-06-22 18:46:16'),(7,5,'2018-06-11 00:00:00','2018-06-15','8',NULL,1,1,NULL,0,NULL,NULL,'2018-05-27 16:04:59',NULL),(8,5,'2018-06-20 00:00:00','2018-06-25','88','test again',1,1,NULL,0,NULL,NULL,'2018-05-27 16:08:06',NULL),(9,5,'2018-06-11 00:00:00','2018-06-15','8',NULL,1,1,1,0,NULL,NULL,'2018-05-27 16:08:58',NULL),(10,5,'2018-06-11 00:00:00','2018-06-15','8','test',1,1,NULL,0,'2018-06-01',NULL,'2018-05-27 16:09:54',NULL),(13,41,'2018-06-15 00:00:00','2018-06-25','22',NULL,1,1,NULL,0,NULL,NULL,'2018-06-15 18:07:46',NULL),(14,41,'2018-06-15 00:00:00','2018-06-25','22',NULL,1,1,NULL,0,NULL,NULL,'2018-06-15 18:08:34',NULL),(15,41,'2018-06-15 00:00:00','2018-06-25','12',NULL,1,1,NULL,0,NULL,NULL,'2018-06-15 18:12:15',NULL),(16,41,'2018-06-15 00:00:00','2018-06-25','99',NULL,1,1,NULL,0,NULL,NULL,'2018-06-15 18:31:57',NULL),(17,41,'2018-06-15 21:00:00','2018-06-25','100','added advance reminder',3,1,2,0,'2018-06-30',NULL,'2018-06-15 18:38:48','2018-06-24 08:19:57'),(18,41,'2018-06-15 00:00:00','2018-06-25','108','This comment is to say good night to you!',1,5,NULL,0,'2018-06-29',NULL,'2018-06-15 18:56:34',NULL),(19,41,'2018-06-15 00:00:00','2018-06-25','108',NULL,1,5,NULL,0,'2018-06-29',NULL,'2018-06-15 18:57:09',NULL),(20,41,'2018-06-15 00:00:00','2018-06-25','108',NULL,1,5,NULL,0,NULL,NULL,'2018-06-15 18:57:30',NULL),(21,42,'2018-06-15 00:00:00','2018-06-25','88','Test again for Noga\'s reservation',1,1,NULL,0,'2018-06-30',NULL,'2018-06-16 16:00:42',NULL),(22,44,'2018-06-16 00:00:00','2018-06-30','1000','12345678',1,1,NULL,0,'2018-06-29',NULL,'2018-06-16 17:17:15',NULL),(23,54,'2018-06-16 18:00:00','2018-06-30','11',NULL,3,6,NULL,0,'2018-06-20',NULL,'2018-06-18 15:28:43','2018-06-21 16:04:24'),(24,55,'2018-06-16 16:00:00','2018-06-30','12',NULL,3,6,4,0,'2018-06-20',NULL,'2018-06-18 15:33:33','2018-06-21 16:04:24'),(25,56,'2018-06-16 19:00:00','2018-06-30','11','123',3,1,2,0,'2018-06-26',NULL,'2018-06-18 15:37:38','2018-06-18 15:41:29'),(26,58,'2018-06-16 20:00:00','2018-06-30','1',NULL,1,1,5,0,NULL,NULL,'2018-06-18 15:46:22','2018-06-18 16:59:58'),(27,59,'2018-06-16 18:00:00','2018-06-30','11','000',3,1,4,0,'2018-06-30',NULL,'2018-06-18 16:22:48',NULL),(28,60,'2018-06-16 17:00:00','2018-06-30','2',NULL,1,6,NULL,0,'2018-06-20',NULL,'2018-06-18 16:47:07','2018-06-22 04:09:24'),(29,62,'2018-06-16 17:00:00','2018-06-30','1',NULL,3,6,2,0,'2018-06-26',NULL,'2018-06-18 17:01:09','2018-06-26 13:55:59'),(30,65,'2018-06-16 22:00:00','2018-06-30','11',NULL,1,6,NULL,0,'2018-06-30',NULL,'2018-06-23 12:07:30','2018-06-23 12:09:24'),(31,69,'2018-06-16 19:00:00','2018-06-30','123','Test! hope this work\n\n\n',1,6,NULL,0,'2018-06-29',NULL,'2018-06-24 09:47:39','2018-06-27 06:23:41'),(32,74,'2018-07-01 16:00:00','2018-07-01','11',NULL,1,6,NULL,0,'2018-08-03',NULL,'2018-07-01 13:25:54','2018-07-02 05:08:36'),(33,74,'2018-07-01 16:00:00','2018-07-01','11',NULL,1,6,NULL,0,'2018-08-03',NULL,'2018-07-01 13:26:25','2018-07-02 05:08:36'),(34,74,'2018-07-01 16:00:00','2018-07-01','11',NULL,1,6,NULL,0,'2018-08-03',NULL,'2018-07-01 13:26:48','2018-07-02 05:08:36'),(35,74,'2018-07-01 16:00:00','2018-07-01','11',NULL,1,6,NULL,0,'2018-08-03',NULL,'2018-07-01 13:28:30','2018-07-02 05:08:36'),(36,74,'2018-07-01 16:00:00','2018-07-01','11',NULL,1,6,NULL,0,'2018-08-03',NULL,'2018-07-01 13:28:44','2018-07-02 05:08:36'),(37,74,'2018-07-01 16:00:00','2018-07-01','11',NULL,1,6,NULL,0,'2018-08-03',NULL,'2018-07-02 06:18:23','2018-07-02 06:19:24'),(38,74,'2018-07-01 16:00:00','2018-07-01','11',NULL,1,6,NULL,0,'2018-08-03',NULL,'2018-07-02 06:18:58','2018-07-02 06:19:24'),(39,74,'2018-07-10 16:00:00','2018-07-12','11',NULL,1,6,NULL,0,'2018-07-03',NULL,'2018-07-02 06:21:26','2018-07-11 04:27:01'),(40,75,'2018-07-04 17:00:00','2018-07-08','11','1',1,6,NULL,0,'2018-08-04',NULL,'2018-07-04 15:52:21','2018-07-05 05:14:24'),(41,75,'2018-07-04 17:00:00','2018-07-08','11','1',1,6,NULL,0,'2018-08-04',NULL,'2018-07-04 15:57:24','2018-07-05 05:14:24'),(42,75,'2018-07-04 17:00:00','2018-07-08','11','1',1,6,NULL,0,'2018-08-04',NULL,'2018-07-07 04:44:56','2018-07-07 04:49:24'),(43,75,'2018-07-04 17:00:00','2018-07-08','11','1',1,6,NULL,0,'2018-08-04',NULL,'2018-07-07 04:50:15','2018-07-07 04:54:24'),(44,75,'2018-07-04 17:00:00','2018-07-08','11','1',1,6,NULL,0,'2018-08-04',NULL,'2018-07-07 04:56:29','2018-07-07 04:59:24'),(45,75,'2018-07-04 17:00:00','2018-07-08','11','1',1,6,NULL,0,'2018-08-04',NULL,'2018-07-07 05:01:45','2018-07-07 05:04:24'),(46,75,'2018-07-04 17:00:00','2018-07-08','11','1',1,6,NULL,0,'2018-08-04',NULL,'2018-07-07 05:06:41','2018-07-07 05:09:25'),(47,75,'2018-07-04 17:00:00','2018-07-08','11','1',1,6,NULL,0,'2018-08-04',NULL,'2018-07-07 05:07:07','2018-07-07 05:09:25'),(48,75,'2018-07-04 17:00:00','2018-07-08','11','1',1,6,NULL,0,'2018-08-04',NULL,'2018-07-07 05:07:32','2018-07-07 05:09:25'),(49,75,'2018-07-04 17:00:00','2018-07-08','11','1',1,6,NULL,0,'2018-08-04',NULL,'2018-07-07 05:10:02','2018-07-07 05:14:24'),(50,75,'2018-07-04 17:00:00','2018-07-08','11','1',1,6,NULL,0,'2018-08-04',NULL,'2018-07-07 05:10:57','2018-07-07 05:14:24'),(51,69,'2018-07-20 00:00:00','2018-07-30','11',NULL,1,2,NULL,0,NULL,NULL,'2018-07-07 20:01:42','2018-07-14 17:57:14');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_bookings`
--

DROP TABLE IF EXISTS `room_bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `room_bookings` (
  `room_booking_id` int(6) NOT NULL AUTO_INCREMENT,
  `room_id` smallint(6) NOT NULL,
  `room_no` varchar(10) DEFAULT NULL,
  `reservation_id` int(11) DEFAULT NULL,
  `guest_id` int(11) DEFAULT NULL,
  `date_of_arrival` datetime NOT NULL,
  `date_of_departure` date NOT NULL,
  `room_rent` decimal(10,0) DEFAULT NULL,
  `room_status_id` tinyint(4) NOT NULL DEFAULT '1',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_on` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`room_booking_id`),
  UNIQUE KEY `room_booking_id_UNIQUE` (`room_booking_id`),
  KEY `fk_room_status_id` (`room_status_id`),
  KEY `fk_rooms_room_bookings_id` (`room_id`),
  KEY `fk_guests_room_bookings` (`guest_id`),
  KEY `fk_reservations_room_bookings` (`reservation_id`),
  CONSTRAINT `fk_guests_room_bookings` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`guest_id`),
  CONSTRAINT `fk_reservations_room_bookings` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`reservation_id`),
  CONSTRAINT `fk_room_id` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`),
  CONSTRAINT `fk_room_status_id` FOREIGN KEY (`room_status_id`) REFERENCES `room_statuses` (`room_status_id`),
  CONSTRAINT `fk_rooms_room_bookings_id` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_bookings`
--

LOCK TABLES `room_bookings` WRITE;
/*!40000 ALTER TABLE `room_bookings` DISABLE KEYS */;
INSERT INTO `room_bookings` VALUES (4,51,'387',2,3,'2018-05-21 00:00:00','2018-06-22',0,2,'2018-04-29 13:03:50','2018-07-15 06:03:59'),(5,58,'394',2,3,'2018-05-21 00:00:00','2018-06-22',400,2,'2018-04-29 13:03:50','2018-07-15 06:03:59'),(10,4,'616',3,1,'2018-06-10 00:00:00','2018-06-10',600,2,'2018-06-10 16:59:29','2018-07-15 06:03:21'),(11,5,'617',2,1,'2018-06-10 00:00:00','2018-06-10',600,2,'2018-06-10 16:59:29','2018-07-15 06:03:59'),(20,2,'614',51,69,'2018-07-20 00:00:00','2018-07-30',600,2,'2018-07-07 05:10:02','2018-07-15 06:04:03'),(23,1,'613',51,69,'2018-07-20 00:00:00','2018-07-30',600,2,'2018-07-07 20:01:42','2018-07-15 05:53:59');
/*!40000 ALTER TABLE `room_bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_statuses`
--

DROP TABLE IF EXISTS `room_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `room_statuses` (
  `room_status_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(45) NOT NULL,
  PRIMARY KEY (`room_status_id`),
  UNIQUE KEY `room_status_id_UNIQUE` (`room_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_statuses`
--

LOCK TABLES `room_statuses` WRITE;
/*!40000 ALTER TABLE `room_statuses` DISABLE KEYS */;
INSERT INTO `room_statuses` VALUES (1,'Booked'),(2,'Checked In'),(3,'Checked Out'),(4,'Housekeeping Completed'),(5,'Cancelled'),(6,'No Show');
/*!40000 ALTER TABLE `room_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rooms` (
  `room_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `room_no` varchar(10) NOT NULL,
  `floor_no` tinyint(4) DEFAULT NULL,
  `block_id` tinyint(4) NOT NULL,
  `total_beds` tinyint(4) NOT NULL,
  `room_rent` decimal(10,0) DEFAULT NULL,
  `has_AC` tinyint(1) NOT NULL,
  `has_cooler` tinyint(1) NOT NULL,
  `has_solar_geyser` tinyint(1) NOT NULL,
  `has_indian_toilet` tinyint(1) NOT NULL,
  `has_western_toilet` tinyint(1) NOT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`room_id`),
  UNIQUE KEY `room_id_UNIQUE` (`room_id`),
  KEY `fk_block_id_idx` (`block_id`),
  CONSTRAINT `fk_block_id` FOREIGN KEY (`block_id`) REFERENCES `blocks` (`block_id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'613',0,6,3,600,0,1,1,0,1,1),(2,'614',0,6,3,600,0,1,1,0,1,1),(3,'615',0,6,3,600,0,1,1,0,1,1),(4,'616',0,6,3,600,0,1,1,0,1,1),(5,'617',0,6,3,600,0,1,1,0,1,1),(6,'618',0,6,3,600,0,1,1,0,1,1),(7,'619',0,6,3,600,0,1,1,0,1,1),(8,'620',0,6,3,600,0,1,1,0,1,1),(9,'621',0,6,3,600,0,1,1,0,1,1),(10,'622',0,6,3,600,0,1,1,0,1,1),(11,'624',1,6,2,700,1,0,1,0,1,1),(12,'625',1,6,2,700,1,0,1,0,1,1),(13,'626',1,6,2,700,1,0,1,0,1,1),(14,'627',1,6,2,700,1,0,1,0,1,1),(15,'628',1,6,2,700,1,0,1,0,1,1),(16,'629',1,6,2,700,1,0,1,0,1,1),(17,'630',1,6,2,700,1,0,1,0,1,1),(18,'631',1,6,2,700,1,0,1,0,1,1),(19,'632',1,6,2,700,1,0,1,0,1,1),(20,'356',0,9,3,300,0,1,1,0,1,1),(21,'357',0,9,3,300,0,1,1,0,1,1),(22,'358',0,9,3,300,0,1,1,0,1,1),(23,'359',0,9,3,300,0,1,1,0,1,1),(24,'360',0,9,3,300,0,1,1,0,1,1),(25,'361',0,9,1,300,0,1,1,0,1,2),(26,'362',0,9,3,300,0,1,1,0,1,1),(27,'363',0,9,3,300,0,1,1,0,1,1),(28,'364',0,9,3,300,0,1,1,0,1,2),(29,'365',0,9,3,300,0,1,1,0,1,1),(30,'366',0,9,3,300,0,1,1,0,1,1),(31,'367',0,9,2,300,0,1,0,0,1,1),(32,'368',0,9,3,300,0,1,1,1,1,1),(33,'369',0,9,3,300,0,1,1,1,1,1),(34,'370',0,9,4,300,0,1,1,1,1,1),(35,'370 A',1,9,1,0,0,0,1,0,1,2),(36,'371',1,9,2,400,0,1,1,0,1,1),(37,'372',1,9,2,400,0,1,1,0,1,1),(38,'373',1,9,2,400,0,1,1,0,1,1),(39,'374',1,9,2,400,0,1,1,0,1,1),(40,'375',1,9,2,400,0,1,1,0,1,1),(41,'376',1,9,2,400,0,1,1,0,1,1),(42,'377',1,9,2,400,0,1,1,0,1,1),(43,'378',1,9,2,400,0,1,1,0,1,1),(44,'379',1,9,2,400,0,1,1,0,1,1),(45,'380',1,9,2,400,0,1,1,0,1,1),(46,'381',1,9,2,400,0,1,1,0,1,1),(47,'382',1,9,2,400,0,1,1,0,1,1),(48,'383',1,9,2,400,0,1,1,0,1,1),(49,'384',1,9,2,400,0,1,1,0,1,1),(50,'385-386',2,9,4,400,0,1,1,0,1,1),(51,'387',2,9,2,0,0,1,1,0,1,2),(52,'388',2,9,2,400,0,1,1,0,1,1),(53,'389',2,9,2,400,0,1,1,0,1,1),(54,'390',2,9,2,400,0,1,1,0,1,1),(55,'391',2,9,2,400,0,1,1,0,1,1),(56,'392',2,9,2,400,0,1,1,0,1,1),(57,'393',2,9,4,300,0,1,1,0,1,1),(58,'394',2,9,2,400,0,1,1,0,1,2),(59,'395',2,9,2,400,0,1,1,0,1,1),(60,'396',2,9,2,400,0,1,1,0,1,1),(61,'397',2,9,2,400,0,1,1,0,1,1),(62,'398',2,9,2,400,0,1,1,0,1,1);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanskaras`
--

DROP TABLE IF EXISTS `sanskaras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sanskaras` (
  `sanskara_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `sanskara_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`sanskara_id`),
  UNIQUE KEY `sanskara_id_UNIQUE` (`sanskara_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanskaras`
--

LOCK TABLES `sanskaras` WRITE;
/*!40000 ALTER TABLE `sanskaras` DISABLE KEYS */;
INSERT INTO `sanskaras` VALUES (1,'Mundan'),(2,'Yagno Pavit'),(3,'Marriage'),(4,'Ash Immersion'),(5,'Special Pooja');
/*!40000 ALTER TABLE `sanskaras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `user_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'bharathitm@gmail.com','Bharathi','T M');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'pn'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `cleanup_no_show` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`sa`@`%`*/ /*!50106 EVENT `cleanup_no_show` ON SCHEDULE EVERY 5 MINUTE STARTS '2018-06-17 18:14:24' ON COMPLETION PRESERVE ENABLE DO BEGIN
	CALL sp_CleanupNoShow();
END */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'pn'
--
/*!50003 DROP FUNCTION IF EXISTS `strSplit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` FUNCTION `strSplit`(
	x VARCHAR(1000), 
    delim VARCHAR(12), 
    pos INTEGER
) RETURNS varchar(1000) CHARSET utf8mb4
    READS SQL DATA
    DETERMINISTIC
BEGIN

	DECLARE output VARCHAR(1000);
	SET output = REPLACE(SUBSTRING(SUBSTRING_INDEX(x, delim, pos)
                 , LENGTH(SUBSTRING_INDEX(x, delim, pos - 1)) + 1)
                 , delim
                 , '');
	IF output = '' THEN 
		SET output = null; 
	END IF;

	RETURN output;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_CancelReservation` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_CancelReservation`(
	IN 	reservation_id INT(6)
)
BEGIN

	UPDATE 
		reservations
	SET 
		reservation_status_id = 5 /* Cancelled */
	WHERE
		reservations.reservation_id = reservation_id;
        
	CALL sp_CancelRoomBookings (reservation_id, null);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_CancelRoomBookings` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_CancelRoomBookings`(
	IN reservation_id INT(6),
    IN str_room_booking_ids VARCHAR(400)
)
BEGIN

		/* Cancel entire reservation */
		IF reservation_id IS NOT NULL THEN                 
			UPDATE
				room_bookings
			SET 
				room_status_id = 5 /* Cancelled */
			WHERE
				room_bookings.reservation_id = reservation_id;
		END IF;
        
		/* If some rooms are only cancelled, loop through the room_booking_ids string and cancel each room */
		IF str_room_booking_ids IS NOT NULL THEN

		SET @counter = 1;
     
		/* Returns count of values in the given string */
		SET @leng = LENGTH(str_room_booking_ids) - LENGTH(REPLACE(str_room_booking_ids, ',', '')) + 1; 
        
		WHILE @leng > 0 DO
			SET @room_booking_id = strSplit(str_room_booking_ids, ',', @counter);
        
			IF @room_booking_id IS NOT NULL THEN
						
			UPDATE 
				room_bookings
			SET 
				room_status_id = 5 /* Cancelled */
			WHERE
				room_booking_id =  @room_booking_id;

			END IF;
						  
			SET @counter = @counter + 1;
			SET @leng = @leng - 1;

		END WHILE;
		  
		END IF;
		
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_CheckIfUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_CheckIfUser`(IN email_id VARCHAR(45))
BEGIN
SELECT EXISTS 
	(
		SELECT 
			1 
		FROM 
			Users 
		WHERE 
			user_name = email_id
	) AS is_user;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_CleanupNoShow` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_CleanupNoShow`()
BEGIN
	UPDATE 
		room_bookings
	SET
		room_status_id = 6, /* No Show */
        last_updated_on = CURRENT_TIMESTAMP()
	WHERE
		date_Of_arrival < CURDATE() 
	AND
		room_status_id = 1; /* Booked */
        
	UPDATE 
		reservations
	SET
		reservation_status_id = 6, /* No Show */
        last_updated_on = CURRENT_TIMESTAMP()
	WHERE
		date_Of_arrival < CURDATE()
	AND
		reservation_status_id = 2; /* Booked */
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_DeleteAdvanceDonation` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_DeleteAdvanceDonation`(
		IN 	donation_id INT(6)
)
BEGIN
	DELETE FROM
		donations
	WHERE
		donations.donation_id = donation_id;
		
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetAdvanceDonationDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_GetAdvanceDonationDetails`(
	IN reservation_id INT(6)
)
BEGIN

	SELECT
		donation_id,
		received_on,
		amount,
		receipt_no
	FROM
		donations
	WHERE
		donations.reservation_id = reservation_id
	AND
		is_advance = 1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetAdvanceDonationReminders` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_GetAdvanceDonationReminders`()
BEGIN

	SELECT 
		guests.guest_id,
        guests.first_name + guests.last_name AS guest_name,
        guests.email_id
	FROM
		guests
	JOIN
		reservations
	ON 
		reservations.guest_id = guests.guest_id
	WHERE
		reservations.advance_reminder_on <= CURDATE()
	AND
		reservations.reservation_status_id = 2 /* Booked */ ;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetAvailableRooms` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_GetAvailableRooms`(
	IN arrival_date DATE,
    IN departure_date DATE,
    IN no_of_rooms SMALLINT(6),
    IN total_beds TINYINT(2)
)
BEGIN
	SELECT 
		room_id,
        room_no,
        floor_no,
        block_id,
        rooms.total_beds,
        room_rent,
        has_AC,
        has_cooler,
        has_solar_geyser,
        has_indian_toilet,
        has_western_toilet
    FROM
		rooms
	WHERE
    CASE 
		WHEN total_beds IS NOT NULL THEN rooms.total_beds = total_beds	
        ELSE rooms.total_beds
	END
	AND
		room_id NOT IN 
        (
			SELECT 
				room_id
			FROM 
				room_bookings
			WHERE
				date_of_arrival < departure_date && arrival_date < date_of_departure
			AND
				room_status_id NOT IN (4, 5, 6) /* Housekeeping completed, Cancelled and No Show rooms should be available for bookings */
		)
	ORDER BY
		block_id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetBookingsCheckOutTotal` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_GetBookingsCheckOutTotal`(
    IN reservation_id INT,
    IN str_room_booking_ids VARCHAR(500)
)
BEGIN

DROP TEMPORARY TABLE IF EXISTS `checked_out_details`;

CREATE TEMPORARY TABLE checked_out_details 
(
	reservation_id INT,
	room_no INT,
	no_of_days INT,
	room_rent DECIMAL(10,0),
	total DECIMAL(10,0)
);
    
IF reservation_id IS NOT NULL THEN
			
				INSERT INTO 
					checked_out_details 
				(
                    reservation_id,
					room_no,
					no_of_days, 
                    room_rent
				) 
				
                SELECT 
					reservation_id,
					room_no,
					DATEDIFF(date_of_departure, date_of_arrival), 
                    room_rent 
				FROM 
					room_bookings 
				WHERE 
					room_bookings.reservation_id = reservation_id;
                    
ELSEIF str_room_booking_ids IS NOT NULL THEN /* Update rooms only */

		SET @counter = 1;
     
		/* Returns count of values in the given string */
		SET @leng = (LENGTH(str_room_booking_ids) - LENGTH(REPLACE(str_room_booking_ids, '|', ''))) + 1; 
	        
		WHILE @leng > 0 DO
			SET @room_booking_id = strSplit(str_room_booking_ids, '|', @counter);
        
			IF @room_booking_id IS NOT NULL THEN
						
				INSERT INTO 
					checked_out_details 
				(
					reservation_id,
					room_no,
					no_of_days, 
                    room_rent
				) 
				
                SELECT 
					room_bookings.reservation_id,
					room_no,
					DATEDIFF(date_of_departure, date_of_arrival), 
                    room_rent 
				FROM 
					room_bookings 
				WHERE 
					room_booking_id =  @room_booking_id; 
                    
			END IF;
						  
			SET @counter = @counter + 1;
			SET @leng = @leng - 1;

		END WHILE; 
		  
END IF;

            SELECT 
				checked_out_details.reservation_id,
				room_no,
				no_of_days, 
				room_rent,
                (no_of_days * room_rent) AS total,
                SUM(amount) AS donationAmount
			FROM
				checked_out_details
			LEFT JOIN
				donations
			ON
				donations.reservation_id = checked_out_details.reservation_id
			GROUP BY
				room_no;
            
            
		DROP TABLE checked_out_details;
            
      
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetCheckInDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_GetCheckInDetails`(
	IN from_date DATE,
    IN to_date DATE
)
BEGIN

	SELECT
		DATE_FORMAT(date_of_arrival, '%Y-%m-%d') AS on_date,
        first_name,
        last_name,
        no_of_people
	FROM
		reservations
	JOIN
		guests
	ON
		guests.guest_id = reservations.guest_id
	WHERE
		date_of_arrival BETWEEN from_date AND to_date
	ORDER BY
		date_of_arrival;
		
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetGuestDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_GetGuestDetails`(
	IN guest_id INT(6)
)
BEGIN

	SELECT 
		first_name,
		last_name,
		email_id,
		phone_no,
		address,
		city,
		zip_code,
		state,
		country_id,
		guest_emergency_contact_id,
		e_first_name,
		e_last_name,
		e_phone_no,
		e_relationship,
        reservation_id
	FROM
		guests
	JOIN
		guest_emergency_contacts
	ON
		guests.guest_id = guest_emergency_contacts.guest_id
	LEFT JOIN
		reservations
	ON
		reservations.guest_id = guests.guest_id
	AND
		reservations.reservation_status_id 	NOT IN (4, 5, 6) /* Don't bring checked out, cancelled and no show reservations */
	WHERE 
		guests.guest_id = guest_id
	ORDER BY 1 DESC LIMIT 1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetGuestDetailsByEmailID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_GetGuestDetailsByEmailID`(IN email_id VARCHAR(45))
BEGIN

	SELECT  
		guests.guest_id, 
		first_name, 
		last_name, 
		email_id, 
		phone_no, 
		address, 
		city, 
		zip_code, 
		state, 
		country_id,
		guest_emergency_contact_id,
		e_first_name,
		e_last_name,
		e_phone_no,
		e_relationship,
        reservation_id,
        DATE_FORMAT(date_of_arrival, '%Y-%m-%d %H:%i') AS date_of_arrival,
		DATE_FORMAT(date_of_departure, '%Y-%m-%d') AS date_of_departure
	FROM
		guests
	JOIN
		guest_emergency_contacts
	ON
		guests.guest_id = guest_emergency_contacts.guest_id
	LEFT JOIN
		reservations
	ON
		reservations.guest_id = guests.guest_id
	AND
		reservations.reservation_status_id 	NOT IN (4, 5, 6) /* Don't bring checked out, cancelled and no show reservations */
	WHERE
		guests.email_id = email_id 	
	ORDER BY 1 DESC LIMIT 1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetGuestDetailsByPhone` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_GetGuestDetailsByPhone`(IN phone_no VARCHAR(20))
BEGIN

	SELECT
		guests.guest_id, 
		first_name, 
        last_name, 
        email_id, 
        phone_no, 
		address, 
        city, 
        zip_code, 
        state, 
        country_id,
		guest_emergency_contact_id,
		e_first_name,
		e_last_name,
		e_phone_no,
		e_relationship,
        reservation_id,
        DATE_FORMAT(date_of_arrival, '%Y-%m-%d %H:%i') AS date_of_arrival,
		DATE_FORMAT(date_of_departure, '%Y-%m-%d') AS date_of_departure
	FROM
		guests
	JOIN
		guest_emergency_contacts
	ON
		guests.guest_id = guest_emergency_contacts.guest_id
	LEFT JOIN
		reservations
	ON
		reservations.guest_id = guests.guest_id
	AND
		reservations.reservation_status_id 	NOT IN (4, 5, 6) /* Don't bring checked out, cancelled and no show reservations */
	WHERE
		guests.phone_no = phone_no
	ORDER BY 1 DESC LIMIT 1;
		
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetGuestEmergencyContactDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_GetGuestEmergencyContactDetails`(
	IN guest_id INT(6)
)
BEGIN

	SELECT 
		guest_emergency_contact_id,
		first_name,
		last_name,
		phone_no,
		relationship
	FROM
		guest_emergency_contacts
	WHERE
		guest_emergency_contacts.guest_id = guest_id
	ORDER BY 1 DESC
    LIMIT 1;
        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetReservationDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_GetReservationDetails`(
	IN guest_id INT(6)
)
BEGIN

                        

	SELECT	
		reservation_id,
		DATE_FORMAT(date_of_arrival, '%Y-%m-%d %H:%i') AS date_of_arrival,
		DATE_FORMAT(date_of_departure, '%Y-%m-%d') AS date_of_departure,
		no_of_people,
		reservation_comments,
        reservation_type_id,
        reservation_status_id,
        sanskara_id,
        is_a_reference,
        DATE_FORMAT(advance_reminder_on, '%Y-%m-%d') AS advance_reminder_on		
	FROM
		reservations 
	WHERE 
		reservations.guest_id = guest_id 
	AND
		reservations.reservation_status_id 
	NOT IN (4, 5, 6) /* Don't bring checked out, cancelled and no show reservations */
	ORDER BY 1 DESC
	LIMIT 1;
    
	
    
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetRoomBookings` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_GetRoomBookings`(
	IN guest_id INT(6)
)
BEGIN
	SET @reservation_id = (
							SELECT
								reservation_id 
							FROM
								reservations
							WHERE
								reservations.guest_id = guest_id
							AND
								reservation_status_id 
							NOT IN 
								(4, 5, 6) /* Don't bring checked out, cancelled and no show reservations */
							ORDER BY 1 DESC
							LIMIT 1);

	SELECT
		a.room_booking_id,
        a.room_id,
        a.room_no,
        DATE_FORMAT(a.date_of_arrival, '%Y-%m-%d %H:%i') AS date_of_arrival,
		DATE_FORMAT(a.date_of_departure, '%Y-%m-%d') AS date_of_departure,
        b.date_of_arrival AS next_arrival_date,
        rooms.floor_no,
        rooms.block_id,
        rooms.total_beds		
	FROM
		room_bookings a
	LEFT OUTER JOIN
		room_bookings b
	ON 
		a.room_id = b.room_id 
	AND
		b.reservation_id <> @reservation_id 
	AND
		b.date_of_arrival > a.date_of_departure 
	AND 
		b.room_status_id <> 5
	JOIN
		rooms
	ON
		rooms.room_id = a.room_id
	WHERE
		a.reservation_id = @reservation_id 
	AND
		a.room_status_id <> 5; /* Cancelled room bookings */
        

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetRoomDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_GetRoomDetails`(
	IN room_no VARCHAR(10)
)
BEGIN
	SELECT 
		date_of_arrival, 
        date_of_departure,
        guest_first_name,
        guest_last_name
	FROM
		room_bookings
	JOIN
		guests
	ON
		guests.guest_id = room_bookings.guest_id
	WHERE
		room_no = room_no
	ORDER BY
		date_of_arrival;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetTodaysCheckIns` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_GetTodaysCheckIns`()
BEGIN

	SELECT 
		reservations.reservation_id, 
        reservation_type_id, 
        guests.first_name, 
        guests.last_name, 
        room_bookings.room_booking_id, 
        room_bookings.room_no, 
        rooms.block_id,
        rooms.floor_no
	FROM
		room_bookings
	JOIN
		guests
	ON
		room_bookings.guest_id = guests.guest_id   
	JOIN
		rooms
	ON
		rooms.room_id = room_bookings.room_id
	JOIN
		reservations
	ON
		reservations.reservation_id = room_bookings.reservation_id
    WHERE
		room_bookings.date_of_arrival <= CURDATE()
	AND
		room_bookings.room_status_id = 1 /* Booked */
	ORDER BY
		reservations.reservation_id;

		

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetTodaysCheckOuts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_GetTodaysCheckOuts`()
BEGIN

	SELECT 
		reservations.reservation_id, 
        reservation_type_id, 
        guests.first_name, 
        guests.last_name, 
        room_bookings.room_booking_id, 
        room_bookings.room_no,
        rooms.block_id,
        rooms.floor_no
	FROM
		room_bookings
	JOIN
		guests
	ON
		room_bookings.guest_id = guests.guest_id   
	JOIN
		rooms
	ON
		rooms.room_id = room_bookings.room_id
	JOIN
		reservations
	ON
		reservations.reservation_id = room_bookings.reservation_id
    WHERE
		room_bookings.date_of_arrival <= CURDATE()
	AND
		room_bookings.room_status_id = 2
	ORDER BY
		reservations.reservation_id; /* Checked In */
        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetTodaysRoomAvailabilityCount` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_GetTodaysRoomAvailabilityCount`()
BEGIN
	SELECT 
		block_id, COUNT(room_id) AS 'count'
	FROM
		rooms
	WHERE
		is_available = 1 
	AND
		room_id NOT IN 
        (
			SELECT 
				room_id
			FROM 
				room_bookings
			WHERE
				room_status_id IN (2, 3) /* Checked In, Checked Out (pending housekeeping */
		)
	GROUP BY
		block_id;
    

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetUncleanRooms` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_GetUncleanRooms`()
BEGIN
	SELECT
		room_bookings.room_booking_id, 
        room_bookings.room_no,
        rooms.block_id,
        rooms.floor_no
	FROM
		room_bookings
	JOIN
		rooms
	ON
		rooms.room_id = room_bookings.room_id
	WHERE
		room_status_id = 3 /* Checked Out */ 
	ORDER BY
		rooms.block_id, rooms.floor_no;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_InsertErrorLog` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_InsertErrorLog`(
		IN 	error_message VARCHAR(1000)
)
BEGIN

	INSERT INTO 
		error_logs
		(
			error_message
		)	
	VALUES
		(
			error_message
		);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_InsertGuestDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_InsertGuestDetails`(
		IN 	first_name VARCHAR(45),
		IN 	last_name VARCHAR(45),
		IN 	email_id VARCHAR(45),
		IN 	phone_no VARCHAR(20),
		IN 	address VARCHAR(200),
		IN 	city VARCHAR(45),
		IN 	zip_code VARCHAR(20),
		IN 	state VARCHAR(45),
		IN 	country_id SMALLINT(6),
		IN 	e_first_name VARCHAR(45),
		IN 	e_last_name VARCHAR(45),
		IN 	e_phone_no VARCHAR(20),
		IN 	e_relationship VARCHAR(45)
	)
BEGIN

	INSERT INTO 
		guests
		(
			first_name,
			last_name,
			email_id,
			phone_no,
			address,
			city,
			zip_code,
			state,
			country_id
		)
	VALUES
		(
			first_name,
			last_name,
			email_id,
			phone_no,
			address,
			city,
			zip_code,
			state,
			country_id
		);
	
    SELECT LAST_INSERT_ID() AS guest_id;
    
    INSERT INTO 
		guest_emergency_contacts
		(
			guest_id,
			e_first_name,
			e_last_name,
			e_phone_no,
			e_relationship
		)	
	VALUES
		(
			guest_id,
			e_first_name,
			e_last_name,
			e_phone_no,
			e_relationship
		);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_InsertGuestEmergencyContactDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_InsertGuestEmergencyContactDetails`(
		IN 	guest_id INT(6),
		IN 	first_name VARCHAR(45),
		IN 	last_name VARCHAR(45),
		IN 	phone_no VARCHAR(20),
		IN 	relationship VARCHAR(45)
	)
BEGIN

INSERT INTO 
		guest_emergency_contacts
		(
			guest_id,
			first_name,
			last_name,
			phone_no,
			relationship
		)	
	VALUES
		(
			guest_id,
			first_name,
			last_name,
			phone_no,
			relationship
		);
        
SELECT LAST_INSERT_ID() AS guest_emergency_contact_id;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_InsertReservationDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_InsertReservationDetails`(
		IN  guest_id INT(6),
		IN 	date_of_arrival DATETIME,
		IN 	date_of_departure DATE,
		IN 	no_of_people VARCHAR(4),
		IN 	reservation_comments VARCHAR(1000),
		IN 	reservation_type_id TINYINT(4),
		IN 	sanskara_id TINYINT(4),
		IN 	is_a_reference TINYINT(2),
        IN 	advance_reminder_on DATE,
        IN 	room_ids_str VARCHAR(1000)
)
BEGIN

 INSERT INTO 
		reservations
		(	
			guest_id,
			date_of_arrival,
			date_of_departure,
			no_of_people,
			reservation_comments,
			reservation_type_id,
			reservation_status_id,
			sanskara_id,
			is_a_reference,
            advance_reminder_on
		)
	VALUES
		(
			guest_id,
			date_of_arrival,
			date_of_departure,
			no_of_people,
			reservation_comments,
			reservation_type_id,
			2, /* Booked */
			sanskara_id,
			is_a_reference,
            advance_reminder_on
		);
        
		SET @reservation_id = LAST_INSERT_ID();
	
        SET @counter = 1;
        
        /* Returns count of values in the given string */
		SET @leng = LENGTH(room_ids_str) - LENGTH(REPLACE(room_ids_str, '|', '')) + 1; 
        
		WHILE @leng > 0 DO
			SET @room_id = strSplit(room_ids_str, '|', @counter);
        
			IF @room_id IS NOT NULL THEN
        
				/* Insert into room bookings */
				INSERT INTO 
					room_bookings 
				(
					guest_id, 
					reservation_id, 
					room_id,
					date_of_arrival,
					date_of_departure
				)
				SELECT 
					guest_id, 
					@reservation_id, 
					@room_id,
					date_of_arrival,
					date_of_departure;
                
			END IF;
						  
			SET @counter = @counter + 1;
			SET @leng = @leng - 1;

		END WHILE;

				UPDATE
					room_bookings
				JOIN
					rooms
				ON
					rooms.room_id = room_bookings.room_id
				SET
					room_bookings.room_no =  rooms.room_no,
                    room_bookings.room_rent = rooms.room_rent
				WHERE
					room_bookings.reservation_id = @reservation_id; 
    
        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_InsertReservationRoomBookings` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_InsertReservationRoomBookings`(	
	IN room_ids_str VARCHAR(1000),
    IN reservation_id INT(6)
)
BEGIN

		DECLARE guest_id INT(6);
        DECLARE date_of_arrival DATE;
        DECLARE date_of_departure DATE;
        
        SELECT 
			guest_id, date_of_arrival, date_of_departure 
		INTO 
			guest_id, date_of_arrival, date_of_departure 
		FROM 
			reservations 
		WHERE 
			reservation_id = reservation_id;
        
    SET @counter = 1;
    
  REPEAT
    
	SET @room_id = strSplit(room_ids_str, ',', @counter);
    
    IF EXISTS /* Check if room already has a booking for given dates */
    (
		SELECT 1 FROM room_bookings WHERE room_id = @room_id AND
        room_bookings.date_of_arrival < date_of_departure && date_of_arrival < room_bookings.date_of_departure
    )
    THEN
		SELECT 0; /* Throw error saying room is already booked.*/
	ELSE
		INSERT INTO 
			room_bookings 
		(
			guest_id, 
			reservation_id, 
			room_id,
			date_of_arrival,
			date_of_departure
		)
		SELECT 
			guest_id, 
			reservation_id, 
			@room_id,
			date_of_arrival,
			date_of_departure
		WHERE 
			@room_id IS NOT NULL;
		  
		SET @counter = @counter + 1;		
    END IF;
    
    UNTIL ROW_COUNT() = 0
    
  END REPEAT;
    
    
    UPDATE
		room_bookings
	JOIN
		rooms
	ON
		rooms.room_id = room_bookings.room_id
	SET
		room_no =  room_no;
    

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_SearchGuests` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_SearchGuests`(
		IN email_or_phone VARCHAR(100)
)
BEGIN
	SELECT  
		guests.guest_id, 
		first_name, 
		last_name, 
		email_id, 
		phone_no, 
		address, 
		city, 
		zip_code, 
		state, 
		country_id,
		guest_emergency_contact_id,
		e_first_name,
		e_last_name,
		e_phone_no,
		e_relationship,
        reservation_id,
        DATE_FORMAT(date_of_arrival, '%Y-%m-%d %H:%i') AS date_of_arrival,
		DATE_FORMAT(date_of_departure, '%Y-%m-%d') AS date_of_departure
	FROM
		guests
	JOIN
		guest_emergency_contacts
	ON
		guests.guest_id = guest_emergency_contacts.guest_id
	LEFT JOIN
		reservations
	ON
		reservations.guest_id = guests.guest_id
	AND
		reservations.reservation_status_id 	NOT IN (4, 5, 6) /* Don't bring checked out, cancelled and no show reservations */    
	WHERE
		email_id = email_or_phone
	OR
		phone_no = email_or_phone
	ORDER BY 1 DESC LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_UpdateCleanedRooms` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_UpdateCleanedRooms`(
	IN str_room_booking_ids VARCHAR(500)
)
BEGIN

 		IF str_room_booking_ids IS NOT NULL THEN /* Update rooms only */

		SET @counter = 1;
     
		/* Returns count of values in the given string */
		SET @leng = LENGTH(str_room_booking_ids) - LENGTH(REPLACE(str_room_booking_ids, '|', '')) + 1; 
        
		WHILE @leng > 0 DO
			SET @room_booking_id = strSplit(str_room_booking_ids, '|', @counter);
        
			IF @room_booking_id IS NOT NULL THEN
						
			UPDATE 
				room_bookings
			SET 
				room_status_id = 4, /* Housekeeping Completed */
                last_updated_on = CURRENT_TIMESTAMP()
			WHERE
				room_booking_id =  @room_booking_id;

			END IF;
						  
			SET @counter = @counter + 1;
			SET @leng = @leng - 1;

		END WHILE;
		  
		END IF;
        
        SELECT 1;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_UpdateDonationDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_UpdateDonationDetails`(
	IN 	donation_id INT(6),
	IN 	reservation_id INT(6),
	IN 	guest_id INT(6),
    IN 	received_on DATE,
    IN 	amount DECIMAL(10,0),
    IN 	receipt_no VARCHAR(20),
    IN 	is_advance TINYINT(2)
)
BEGIN
	IF donation_id IS NULL THEN
		INSERT INTO
			donations
			(
				reservation_id,
				guest_id,
				received_on,
				amount,
				receipt_no,
				is_advance
			)
		VALUES
			(
				reservation_id,
				guest_id,
				received_on,
				amount,
				receipt_no,
				is_advance
			);
	ELSE
		UPDATE 
			donations
		SET
			reservation_id = reservation_id,
            guest_id = guest_id,
            received_on = received_on,
            amount = amount,
            receipt_no = receipt_no,
            is_advance = is_advance
		WHERE
			donations.donation_id = donation_id;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_UpdateGuestDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_UpdateGuestDetails`(
		IN 	guest_id INT(6),
		IN 	first_name VARCHAR(45),
		IN 	last_name VARCHAR(45),
		IN 	email_id VARCHAR(45),
		IN 	phone_no VARCHAR(20),
		IN 	address VARCHAR(200),
		IN 	city VARCHAR(45),
		IN 	zip_code VARCHAR(20),
		IN 	state VARCHAR(45),
		IN 	country_id SMALLINT(6)
)
BEGIN

	UPDATE
		guests
	SET
			first_name = first_name,
			last_name = last_name,
			email_id = email_id,
			phone_no = phone_no,
			address = address,
			city = city,
			zip_code = zip_code,
			state = state,
			country_id = country_id
	WHERE 
		guests.guest_id = guest_id;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_UpdateGuestEmergencyContactDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_UpdateGuestEmergencyContactDetails`(
		IN 	guest_emergency_contact_id INT(6),
		IN 	e_first_name VARCHAR(45),
		IN 	e_last_name VARCHAR(45),
		IN 	e_phone_no VARCHAR(20),
		IN 	e_relationship VARCHAR(45)
)
BEGIN


	UPDATE 
		guest_emergency_contacts
	SET
		guest_emergency_contacts.e_first_name = e_first_name,
		guest_emergency_contacts.e_last_name = e_last_name,
		guest_emergency_contacts.e_phone_no = e_phone_no,
		guest_emergency_contacts.e_relationship = e_relationship
	WHERE
		guest_emergency_contacts.guest_emergency_contact_id = guest_emergency_contact_id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_UpdateReservationDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_UpdateReservationDetails`(
		IN 	reservation_id INT(6),
        IN 	date_of_arrival DATETIME,
		IN 	date_of_departure DATE,
		IN 	no_of_people VARCHAR(4),
		IN 	reservation_comments VARCHAR(1000),
		IN 	advance_reminder_on DATE,
        IN  reservation_type_id TINYINT(4),
        IN 	sanskara_id TINYINT(4)
)
BEGIN

	UPDATE
		reservations
	SET
		date_of_arrival = date_of_arrival,
		date_of_departure = date_of_departure,
		no_of_people = no_of_people,
		reservation_comments = reservation_comments,
        reservation_type_id = reservation_type_id,
		advance_reminder_on = advance_reminder_on,
        sanskara_id = sanskara_id,
        last_updated_on = CURRENT_TIMESTAMP()
	WHERE
		reservations.reservation_id = reservation_id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_UpdateRoomBookings` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_UpdateRoomBookings`(
	IN 	room_booking_id INT,
	IN 	date_of_departure DATE
)
BEGIN
	
	UPDATE
		room_bookings
	SET
		room_bookings.date_of_departure = date_of_departure
	WHERE
		room_bookings.room_booking_id = room_booking_id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_UpdateTodaysCheckIns` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_UpdateTodaysCheckIns`(
    IN str_reservation_ids VARCHAR(200),
    IN str_room_booking_ids VARCHAR(500)
)
BEGIN
	IF str_reservation_ids IS NOT NULL THEN /* Update full reservations */
  
		SET @counter = 1;
     
		/* Returns count of values in the given string */
		SET @leng = LENGTH(str_reservation_ids) - LENGTH(REPLACE(str_reservation_ids, '|', '')) + 1; 
        
		WHILE @leng > 0 DO
			SET @reservation_id = strSplit(str_reservation_ids, '|', @counter);
        
			IF @reservation_id IS NOT NULL THEN
			
					UPDATE
						reservations
					SET
						reservation_status_id = 3, /* Checked In */
                        last_updated_on = CURRENT_TIMESTAMP()
					WHERE
						reservations.reservation_id = @reservation_id;
						
					UPDATE
						room_bookings
					SET
						room_status_id = 2, /* Checked In */
                        last_updated_on = CURRENT_TIMESTAMP()
					WHERE
						reservation_id = @reservation_id;
			END IF;
						  
			SET @counter = @counter + 1;
			SET @leng = @leng - 1;

		END WHILE;
  
END IF;


		IF str_room_booking_ids IS NOT NULL THEN /* Update rooms only */

		SET @counter = 1;
     
		/* Returns count of values in the given string */
		SET @leng = LENGTH(str_room_booking_ids) - LENGTH(REPLACE(str_room_booking_ids, '|', '')) + 1; 
        
		WHILE @leng > 0 DO
			SET @room_booking_id = strSplit(str_room_booking_ids, '|', @counter);
        
			IF @room_booking_id IS NOT NULL THEN
						
					UPDATE
						room_bookings
					SET
						room_status_id = 2, /* Checked In */
                        last_updated_on = CURRENT_TIMESTAMP()
					WHERE
						room_booking_id = @room_booking_id;
			END IF;
						  
			SET @counter = @counter + 1;
			SET @leng = @leng - 1;

		END WHILE;
		  
		END IF;
      
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_UpdateTodaysCheckOuts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sa`@`%` PROCEDURE `sp_UpdateTodaysCheckOuts`(
    IN int_reservation_id INT,
    IN str_room_booking_ids VARCHAR(500),
    IN amount DECIMAL(10,0),
    IN receipt_no VARCHAR(100)
    
)
BEGIN
        
IF int_reservation_id IS NOT NULL THEN
			
		UPDATE
			reservations
		SET
			reservation_status_id = 4, /* Checked Out */
			last_updated_on = CURRENT_TIMESTAMP()
		WHERE
			reservations.reservation_id = int_reservation_id;
			
		UPDATE
			room_bookings
		SET
			room_status_id = 3, /* Checked Out */
			last_updated_on = CURRENT_TIMESTAMP()
		WHERE
			room_bookings.reservation_id = int_reservation_id;
            
		IF amount IS NOT NULL THEN
			
			SET @guest_id = (SELECT guest_id FROM reservations WHERE reservations.reservation_id = int_reservation_id);
							
			CALL sp_UpdateDonationDetails(null, int_reservation_id,  @guest_id, CURDATE(), amount, receipt_no, 0);
            
		END IF;
                        
                        
ELSEIF str_room_booking_ids IS NOT NULL THEN /* Update rooms only */

		SET @counter = 1;
     
		/* Returns count of values in the given string */
		SET @leng = (LENGTH(str_room_booking_ids) - LENGTH(REPLACE(str_room_booking_ids, '|', ''))) + 1; 
        
		WHILE @leng > 0 DO
			SET @room_booking_id = strSplit(str_room_booking_ids, '|', @counter);
        
			IF @room_booking_id IS NOT NULL THEN
						
					UPDATE
						room_bookings
					SET
						room_status_id = 3, /* Checked Out  */
                        last_updated_on = CURRENT_TIMESTAMP()
					WHERE
						room_booking_id = @room_booking_id;
			END IF;
						  
			SET @counter = @counter + 1;
			SET @leng = @leng - 1;

		END WHILE;
        
		IF amount IS NOT NULL THEN
      
		SET @reservation_id = 0;
		SET @guest_id = 0;
        
		SELECT reservation_id, guest_id INTO @reservation_id, @guest_id FROM room_bookings WHERE room_bookings.room_booking_id = strSplit(str_room_booking_ids, '|', 1);
	
		CALL sp_UpdateDonationDetails(null, @reservation_id,  @guest_id, CURDATE(), amount, receipt_no, 0);
        
        END IF;
      
		  
END IF;
        
        
	SELECT 1;
      
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-16 11:55:18
