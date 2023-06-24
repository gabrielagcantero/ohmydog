-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 25-06-2023 a las 00:15:14
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
-- Estructura de tabla para la tabla `antiparasitario`
--

CREATE TABLE `antiparasitario` (
  `id_antiparasitario` int(11) NOT NULL,
  `id_perro` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `cant` decimal(5,2) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Estructura de tabla para la tabla `enfermedad`
--

CREATE TABLE `enfermedad` (
  `id_enfermedad` int(11) NOT NULL,
  `id_perro` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
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
  `owner` varchar(100) DEFAULT NULL,
  `peso` decimal(10,2) DEFAULT NULL,
  `castrado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perro`
--

INSERT INTO `perro` (`id`, `name`, `nac`, `breed`, `obs`, `image`, `zona_perdido`, `fecha_perdido`, `sex`, `comportamiento`, `edad_estimada`, `color`, `origen`, `fecha_celo`, `estado_encontrado`, `estado_adopcion`, `cruza`, `owner`, `peso`, `castrado`) VALUES
(43, 'Fatiga', '2023-06-10', 'Pastor aleman', '', '', NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'checoxis2@gmail.com', NULL, NULL),
(44, 'uata', '2023-06-01', 'Manchester terrier', 'kk', '', NULL, NULL, 'm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'checoxis2@gmail.com', NULL, NULL);

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
(2, 'philippaeilhartchat@gmail.com', 'gabs', 'cantero', '123456', NULL, 0, NULL, '2013-06-07'),
(3, 'luciagatti@gmail.com', 'Lucia', 'Gatti', '123456', NULL, 1, NULL, '2013-06-18'),
(7, 'checoxis2@gmail.com', 'santiago', 'cecconato', '123456', '2211234569', 0, NULL, '2013-06-20'),
(8, 'pedroperrino@gmail.com', 'Pedro ', 'Perrino', '123456', NULL, 1, NULL, '2013-06-07'),
(9, 'ohmydogveterinarialp@gmail.com', 'veterinariaohmiperrolp', 'lp', '123456', '22145679878', 1, NULL, '2013-06-20');

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
-- Estructura de tabla para la tabla `tarjeta`
--

CREATE TABLE `tarjeta` (
  `numero` int(16) NOT NULL,
  `vencimiento` date NOT NULL,
  `saldo` int(11) NOT NULL,
  `cod_seg` int(3) NOT NULL,
  `nom_titular` varchar(50) NOT NULL,
  `dni_titular` int(20) NOT NULL
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
  `aceptar` tinyint(1) DEFAULT 0,
  `modificacion` varchar(250) DEFAULT NULL,
  `atendido` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `turno`
--

INSERT INTO `turno` (`id`, `client`, `id_libreta_sanitaria`, `day`, `hour`, `tipo`, `monto`, `peso`, `antiparasitario`, `observaciones`, `dog`, `motive`, `aceptar`, `modificacion`, `atendido`) VALUES
(33, 'checoxis2@gmail.com', NULL, '2023-06-20', 'mañana', NULL, NULL, NULL, NULL, NULL, 44, 'Vacuna tipo A', 1, 'no tengo tiempo', 1),
(34, 'checoxis2@gmail.com', NULL, '2023-07-01', 'mañana', NULL, NULL, NULL, NULL, NULL, 43, 'Desparasitación', 1, NULL, 0),
(35, 'checoxis2@gmail.com', NULL, '2023-06-25', 'tarde', NULL, NULL, NULL, NULL, NULL, 44, 'Castración', 1, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacuna`
--

CREATE TABLE `vacuna` (
  `id_vacuna` int(11) NOT NULL,
  `id_perro` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `dosis` varchar(20) NOT NULL,
  `fecha` date NOT NULL,
  `tipo` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `antiparasitario`
--
ALTER TABLE `antiparasitario`
  ADD PRIMARY KEY (`id_antiparasitario`);

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
-- Indices de la tabla `enfermedad`
--
ALTER TABLE `enfermedad`
  ADD PRIMARY KEY (`id_enfermedad`);

--
-- Indices de la tabla `es_dueno`
--
ALTER TABLE `es_dueno`
  ADD PRIMARY KEY (`id_perro`);

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
-- Indices de la tabla `tarjeta`
--
ALTER TABLE `tarjeta`
  ADD PRIMARY KEY (`numero`);

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
-- AUTO_INCREMENT de la tabla `antiparasitario`
--
ALTER TABLE `antiparasitario`
  MODIFY `id_antiparasitario` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT de la tabla `enfermedad`
--
ALTER TABLE `enfermedad`
  MODIFY `id_enfermedad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `es_dueno`
--
ALTER TABLE `es_dueno`
  MODIFY `id_perro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `perro`
--
ALTER TABLE `perro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `perro_adopcion`
--
ALTER TABLE `perro_adopcion`
  MODIFY `id_perroadop` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `id_persona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `id_servicio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `turno`
--
ALTER TABLE `turno`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `vacuna`
--
ALTER TABLE `vacuna`
  MODIFY `id_vacuna` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
