-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: invoicing
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cities` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `nameInvariant` varchar(200) NOT NULL,
  `countryId` mediumint(9) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UniqueCity` (`countryId`,`nameInvariant`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `nameInvariant_UNIQUE` (`nameInvariant`),
  KEY `id` (`id`),
  KEY `city` (`name`),
  KEY `countryId` (`countryId`),
  CONSTRAINT `country` FOREIGN KEY (`countryId`) REFERENCES `countries` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (23,'Tirana','Tirana',267),(24,'Durrës','Durres',270),(25,'Vlorë','Vlore',267),(26,'Canillo','Canillo',268),(27,'L\'Aldosa','LAldosa',268),(29,'Yerevan','Yerevan',269),(30,'Gyumri','Gyumri',269),(31,'Vanadzor','Vanadzor',269),(33,'Graz','Graz',225),(35,'Salzburg','Salzburg',225),(36,'Sankt Pölten','Sankt Polten',225),(52,'Minsk','Minsk',271),(56,'Antwerp','Antwerp',6),(57,'Brussels','Brussels',6),(58,'Charleroi','Charleroi',6),(59,'Sarajevo','Sarajevo',283),(61,'Tuzla','Tuzla',283),(62,'Bucuresti','Bucuresti',261),(63,'Cluj-Napoca','Cluj Napoca',261),(65,'Zagreb','Zagreb',8),(67,'Rijeka','Rijeka',8),(68,'Nicosia','Nicosia',151),(69,'Limassol','Limassol',151),(70,'Prague','Prague',9),(71,'Brno','Brno',9),(72,'Hovedstadsområdet','Hovedstadsomradet',50),(73,'Aarhus','Aarhus',50),(74,'Odense','Odense',50),(75,'Tallinn','Tallinn',284),(76,'Tartu','Tartu',284),(77,'Helsinki','Helsinki',55),(78,'Jyväskylä','Jyvaskyla',55),(79,'Paris','Paris',157),(80,'Marseille','Marseille',157),(81,'Lyon','Lyon',157),(82,'Tbilisi','Tbilisi',285),(83,'Batumi','Batumi',285),(84,'Munich','Munich',141),(85,'Berlin','Berlin',141),(87,'Düsseldorf','Dusseldorf',141),(88,'Athens','Athens',218),(91,'Budapest','Budapest',68),(92,'Debrecen','Debrecen',68),(93,'Reykjavík','Reykjavik',53),(95,'Akureyri','Akureyri',53),(96,'Dublin','Dublin',203),(99,'Rome','Rome',52),(101,'Naples','Naples',52),(104,'Genoa','Genoa',52),(109,'Liechtenstein','Liechtenstein',289),(110,'Vilnius','Vilnius',290),(111,'Kaunas','Kaunas',290),(112,'Luxembourg','Luxembourg',291),(113,'Skopje','Skopje',292),(116,'Chișinău','Chisinau',205),(118,'Tiraspol','Tiraspol',205),(121,'Amsterdam','Amsterdam',42),(122,'Rotterdam','Rotterdam',42),(123,'The Hague','The Hague',42),(125,'Oslo','Oslo',237),(127,'Bergen','Bergen',237),(128,'Varșovia','Varsovia',211),(129,'Cracovia','Cracovia',211),(133,'Lisbon','Lisbon',62),(135,'Ploiești','Ploiesti',261),(136,'Moscow','Moscow',150),(137,'Saint Petersburg','Saint Petersburg',150),(140,'Nizhny Novgorod','Nizhny Novgorod',150),(141,'Belgrade','Belgrade',186),(142,'Bratislava','Bratislava',197),(143,'Košice','Kosice',197),(144,'Ljubljana','Ljubljana',144),(145,'Madrid','Madrid',179),(146,'Barcelona','Barcelona',179),(148,'Seville','Seville',179),(149,'Alingsås','Alingsas',23),(150,'Gothenburg','Gothenburg',23),(151,'Stockholm','Stockholm',23),(152,'Zürich','Zurich',180),(153,'Geneva','Geneva',180),(154,'Basel','Basel',180),(155,'Istanbul','Istanbul',15),(156,'Ankara','Ankara',15),(157,'Izmir','Izmir',15),(158,'Kiev','Kiev',169),(159,'Kharkiv','Kharkiv',169),(160,'Odessa','Odessa',169),(161,'London','London',306),(164,'Birmingham','Birmingham',306),(165,'Glasgow','Glasgow',306),(170,'Sofia','Sofia',193),(171,'Test22','Test22',261);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `nameInvariant` varchar(200) NOT NULL,
  `administratorName` varchar(150) DEFAULT NULL,
  `countryId` mediumint(9) DEFAULT NULL,
  `county` varchar(50) DEFAULT NULL,
  `cityId` mediumint(9) unsigned DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `code` varchar(40) DEFAULT NULL,
  `tradeRegister` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`,`name`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `nameInvariant_UNIQUE` (`nameInvariant`),
  KEY `country_idx` (`countryId`),
  KEY `city_idx` (`cityId`),
  CONSTRAINT `city_fk` FOREIGN KEY (`cityId`) REFERENCES `cities` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `country_fk` FOREIGN KEY (`countryId`) REFERENCES `countries` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'My Private Company','My Private Company','Company Adminsitrator',261,'Sector1',62,'str. Nicolae Titulescu nr. 24','1425896','J40-7238 -2010'),(5,'First Customer Ltd','First Customer Ltd','Customer Admin',141,'County 1',85,'34 Bulevard street','1545263','j24-230222');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies-accounts`
--

DROP TABLE IF EXISTS `companies-accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies-accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `bank` varchar(45) DEFAULT NULL,
  `account` varchar(45) DEFAULT NULL,
  `companyId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`companyId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies-accounts`
--

LOCK TABLES `companies-accounts` WRITE;
/*!40000 ALTER TABLE `companies-accounts` DISABLE KEYS */;
INSERT INTO `companies-accounts` VALUES (1,'Cont Curent','Raiffeisen Bank ag. Dristor Bucuresti','RO58RZBR00xxxxxxxxxxxxxx',1),(2,'current','ING','125313461276',5);
/*!40000 ALTER TABLE `companies-accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies-addresses`
--

DROP TABLE IF EXISTS `companies-addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies-addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `countryId` mediumint(8) DEFAULT NULL,
  `county` varchar(50) DEFAULT NULL,
  `cityId` mediumint(8) unsigned DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `companyId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_idx` (`companyId`),
  KEY `city_fk` (`cityId`),
  KEY `companies-addresses_country_fk` (`countryId`),
  CONSTRAINT `companies-addresses_city_fk` FOREIGN KEY (`cityId`) REFERENCES `cities` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `companies-addresses_country_fk` FOREIGN KEY (`countryId`) REFERENCES `countries` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies-addresses`
--

LOCK TABLES `companies-addresses` WRITE;
/*!40000 ALTER TABLE `companies-addresses` DISABLE KEYS */;
INSERT INTO `companies-addresses` VALUES (1,'Punct de lucru',261,'Sector 2',62,'Aleea Fizicienilor nr. 8',1),(7,'seat',141,'County 1',85,'34 Bulevard street',5);
/*!40000 ALTER TABLE `companies-addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies-email-templates`
--

DROP TABLE IF EXISTS `companies-email-templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies-email-templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from` varchar(300) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `to` varchar(300) DEFAULT NULL,
  `subject` varchar(200) DEFAULT NULL,
  `message` text,
  `companyId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies-email-templates`
--

LOCK TABLES `companies-email-templates` WRITE;
/*!40000 ALTER TABLE `companies-email-templates` DISABLE KEYS */;
INSERT INTO `companies-email-templates` VALUES (1,'Supplier Contact<supplier-contact@gmail.com>','Contract 140/2017','Customer Contact<customer-contact@gmail.com>','Invoice  {{InvoiceNumber}} from  {{SupplierName}} ','The invoice&nbsp;&nbsp;<strong>{{InvoiceNumber}}</strong> from&nbsp;&nbsp;<strong>{{InvoiceDate}}</strong> was generated for&nbsp;&nbsp;<strong>{{PreviousMonthName}}</strong>&nbsp; activity, based on contract <strong>140/2017</strong>.<br />\n<br />\nBest regards,<br />\n<strong>Supplier Contact</strong>',1),(2,'Supplier Contact<supplier-contact@gmail.com>','Contract 140/2017','Customer Contact<customer-contact@gmail.com>','Invoice  {{InvoiceNumber}} from  {{SupplierName}}','The invoice&nbsp;&nbsp;<strong>{{InvoiceNumber}}</strong> from&nbsp;&nbsp;<strong>{{InvoiceDate}}</strong> was generated for&nbsp;&nbsp;<strong>{{PreviousMonthName}}</strong>&nbsp; activity, based on contract <strong>140/2017</strong>.<br />\n<br />\nBest regards,<br />\n<strong>Supplier Contact</strong>',5);
/*!40000 ALTER TABLE `companies-email-templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies-emails`
--

DROP TABLE IF EXISTS `companies-emails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies-emails` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `companyId` mediumint(9) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies-emails`
--

LOCK TABLES `companies-emails` WRITE;
/*!40000 ALTER TABLE `companies-emails` DISABLE KEYS */;
INSERT INTO `companies-emails` VALUES (1,'Admin','test@gmail.com',1);
/*!40000 ALTER TABLE `companies-emails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies-phones`
--

DROP TABLE IF EXISTS `companies-phones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies-phones` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `phone` varchar(100) DEFAULT NULL,
  `companyId` mediumint(9) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies-phones`
--

LOCK TABLES `companies-phones` WRITE;
/*!40000 ALTER TABLE `companies-phones` DISABLE KEYS */;
INSERT INTO `companies-phones` VALUES (1,'24589663',1,'Admin');
/*!40000 ALTER TABLE `companies-phones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `countries` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  `nameInvariant` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `countryInvariant_UNIQUE` (`nameInvariant`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=307 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (6,'Belgium','Belgium'),(8,'Croatia','Croatia'),(9,'Czech Republic','Czech Republic'),(15,'Turkey','Turkey'),(23,'Sweden','Sweden'),(42,'Netherlands','Netherlands'),(50,'Denmark','Denmark'),(52,'Italy','Italy'),(53,'Iceland','Iceland'),(55,'Finland','Finland'),(62,'Portugal','Portugal'),(68,'Hungary','Hungary'),(141,'Germany','Germany'),(144,'Slovenia','Slovenia'),(150,'Russia','Russia'),(151,'Cyprus','Cyprus'),(157,'France','France'),(169,'Ukraine','Ukraine'),(179,'Spain','Spain'),(180,'Switzerland','Switzerland'),(186,'Serbia','Serbia'),(193,'Bulgaria','Bulgaria'),(197,'Slovakia','Slovakia'),(203,'Ireland','Ireland'),(205,'Moldova','Moldova'),(211,'Poland','Poland'),(218,'Greece','Greece'),(225,'Austria','Austria'),(237,'Norway','Norway'),(261,'Romania','Romania'),(267,'Albania','Albania'),(268,'Andorra','Andorra'),(269,'Armenia','Armenia'),(270,'Azerbaijan','Azerbaijan'),(271,'Belarus','Belarus'),(283,'Bosnia And Herzegovina','Bosnia And Herzegovina'),(284,'Estonia','Estonia'),(285,'Georgia','Georgia'),(289,'Liechtenstein','Liechtenstein'),(290,'Lithuania','Lithuania'),(291,'Luxembourg','Luxembourg'),(292,'Macedonia','Macedonia'),(306,'United Kingdom','United Kingdom');
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ownerId` int(11) NOT NULL,
  `supplierDeliveryAddressId` int(11) DEFAULT NULL,
  `supplierDeliveryAddress` varchar(200) DEFAULT NULL,
  `supplierDeliveryCounty` varchar(50) DEFAULT NULL,
  `supplierDeliveryCityId` int(11) DEFAULT NULL,
  `supplierDeliveryCountryId` int(11) DEFAULT NULL,
  `supplierBankAccountId` int(11) DEFAULT NULL,
  `supplierBank` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `serial` varchar(20) DEFAULT NULL,
  `number` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `customerName` int(11) NOT NULL,
  `customerDeliveryAddressId` int(11) DEFAULT NULL,
  `customerDeliveryAddress` varchar(200) DEFAULT NULL,
  `customerDeliveryCountryId` int(11) DEFAULT NULL,
  `customerDeliveryCounty` varchar(50) DEFAULT NULL,
  `customerDeliveryCityId` int(11) DEFAULT NULL,
  `customerBankAccountId` int(11) DEFAULT NULL,
  `customerBank` varchar(100) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `vatValue` float DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `currency` char(5) DEFAULT NULL,
  `vatRegistred` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `number_UNIQUE` (`number`,`ownerId`,`serial`),
  KEY `deliveryCountry` (`customerDeliveryCountryId`),
  KEY `customer` (`customerId`),
  KEY `deliveryCity` (`customerDeliveryCityId`),
  KEY `date` (`date`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (1,1,1,'Aleea Fizicienilor nr. 8','Sector 2',62,261,1,NULL,'2018-12-22','ES',1,5,0,7,'34 Bulevard street',141,'County 1',85,2,'ING',18583.2,0,1,NULL,'RON',0),(3,1,1,'Aleea Fizicienilor nr. 8','Sector 2',62,261,1,NULL,'2018-12-22','ES',2,5,0,7,'34 Bulevard street',141,'County 1',85,2,'ING',5528.5,882.702,1,NULL,'RON',1);
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices-details`
--

DROP TABLE IF EXISTS `invoices-details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoices-details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoiceId` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `description` text NOT NULL,
  `quantity` float DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `value` float DEFAULT NULL,
  `vat` float DEFAULT NULL,
  `vatValue` float DEFAULT NULL,
  `discount` float DEFAULT NULL,
  `discountValue` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invoices-details_invoices_id_fk` (`invoiceId`),
  CONSTRAINT `invoices-details_invoices_id_fk` FOREIGN KEY (`invoiceId`) REFERENCES `invoices` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices-details`
--

LOCK TABLES `invoices-details` WRITE;
/*!40000 ALTER TABLE `invoices-details` DISABLE KEYS */;
INSERT INTO `invoices-details` VALUES (1,1,1,'Service',4000,'EUR',4.6458,18583.2,0,0,0,0),(5,3,1,'Service',1000,'EUR',4.6458,4645.8,19,882.702,0,0);
/*!40000 ALTER TABLE `invoices-details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owners`
--

DROP TABLE IF EXISTS `owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `owners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyId` int(11) DEFAULT NULL,
  `socialCapital` varchar(20) DEFAULT NULL,
  `vatPercentsList` varchar(15) NOT NULL,
  `stampPath` varchar(300) DEFAULT NULL,
  `logoPath` varchar(300) DEFAULT NULL,
  `vatRegistred` tinyint(4) DEFAULT '0',
  `contactPhone` varchar(100) DEFAULT NULL,
  `contactEmail` varchar(200) DEFAULT NULL,
  `currencies` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `owener_company_idx` (`companyId`),
  CONSTRAINT `owener_company` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owners`
--

LOCK TABLES `owners` WRITE;
/*!40000 ALTER TABLE `owners` DISABLE KEYS */;
INSERT INTO `owners` VALUES (1,1,'200 RON','19','/upload/stamp-1.jpg','/upload/logo-1.png',1,'2458963','test@gmail.com','RON,EUR');
/*!40000 ALTER TABLE `owners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(250) DEFAULT NULL,
  `esteActiv` tinyint(4) DEFAULT NULL,
  `nume` varchar(100) DEFAULT NULL,
  `prenume` varchar(100) DEFAULT NULL,
  `numeComplet` varchar(300) DEFAULT NULL,
  `numeCompletInvariant` varchar(300) DEFAULT NULL,
  `resetLink` varchar(300) DEFAULT NULL,
  `esteAdmin` tinyint(4) DEFAULT '0',
  `CNP` varchar(13) DEFAULT NULL,
  `CiSeries` varchar(5) DEFAULT NULL,
  `CiNumber` varchar(10) DEFAULT NULL,
  `CiIssuedBy` varchar(20) DEFAULT NULL,
  `CiDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_uindex` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'bogdanim36@gmail.com',1,'Dragos','Popescu','Popescu Dragos',' Dragos','b91ae7e6-9940-4dfe-8681-9b6aa4cf1a6d',1,'2135136217624','JR','033428','Bucuresti, Sector 1','2015-12-03');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users-pw`
--

DROP TABLE IF EXISTS `users-pw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users-pw` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `password` varchar(30) DEFAULT NULL,
  `failedLogin` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `pass_users_fk_idx` (`userId`),
  CONSTRAINT `pass_users_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users-pw`
--

LOCK TABLES `users-pw` WRITE;
/*!40000 ALTER TABLE `users-pw` DISABLE KEYS */;
INSERT INTO `users-pw` VALUES (20,1,'test',0);
/*!40000 ALTER TABLE `users-pw` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-22  6:57:32
