-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: easy_track
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `UID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'userId',
  `Email` varchar(255) NOT NULL COMMENT 'email of user',
  `Password` varchar(255) NOT NULL COMMENT 'password of user',
  `Create-Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'account creation date',
  `Username` varchar(50) NOT NULL,
  PRIMARY KEY (`UID`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (31,'jadrifai12@gmail.com','$2b$10$/K4qJsQ3siIjH4YKnCoZK.FZjNzYO/FDtYGgs2rrbczxoAN9RC5C6','2025-12-22 17:52:36','jadrif12'),(47,'pesnew506@gmail.com','$2b$10$wXOcBogXuUW.y0xR6tA3tuRBJqxlDRFt06vHc2A7T4.Hpz4itIo1y','2025-12-27 14:50:03','jad'),(48,'Mazenzn17@gmail.com','$2b$10$y3yd4/ZWUAZgOwBgtlHmKu99L.6ZNcP0B8W5NibTKu2bVYR2aAeRK','2025-12-29 08:47:37','jadrif1'),(49,'Jadrifai12@icloud.com','$2b$10$NwUUJNiDD49C6EL33wSXuO9h85nREyhPu7m5SlWERez7.PSACecOW','2025-12-29 09:00:48','kajbda'),(52,'hi@gmail.com','$2b$10$ro7GxWkiEv979oYjoClhQebLN0xvcRSSoXKU7pVTjHJSj/oZjJu4a','2025-12-29 09:05:57','jjjj'),(55,'apes0948@gmail.com','$2b$10$RVXx/vXpEUBLxX2NDY.th.Fzp4yKN26gbFVqvtoblVN9KR51hk1nu','2025-12-29 20:45:15','jad678');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workout_logs`
--

DROP TABLE IF EXISTS `workout_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workout_logs` (
  `Steps` int(11) NOT NULL,
  `Mood` varchar(25) NOT NULL,
  `Meals` varchar(255) NOT NULL,
  `Calories` double(10,2) NOT NULL,
  `Distance` double(10,2) NOT NULL,
  `Create-Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `UID` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `UID` (`UID`),
  CONSTRAINT `workout_logs_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workout_logs`
--

LOCK TABLES `workout_logs` WRITE;
/*!40000 ALTER TABLE `workout_logs` DISABLE KEYS */;
INSERT INTO `workout_logs` VALUES (1234,'Neutral','jadrif12',62.00,0.99,'2025-12-30 11:12:30',31,19);
/*!40000 ALTER TABLE `workout_logs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-30 16:05:08
