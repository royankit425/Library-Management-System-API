-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: LibraryManagementSystem
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Librarian','Student','Faculty') NOT NULL,
  `registration_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('1','Tapas Roy','roytapas@gmail.com','$2a$10$6gqMgox0w403or0P1J8obOAm6mANMs6gz/9P9RI6eA5s8Y.y7E3aC','Librarian','2025-01-14 11:00:36'),('2','Aniket Roy','royaniket@yahoo.com','$2a$10$Dx9gbrekG507iC6bF01EF.L1hEXkA9g5eFM4jGbYb8ign8nwi4TQu','Student','2025-01-14 11:02:15'),('3','Mousumi Bose','bosemousumi12@yahoo.com','$2a$10$YAAWWmFWX5lRVtjGqisawef/dyvhIfVMt4x3fbQJMuh.lSopdFULq','Faculty','2025-01-14 11:03:47'),('4','Arpita Sen','senarpita123@outlook.com','$2a$10$15qTVlIClH7v15oPId2mUOi5bQZ9WwTPtcDt2T46YToo3tG1Vr2kW','Student','2025-01-14 11:05:09'),('5','Ankit Kumar','kumarankit@gmail.com','$2a$10$6c2LjSwNkz7Lv1gMORcwXeEYVMnnzVQkIYsANSC8fJLo5XVkt/oNy','Librarian','2025-01-14 11:06:49'),('6','Debopriyo Kar','kardebo@yahoo.com','$2a$10$CROfXUkHjXMLsg.QTFguo.rmG.vfl5LB6v9CyGDcY5OFnnJoM/pKi','Student','2025-01-14 11:08:38'),('7','Niva Rani','raniniva@outlook.com','$2a$10$DXyGtQW.DQDpUR/aHOuycuJ2Lnp.TSFvnC.nJdYFebDg1FszNUZBG','Faculty','2025-01-14 11:09:52'),('8','Harendra Chandra','harendra2000@gmail.com','$2a$10$35Yj8nawum2Jk1lQbOHROeoUWDDJXRzNHIG0rBq50LCPxpZQPFiE6','Student','2025-01-14 11:10:54');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-16 19:36:38
