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
  `block_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `block_name` varchar(45) NOT NULL,
  `no_of_rooms` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`block_id`),
  UNIQUE KEY `BlockID_UNIQUE` (`block_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=198 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
-- Table structure for table `guest_emergency_contacts`
--

DROP TABLE IF EXISTS `guest_emergency_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `guest_emergency_contacts` (
  `guest_emergency_contact_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `contact_first_name` varchar(45) DEFAULT NULL,
  `contact_last_name` varchar(45) DEFAULT NULL,
  `contact_phone_no` varchar(20) DEFAULT NULL,
  `contact_relationship` varchar(45) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`guest_emergency_contact_id`),
  UNIQUE KEY `guest_emergency_contact_id_UNIQUE` (`guest_emergency_contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_emergency_contacts`
--

LOCK TABLES `guest_emergency_contacts` WRITE;
/*!40000 ALTER TABLE `guest_emergency_contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `guest_emergency_contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guests`
--

DROP TABLE IF EXISTS `guests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `guests` (
  `guest_id` int(11) NOT NULL AUTO_INCREMENT,
  `guest_first_name` varchar(45) DEFAULT NULL,
  `guest_last_name` varchar(45) DEFAULT NULL,
  `email_id` varchar(45) DEFAULT NULL,
  `mobile_no` varchar(20) DEFAULT NULL,
  `address_line` varchar(200) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `guest_emergency_contact_id` smallint(6) DEFAULT NULL,
  `country_id` smallint(6) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`guest_id`),
  UNIQUE KEY `idguests_UNIQUE` (`guest_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guests`
--

LOCK TABLES `guests` WRITE;
/*!40000 ALTER TABLE `guests` DISABLE KEYS */;
/*!40000 ALTER TABLE `guests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_statuses`
--

DROP TABLE IF EXISTS `reservation_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `reservation_statuses` (
  `reservation_status_id` smallint(6) NOT NULL AUTO_INCREMENT,
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
INSERT INTO `reservation_statuses` VALUES (1,'Requested'),(2,'Booked'),(3,'Checked In'),(4,'Checked Out'),(5,'Cancelled'),(6,'No Show');
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
INSERT INTO `reservation_types` VALUES (1,'General'),(2,'Group Retreat'),(3,'Sanskara'),(4,'Travel Agent'),(5,'Yoga Course');
/*!40000 ALTER TABLE `reservation_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `reservations` (
  `reservation_id` int(11) NOT NULL AUTO_INCREMENT,
  `guest_id` smallint(6) NOT NULL,
  `date_of_arrival` datetime NOT NULL,
  `date_of_departure` datetime NOT NULL,
  `no_of_people` int(11) NOT NULL,
  `reservation_comments` varchar(200) DEFAULT NULL,
  `reservation_type_id` tinyint(4) NOT NULL,
  `reservation_status_id` tinyint(4) NOT NULL,
  `sanskara_id` tinyint(4) DEFAULT NULL,
  `total_amount` decimal(10,0) DEFAULT NULL,
  `advance_amount_received` decimal(10,0) DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reservation_id`),
  UNIQUE KEY `reservation_id_UNIQUE` (`reservation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_allocations`
--

DROP TABLE IF EXISTS `room_allocations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `room_allocations` (
  `room_allocation_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `room_status_id` smallint(6) NOT NULL,
  `room_id` smallint(6) NOT NULL,
  `reservation_id` int(11) DEFAULT NULL,
  `guest_id` int(11) DEFAULT NULL,
  `comments` varchar(45) DEFAULT NULL,
  `last_updated_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`room_allocation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_allocations`
--

LOCK TABLES `room_allocations` WRITE;
/*!40000 ALTER TABLE `room_allocations` DISABLE KEYS */;
INSERT INTO `room_allocations` VALUES (1,2,25,NULL,NULL,'House Keeping','2018-04-29 13:03:50'),(2,2,28,NULL,NULL,'Sevak','2018-04-29 13:03:50'),(3,2,35,NULL,NULL,'Store','2018-04-29 13:03:50'),(4,2,51,NULL,NULL,NULL,'2018-04-29 13:03:50'),(5,2,58,NULL,NULL,NULL,'2018-04-29 13:03:50');
/*!40000 ALTER TABLE `room_allocations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_statuses`
--

DROP TABLE IF EXISTS `room_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `room_statuses` (
  `room_status_id` tinyint(3) unsigned NOT NULL,
  `status_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`room_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_statuses`
--

LOCK TABLES `room_statuses` WRITE;
/*!40000 ALTER TABLE `room_statuses` DISABLE KEYS */;
INSERT INTO `room_statuses` VALUES (1,'Available'),(2,'Booked'),(3,'Checked In'),(4,'Blocked'),(5,'Under Maintenance');
/*!40000 ALTER TABLE `room_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rooms` (
  `room_id` smallint(6) NOT NULL,
  `room_no` varchar(10) DEFAULT NULL,
  `floor_no` tinyint(4) DEFAULT NULL,
  `block_id` smallint(6) DEFAULT NULL,
  `total_beds` smallint(6) DEFAULT NULL,
  `rent_amount` decimal(10,0) DEFAULT NULL,
  `has_AC` tinyint(4) DEFAULT NULL,
  `has_cooler` tinyint(4) DEFAULT NULL,
  `has_solar_geyser` tinyint(4) DEFAULT NULL,
  `has_indian_toilet` tinyint(4) DEFAULT NULL,
  `has_western_toilet` tinyint(4) DEFAULT NULL,
  `room_status_id` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`room_id`),
  UNIQUE KEY `room_id_UNIQUE` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'pn'
--

--
-- Dumping routines for database 'pn'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-11 16:34:43
