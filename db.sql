
/*!40000 DROP DATABASE IF EXISTS `paypal`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `paypal` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `paypal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `available_plans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `desc` varchar(45) NOT NULL,
  `rate` decimal(5,1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `available_plans` VALUES (1,'lite','Lite - 1$ per user/month',1.0),(2,'standard','Standard - 1.5$ per user/month',1.5),(3,'standard_plus','Standard Plus - 2.0$ per user/month',2.0),(4,'advanced','Advanced - 3.0$ per user/month',3.0),(5,'messenger','Messenger - 0.8$ per user/month',0.8),(6,'clouddisk','CloudDisk - 0.8$ per user/month',0.8);
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchased_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `users` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `domain` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `purchased_services` VALUES (1,'sardor','hanbiro','sardor@hanbiro.com','korea','23598026',12,40,'sardor.mofficesuite.com'),(2,'user1','hanbiro','user1@hanbiro.com','korea','12355555',21,43,'user1.mofficesuite.com'),(3,'sardor','hanbiro','sardor@hanbiro.com','korea','23587',10,5,'sardor'),(4,'sardor','hanbiro','sardor@hanbiro.com','korea','23587',10,5,'sardor'),(5,'sardor','hanbiro','sardor@hanbiro.com','korea','23587',10,5,'sardor'),(6,'sardor','hanbiro','sardor@hanbiro.com','korea','23587',10,5,'sardor'),(7,'sardor','hanbiro','sardor@hanbiro.com','korea','23587',10,5,'sardor'),(8,'sardor','hanbiro','sardor@hanbiro.com','korea','23587',10,5,'sardor'),(9,'sardor','hanbiro','sardor@hanbiro.com','korea','23587',10,5,'sardor'),(10,'sardor','hanbiro','sardor@hanbiro.com','korea','23587',10,5,'sardor'),(11,'sardor','hanbiro','sardor@hanbiro.com','korea','23587',10,5,'sardor'),(12,'sardor','hanbiro','sardor@hanbiro.com','korea','23587',10,5,'sardor'),(13,'sardor','hanbiro','sardor@hanbiro.com','korea','23587',10,5,'sardor'),(14,'sardor','hanbiro','sardor@hanbiro.com','korea','23587',10,5,'sardor'),(15,'sardor','hanbiro','sardor@hanbiro.com','korea','23587',10,5,'sardor'),(16,'sardor','hanbiro','sardor@hanbiro.com','korea','23587',10,5,'sardor'),(17,'sardor','hanbiro','sardor@hanbiro.com','korea','23587',10,5,'sardor'),(18,'sardor','hanbiro','sardor@hanbiro.com','korea12345','23587',10,5,'sardor'),(19,'sardoraaaaaaaaaaaa','hanbiro','sardor@hanbiro.com','korea12345','23587',10,5,'sardor');
