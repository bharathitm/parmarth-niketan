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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donations`
--

LOCK TABLES `donations` WRITE;
/*!40000 ALTER TABLE `donations` DISABLE KEYS */;
INSERT INTO `donations` VALUES (1,2,2,'2018-05-25',10000,'R999',1,'2018-05-21 17:36:35'),(2,1,1,'2018-05-20',5000,'R122',1,'2018-05-21 17:36:38'),(3,2,2,'2018-05-25',9999,'R888',1,'2018-05-25 21:48:50');
/*!40000 ALTER TABLE `donations` ENABLE KEYS */;
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
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `phone_no` varchar(20) NOT NULL,
  `relationship` varchar(45) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`guest_emergency_contact_id`),
  UNIQUE KEY `guest_emergency_contact_id_UNIQUE` (`guest_emergency_contact_id`),
  KEY `fk_guests_guest_emergency_contacts` (`guest_id`),
  CONSTRAINT `fk_guests_guest_emergency_contacts` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`guest_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_emergency_contacts`
--

LOCK TABLES `guest_emergency_contacts` WRITE;
/*!40000 ALTER TABLE `guest_emergency_contacts` DISABLE KEYS */;
INSERT INTO `guest_emergency_contacts` VALUES (1,1,'Madhava Rao','T R','23762274','Father','2018-05-20 13:33:21'),(2,3,'Rakuma','Sholapur','999333','Mother','2018-05-25 12:06:38');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guests`
--

LOCK TABLES `guests` WRITE;
/*!40000 ALTER TABLE `guests` DISABLE KEYS */;
INSERT INTO `guests` VALUES (1,'Bharathi','T M','bharathitm@gmail.com','9884350777','Besant Nagar','Chennai','90','Tamil Nadu',77,'2018-05-19 18:30:00'),(2,'Sandhya','T M','tm.sandhya@gmail.com','000','Shastri Nagar','Chennai','600090','T N',77,'2018-05-20 09:39:46'),(3,'Radhika','Sholapur','radhika@gmail.com','9884350777','Patri House','Kakinada','90','Andhra Pradesh',77,'2018-05-25 05:18:03'),(4,'FirstName','Last Name','someone@gmail.com','888','Besant Nagar','Chennai','00','T N',77,'2018-05-26 16:05:06'),(5,'James','Bond',NULL,'007','Somewhere','New York','007','NY',188,'2018-05-27 13:59:45');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,1,'2018-05-22 00:00:00','2018-10-27','99','99 ppl are coming',1,3,NULL,0,'2018-09-27',NULL,'2018-05-20 09:41:13'),(2,2,'2018-05-21 00:00:00','2018-05-31','100',NULL,6,2,NULL,0,NULL,NULL,'2018-05-20 09:42:21'),(3,1,'2018-05-25 00:00:00','2018-10-27','99','99 ppl are coming',1,1,1,0,NULL,NULL,'2018-05-24 14:27:24'),(4,1,'2018-10-08 00:00:00','2018-10-16','199','199 ppl are coming now',1,5,1,0,'2018-09-27',NULL,'2018-05-24 14:41:40'),(5,5,'2018-06-01 00:00:00','2018-06-05','10','10 ppl are coming',1,1,1,0,NULL,NULL,'2018-05-27 15:26:00'),(6,5,'2018-06-11 00:00:00','2018-06-15','8','8 ppl are coming',1,1,1,0,NULL,NULL,'2018-05-27 16:03:29'),(7,5,'2018-06-11 00:00:00','2018-06-15','8',NULL,1,1,NULL,0,NULL,NULL,'2018-05-27 16:04:59'),(8,5,'2018-06-20 00:00:00','2018-06-25','88','test again',1,1,NULL,0,NULL,NULL,'2018-05-27 16:08:06'),(9,5,'2018-06-11 00:00:00','2018-06-15','8',NULL,1,1,1,0,NULL,NULL,'2018-05-27 16:08:58'),(10,5,'2018-06-11 00:00:00','2018-06-15','8','test',1,1,NULL,0,'2018-06-01',NULL,'2018-05-27 16:09:54');
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
  `date_of_arrival` date NOT NULL,
  `date_of_departure` date NOT NULL,
  `room_rent` decimal(10,0) DEFAULT NULL,
  `room_status_id` tinyint(4) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_bookings`
--

LOCK TABLES `room_bookings` WRITE;
/*!40000 ALTER TABLE `room_bookings` DISABLE KEYS */;
INSERT INTO `room_bookings` VALUES (1,4,'616',1,1,'2018-05-26','2018-05-26',700,3,'2018-04-29 13:03:50'),(2,5,'617',1,1,'2018-05-26','2018-05-26',600,3,'2018-04-29 13:03:50'),(3,1,'613',2,2,'2018-05-21','2018-05-25',400,2,'2018-04-29 13:03:50'),(4,51,'',4,NULL,'0000-00-00','0000-00-00',NULL,5,'2018-04-29 13:03:50'),(5,58,'',4,NULL,'0000-00-00','0000-00-00',NULL,5,'2018-04-29 13:03:50'),(6,1,'613',4,NULL,'2018-05-19','2018-05-25',700,5,'2018-05-19 18:30:00');
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
  `rent_amount` decimal(10,0) DEFAULT NULL,
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
    IN room_booking_ids VARCHAR(400)
)
BEGIN

IF reservation_id IS NOT NULL THEN
	UPDATE
		room_bookings
	SET 
		room_status_id = 5 /* Cancelled */
	WHERE
		room_bookings.reservation_id = reservation_id;
ELSE
	/* Loop through the room_booking_ids string and delete each record */
	SELECT 1;
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
		advance_donation_reminders.guest_id,
        guests.guest_first_name,
        guests.guest_last_name,
        guests.email_id
	FROM
		advance_donation_reminders
	JOIN
		guests
	ON
		guests.guest_id = advance_donation_reminders.guest_id
	WHERE
		advance_reminder_on = CURDATE()
	AND
		reminder_status = 0 /* Not yet reminded */;

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

IF total_beds IS NULL THEN
	SELECT 
		room_id,
        room_no,
        floor_no,
        block_id,
        total_beds,
        rent_amount,
        has_AC,
        has_cooler,
        has_solar_geyser,
        has_indian_toilet,
        has_western_toilet
    FROM
		rooms
	WHERE
		room_id NOT IN 
        (
			SELECT 
				room_id
			FROM 
				room_bookings
			WHERE
				date_of_arrival < departure_date && arrival_date < date_of_departure
			AND
				room_status_id NOT IN (4,5)
		);
ELSE 
	SELECT 
		room_id,
        room_no,
        floor_no,
        block_id,
        total_beds,
        rent_amount,
        has_AC,
        has_cooler,
        has_solar_geyser,
        has_indian_toilet,
        has_western_toilet
    FROM
		rooms
	WHERE
		total_beds = total_beds		
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
				room_status_id NOT IN (4,5)
		);
	
END IF;
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
		DATE(date_of_arrival) AS on_date,
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
		date_of_arrival BETWEEN from_date AND to_date;
		
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
		country_id
	FROM
		guests
	WHERE 
		guests.guest_id = guest_id;

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
		country_id
	FROM
		guests
	WHERE
		guests.email_id = email_id
	LIMIT 1;

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
        country_id
	FROM
		guests
	WHERE
		guests.phone_no = phone_no
	LIMIT 1;
		
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
		guest_emergency_contacts.guest_id = guest_id;
        
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
	IN reservation_id INT(6)
)
BEGIN

	SELECT	
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
	FROM
		reservations
	WHERE
		reservations.reservation_id = reservation_id;
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
	IN reservation_id INT(6)
)
BEGIN
	SELECT
		room_booking_id,
        room_bookings.room_no,
        date_of_arrival,
        date_of_departure,
        rooms.floor_no,
        rooms.block_id,
        rooms.total_beds		
	FROM
		room_bookings
	JOIN
		rooms
	ON
		rooms.room_id = room_bookings.room_id
	WHERE
		room_bookings.reservation_id = reservation_id;

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
        rooms.floor_no, 
        rooms.block_id
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
		room_bookings.room_status_id = 1; /* Booked */

		

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
        rooms.floor_no, 
        rooms.block_id
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
		room_bookings.room_status_id = 2; /* Checked In */
        
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
		room_booking_id, 
        room_no
	FROM
		room_bookings
	WHERE
		room_status_id = 3 /* Checked Out */;
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
		IN 	country_id SMALLINT(6)
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
        IN 	advance_reminder_on DATE
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
			1, /* New */
			sanskara_id,
			is_a_reference,
            advance_reminder_on
		);
        
		SELECT LAST_INSERT_ID() AS reservation_id;
        
        
        
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

 SET @counter = 1;
    
  REPEAT
  
	SET @room_booking_id =  strSplit(str_room_booking_ids, ',', @counter);
    
    UPDATE 
		room_bookings
	SET 
		room_status_id = 4 /* Housekeeping Completed */
    WHERE
		room_booking_id =  @room_booking_id
	AND 
		@room_booking_id IS NOT NULL;
      
    SET @counter = @counter + 1;
    
    UNTIL ROW_COUNT() = 0
    
  END REPEAT;
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
		IN 	guest_id INT(6),
		IN 	first_name VARCHAR(45),
		IN 	last_name VARCHAR(45),
		IN 	phone_no VARCHAR(20),
		IN 	relationship VARCHAR(45)
)
BEGIN


	UPDATE 
		guest_emergency_contacts
	SET
		first_name = first_name,
		last_name = last_name,
		phone_no = phone_no,
		relationship = relationship
	WHERE
		guest_emergency_contacts.guest_id = guest_id;

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
		IN 	advance_reminder_on DATE
)
BEGIN

	UPDATE
		reservations
	SET
		date_of_arrival = date_of_arrival,
		date_of_departure = date_of_departure,
		no_of_people = no_of_people,
		reservation_comments = reservation_comments,
		advance_reminder_on = advance_reminder_on
	WHERE
		reservations.reservation_id = reservation_id;

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
	IN str_room_booking_ids VARCHAR(500),
    IN str_reservation_ids VARCHAR(200)
)
BEGIN
  
  SET @counter = 1;
  
  /* Returns count of values in the given string */
  SET @len = LENGTH(str_reservation_ids) - LENGTH(REPLACE(str_reservation_ids, ',', '')) + 1; 
     
	REPEAT
		SET @reservation_id = strSplit(str_reservation_ids, ',', @counter);
        
        IF @reservation_id IS NOT NULL THEN
        
				UPDATE
					reservations
				SET
					reservation_status_id = 3 /* Checked In */
				WHERE
					reservations.reservation_id = @reservation_id;
                    
		END IF;
						  
		SET @counter = @counter + 1;
        SET @len = @len - 1;

		UNTIL @len <> 0 
    
  END REPEAT;


      
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
    IN str_reservation_ids VARCHAR(200),
    IN str_room_booking_ids VARCHAR(500)
)
BEGIN

IF str_reservation_ids IS NOT NULL THEN /* Update full reservations */
  
  SET @counter = 1;
     
	REPEAT
		SET @reservation_id = strSplit(str_reservation_ids, ',', @counter);
        
        IF @reservation_id IS NOT NULL THEN
        
				UPDATE
					reservations
				SET
					reservation_status_id = 4 /* Checked Out */
				WHERE
					reservation_id = @reservation_id;
                    
				UPDATE
					room_bookings
				SET
					room_status_id = 3 /* Checked Out */
				WHERE
					reservation_id = @reservation_id;
		END IF;
						  
		SET @counter = @counter + 1;
		
		UNTIL ROW_COUNT() = 0
    
  END REPEAT;
  
END IF;


IF str_room_booking_ids IS NOT NULL THEN /* Update rooms only */

	 SET @counter = 1;
     
	REPEAT
		
        SET @room_booking_id = strSplit(str_room_booking_ids, ',', @counter);
        
		IF @room_booking_id IS NOT NULL THEN
        
				UPDATE 
					room_bookings
				SET 
					room_bookings.room_status_id = 3 /* Checked Out */
				WHERE
					room_booking_id = @room_booking_id;
		END IF;
				  
		SET @counter = @counter + 1;
		
		UNTIL ROW_COUNT() = 0
		
  END REPEAT;
  
END IF;
      
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

-- Dump completed on 2018-05-27 22:27:48
