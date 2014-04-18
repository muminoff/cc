
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
  `plan` varchar(45) NOT NULL,
  `name` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `users` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `paypal_payment_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
