-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2023 at 09:47 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alumni-fmi`
--

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` int(16) NOT NULL,
  `title` varchar(64) NOT NULL,
  `description` text NOT NULL,
  `creator` int(16) NOT NULL,
  `date` date NOT NULL,
  `date_created` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `title`, `description`, `creator`, `date`, `date_created`) VALUES
(9, 'Сесия 2022/2023', 'Дъръ бъръ 3 изпита в 1 седмица', 3, '2023-01-23', '2023-01-12'),
(12, 'Ден на програмиста', 'Елате пред ФМИ', 4, '2023-01-20', '2023-01-12');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(32) NOT NULL,
  `username` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(64) NOT NULL,
  `last_name` varchar(64) NOT NULL,
  `fn` varchar(32) NOT NULL,
  `speciality` varchar(64) NOT NULL,
  `in_alumni` tinyint(1) NOT NULL,
  `date_created` date NOT NULL DEFAULT current_timestamp(),
  `profile_picture_url` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

-- nikizhelqzkov@gmail.com -> Samolevski123456789!
-- nikijivkov@abv.com -> Samolevski123456789!
-- viki_ivanova@abv.com -> Viki123!
-- iliqn@abv.gb -> Iliqn123!

INSERT INTO `user` (`id`, `username`, `email`, `password`, `first_name`, `last_name`, `fn`, `speciality`, `in_alumni`, `date_created`, `profile_picture_url`) VALUES
(2, 'nikolajzz', 'nikiulin@gmail.com', '$2y$10$wDySUYVOwKQQxv/gvwW/P.E31/3CcLyOwzhXbW8DhXfBxcYQPLMw.', 'NZZ', 'Zhh', '82021', 'Информатика', 1, '2022-12-23', NULL),
(3, 'nikizhelqzkov', 'nikizhelqzkov@gmail.com', '$2y$10$SqwM.cZwR4P1mDmINp8Jb.D.ppHnvB3Ugm9lC0lChaiURn0Gqzadi', 'Nikolay', 'Zhelyazkov', '82022', 'Компютърни науки', 1, '2022-12-24', NULL),
(4, 'nikijivkov', 'nikijivkov@abv.com', '$2y$10$scFfNdCN0xPMumwCxLipruSxXH4okoRNmoxCOhAB1s9Ey8re8wfmu', 'Niki', 'Zhelyazkov', '82023', 'Компютърни науки', 1, '2022-12-24', 'https://fmi-aws-alumni.s3.eu-north-1.amazonaws.com/profile_pictures/nikijivkov.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2ISLOIEFRQBXDD2H%2F20230531%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20230531T184124Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Signature=57baca836b8a61d23bceabd6c3113b54ef7ba463699c540859c7401d9f50c04e'),
(5, 'sDejanova', 'sisku@abv.bg', '$2y$10$fxdzcPWnpgCyTQTb9BTcu.Dz6tcgtlIhnJ8RzpgWoO92EdwmONaUm', 'Sisku', 'Pisku', '62448', 'Софтуерно инженерство', 0, '2022-12-24', NULL),
(8, 's_dejanova', 'sisku@abv.bg2', '$2y$10$Ja83sFfDwVjFE7VkXEmFYOzc6YmjfX.quPrE1VFMN4EBZfgqr/Tx2', 'Sisku', 'Pisku', '62449', 'Софтуерно инженерство', 1, '2022-12-24', NULL),
(9, 'ivanesko', 'ivan@abv.bg', '$2y$10$fxTmn2enDuMq8hVd4JCu1eKUudAMqkJ.RvV.CfvGWaRIGYkWuckkO', 'Ivan', 'Iordanov', '61455', 'Математика и информатика', 1, '2022-12-25', NULL),
(10, 'nikolajzz2', 'nzd@abv.bg', '$2y$10$/IIMFRMsAZpTZ6PHDugqquCVk8oNmwLWKSGzuRFVBPCHVuZdSi/iq', 'Nzh', 'Zhe', '23456', 'Информационни системи', 0, '2022-12-26', NULL),
(11, 'nz34', 'jnoew@abv.bg', '$2y$10$IOyRC8w.MwAHUlE/Ug8BDOU0VJxt8/w3JQtmAHEx6JtpVhD/0HQoi', 'Nzz', 'Zhfjn', '642521', 'Анализ на данни', 0, '2022-12-26', NULL),
(12, 'rwfewqfq', 'fwqefe@rfere.bg', '$2y$10$XgvO3YEkRLEXW9dUeA/jpuzrI.l5NYSsNHooMDmtdbUTO3d3ypZUi', 'efeq', 'ewfqwf', '642523', 'Софтуерно инженерство', 0, '2022-12-26', NULL),
(13, 'iaved', 'nikiulinedw@gmail.com', '$2y$10$T0Nt2WUD8niXtcvY9tueLeLOhgdtq3cmVN8tdLTDEDjSpbjjiehx6', 'NZewZ', 'Zfehh', '82028459', 'Информатика', 0, '2022-12-27', NULL),
(14, 'erfvwdicjnk', 'fev@nwe.bg', '$2y$10$uBCsBDkp8nnajOzKl1.DaeE0v8AYBmWwMxMHgoqXpXmt1XmPCcYRm', 'gbhjnfesd', 'bhjnkm', 'hjn3898', 'Софтуерно инженерство', 0, '2022-12-27', NULL),
(15, 'ivankaBabyG', 'ivankaBabyG@ff.bg', '$2y$10$PUcZXVv5PrX5/fmjDQvzHeCB3dqbtbHhjdPAVs1cIGQRwtFLzpozW', 'ivanka', 'Iordanovaa', 'M12345', 'Математика', 0, '2022-12-27', NULL),
(16, 'viki_ivanova', 'viki_ivanova@abv.com', '$2y$10$2Hvs77A5dvQ5lduyjtx91e/IZWIfleGIy5mTR63/WnOfFp94YcjuG', 'Виктория', 'Иванова', '82096', 'Компютърни науки', 0, '2023-01-12', NULL),
(17, 'iliqn_dimitrov', 'iliqn@abv.gb', '$2y$10$7R64587K83FdB7PFxJanM.6tVGw5ebuSSD6bwI9trTzLFhvSoz176', 'Илиян', 'Димитров', '82111', 'Компютърни науки', 0, '2023-01-12', 'https://fmi-aws-alumni.s3.eu-north-1.amazonaws.com/profile_pictures/iliqn_dimitrov.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2ISLOIEFRQBXDD2H%2F20230531%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20230531T192257Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Signature=6ad0301d1d5013e7bbf5c6860dba622ba64965228560e08b6c06de95893bbc28'),
(18, 'idimitrov', 'a@v.bg', '$2y$10$kmhBMlvaqslG43l.N8H1EuSsBcpLJI6R/SMNyssZ95qpNFMZe3QGK', 'Iliyan', 'Dimitrov', '56789', 'Информатика', 0, '2023-05-31', NULL),
(19, 'idimitrov1', 'c@v.bg', '$2y$10$NeAgajO2J2ka5MUPRTT9Xu50YxaLupg2b30PzaNqt1ebItxDRbZeC', 'Iliyan', 'Dimitrov', '4363463', 'Информатика', 0, '2023-05-31', 'https://fmi-aws-alumni.s3.eu-north-1.amazonaws.com/profile_pictures/idimitrov1.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2ISLOIEFRQBXDD2H%2F20230531%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20230531T192932Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Signature=aa002d98751de0197e673dd25fbda9889b1d0a664c37571280df525d637ec5cb');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `fn` (`fn`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
