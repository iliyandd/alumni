-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Време на генериране: 13 яну 2023 в 23:26
-- Версия на сървъра: 10.4.25-MariaDB
-- Версия на PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данни: `alumni-fmi`
--
DROP DATABASE IF EXISTS `alumni-fmi`;
CREATE DATABASE IF NOT EXISTS `alumni-fmi` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `alumni-fmi`;

-- --------------------------------------------------------

--
-- Структура на таблица `event`
--

CREATE TABLE `event` (
  `id` int(16) NOT NULL,
  `title` varchar(64) NOT NULL,
  `description` text NOT NULL,
  `creator` int(16) NOT NULL,
  `date` date NOT NULL,
  `date_created` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Схема на данните от таблица `event`
--

INSERT INTO `event` (`id`, `title`, `description`, `creator`, `date`, `date_created`) VALUES
(9, 'Сесия 2022/2023', 'Дъръ бъръ 3 изпита в 1 седмица', 3, '2023-01-23', '2023-01-12'),
(12, 'Ден на програмиста', 'Елате пред ФМИ', 4, '2023-01-20', '2023-01-12');

-- --------------------------------------------------------

--
-- Структура на таблица `user`
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
  `date_created` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Схема на данните от таблица `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `first_name`, `last_name`, `fn`, `speciality`, `in_alumni`, `date_created`) VALUES
(2, 'nikolajzz', 'nikiulin@gmail.com', '$2y$10$wDySUYVOwKQQxv/gvwW/P.E31/3CcLyOwzhXbW8DhXfBxcYQPLMw.', 'NZZ', 'Zhh', '82021', 'Информатика', 1, '2022-12-23'),
(3, 'nikizhelqzkov', 'nikizhelqzkov@gmail.com', '$2y$10$SqwM.cZwR4P1mDmINp8Jb.D.ppHnvB3Ugm9lC0lChaiURn0Gqzadi', 'Nikolay', 'Zhelyazkov', '82022', 'Компютърни науки', 1, '2022-12-24'),
(4, 'nikijivkov', 'nikijivkov@abv.com', '$2y$10$yVDvZ2tl06NRF.Bacnu7ROQ5.oIP.EiwBGan4ReDkrT0kT5mJAYqe', 'Niki', 'Zhelyazkov', '82023', 'Компютърни науки', 1, '2022-12-24'),
(5, 'sDejanova', 'sisku@abv.bg', '$2y$10$fxdzcPWnpgCyTQTb9BTcu.Dz6tcgtlIhnJ8RzpgWoO92EdwmONaUm', 'Sisku', 'Pisku', '62448', 'Софтуерно инженерство', 0, '2022-12-24'),
(8, 's_dejanova', 'sisku@abv.bg2', '$2y$10$Ja83sFfDwVjFE7VkXEmFYOzc6YmjfX.quPrE1VFMN4EBZfgqr/Tx2', 'Sisku', 'Pisku', '62449', 'Софтуерно инженерство', 1, '2022-12-24'),
(9, 'ivanesko', 'ivan@abv.bg', '$2y$10$fxTmn2enDuMq8hVd4JCu1eKUudAMqkJ.RvV.CfvGWaRIGYkWuckkO', 'Ivan', 'Iordanov', '61455', 'Математика и информатика', 1, '2022-12-25'),
(10, 'nikolajzz2', 'nzd@abv.bg', '$2y$10$/IIMFRMsAZpTZ6PHDugqquCVk8oNmwLWKSGzuRFVBPCHVuZdSi/iq', 'Nzh', 'Zhe', '23456', 'Информационни системи', 0, '2022-12-26'),
(11, 'nz34', 'jnoew@abv.bg', '$2y$10$IOyRC8w.MwAHUlE/Ug8BDOU0VJxt8/w3JQtmAHEx6JtpVhD/0HQoi', 'Nzz', 'Zhfjn', '642521', 'Анализ на данни', 0, '2022-12-26'),
(12, 'rwfewqfq', 'fwqefe@rfere.bg', '$2y$10$XgvO3YEkRLEXW9dUeA/jpuzrI.l5NYSsNHooMDmtdbUTO3d3ypZUi', 'efeq', 'ewfqwf', '642523', 'Софтуерно инженерство', 0, '2022-12-26'),
(13, 'iaved', 'nikiulinedw@gmail.com', '$2y$10$T0Nt2WUD8niXtcvY9tueLeLOhgdtq3cmVN8tdLTDEDjSpbjjiehx6', 'NZewZ', 'Zfehh', '82028459', 'Информатика', 0, '2022-12-27'),
(14, 'erfvwdicjnk', 'fev@nwe.bg', '$2y$10$uBCsBDkp8nnajOzKl1.DaeE0v8AYBmWwMxMHgoqXpXmt1XmPCcYRm', 'gbhjnfesd', 'bhjnkm', 'hjn3898', 'Софтуерно инженерство', 0, '2022-12-27'),
(15, 'ivankaBabyG', 'ivankaBabyG@ff.bg', '$2y$10$PUcZXVv5PrX5/fmjDQvzHeCB3dqbtbHhjdPAVs1cIGQRwtFLzpozW', 'ivanka', 'Iordanovaa', 'M12345', 'Математика', 0, '2022-12-27'),
(16, 'viki_ivanova', 'viki_ivanova@abv.com', '$2y$10$2Hvs77A5dvQ5lduyjtx91e/IZWIfleGIy5mTR63/WnOfFp94YcjuG', 'Виктория', 'Иванова', '82096', 'Компютърни науки', 0, '2023-01-12'),
(17, 'iliqn_dimitrov', 'iliqn@abv.gb', '$2y$10$7R64587K83FdB7PFxJanM.6tVGw5ebuSSD6bwI9trTzLFhvSoz176', 'Илиян', 'Димитров', '82111', 'Компютърни науки', 0, '2023-01-12');

--
-- Indexes for dumped tables
--

--
-- Индекси за таблица `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

--
-- Индекси за таблица `user`
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
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
