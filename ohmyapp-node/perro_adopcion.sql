-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 24-06-2023 a las 01:50:17
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ohMiPerro`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perro_adopcion`
--

CREATE TABLE `perro_adopcion` (
  `id_perroadop` int(11) NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT 'sin nombre',
  `age` varchar(50) NOT NULL,
  `breed` varchar(50) NOT NULL,
  `color` varchar(50) NOT NULL,
  `sex` varchar(50) NOT NULL,
  `obs` varchar(250) NOT NULL,
  `origin` varchar(50) NOT NULL,
  `owner` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perro_adopcion`
--

INSERT INTO `perro_adopcion` (`id_perroadop`, `name`, `age`, `breed`, `color`, `sex`, `obs`, `origin`, `owner`) VALUES
(18, '', '12', 'Caniche', 'Negro', 'm', '', 'calle', 'checoxis2@gmail.com'),
(19, 'sin nombre', '12', 'Salchicha', 'Con manchas', 'm', '', 'calle', 'checoxis2@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `perro_adopcion`
--
ALTER TABLE `perro_adopcion`
  ADD PRIMARY KEY (`id_perroadop`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `perro_adopcion`
--
ALTER TABLE `perro_adopcion`
  MODIFY `id_perroadop` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
