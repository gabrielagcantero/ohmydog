-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 11-06-2023 a las 21:24:51
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
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `nac` date NOT NULL,
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

--
-- Volcado de datos para la tabla `perro`
--

INSERT INTO `perro` (`id`, `name`, `nac`, `breed`, `obs`, `image`, `zona_perdido`, `fecha_perdido`, `sex`, `comportamiento`, `edad_estimada`, `color`, `origen`, `fecha_celo`, `estado_encontrado`, `estado_adopcion`, `cruza`, `owner`) VALUES
(1, 'Fatiga', '2022-01-28', 'golden retriever', 'es muy pajoso', '', NULL, NULL, 'm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'pepeargento@gmail.com'),
(2, 'pulgas', '2022-01-27', 'Chihuahua', 'es muy enano', '', NULL, NULL, 'm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'pepeargento@gmail.com'),
(3, 'locrojr', '2023-04-01', 'Pastor aleman', 'le gusta comer locro el 25 de mayo', '', NULL, NULL, 'm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'locro@gmail.com'),
(4, 'chento', '2023-01-01', 'Perdiguero', 'muy activa', '', NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'locro@gmail.com'),
(5, 'lord', '2023-01-01', 'Manchester terrier', 'manchester city', '', NULL, NULL, 'm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'checoxis2@gmail.com'),
(6, 'melon', '2023-02-04', 'Alabai', 'come mucho melon, sino muerde', '', NULL, NULL, 'm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'checoxis2@gmail.com'),
(7, 'craz', '2023-01-04', 'Northern inuit', 'come demasiado, tiene sobrepeso', '', NULL, NULL, 'm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'checoxis2@gmail.com'),
(8, 'uata', '2022-01-06', 'Shiba Inu', 'esta castrada', '', NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'checoxis2@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perro_adopcion`
--

CREATE TABLE `perro_adopcion` (
  `id_perroadop` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
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
(1, 'uata', '12', 'Shiba Inu', 'rojo', 'f', 'dfghjk', 'calle', ''),
(2, 'uata', '12', 'Shiba Inu', 'rojo', 'f', 'dfghjk', 'calle', ''),
(3, 'jorge', '12', 'Chihuahua', 'rojo', 'f', 'muuu', 'calle', '');

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
  `nac` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`id_persona`, `mail`, `frist_name`, `last_name`, `pass`, `tel`, `veter`, `bonif_donacion`, `nac`) VALUES
(2, 'philippaeilhartchat@gmail.com', 'Pedro', 'Perrino', '123456', NULL, 1, NULL, '2013-06-07'),
(3, 'luciagatti@gmail.com', 'Lucia', 'Gatti', '123456', NULL, 1, NULL, '2013-06-18'),
(4, 'pepeargento@gmail.com', 'Pepe', 'Argento', '666666', NULL, 0, NULL, '2013-06-07'),
(5, 'santiago.cecconato183401@alumnos.info.unlp.edu.ar', 'jorge', 'locro', 'xuJIzL3o', '2215678899', 0, NULL, '2023-06-01'),
(6, 'checoxis2@gmail.com', 'Santiago', 'Cecconato', 'aVwsrn1O', '22112345678', 0, NULL, '1998-04-23');

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
  `client` varchar(100) NOT NULL,
  `id_libreta_sanitaria` int(11) DEFAULT NULL,
  `day` date NOT NULL,
  `hour` varchar(50) NOT NULL,
  `tipo` varchar(25) DEFAULT NULL,
  `monto` int(11) DEFAULT NULL,
  `peso` int(11) DEFAULT NULL,
  `antiparasitario` int(11) DEFAULT NULL,
  `observaciones` varchar(110) DEFAULT NULL,
  `dog` int(11) DEFAULT NULL,
  `motive` varchar(100) DEFAULT NULL,
  `aceptar` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `turno`
--

INSERT INTO `turno` (`id`, `client`, `id_libreta_sanitaria`, `day`, `hour`, `tipo`, `monto`, `peso`, `antiparasitario`, `observaciones`, `dog`, `motive`, `aceptar`) VALUES
(9, 'pepeargento@gmail.com', NULL, '2023-06-01', 'mañana', NULL, NULL, NULL, NULL, NULL, 1, 'Vacuna tipo A', NULL),
(11, 'pepeargento@gmail.com', NULL, '2023-08-23', 'noche', NULL, NULL, NULL, NULL, NULL, 1, 'Vacuna tipo B', 0),
(12, 'pepeargento@gmail.com', NULL, '2023-07-22', 'tarde', NULL, NULL, NULL, NULL, NULL, 1, 'Desparasitación', 0),
(20, 'checoxis2@gmail.com', NULL, '2023-09-07', 'mañana', NULL, NULL, NULL, NULL, NULL, 5, 'Vacuna tipo A', 0),
(21, 'checoxis2@gmail.com', NULL, '2023-09-21', 'mañana', NULL, NULL, NULL, NULL, NULL, 5, 'Vacuna tipo B', 0),
(23, 'checoxis2@gmail.com', NULL, '2023-08-26', 'mañana', NULL, NULL, NULL, NULL, NULL, 6, 'Vacuna tipo B', 1),
(27, 'checoxis2@gmail.com', NULL, '2023-08-30', 'noche', NULL, NULL, NULL, NULL, NULL, 8, 'Vacuna tipo B', 0),
(28, 'checoxis2@gmail.com', NULL, '2023-05-25', '2023-08-30', NULL, NULL, NULL, NULL, NULL, 7, 'Vacuna tipo B', 0);

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
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `perro_adopcion`
--
ALTER TABLE `perro_adopcion`
  ADD PRIMARY KEY (`id_perroadop`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `perro_adopcion`
--
ALTER TABLE `perro_adopcion`
  MODIFY `id_perroadop` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `id_persona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `id_servicio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `turno`
--
ALTER TABLE `turno`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `vacuna`
--
ALTER TABLE `vacuna`
  MODIFY `id_vacuna` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
