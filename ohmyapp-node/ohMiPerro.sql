-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 10-07-2023 a las 20:24:24
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
-- Estructura de tabla para la tabla `adopciones`
--

CREATE TABLE `adopciones` (
  `id_adopciones` int(11) NOT NULL,
  `id_perro` int(11) NOT NULL,
  `mail` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Estructura de tabla para la tabla `campana`
--

CREATE TABLE `campana` (
  `id_campana` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `monto` decimal(11,2) DEFAULT 0.00,
  `fecha_cierre` varchar(50) NOT NULL,
  `estado_activa` tinyint(1) NOT NULL DEFAULT 1,
  `monto_actual` decimal(11,2) NOT NULL DEFAULT 0.00
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
  `last_name` varchar(100) DEFAULT NULL,
  `paseador` tinyint(1) DEFAULT 1,
  `monto` decimal(11,2) NOT NULL,
  `zona` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `donar`
--

CREATE TABLE `donar` (
  `id_persona` int(11) NOT NULL,
  `id_campana` int(11) NOT NULL,
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
(48, 'uata', '2023-06-01', 'Shiba Inu', 'Es muy juguetona', 'https://www.diariodesevilla.es/2023/02/22/sociedad/Shiba-Inu-perros-buscados_1768633150_177677206_667x375.jpg', NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'checoxis2@gmail.com', 13.00, 1),
(49, 'Fatiga', '2023-06-10', 'Manchester terrier', 'Come demasiado, pero esta muy flaco', 'https://www.dogbible.com/_ipx/f_webp,q_80,fit_cover,s_544x544/dogbible/i/es/manchester-terrier-meadow.jpg', NULL, NULL, 'm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'checoxis2@gmail.com', NULL, 0),
(50, 'jorge', '2023-06-30', 'Chihuahua', 'es chiquito', '', NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'checoxis2@gmail.com', NULL, 0),
(51, 'peshito', '2023-07-02', 'Pastor aleman', 'cuida ovejas', '', NULL, NULL, 'm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'santycheco1@gmail.com', NULL, 0);

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
  `bonif_donacion` decimal(11,2) DEFAULT 0.00,
  `nac` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`id_persona`, `mail`, `frist_name`, `last_name`, `pass`, `tel`, `veter`, `bonif_donacion`, `nac`) VALUES
(2, 'philippaeilhartchat@gmail.com', 'gabs', 'cantero', '123456', '2219875623', 0, 0.00, '2013-06-07'),
(3, 'luciagatti@gmail.com', 'Lucia', 'Gatti', '123456', '2214531256', 1, NULL, '2013-06-18'),
(7, 'checoxis2@gmail.com', 'santiago', 'cecconato', '123456', '2211234569', 0, 0.00, '2013-06-20'),
(8, 'pedroperrino@gmail.com', 'Pedro ', 'Perrino', '123456', '2211239854', 1, NULL, '2013-06-07'),
(9, 'ohmydogveterinarialp@gmail.com', 'veterinariaohmiperrolp', 'lp', '123456', '22145679878', 1, NULL, '2013-06-20'),
(10, 'santycheco1@gmail.com', 'jorge', 'locro', '6J4UknMJ', '22112345678', 0, 500.00, '2023-07-01');

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
  `urgencia` tinyint(1) DEFAULT 0,
  `antiparasitario` int(11) DEFAULT NULL,
  `observaciones` varchar(110) DEFAULT NULL,
  `dog` int(11) DEFAULT NULL,
  `motive` varchar(100) DEFAULT NULL,
  `aceptar` tinyint(1) DEFAULT 0,
  `modificacion` varchar(250) DEFAULT NULL,
  `atendido` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `urgencia`
--

CREATE TABLE `urgencia` (
  `id_urgencia` int(11) NOT NULL,
  `id_perro` int(11) NOT NULL,
  `date` date NOT NULL,
  `obs` varchar(500) NOT NULL,
  `monto` decimal(11,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Indices de la tabla `adopciones`
--
ALTER TABLE `adopciones`
  ADD PRIMARY KEY (`id_adopciones`);

--
-- Indices de la tabla `antiparasitario`
--
ALTER TABLE `antiparasitario`
  ADD PRIMARY KEY (`id_antiparasitario`);

--
-- Indices de la tabla `campana`
--
ALTER TABLE `campana`
  ADD PRIMARY KEY (`id_campana`);

--
-- Indices de la tabla `cuidador_paseador`
--
ALTER TABLE `cuidador_paseador`
  ADD PRIMARY KEY (`id_cuipas`,`email`);

--
-- Indices de la tabla `donar`
--
ALTER TABLE `donar`
  ADD PRIMARY KEY (`id_persona`,`id_campana`);

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
-- Indices de la tabla `urgencia`
--
ALTER TABLE `urgencia`
  ADD PRIMARY KEY (`id_urgencia`);

--
-- Indices de la tabla `vacuna`
--
ALTER TABLE `vacuna`
  ADD PRIMARY KEY (`id_vacuna`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `adopciones`
--
ALTER TABLE `adopciones`
  MODIFY `id_adopciones` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `antiparasitario`
--
ALTER TABLE `antiparasitario`
  MODIFY `id_antiparasitario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `campana`
--
ALTER TABLE `campana`
  MODIFY `id_campana` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `cuidador_paseador`
--
ALTER TABLE `cuidador_paseador`
  MODIFY `id_cuipas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `enfermedad`
--
ALTER TABLE `enfermedad`
  MODIFY `id_enfermedad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `es_dueno`
--
ALTER TABLE `es_dueno`
  MODIFY `id_perro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `perro`
--
ALTER TABLE `perro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `perro_adopcion`
--
ALTER TABLE `perro_adopcion`
  MODIFY `id_perroadop` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `id_persona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `id_servicio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `turno`
--
ALTER TABLE `turno`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `urgencia`
--
ALTER TABLE `urgencia`
  MODIFY `id_urgencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `vacuna`
--
ALTER TABLE `vacuna`
  MODIFY `id_vacuna` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
