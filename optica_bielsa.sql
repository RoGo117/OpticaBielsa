
-- =============================================
-- BASE DE DATOS REDUCIDA - ÓPTICA BIELSA
-- =============================================
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2025 a las 13:12:05
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

DROP DATABASE IF EXISTS optica_bielsa;
CREATE DATABASE optica_bielsa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE optica_bielsa;
-- --------------------------------------------------------

-- ============================
-- TABLA: citas
-- ============================

CREATE TABLE `citas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `servicio` varchar(150) DEFAULT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado` enum('programada','completada','cancelada') DEFAULT 'programada'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `citas` (`id`, `usuario_id`, `servicio`, `fecha`, `hora`, `estado`) VALUES
(1, 5, 'Revisión visual', '2025-06-10', '10:00:00', 'programada'),
(2, 12, 'Ajuste de montura', '2025-06-11', '11:30:00', 'programada'),
(3, 12, 'Limpieza de lentes', '2025-06-12', '15:00:00', 'completada'),
(4, 14, 'Consulta de adaptación de progresivos', '2025-06-13', '09:45:00', 'programada'),
(5, 14, 'Prueba de lentes de contacto', '2025-06-14', '12:15:00', 'cancelada'),
(6, 15, 'Examen general', '2025-06-15', '14:00:00', 'completada'),
(7, 5, 'Graduación de gafas', '2025-06-16', '16:00:00', 'programada'),
(8, 5, 'Ajuste de patillas', '2025-06-17', '10:45:00', 'programada'),
(9, 15, 'Entrega de lentes progresivos', '2025-06-18', '13:00:00', 'completada'),
(10, 15, 'Asesoramiento de producto', '2025-06-19', '11:00:00', 'programada');

-- --------------------------------------------------------

-- ============================
-- TABLA: inventario
-- ============================

CREATE TABLE `inventario` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `tipo` enum('entrada','salida') NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `inventario` (`id`, `producto_id`, `tipo`, `cantidad`, `fecha`) VALUES
(1, 1, 'entrada', 20, '2025-06-08 09:07:59'),
(2, 2, 'entrada', 30, '2025-06-08 09:07:59'),
(3, 3, 'salida', 5, '2025-06-08 09:07:59'),
(4, 4, 'entrada', 10, '2025-06-08 09:07:59'),
(5, 5, 'salida', 8, '2025-06-08 09:07:59'),
(6, 6, 'entrada', 12, '2025-06-08 09:07:59'),
(7, 7, 'salida', 3, '2025-06-08 09:07:59'),
(8, 8, 'entrada', 15, '2025-06-08 09:07:59'),
(9, 9, 'salida', 4, '2025-06-08 09:07:59'),
(10, 10, 'entrada', 20, '2025-06-08 09:07:59');

-- --------------------------------------------------------

-- ============================
-- TABLA: productos
-- ============================

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `marca` varchar(100) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `descripcion` text DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO productos (id, nombre, categoria, marca, precio, stock, imagen_url, descripcion, activo)
VALUES
(1, 'Gafas de Sol Ray-Ban Aviator', 'Gafas de Sol', 'Ray-Ban', 149.99, 10, 'aviator.jpg', 'Gafas de sol icónicas de Ray-Ban', 1),
(2, 'Gafas de Lectura Modernas', 'Gafas de Lectura', 'OpticBlue', 59.99, 20, 'lectura_modernas.jpg', 'Cómodas gafas de lectura modernas', 1),
(3, 'Lentes de Contacto Acuvue', 'Lentes de Contacto', 'Acuvue', 29.99, 30, 'acuvue_lentes.jpg', 'Lentes de contacto de alta calidad', 1),
(4, 'Gafas Progresivas Zeiss', 'Lentes Progresivas', 'Zeiss', 250.00, 5, 'progresivas_zeiss.jpg', 'Lentes progresivas para una visión perfecta', 1),
(5, 'Spray Limpiador', 'Accesorios', 'CleanVision', 9.99, 50, 'spray_limpiador.jpg', 'Spray limpiador para gafas', 1),
(6, 'Gafas de Sol Oakley', 'Gafas de Sol', 'Oakley', 199.99, 8, 'oakley_sol.jpg', 'Gafas de sol deportivas Oakley', 1),
(7, 'Gafas Vintage', 'Gafas de Sol', 'RetroLux', 89.99, 12, 'vintage.jpg', 'Estilo retro para tu look', 1),
(8, 'Gafas Deportivas', 'Gafas de Sol', 'Sportify', 120.00, 15, 'deportivas.jpg', 'Gafas deportivas para alta actividad', 1),
(9, 'Lentes de Contacto Diarias', 'Lentes de Contacto', 'Dailies', 19.99, 40, 'dailies.jpg', 'Lentes de contacto cómodos para todo el día', 1),
(10, 'Gafas de Lectura Premium', 'Gafas de Lectura', 'EliteVision', 69.99, 25, 'lectura_premium.jpg', 'Gafas de lectura de alta gama', 1),
('Gafas de Sol Ray-Ban Aviator', 'Gafas de Sol', 'Ray-Ban', 149.99, 10, 'rayban-aviator.jpg', 'Clásicas gafas de sol estilo aviador de Ray-Ban', 1),
('Gafas de Lectura Moderna', 'Gafas de Lectura', 'OpticBlue', 59.99, 20, 'lectura-moderna.jpg', 'Gafas de lectura con montura moderna', 1),
('Lentes de Contacto Acuvue', 'Lentes de Contacto', 'Acuvue', 29.99, 40, 'acuvue-contacto.jpg', 'Lentes de contacto suaves y cómodos', 1),
('Gafas Progresivas Avanzadas', 'Lentes Progresivas', 'Zeiss', 250.00, 5, 'progresivas-avanzadas.jpg', 'Gafas progresivas con tecnología avanzada', 1),
('Spray Limpiador de Lentes', 'Accesorios', 'CleanVision', 9.99, 50, 'spray-limpiador.jpg', 'Spray limpiador para lentes y gafas', 1),
('Gafas de Sol Oakley', 'Gafas de Sol', 'Oakley', 199.99, 8, 'oakley-sol.jpg', 'Gafas de sol deportivas Oakley', 1),
('Gafas Vintage', 'Gafas de Sol', 'RetroLux', 89.99, 15, 'vintage.jpg', 'Gafas de sol con estilo vintage', 1),
('Gafas Deportivas', 'Gafas de Sol', 'Sportify', 120.00, 12, 'deportivas.jpg', 'Gafas de sol para deportes', 1),
('Lentes de Contacto Diarias', 'Lentes de Contacto', 'Dailies', 19.99, 60, 'dailies.jpg', 'Lentes de contacto para uso diario', 1),
('Gafas de Lectura Premium', 'Gafas de Lectura', 'EliteVision', 69.99, 25, 'lectura-premium.jpg', 'Gafas de lectura con estilo premium', 1);


-- --------------------------------------------------------

-- ============================
-- TABLA: usuarios
-- ============================

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `rol` enum('admin','cliente') NOT NULL,
  `password_hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `telefono`, `rol`, `password_hash`) VALUES
(5, 'Cliente1', 'cliente1@correo.com', '555555555', 'cliente', 'hash5'),
(11, 'Flori', 'florabielsa@gmail.com', '695183255', 'admin', '$2a$10$i9pPak7ShjHjK2dNtmnzaemyL/Unb9805nbH4SGefmx3IRN3p6FEq'),
(12, 'Arthur Morgan', 'arthurmorgan@gmail.com', '695123222', 'cliente', '$2a$10$1iY.x6mbNoUrVxEQT7wAA.KOsuAsahQkfG.dloif7qbrObm9tvslm'),
(14, 'Killua Zaoldyeck', 'killua@gmail.com', '695184152', 'admin', '$2a$10$M75HuQYiM7IXRIu8.1n9/eK3sonnAGzKEgu076rV.vrWWEujCKZU2'),
(15, 'Cliente3', 'cliente3@cliente.com', '935678134', 'cliente', '$2a$10$.iakoP5Utig6265aMh0vAuyXrvBbI9ukaxawFA1xzhH1wuspq3Y4i');

-- --------------------------------------------------------

-- ============================
-- TABLA: ventas
-- ============================

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `empleado_id` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `total` decimal(10,2) DEFAULT NULL,
  `estado` enum('pendiente','pagada','cancelada') DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `ventas` (`id`, `cliente_id`, `empleado_id`, `fecha`, `total`, `estado`) VALUES
(1, 5, NULL, '2025-06-08 09:07:59', 150.00, 'pagada'),
(2, NULL, NULL, '2025-06-08 09:07:59', 200.00, 'pagada'),
(3, NULL, NULL, '2025-06-08 09:07:59', 50.00, 'pendiente'),
(4, NULL, NULL, '2025-06-08 09:07:59', 120.00, 'pagada'),
(5, NULL, NULL, '2025-06-08 09:07:59', 300.00, 'pendiente'),
(6, NULL, NULL, '2025-06-08 09:07:59', 75.00, 'cancelada'),
(7, 5, NULL, '2025-06-08 09:07:59', 220.00, 'pagada'),
(8, NULL, NULL, '2025-06-08 09:07:59', 100.00, 'pagada'),
(9, NULL, NULL, '2025-06-08 09:07:59', 80.00, 'pendiente'),
(10, NULL, NULL, '2025-06-08 09:07:59', 60.00, 'pagada');

-- --------------------------------------------------------

-- ============================
-- TABLA: ventas_productos
-- ============================

CREATE TABLE `ventas_productos` (
  `id` int(11) NOT NULL,
  `venta_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cliente_id` (`cliente_id`),
  ADD KEY `empleado_id` (`empleado_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`empleado_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
