-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 27-05-2023 a las 21:04:24
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
-- Estructura de tabla para la tabla `campaña`
--

CREATE TABLE `campaña` (
  `id_campaña` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `id_persona` varchar(50) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `monto` int(11) NOT NULL,
  `fecha_cierre` varchar(50) NOT NULL,
  `estado_activa` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuidador_paseador`
--

CREATE TABLE `cuidador_paseador` (
  `id_cuipas` int(11) NOT NULL,
  `email` varchar(70) NOT NULL,
  `frist_name` varchar(70) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `pass` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `donar`
--

CREATE TABLE `donar` (
  `id_persona` int(11) NOT NULL,
  `id_campaña` int(11) NOT NULL,
  `monto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `es_dueno`
--

CREATE TABLE `es_dueno` (
  `id_perro` int(11) NOT NULL,
  `id_persona` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libreta_sanitaria`
--

CREATE TABLE `libreta_sanitaria` (
  `id_libreta_sanitaria` int(11) NOT NULL,
  `id_perro` int(11) NOT NULL,
  `peso` int(11) NOT NULL,
  `enfermedad` varchar(50) DEFAULT NULL,
  `observaciones` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perro`
--

CREATE TABLE `perro` (
  `id_perro` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `nac` varchar(50) NOT NULL,
  `breed` varchar(50) NOT NULL,
  `obs` varchar(150) DEFAULT NULL,
  `image` varchar(150) DEFAULT NULL,
  `zona_perdido` varchar(50) DEFAULT NULL,
  `fecha_perdido` varchar(50) DEFAULT NULL,
  `sex` varchar(25) DEFAULT NULL,
  `comportamiento` varchar(150) DEFAULT NULL,
  `edad_estimada` int(11) DEFAULT NULL,
  `color` varchar(25) DEFAULT NULL,
  `origen` varchar(25) DEFAULT NULL,
  `fecha_celo` varchar(50) DEFAULT NULL,
  `estado_encontrado` tinyint(1) DEFAULT NULL,
  `estado_adopcion` tinyint(1) DEFAULT NULL,
  `cruza` tinyint(1) DEFAULT NULL,
  `owner` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `id_persona` int(11) NOT NULL,
  `mail` varchar(150) NOT NULL,
  `frist_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `tel` varchar(50) DEFAULT NULL,
  `veter` tinyint(1) NOT NULL,
  `bonif_donacion` int(11) DEFAULT NULL,
  `nac` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`id_persona`, `mail`, `frist_name`, `last_name`, `pass`, `tel`, `veter`, `bonif_donacion`, `nac`) VALUES
(2, 'pedroperrino@gmail.com', 'Pedro', 'Perrino', '123456', NULL, 1, NULL, NULL),
(3, 'luciagatti@gmail.com', 'Lucia', 'Gatti', '123456', NULL, 1, NULL, NULL),
(4, 'pepeargento@gmail.com', 'Pepe', 'Argento', '666666', NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `id_servicio` int(11) NOT NULL,
  `tipo_servicio` varchar(50) NOT NULL,
  `serv_finalizado` tinyint(1) NOT NULL,
  `monto` int(11) NOT NULL,
  `zona` varchar(50) NOT NULL,
  `estado_disponible` tinyint(1) NOT NULL,
  `calificacion` varchar(150) DEFAULT NULL,
  `id_persona` int(11) NOT NULL,
  `id_cuipas` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turno`
--

CREATE TABLE `turno` (
  `id` int(11) NOT NULL,
  `client` int(11) NOT NULL,
  `id_libreta_sanitaria` int(11) NOT NULL,
  `day` date NOT NULL,
  `hour` varchar(50) NOT NULL,
  `tipo` varchar(25) NOT NULL,
  `monto` int(11) DEFAULT NULL,
  `peso` int(11) DEFAULT NULL,
  `antiparasitario` int(11) DEFAULT NULL,
  `observaciones` int(11) DEFAULT NULL,
  `dog` int(11) DEFAULT NULL,
  `motive` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacuna`
--

CREATE TABLE `vacuna` (
  `id_vacuna` int(11) NOT NULL,
  `id_libreta_sanitaria` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `campaña`
--
ALTER TABLE `campaña`
  ADD PRIMARY KEY (`id_campaña`);

--
-- Indices de la tabla `cuidador_paseador`
--
ALTER TABLE `cuidador_paseador`
  ADD PRIMARY KEY (`id_cuipas`,`email`);

--
-- Indices de la tabla `donar`
--
ALTER TABLE `donar`
  ADD PRIMARY KEY (`id_persona`,`id_campaña`);

--
-- Indices de la tabla `es_dueno`
--
ALTER TABLE `es_dueno`
  ADD PRIMARY KEY (`id_perro`);

--
-- Indices de la tabla `libreta_sanitaria`
--
ALTER TABLE `libreta_sanitaria`
  ADD PRIMARY KEY (`id_libreta_sanitaria`);

--
-- Indices de la tabla `perro`
--
ALTER TABLE `perro`
  ADD PRIMARY KEY (`id_perro`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`id_persona`,`mail`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`id_servicio`);

--
-- Indices de la tabla `turno`
--
ALTER TABLE `turno`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `vacuna`
--
ALTER TABLE `vacuna`
  ADD PRIMARY KEY (`id_vacuna`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `campaña`
--
ALTER TABLE `campaña`
  MODIFY `id_campaña` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cuidador_paseador`
--
ALTER TABLE `cuidador_paseador`
  MODIFY `id_cuipas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `es_dueno`
--
ALTER TABLE `es_dueno`
  MODIFY `id_perro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `libreta_sanitaria`
--
ALTER TABLE `libreta_sanitaria`
  MODIFY `id_libreta_sanitaria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `perro`
--
ALTER TABLE `perro`
  MODIFY `id_perro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `id_persona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `id_servicio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `turno`
--
ALTER TABLE `turno`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `vacuna`
--
ALTER TABLE `vacuna`
  MODIFY `id_vacuna` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;