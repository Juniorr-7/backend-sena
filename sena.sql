-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: sena
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accesos`
--

DROP TABLE IF EXISTS `accesos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accesos` (
  `idAcceso` int NOT NULL AUTO_INCREMENT,
  `token` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idUsuario` int NOT NULL,
  `fechaIngreso` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `fechaSalida` datetime(3) DEFAULT NULL,
  `estado` enum('activo','inactivo') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'activo',
  PRIMARY KEY (`idAcceso`),
  KEY `accesos_idUsuario_fkey` (`idUsuario`),
  CONSTRAINT `accesos_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accesos`
--

LOCK TABLES `accesos` WRITE;
/*!40000 ALTER TABLE `accesos` DISABLE KEYS */;
/*!40000 ALTER TABLE `accesos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ambientes`
--

DROP TABLE IF EXISTS `ambientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ambientes` (
  `idAmbiente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idMunicipio` int NOT NULL,
  `idSede` int NOT NULL,
  PRIMARY KEY (`idAmbiente`),
  KEY `ambientes_idMunicipio_fkey` (`idMunicipio`),
  KEY `ambientes_idSede_fkey` (`idSede`),
  CONSTRAINT `ambientes_idMunicipio_fkey` FOREIGN KEY (`idMunicipio`) REFERENCES `municipios` (`idMunicipio`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ambientes_idSede_fkey` FOREIGN KEY (`idSede`) REFERENCES `sedes` (`idSede`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ambientes`
--

LOCK TABLES `ambientes` WRITE;
/*!40000 ALTER TABLE `ambientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `ambientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aplicativos`
--

DROP TABLE IF EXISTS `aplicativos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aplicativos` (
  `idAplicativo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`idAplicativo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aplicativos`
--

LOCK TABLES `aplicativos` WRITE;
/*!40000 ALTER TABLE `aplicativos` DISABLE KEYS */;
INSERT INTO `aplicativos` VALUES (1,'root');
/*!40000 ALTER TABLE `aplicativos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas` (
  `idArea` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idSede` int NOT NULL,
  PRIMARY KEY (`idArea`),
  KEY `areas_idSede_fkey` (`idSede`),
  CONSTRAINT `areas_idSede_fkey` FOREIGN KEY (`idSede`) REFERENCES `sedes` (`idSede`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas`
--

LOCK TABLES `areas` WRITE;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `centroformacion`
--

DROP TABLE IF EXISTS `centroformacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `centroformacion` (
  `idCentro` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`idCentro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `centroformacion`
--

LOCK TABLES `centroformacion` WRITE;
/*!40000 ALTER TABLE `centroformacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `centroformacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `idCurso` int NOT NULL AUTO_INCREMENT,
  `codigo` int NOT NULL,
  `fechaInicio` datetime(3) NOT NULL,
  `fechaFin` datetime(3) NOT NULL,
  `finLectiva` datetime(3) NOT NULL,
  `idArea` int NOT NULL,
  `idPrograma` int NOT NULL,
  `idPersona` int NOT NULL,
  PRIMARY KEY (`idCurso`),
  UNIQUE KEY `cursos_idPersona_key` (`idPersona`),
  KEY `cursos_idArea_fkey` (`idArea`),
  KEY `cursos_idPrograma_fkey` (`idPrograma`),
  CONSTRAINT `cursos_idArea_fkey` FOREIGN KEY (`idArea`) REFERENCES `areas` (`idArea`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `cursos_idPersona_fkey` FOREIGN KEY (`idPersona`) REFERENCES `personas` (`idPersona`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `cursos_idPrograma_fkey` FOREIGN KEY (`idPrograma`) REFERENCES `programas` (`idPrograma`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamentos`
--

DROP TABLE IF EXISTS `departamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamentos` (
  `idDepartamento` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`idDepartamento`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamentos`
--

LOCK TABLES `departamentos` WRITE;
/*!40000 ALTER TABLE `departamentos` DISABLE KEYS */;
INSERT INTO `departamentos` VALUES (5,'ANTIOQUIA'),(8,'ATLÁNTICO'),(11,'BOGOTÁ, D.C.'),(13,'BOLÍVAR'),(15,'BOYACÁ'),(17,'CALDAS'),(18,'CAQUETÁ'),(19,'CAUCA'),(20,'CESAR'),(23,'CÓRDOBA'),(25,'CUNDINAMARCA'),(27,'CHOCÓ'),(41,'HUILA'),(44,'LA GUAJIRA'),(47,'MAGDALENA'),(50,'META'),(52,'NARIÑO'),(54,'NORTE DE SANTANDER'),(63,'QUINDIO'),(66,'RISARALDA'),(68,'SANTANDER'),(70,'SUCRE'),(73,'TOLIMA'),(76,'VALLE DEL CAUCA'),(81,'ARAUCA'),(85,'CASANARE'),(86,'PUTUMAYO'),(88,'ARCHIPIÉLAGO DE SAN ANDRÉS Y PROVIDENCIA'),(91,'AMAZONAS'),(94,'GUAINÍA'),(95,'GUAVIARE'),(97,'VAUPÉS'),(99,'VICHADA');
/*!40000 ALTER TABLE `departamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matriculas`
--

DROP TABLE IF EXISTS `matriculas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matriculas` (
  `idMatricula` int NOT NULL AUTO_INCREMENT,
  `idPersona` int NOT NULL,
  `idCurso` int NOT NULL,
  PRIMARY KEY (`idMatricula`),
  UNIQUE KEY `matriculas_idPersona_key` (`idPersona`),
  KEY `matriculas_idCurso_fkey` (`idCurso`),
  CONSTRAINT `matriculas_idCurso_fkey` FOREIGN KEY (`idCurso`) REFERENCES `cursos` (`idCurso`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `matriculas_idPersona_fkey` FOREIGN KEY (`idPersona`) REFERENCES `personas` (`idPersona`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matriculas`
--

LOCK TABLES `matriculas` WRITE;
/*!40000 ALTER TABLE `matriculas` DISABLE KEYS */;
/*!40000 ALTER TABLE `matriculas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulos`
--

DROP TABLE IF EXISTS `modulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modulos` (
  `idModulo` int NOT NULL AUTO_INCREMENT,
  `idAplicativo` int NOT NULL,
  `modulo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`idModulo`),
  KEY `modulos_idAplicativo_fkey` (`idAplicativo`),
  CONSTRAINT `modulos_idAplicativo_fkey` FOREIGN KEY (`idAplicativo`) REFERENCES `aplicativos` (`idAplicativo`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulos`
--

LOCK TABLES `modulos` WRITE;
/*!40000 ALTER TABLE `modulos` DISABLE KEYS */;
INSERT INTO `modulos` VALUES (1,1,'Módulos'),(2,1,'Rutas'),(3,1,'Permisos'),(4,1,'Roles'),(5,1,'Usuarios'),(6,1,'Personas'),(7,1,'Administración'),(8,1,'Localizaciones'),(9,1,'Aplicativos');
/*!40000 ALTER TABLE `modulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `municipios`
--

DROP TABLE IF EXISTS `municipios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `municipios` (
  `idMunicipio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idDepartamento` int NOT NULL,
  PRIMARY KEY (`idMunicipio`),
  KEY `municipios_idDepartamento_fkey` (`idDepartamento`),
  CONSTRAINT `municipios_idDepartamento_fkey` FOREIGN KEY (`idDepartamento`) REFERENCES `departamentos` (`idDepartamento`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `municipios`
--

LOCK TABLES `municipios` WRITE;
/*!40000 ALTER TABLE `municipios` DISABLE KEYS */;
INSERT INTO `municipios` VALUES (1,'Abriaquí',5),(2,'Acacías',50),(3,'Acandí',27),(4,'Acevedo',41),(5,'Achí',13),(6,'Agrado',41),(7,'Agua de Dios',25),(8,'Aguachica',20),(9,'Aguada',68),(10,'Aguadas',17),(11,'Aguazul',85),(12,'Agustín Codazzi',20),(13,'Aipe',41),(14,'Albania',18),(15,'Albania',44),(16,'Albania',68),(17,'Albán',25),(18,'Albán (San José)',52),(19,'Alcalá',76),(20,'Alejandria',5),(21,'Algarrobo',47),(22,'Algeciras',41),(23,'Almaguer',19),(24,'Almeida',15),(25,'Alpujarra',73),(26,'Altamira',41),(27,'Alto Baudó (Pie de Pato)',27),(28,'Altos del Rosario',13),(29,'Alvarado',73),(30,'Amagá',5),(31,'Amalfi',5),(32,'Ambalema',73),(33,'Anapoima',25),(34,'Ancuya',52),(35,'Andalucía',76),(36,'Andes',5),(37,'Angelópolis',5),(38,'Angostura',5),(39,'Anolaima',25),(40,'Anorí',5),(41,'Anserma',17),(42,'Ansermanuevo',76),(43,'Anzoátegui',73),(44,'Anzá',5),(45,'Apartadó',5),(46,'Apulo',25),(47,'Apía',66),(48,'Aquitania',15),(49,'Aracataca',47),(50,'Aranzazu',17),(51,'Aratoca',68),(52,'Arauca',81),(53,'Arauquita',81),(54,'Arbeláez',25),(55,'Arboleda (Berruecos)',52),(56,'Arboledas',54),(57,'Arboletes',5),(58,'Arcabuco',15),(59,'Arenal',13),(60,'Argelia',5),(61,'Argelia',19),(62,'Argelia',76),(63,'Ariguaní (El Difícil)',47),(64,'Arjona',13),(65,'Armenia',5),(66,'Armenia',63),(67,'Armero (Guayabal)',73),(68,'Arroyohondo',13),(69,'Astrea',20),(70,'Ataco',73),(71,'Atrato (Yuto)',27),(72,'Ayapel',23),(73,'Bagadó',27),(74,'Bahía Solano (Mútis)',27),(75,'Bajo Baudó (Pizarro)',27),(76,'Balboa',19),(77,'Balboa',66),(78,'Baranoa',8),(79,'Baraya',41),(80,'Barbacoas',52),(81,'Barbosa',5),(82,'Barbosa',68),(83,'Barichara',68),(84,'Barranca de Upía',50),(85,'Barrancabermeja',68),(86,'Barrancas',44),(87,'Barranco de Loba',13),(88,'Barranquilla',8),(89,'Becerríl',20),(90,'Belalcázar',17),(91,'Bello',5),(92,'Belmira',5),(93,'Beltrán',25),(94,'Belén',15),(95,'Belén',52),(96,'Belén de Bajirá',27),(97,'Belén de Umbría',66),(98,'Belén de los Andaquíes',18),(99,'Berbeo',15),(100,'Betania',5),(101,'Beteitiva',15),(102,'Betulia',5),(103,'Betulia',68),(104,'Bituima',25),(105,'Boavita',15),(106,'Bochalema',54),(107,'Bogotá D.C.',11),(108,'Bojacá',25),(109,'Bojayá (Bellavista)',27),(110,'Bolívar',5),(111,'Bolívar',19),(112,'Bolívar',68),(113,'Bolívar',76),(114,'Bosconia',20),(115,'Boyacá',15),(116,'Briceño',5),(117,'Briceño',15),(118,'Bucaramanga',68),(119,'Bucarasica',54),(120,'Buenaventura',76),(121,'Buenavista',15),(122,'Buenavista',23),(123,'Buenavista',63),(124,'Buenavista',70),(125,'Buenos Aires',19),(126,'Buesaco',52),(127,'Buga',76),(128,'Bugalagrande',76),(129,'Burítica',5),(130,'Busbanza',15),(131,'Cabrera',25),(132,'Cabrera',68),(133,'Cabuyaro',50),(134,'Cachipay',25),(135,'Caicedo',5),(136,'Caicedonia',76),(137,'Caimito',70),(138,'Cajamarca',73),(139,'Cajibío',19),(140,'Cajicá',25),(141,'Calamar',13),(142,'Calamar',95),(143,'Calarcá',63),(144,'Caldas',5),(145,'Caldas',15),(146,'Caldono',19),(147,'California',68),(148,'Calima (Darién)',76),(149,'Caloto',19),(150,'Calí',76),(151,'Campamento',5),(152,'Campo de la Cruz',8),(153,'Campoalegre',41),(154,'Campohermoso',15),(155,'Canalete',23),(156,'Candelaria',8),(157,'Candelaria',76),(158,'Cantagallo',13),(159,'Cantón de San Pablo',27),(160,'Caparrapí',25),(161,'Capitanejo',68),(162,'Caracolí',5),(163,'Caramanta',5),(164,'Carcasí',68),(165,'Carepa',5),(166,'Carmen de Apicalá',73),(167,'Carmen de Carupa',25),(168,'Carmen de Viboral',5),(169,'Carmen del Darién (CURBARADÓ)',27),(170,'Carolina',5),(171,'Cartagena',13),(172,'Cartagena del Chairá',18),(173,'Cartago',76),(174,'Carurú',97),(175,'Casabianca',73),(176,'Castilla la Nueva',50),(177,'Caucasia',5),(178,'Cañasgordas',5),(179,'Cepita',68),(180,'Cereté',23),(181,'Cerinza',15),(182,'Cerrito',68),(183,'Cerro San Antonio',47),(184,'Chachaguí',52),(185,'Chaguaní',25),(186,'Chalán',70),(187,'Chaparral',73),(188,'Charalá',68),(189,'Charta',68),(190,'Chigorodó',5),(191,'Chima',68),(192,'Chimichagua',20),(193,'Chimá',23),(194,'Chinavita',15),(195,'Chinchiná',17),(196,'Chinácota',54),(197,'Chinú',23),(198,'Chipaque',25),(199,'Chipatá',68),(200,'Chiquinquirá',15),(201,'Chiriguaná',20),(202,'Chiscas',15),(203,'Chita',15),(204,'Chitagá',54),(205,'Chitaraque',15),(206,'Chivatá',15),(207,'Chivolo',47),(208,'Choachí',25),(209,'Chocontá',25),(210,'Chámeza',85),(211,'Chía',25),(212,'Chíquiza',15),(213,'Chívor',15),(214,'Cicuco',13),(215,'Cimitarra',68),(216,'Circasia',63),(217,'Cisneros',5),(218,'Ciénaga',15),(219,'Ciénaga',47),(220,'Ciénaga de Oro',23),(221,'Clemencia',13),(222,'Cocorná',5),(223,'Coello',73),(224,'Cogua',25),(225,'Colombia',41),(226,'Colosó (Ricaurte)',70),(227,'Colón',86),(228,'Colón (Génova)',52),(229,'Concepción',5),(230,'Concepción',68),(231,'Concordia',5),(232,'Concordia',47),(233,'Condoto',27),(234,'Confines',68),(235,'Consaca',52),(236,'Contadero',52),(237,'Contratación',68),(238,'Convención',54),(239,'Copacabana',5),(240,'Coper',15),(241,'Cordobá',63),(242,'Corinto',19),(243,'Coromoro',68),(244,'Corozal',70),(245,'Corrales',15),(246,'Cota',25),(247,'Cotorra',23),(248,'Covarachía',15),(249,'Coveñas',70),(250,'Coyaima',73),(251,'Cravo Norte',81),(252,'Cuaspud (Carlosama)',52),(253,'Cubarral',50),(254,'Cubará',15),(255,'Cucaita',15),(256,'Cucunubá',25),(257,'Cucutilla',54),(258,'Cuitiva',15),(259,'Cumaral',50),(260,'Cumaribo',99),(261,'Cumbal',52),(262,'Cumbitara',52),(263,'Cunday',73),(264,'Curillo',18),(265,'Curití',68),(266,'Curumaní',20),(267,'Cáceres',5),(268,'Cáchira',54),(269,'Cácota',54),(270,'Cáqueza',25),(271,'Cértegui',27),(272,'Cómbita',15),(273,'Córdoba',13),(274,'Córdoba',52),(275,'Cúcuta',54),(276,'Dabeiba',5),(277,'Dagua',76),(278,'Dibulla',44),(279,'Distracción',44),(280,'Dolores',73),(281,'Don Matías',5),(282,'Dos Quebradas',66),(283,'Duitama',15),(284,'Durania',54),(285,'Ebéjico',5),(286,'El Bagre',5),(287,'El Banco',47),(288,'El Cairo',76),(289,'El Calvario',50),(290,'El Carmen',54),(291,'El Carmen',68),(292,'El Carmen de Atrato',27),(293,'El Carmen de Bolívar',13),(294,'El Castillo',50),(295,'El Cerrito',76),(296,'El Charco',52),(297,'El Cocuy',15),(298,'El Colegio',25),(299,'El Copey',20),(300,'El Doncello',18),(301,'El Dorado',50),(302,'El Dovio',76),(303,'El Espino',15),(304,'El Guacamayo',68),(305,'El Guamo',13),(306,'El Molino',44),(307,'El Paso',20),(308,'El Paujil',18),(309,'El Peñol',52),(310,'El Peñon',13),(311,'El Peñon',68),(312,'El Peñón',25),(313,'El Piñon',47),(314,'El Playón',68),(315,'El Retorno',95),(316,'El Retén',47),(317,'El Roble',70),(318,'El Rosal',25),(319,'El Rosario',52),(320,'El Tablón de Gómez',52),(321,'El Tambo',19),(322,'El Tambo',52),(323,'El Tarra',54),(324,'El Zulia',54),(325,'El Águila',76),(326,'Elías',41),(327,'Encino',68),(328,'Enciso',68),(329,'Entrerríos',5),(330,'Envigado',5),(331,'Espinal',73),(332,'Facatativá',25),(333,'Falan',73),(334,'Filadelfia',17),(335,'Filandia',63),(336,'Firavitoba',15),(337,'Flandes',73),(338,'Florencia',18),(339,'Florencia',19),(340,'Floresta',15),(341,'Florida',76),(342,'Floridablanca',68),(343,'Florián',68),(344,'Fonseca',44),(345,'Fortúl',81),(346,'Fosca',25),(347,'Francisco Pizarro',52),(348,'Fredonia',5),(349,'Fresno',73),(350,'Frontino',5),(351,'Fuente de Oro',50),(352,'Fundación',47),(353,'Funes',52),(354,'Funza',25),(355,'Fusagasugá',25),(356,'Fómeque',25),(357,'Fúquene',25),(358,'Gachalá',25),(359,'Gachancipá',25),(360,'Gachantivá',15),(361,'Gachetá',25),(362,'Galapa',8),(363,'Galeras (Nueva Granada)',70),(364,'Galán',68),(365,'Gama',25),(366,'Gamarra',20),(367,'Garagoa',15),(368,'Garzón',41),(369,'Gigante',41),(370,'Ginebra',76),(371,'Giraldo',5),(372,'Girardot',25),(373,'Girardota',5),(374,'Girón',68),(375,'Gonzalez',20),(376,'Gramalote',54),(377,'Granada',5),(378,'Granada',25),(379,'Granada',50),(380,'Guaca',68),(381,'Guacamayas',15),(382,'Guacarí',76),(383,'Guachavés',52),(384,'Guachené',19),(385,'Guachetá',25),(386,'Guachucal',52),(387,'Guadalupe',5),(388,'Guadalupe',41),(389,'Guadalupe',68),(390,'Guaduas',25),(391,'Guaitarilla',52),(392,'Gualmatán',52),(393,'Guamal',47),(394,'Guamal',50),(395,'Guamo',73),(396,'Guapota',68),(397,'Guapí',19),(398,'Guaranda',70),(399,'Guarne',5),(400,'Guasca',25),(401,'Guatapé',5),(402,'Guataquí',25),(403,'Guatavita',25),(404,'Guateque',15),(405,'Guavatá',68),(406,'Guayabal de Siquima',25),(407,'Guayabetal',25),(408,'Guayatá',15),(409,'Guepsa',68),(410,'Guicán',15),(411,'Gutiérrez',25),(412,'Guática',66),(413,'Gámbita',68),(414,'Gámeza',15),(415,'Génova',63),(416,'Gómez Plata',5),(417,'Hacarí',54),(418,'Hatillo de Loba',13),(419,'Hato',68),(420,'Hato Corozal',85),(421,'Hatonuevo',44),(422,'Heliconia',5),(423,'Herrán',54),(424,'Herveo',73),(425,'Hispania',5),(426,'Hobo',41),(427,'Honda',73),(428,'Ibagué',73),(429,'Icononzo',73),(430,'Iles',52),(431,'Imúes',52),(432,'Inzá',19),(433,'Inírida',94),(434,'Ipiales',52),(435,'Isnos',41),(436,'Istmina',27),(437,'Itagüí',5),(438,'Ituango',5),(439,'Izá',15),(440,'Jambaló',19),(441,'Jamundí',76),(442,'Jardín',5),(443,'Jenesano',15),(444,'Jericó',5),(445,'Jericó',15),(446,'Jerusalén',25),(447,'Jesús María',68),(448,'Jordán',68),(449,'Juan de Acosta',8),(450,'Junín',25),(451,'Juradó',27),(452,'La Apartada y La Frontera',23),(453,'La Argentina',41),(454,'La Belleza',68),(455,'La Calera',25),(456,'La Capilla',15),(457,'La Ceja',5),(458,'La Celia',66),(459,'La Cruz',52),(460,'La Cumbre',76),(461,'La Dorada',17),(462,'La Esperanza',54),(463,'La Estrella',5),(464,'La Florida',52),(465,'La Gloria',20),(466,'La Jagua de Ibirico',20),(467,'La Jagua del Pilar',44),(468,'La Llanada',52),(469,'La Macarena',50),(470,'La Merced',17),(471,'La Mesa',25),(472,'La Montañita',18),(473,'La Palma',25),(474,'La Paz',68),(475,'La Paz (Robles)',20),(476,'La Peña',25),(477,'La Pintada',5),(478,'La Plata',41),(479,'La Playa',54),(480,'La Primavera',99),(481,'La Salina',85),(482,'La Sierra',19),(483,'La Tebaida',63),(484,'La Tola',52),(485,'La Unión',5),(486,'La Unión',52),(487,'La Unión',70),(488,'La Unión',76),(489,'La Uvita',15),(490,'La Vega',19),(491,'La Vega',25),(492,'La Victoria',15),(493,'La Victoria',17),(494,'La Victoria',76),(495,'La Virginia',66),(496,'Labateca',54),(497,'Labranzagrande',15),(498,'Landázuri',68),(499,'Lebrija',68),(500,'Leiva',52),(501,'Lejanías',50),(502,'Lenguazaque',25),(503,'Leticia',91),(504,'Liborina',5),(505,'Linares',52),(506,'Lloró',27),(507,'Lorica',23),(508,'Los Córdobas',23),(509,'Los Palmitos',70),(510,'Los Patios',54),(511,'Los Santos',68),(512,'Lourdes',54),(513,'Luruaco',8),(514,'Lérida',73),(515,'Líbano',73),(516,'López (Micay)',19),(517,'Macanal',15),(518,'Macaravita',68),(519,'Maceo',5),(520,'Machetá',25),(521,'Madrid',25),(522,'Magangué',13),(523,'Magüi (Payán)',52),(524,'Mahates',13),(525,'Maicao',44),(526,'Majagual',70),(527,'Malambo',8),(528,'Mallama (Piedrancha)',52),(529,'Manatí',8),(530,'Manaure',44),(531,'Manaure Balcón del Cesar',20),(532,'Manizales',17),(533,'Manta',25),(534,'Manzanares',17),(535,'Maní',85),(536,'Mapiripan',50),(537,'Margarita',13),(538,'Marinilla',5),(539,'Maripí',15),(540,'Mariquita',73),(541,'Marmato',17),(542,'Marquetalia',17),(543,'Marsella',66),(544,'Marulanda',17),(545,'María la Baja',13),(546,'Matanza',68),(547,'Medellín',5),(548,'Medina',25),(549,'Medio Atrato',27),(550,'Medio Baudó',27),(551,'Medio San Juan (ANDAGOYA)',27),(552,'Melgar',73),(553,'Mercaderes',19),(554,'Mesetas',50),(555,'Milán',18),(556,'Miraflores',15),(557,'Miraflores',95),(558,'Miranda',19),(559,'Mistrató',66),(560,'Mitú',97),(561,'Mocoa',86),(562,'Mogotes',68),(563,'Molagavita',68),(564,'Momil',23),(565,'Mompós',13),(566,'Mongua',15),(567,'Monguí',15),(568,'Moniquirá',15),(569,'Montebello',5),(570,'Montecristo',13),(571,'Montelíbano',23),(572,'Montenegro',63),(573,'Monteria',23),(574,'Monterrey',85),(575,'Morales',13),(576,'Morales',19),(577,'Morelia',18),(578,'Morroa',70),(579,'Mosquera',25),(580,'Mosquera',52),(581,'Motavita',15),(582,'Moñitos',23),(583,'Murillo',73),(584,'Murindó',5),(585,'Mutatá',5),(586,'Mutiscua',54),(587,'Muzo',15),(588,'Málaga',68),(589,'Nariño',5),(590,'Nariño',25),(591,'Nariño',52),(592,'Natagaima',73),(593,'Nechí',5),(594,'Necoclí',5),(595,'Neira',17),(596,'Neiva',41),(597,'Nemocón',25),(598,'Nilo',25),(599,'Nimaima',25),(600,'Nobsa',15),(601,'Nocaima',25),(602,'Norcasia',17),(603,'Norosí',13),(604,'Novita',27),(605,'Nueva Granada',47),(606,'Nuevo Colón',15),(607,'Nunchía',85),(608,'Nuquí',27),(609,'Nátaga',41),(610,'Obando',76),(611,'Ocamonte',68),(612,'Ocaña',54),(613,'Oiba',68),(614,'Oicatá',15),(615,'Olaya',5),(616,'Olaya Herrera',52),(617,'Onzaga',68),(618,'Oporapa',41),(619,'Orito',86),(620,'Orocué',85),(621,'Ortega',73),(622,'Ospina',52),(623,'Otanche',15),(624,'Ovejas',70),(625,'Pachavita',15),(626,'Pacho',25),(627,'Padilla',19),(628,'Paicol',41),(629,'Pailitas',20),(630,'Paime',25),(631,'Paipa',15),(632,'Pajarito',15),(633,'Palermo',41),(634,'Palestina',17),(635,'Palestina',41),(636,'Palmar',68),(637,'Palmar de Varela',8),(638,'Palmas del Socorro',68),(639,'Palmira',76),(640,'Palmito',70),(641,'Palocabildo',73),(642,'Pamplona',54),(643,'Pamplonita',54),(644,'Pandi',25),(645,'Panqueba',15),(646,'Paratebueno',25),(647,'Pasca',25),(648,'Patía (El Bordo)',19),(649,'Pauna',15),(650,'Paya',15),(651,'Paz de Ariporo',85),(652,'Paz de Río',15),(653,'Pedraza',47),(654,'Pelaya',20),(655,'Pensilvania',17),(656,'Peque',5),(657,'Pereira',66),(658,'Pesca',15),(659,'Peñol',5),(660,'Piamonte',19),(661,'Pie de Cuesta',68),(662,'Piedras',73),(663,'Piendamó',19),(664,'Pijao',63),(665,'Pijiño',47),(666,'Pinchote',68),(667,'Pinillos',13),(668,'Piojo',8),(669,'Pisva',15),(670,'Pital',41),(671,'Pitalito',41),(672,'Pivijay',47),(673,'Planadas',73),(674,'Planeta Rica',23),(675,'Plato',47),(676,'Policarpa',52),(677,'Polonuevo',8),(678,'Ponedera',8),(679,'Popayán',19),(680,'Pore',85),(681,'Potosí',52),(682,'Pradera',76),(683,'Prado',73),(684,'Providencia',52),(685,'Providencia',88),(686,'Pueblo Bello',20),(687,'Pueblo Nuevo',23),(688,'Pueblo Rico',66),(689,'Pueblorrico',5),(690,'Puebloviejo',47),(691,'Puente Nacional',68),(692,'Puerres',52),(693,'Puerto Asís',86),(694,'Puerto Berrío',5),(695,'Puerto Boyacá',15),(696,'Puerto Caicedo',86),(697,'Puerto Carreño',99),(698,'Puerto Colombia',8),(699,'Puerto Concordia',50),(700,'Puerto Escondido',23),(701,'Puerto Gaitán',50),(702,'Puerto Guzmán',86),(703,'Puerto Leguízamo',86),(704,'Puerto Libertador',23),(705,'Puerto Lleras',50),(706,'Puerto López',50),(707,'Puerto Nare',5),(708,'Puerto Nariño',91),(709,'Puerto Parra',68),(710,'Puerto Rico',18),(711,'Puerto Rico',50),(712,'Puerto Rondón',81),(713,'Puerto Salgar',25),(714,'Puerto Santander',54),(715,'Puerto Tejada',19),(716,'Puerto Triunfo',5),(717,'Puerto Wilches',68),(718,'Pulí',25),(719,'Pupiales',52),(720,'Puracé (Coconuco)',19),(721,'Purificación',73),(722,'Purísima',23),(723,'Pácora',17),(724,'Páez',15),(725,'Páez (Belalcazar)',19),(726,'Páramo',68),(727,'Quebradanegra',25),(728,'Quetame',25),(729,'Quibdó',27),(730,'Quimbaya',63),(731,'Quinchía',66),(732,'Quipama',15),(733,'Quipile',25),(734,'Ragonvalia',54),(735,'Ramiriquí',15),(736,'Recetor',85),(737,'Regidor',13),(738,'Remedios',5),(739,'Remolino',47),(740,'Repelón',8),(741,'Restrepo',50),(742,'Restrepo',76),(743,'Retiro',5),(744,'Ricaurte',25),(745,'Ricaurte',52),(746,'Rio Negro',68),(747,'Rioblanco',73),(748,'Riofrío',76),(749,'Riohacha',44),(750,'Risaralda',17),(751,'Rivera',41),(752,'Roberto Payán (San José)',52),(753,'Roldanillo',76),(754,'Roncesvalles',73),(755,'Rondón',15),(756,'Rosas',19),(757,'Rovira',73),(758,'Ráquira',15),(759,'Río Iró',27),(760,'Río Quito',27),(761,'Río Sucio',17),(762,'Río Viejo',13),(763,'Río de oro',20),(764,'Ríonegro',5),(765,'Ríosucio',27),(766,'Sabana de Torres',68),(767,'Sabanagrande',8),(768,'Sabanalarga',5),(769,'Sabanalarga',8),(770,'Sabanalarga',85),(771,'Sabanas de San Angel (SAN ANGEL)',47),(772,'Sabaneta',5),(773,'Saboyá',15),(774,'Sahagún',23),(775,'Saladoblanco',41),(776,'Salamina',17),(777,'Salamina',47),(778,'Salazar',54),(779,'Saldaña',73),(780,'Salento',63),(781,'Salgar',5),(782,'Samacá',15),(783,'Samaniego',52),(784,'Samaná',17),(785,'Sampués',70),(786,'San Agustín',41),(787,'San Alberto',20),(788,'San Andrés',68),(789,'San Andrés Sotavento',23),(790,'San Andrés de Cuerquía',5),(791,'San Antero',23),(792,'San Antonio',73),(793,'San Antonio de Tequendama',25),(794,'San Benito',68),(795,'San Benito Abad',70),(796,'San Bernardo',25),(797,'San Bernardo',52),(798,'San Bernardo del Viento',23),(799,'San Calixto',54),(800,'San Carlos',5),(801,'San Carlos',23),(802,'San Carlos de Guaroa',50),(803,'San Cayetano',25),(804,'San Cayetano',54),(805,'San Cristobal',13),(806,'San Diego',20),(807,'San Eduardo',15),(808,'San Estanislao',13),(809,'San Fernando',13),(810,'San Francisco',5),(811,'San Francisco',25),(812,'San Francisco',86),(813,'San Gíl',68),(814,'San Jacinto',13),(815,'San Jacinto del Cauca',13),(816,'San Jerónimo',5),(817,'San Joaquín',68),(818,'San José',17),(819,'San José de Miranda',68),(820,'San José de Montaña',5),(821,'San José de Pare',15),(822,'San José de Uré',23),(823,'San José del Fragua',18),(824,'San José del Guaviare',95),(825,'San José del Palmar',27),(826,'San Juan de Arama',50),(827,'San Juan de Betulia',70),(828,'San Juan de Nepomuceno',13),(829,'San Juan de Pasto',52),(830,'San Juan de Río Seco',25),(831,'San Juan de Urabá',5),(832,'San Juan del Cesar',44),(833,'San Juanito',50),(834,'San Lorenzo',52),(835,'San Luis',73),(836,'San Luís',5),(837,'San Luís de Gaceno',15),(838,'San Luís de Palenque',85),(839,'San Marcos',70),(840,'San Martín',20),(841,'San Martín',50),(842,'San Martín de Loba',13),(843,'San Mateo',15),(844,'San Miguel',68),(845,'San Miguel',86),(846,'San Miguel de Sema',15),(847,'San Onofre',70),(848,'San Pablo',13),(849,'San Pablo',52),(850,'San Pablo de Borbur',15),(851,'San Pedro',5),(852,'San Pedro',70),(853,'San Pedro',76),(854,'San Pedro de Cartago',52),(855,'San Pedro de Urabá',5),(856,'San Pelayo',23),(857,'San Rafael',5),(858,'San Roque',5),(859,'San Sebastián',19),(860,'San Sebastián de Buenavista',47),(861,'San Vicente',5),(862,'San Vicente del Caguán',18),(863,'San Vicente del Chucurí',68),(864,'San Zenón',47),(865,'Sandoná',52),(866,'Santa Ana',47),(867,'Santa Bárbara',5),(868,'Santa Bárbara',68),(869,'Santa Bárbara (Iscuandé)',52),(870,'Santa Bárbara de Pinto',47),(871,'Santa Catalina',13),(872,'Santa Fé de Antioquia',5),(873,'Santa Genoveva de Docorodó',27),(874,'Santa Helena del Opón',68),(875,'Santa Isabel',73),(876,'Santa Lucía',8),(877,'Santa Marta',47),(878,'Santa María',15),(879,'Santa María',41),(880,'Santa Rosa',13),(881,'Santa Rosa',19),(882,'Santa Rosa de Cabal',66),(883,'Santa Rosa de Osos',5),(884,'Santa Rosa de Viterbo',15),(885,'Santa Rosa del Sur',13),(886,'Santa Rosalía',99),(887,'Santa Sofía',15),(888,'Santana',15),(889,'Santander de Quilichao',19),(890,'Santiago',54),(891,'Santiago',86),(892,'Santo Domingo',5),(893,'Santo Tomás',8),(894,'Santuario',5),(895,'Santuario',66),(896,'Sapuyes',52),(897,'Saravena',81),(898,'Sardinata',54),(899,'Sasaima',25),(900,'Sativanorte',15),(901,'Sativasur',15),(902,'Segovia',5),(903,'Sesquilé',25),(904,'Sevilla',76),(905,'Siachoque',15),(906,'Sibaté',25),(907,'Sibundoy',86),(908,'Silos',54),(909,'Silvania',25),(910,'Silvia',19),(911,'Simacota',68),(912,'Simijaca',25),(913,'Simití',13),(914,'Sincelejo',70),(915,'Sincé',70),(916,'Sipí',27),(917,'Sitionuevo',47),(918,'Soacha',25),(919,'Soatá',15),(920,'Socha',15),(921,'Socorro',68),(922,'Socotá',15),(923,'Sogamoso',15),(924,'Solano',18),(925,'Soledad',8),(926,'Solita',18),(927,'Somondoco',15),(928,'Sonsón',5),(929,'Sopetrán',5),(930,'Soplaviento',13),(931,'Sopó',25),(932,'Sora',15),(933,'Soracá',15),(934,'Sotaquirá',15),(935,'Sotara (Paispamba)',19),(936,'Sotomayor (Los Andes)',52),(937,'Suaita',68),(938,'Suan',8),(939,'Suaza',41),(940,'Subachoque',25),(941,'Sucre',19),(942,'Sucre',68),(943,'Sucre',70),(944,'Suesca',25),(945,'Supatá',25),(946,'Supía',17),(947,'Suratá',68),(948,'Susa',25),(949,'Susacón',15),(950,'Sutamarchán',15),(951,'Sutatausa',25),(952,'Sutatenza',15),(953,'Suárez',19),(954,'Suárez',73),(955,'Sácama',85),(956,'Sáchica',15),(957,'Tabio',25),(958,'Tadó',27),(959,'Talaigua Nuevo',13),(960,'Tamalameque',20),(961,'Tame',81),(962,'Taminango',52),(963,'Tangua',52),(964,'Taraira',97),(965,'Tarazá',5),(966,'Tarqui',41),(967,'Tarso',5),(968,'Tasco',15),(969,'Tauramena',85),(970,'Tausa',25),(971,'Tello',41),(972,'Tena',25),(973,'Tenerife',47),(974,'Tenjo',25),(975,'Tenza',15),(976,'Teorama',54),(977,'Teruel',41),(978,'Tesalia',41),(979,'Tibacuy',25),(980,'Tibaná',15),(981,'Tibasosa',15),(982,'Tibirita',25),(983,'Tibú',54),(984,'Tierralta',23),(985,'Timaná',41),(986,'Timbiquí',19),(987,'Timbío',19),(988,'Tinjacá',15),(989,'Tipacoque',15),(990,'Tiquisio (Puerto Rico)',13),(991,'Titiribí',5),(992,'Toca',15),(993,'Tocaima',25),(994,'Tocancipá',25),(995,'Toguí',15),(996,'Toledo',5),(997,'Toledo',54),(998,'Tolú',70),(999,'Tolú Viejo',70),(1000,'Tona',68),(1001,'Topagá',15),(1002,'Topaipí',25),(1003,'Toribío',19),(1004,'Toro',76),(1005,'Tota',15),(1006,'Totoró',19),(1007,'Trinidad',85),(1008,'Trujillo',76),(1009,'Tubará',8),(1010,'Tuchín',23),(1011,'Tulúa',76),(1012,'Tumaco',52),(1013,'Tunja',15),(1014,'Tunungua',15),(1015,'Turbaco',13),(1016,'Turbaná',13),(1017,'Turbo',5),(1018,'Turmequé',15),(1019,'Tuta',15),(1020,'Tutasá',15),(1021,'Támara',85),(1022,'Támesis',5),(1023,'Túquerres',52),(1024,'Ubalá',25),(1025,'Ubaque',25),(1026,'Ubaté',25),(1027,'Ulloa',76),(1028,'Une',25),(1029,'Unguía',27),(1030,'Unión Panamericana (ÁNIMAS)',27),(1031,'Uramita',5),(1032,'Uribe',50),(1033,'Uribia',44),(1034,'Urrao',5),(1035,'Urumita',44),(1036,'Usiacuri',8),(1037,'Valdivia',5),(1038,'Valencia',23),(1039,'Valle de San José',68),(1040,'Valle de San Juan',73),(1041,'Valle del Guamuez',86),(1042,'Valledupar',20),(1043,'Valparaiso',5),(1044,'Valparaiso',18),(1045,'Vegachí',5),(1046,'Venadillo',73),(1047,'Venecia',5),(1048,'Venecia (Ospina Pérez)',25),(1049,'Ventaquemada',15),(1050,'Vergara',25),(1051,'Versalles',76),(1052,'Vetas',68),(1053,'Viani',25),(1054,'Vigía del Fuerte',5),(1055,'Vijes',76),(1056,'Villa Caro',54),(1057,'Villa Rica',19),(1058,'Villa de Leiva',15),(1059,'Villa del Rosario',54),(1060,'Villagarzón',86),(1061,'Villagómez',25),(1062,'Villahermosa',73),(1063,'Villamaría',17),(1064,'Villanueva',13),(1065,'Villanueva',44),(1066,'Villanueva',68),(1067,'Villanueva',85),(1068,'Villapinzón',25),(1069,'Villarrica',73),(1070,'Villavicencio',50),(1071,'Villavieja',41),(1072,'Villeta',25),(1073,'Viotá',25),(1074,'Viracachá',15),(1075,'Vista Hermosa',50),(1076,'Viterbo',17),(1077,'Vélez',68),(1078,'Yacopí',25),(1079,'Yacuanquer',52),(1080,'Yaguará',41),(1081,'Yalí',5),(1082,'Yarumal',5),(1083,'Yolombó',5),(1084,'Yondó (Casabe)',5),(1085,'Yopal',85),(1086,'Yotoco',76),(1087,'Yumbo',76),(1088,'Zambrano',13),(1089,'Zapatoca',68),(1090,'Zapayán (PUNTA DE PIEDRAS)',47),(1091,'Zaragoza',5),(1092,'Zarzal',76),(1093,'Zetaquirá',15),(1094,'Zipacón',25),(1095,'Zipaquirá',25),(1096,'Zona Bananera (PRADO - SEVILLA)',47),(1097,'Ábrego',54),(1098,'Íquira',41),(1099,'Úmbita',15),(1100,'Útica',25);
/*!40000 ALTER TABLE `municipios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisos`
--

DROP TABLE IF EXISTS `permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisos` (
  `idPermiso` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idRol` int NOT NULL,
  `idRuta` int NOT NULL,
  PRIMARY KEY (`idPermiso`),
  KEY `permisos_idRol_fkey` (`idRol`),
  KEY `permisos_idRuta_fkey` (`idRuta`),
  CONSTRAINT `permisos_idRol_fkey` FOREIGN KEY (`idRol`) REFERENCES `roles` (`idRol`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `permisos_idRuta_fkey` FOREIGN KEY (`idRuta`) REFERENCES `rutas` (`idRuta`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisos`
--

LOCK TABLES `permisos` WRITE;
/*!40000 ALTER TABLE `permisos` DISABLE KEYS */;
INSERT INTO `permisos` VALUES (1,'Crear un nuevo módulo',1,1),(2,'Obtener módulos',1,1),(3,'Obtener módulos por id',1,1),(4,'Actualizar módulos',1,1),(5,'Eliminar módulos',1,1),(6,'Crear una nueva ruta',1,2),(7,'Obtener rutas',1,2),(8,'Obtener rutas por id',1,2),(9,'Actualizar ruta',1,2),(10,'Eliminar ruta',1,2),(11,'Crear un nuevo permiso',1,3),(12,'Obtener permisos',1,3),(13,'Obtener permisos por id',1,3),(14,'Actualizar permiso',1,3),(15,'Eliminar permiso',1,3),(16,'Crear un nuevo rol',1,4),(17,'Obtener roles',1,4),(18,'Obtener roles por id',1,4),(19,'Actualizar rol',1,4),(20,'Eliminar rol',1,4),(21,'Crear un nuevo usuario',1,5),(22,'Obtener usuarios',1,5),(23,'Obtener usuarios por id',1,5),(24,'Actualizar usuario',1,5),(25,'Eliminar usuario',1,5),(26,'Crear una nueva persona',1,6),(27,'Obtener personas',1,6),(28,'Obtener personas por id',1,6),(29,'Actualizar persona',1,6),(30,'Eliminar persona',1,6),(31,'Crear un nuevo programa',1,7),(32,'Obtener programas',1,7),(33,'Obtener programas por id',1,7),(34,'Actualizar programa',1,7),(35,'Eliminar programa',1,7),(36,'Crear un nuevo área',1,7),(37,'Obtener areas',1,7),(38,'Obtener areas por id',1,7),(39,'Actualizar area',1,7),(40,'Eliminar area',1,7),(41,'Crear un nuevo curso',1,8),(42,'Obtener cursos',1,8),(43,'Obtener cursos por id',1,8),(44,'Actualizar curso',1,8),(45,'Eliminar curso',1,8),(46,'Crear una nueva matricula',1,9),(47,'Obtener matriculas',1,9),(48,'Obtener matriculas por id',1,9),(49,'Actualizar matricula',1,9),(50,'Eliminar matricula',1,9),(51,'Crear un nuevo centro',1,10),(52,'Obtener centros',1,10),(53,'Obtener centros por id',1,10),(54,'Actualizar centro',1,10),(55,'Eliminar centro',1,10),(56,'Crear una nueva sede',1,10),(57,'Obtener sedes',1,10),(58,'Obtener sedes por id',1,10),(59,'Actualizar sede',1,10),(60,'Eliminar sede',1,10),(61,'Crear un nuevo ambiente',1,11),(62,'Obtener ambientes',1,11),(63,'Obtener ambientes por id',1,11),(64,'Actualizar ambiente',1,11),(65,'Eliminar ambiente',1,11),(66,'Crear un nuevo departamento',1,12),(67,'Obtener departamentos',1,12),(68,'Obtener departamentos por id',1,12),(69,'Actualizar departamento',1,12),(70,'Eliminar departamento',1,12),(71,'Crear un nuevo municipio',1,12),(72,'Obtener municipios',1,12),(73,'Obtener municipios por id',1,12),(74,'Actualizar municipio',1,12),(75,'Eliminar municipio',1,12),(76,'Crear un nuevo aplicativo',1,13),(77,'Obtener aplicativos',1,13),(78,'Obtener aplicativos por id',1,13),(79,'Actualizar aplicativo',1,13),(80,'Eliminar aplicativo',1,13);
/*!40000 ALTER TABLE `permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personas`
--

DROP TABLE IF EXISTS `personas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personas` (
  `idPersona` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idMunicipio` int NOT NULL,
  `genero` enum('masculino','femenino') COLLATE utf8mb4_unicode_ci NOT NULL,
  `cargo` enum('instructor','aprendiz','coordinador','secretaria','lider','vocero') COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` enum('activo','inactivo') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'activo',
  PRIMARY KEY (`idPersona`),
  KEY `personas_idMunicipio_fkey` (`idMunicipio`),
  CONSTRAINT `personas_idMunicipio_fkey` FOREIGN KEY (`idMunicipio`) REFERENCES `municipios` (`idMunicipio`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personas`
--

LOCK TABLES `personas` WRITE;
/*!40000 ALTER TABLE `personas` DISABLE KEYS */;
INSERT INTO `personas` VALUES (1,'Ramiro Fajardo','+57 315 328 4072','Calle 15 #7-23','juniorfajardom@gmail.com',671,'masculino','instructor','activo');
/*!40000 ALTER TABLE `personas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programas`
--

DROP TABLE IF EXISTS `programas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programas` (
  `idPrograma` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` enum('tic','agricola','administrativo') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`idPrograma`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programas`
--

LOCK TABLES `programas` WRITE;
/*!40000 ALTER TABLE `programas` DISABLE KEYS */;
/*!40000 ALTER TABLE `programas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `idRol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idAplicativo` int NOT NULL,
  PRIMARY KEY (`idRol`),
  KEY `roles_idAplicativo_fkey` (`idAplicativo`),
  CONSTRAINT `roles_idAplicativo_fkey` FOREIGN KEY (`idAplicativo`) REFERENCES `aplicativos` (`idAplicativo`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador',1);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rutas`
--

DROP TABLE IF EXISTS `rutas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rutas` (
  `idRuta` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idModulo` int NOT NULL,
  PRIMARY KEY (`idRuta`),
  KEY `rutas_idModulo_fkey` (`idModulo`),
  CONSTRAINT `rutas_idModulo_fkey` FOREIGN KEY (`idModulo`) REFERENCES `modulos` (`idModulo`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rutas`
--

LOCK TABLES `rutas` WRITE;
/*!40000 ALTER TABLE `rutas` DISABLE KEYS */;
INSERT INTO `rutas` VALUES (1,'Administración de módulos','/modulos',1),(2,'Administración de rutas','/rutas',2),(3,'Administración de permisos','/permisos',3),(4,'Administración de roles','/roles',4),(5,'Administración de usuarios','/usuarios',5),(6,'Administración de personas','/personas',6),(7,'Administración general','/general',7),(8,'Administración de cursos','/cursos',7),(9,'Administración de matriculas','/matriculas',7),(10,'Administración de centros','/centros',8),(11,'Administración de ambientes','/ambientes',8),(12,'Administración de regiones','/regiones',8),(13,'Administración de aplicativos','/aplicativos',9);
/*!40000 ALTER TABLE `rutas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sedes`
--

DROP TABLE IF EXISTS `sedes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sedes` (
  `idSede` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idCentro` int NOT NULL,
  PRIMARY KEY (`idSede`),
  KEY `sedes_idCentro_fkey` (`idCentro`),
  CONSTRAINT `sedes_idCentro_fkey` FOREIGN KEY (`idCentro`) REFERENCES `centroformacion` (`idCentro`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sedes`
--

LOCK TABLES `sedes` WRITE;
/*!40000 ALTER TABLE `sedes` DISABLE KEYS */;
/*!40000 ALTER TABLE `sedes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `login` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idAplicativo` int NOT NULL,
  `idRol` int NOT NULL,
  `idPersona` int NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `usuarios_login_key` (`login`),
  UNIQUE KEY `usuarios_idPersona_key` (`idPersona`),
  KEY `usuarios_idAplicativo_fkey` (`idAplicativo`),
  KEY `usuarios_idRol_fkey` (`idRol`),
  CONSTRAINT `usuarios_idAplicativo_fkey` FOREIGN KEY (`idAplicativo`) REFERENCES `aplicativos` (`idAplicativo`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `usuarios_idPersona_fkey` FOREIGN KEY (`idPersona`) REFERENCES `personas` (`idPersona`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `usuarios_idRol_fkey` FOREIGN KEY (`idRol`) REFERENCES `roles` (`idRol`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Juniorr-7','$2a$12$AeiC8JUEk/eYb2k8RIqkL.bthBuayGhmvnE6ZSVU/RRpfuQPjYf8.',1,1,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-19 21:32:26
