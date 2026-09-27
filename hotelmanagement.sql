-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 21 jan. 2026 à 19:56
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `hotelmanagement`
--

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `chambres`
--

DROP TABLE IF EXISTS `chambres`;
CREATE TABLE IF NOT EXISTS `chambres` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `prix` decimal(8,2) NOT NULL,
  `numero` int NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `images` json DEFAULT NULL,
  `type_chambre_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `chambres_type_chambre_id_foreign` (`type_chambre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `chambres`
--

INSERT INTO `chambres` (`id`, `prix`, `numero`, `description`, `images`, `type_chambre_id`, `created_at`, `updated_at`) VALUES
(4, 10000.00, 1, 'Adorable', '[\"chambres/H99EMWZGHCgvlP44TBgWubUvZ3gbhYTTg5Hf5bHy.webp\", \"chambres/XQRrbsa3tEbpGz8v57gkvKH8HYBjc4pIEpf96aun.jpg\"]', 2, '2026-01-08 22:29:37', '2026-01-16 17:00:50'),
(5, 40000.00, 2, 'Bonne qualité', '[\"chambres/53l5fZbEBFsvAKDPva7waS69oh2SMrUozXGuyVyf.jpg\"]', 3, '2026-01-08 22:35:02', '2026-01-16 20:21:18'),
(6, 7000.00, 3, 'Lumière du jour', '[\"chambres/yE6B7A8sRG3r635o1HvuP0OCWFbBCzq8uTluirq1.jpg\"]', 2, '2026-01-08 22:36:33', '2026-01-08 22:57:01'),
(7, 24000.00, 4, 'Belle nuit et belle jour', '[\"chambres/gdb0IlZYWhNuPw1yLOfJRLR5oYxuzoGW6pdp3083.jpg\"]', 1, '2026-01-08 22:41:40', '2026-01-08 22:43:06'),
(9, 50000.00, 6, 'Confortable', '[\"chambres/5kgybaa1PdfnnaIcjW61eWf996LFTOLRWPHJ1Hjl.webp\"]', 1, '2026-01-08 22:48:55', '2026-01-08 22:48:55'),
(13, 12000.00, 7, 'Bonne qualitée', '[\"chambres/jdHC6Umt2nt1f1LpwrCwuACXZCs2VDNHVllNv3xd.jpg\", \"chambres/Q4Qp9sTavdttlzNV7dXVVvBCst8vRaJzETpBgWG4.jpg\", \"chambres/v6tBM4l2QHOT3AShqgffwFtWA7J3ERKefM583glI.jpg\"]', 4, '2026-01-17 15:28:30', '2026-01-17 15:28:30');

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000001_create_cache_table', 1),
(2, '2014_10_12_000000_create_users_table', 1),
(3, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(4, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(6, '2025_10_30_233309_create_statut_commandes_table', 1),
(7, '2025_10_30_233812_create_type_chambres_table', 1),
(8, '2025_10_30_234025_create_chambres_table', 1),
(9, '2025_10_30_234903_create_reservations_table', 1),
(10, '2025_11_26_192058_create_sessions_table', 1),
(11, '2025_12_18_205055_create_permission_tables', 1);

-- --------------------------------------------------------

--
-- Structure de la table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
CREATE TABLE IF NOT EXISTS `model_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
CREATE TABLE IF NOT EXISTS `model_has_roles` (
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 2),
(2, 'App\\Models\\User', 1),
(3, 'App\\Models\\User', 3),
(3, 'App\\Models\\User', 4);

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
CREATE TABLE IF NOT EXISTS `reservations` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `prix` decimal(8,2) NOT NULL,
  `datestart` date NOT NULL,
  `dateend` date NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `chambre_id` bigint UNSIGNED NOT NULL,
  `statut_commande_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reservations_user_id_foreign` (`user_id`),
  KEY `reservations_chambre_id_foreign` (`chambre_id`),
  KEY `reservations_statut_commande_id_foreign` (`statut_commande_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `reservations`
--

INSERT INTO `reservations` (`id`, `prix`, `datestart`, `dateend`, `user_id`, `chambre_id`, `statut_commande_id`, `created_at`, `updated_at`) VALUES
(2, 60000.00, '2026-01-10', '2026-01-16', 2, 4, 4, '2026-01-09 08:26:42', '2026-01-09 18:09:28'),
(3, 72000.00, '2026-01-17', '2026-01-20', 2, 7, 4, '2026-01-09 12:10:08', '2026-01-09 18:38:51'),
(6, 56000.00, '2026-01-10', '2026-01-18', 2, 6, 3, '2026-01-09 14:08:23', '2026-01-09 14:42:49'),
(7, 80000.00, '2026-02-09', '2026-02-11', 2, 5, 2, '2026-01-09 14:41:11', '2026-01-11 17:23:25'),
(9, 150000.00, '2026-01-31', '2026-02-03', 1, 9, 2, '2026-01-09 16:16:52', '2026-01-09 18:41:03'),
(12, 21000.00, '2026-01-14', '2026-01-17', 1, 6, 1, '2026-01-11 17:27:19', '2026-01-11 17:27:19'),
(14, 98000.00, '2026-01-24', '2026-02-07', 4, 6, 1, '2026-01-16 17:29:03', '2026-01-16 17:29:03'),
(15, 280000.00, '2026-01-18', '2026-01-25', 4, 5, 1, '2026-01-16 18:31:29', '2026-01-16 18:31:29'),
(16, 21000.00, '2026-01-18', '2026-01-21', 2, 6, 1, '2026-01-16 20:52:49', '2026-01-16 20:52:49'),
(17, 49000.00, '2026-01-24', '2026-01-31', 4, 6, 4, '2026-01-16 20:54:31', '2026-01-16 20:56:06'),
(18, 50000.00, '2026-01-19', '2026-01-20', 4, 9, 2, '2026-01-17 15:16:41', '2026-01-17 15:18:15');

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'web', '2026-01-08 15:43:40', '2026-01-08 15:43:40'),
(2, 'Receptioniste', 'web', '2026-01-08 15:43:40', '2026-01-08 15:43:40'),
(3, 'Client', 'web', '2026-01-08 15:43:40', '2026-01-08 15:43:40');

-- --------------------------------------------------------

--
-- Structure de la table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
CREATE TABLE IF NOT EXISTS `role_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('s4gdalU1okfJvgfHoBbqF0xiU1FHNMLi30ol7DRW', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiU0NjUFp6WmZqWkZrdnNFcXEyU3UzbEZhZGJmdUxGRldiYTFDTkRnZSI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czozMDoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2NoYW1icmVzIjt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1768688148),
('qCH11FtWOJbhKsVFaQeT3mJt4TCoyZirLFUREtXY', 2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiVG5zTlhHS1FreDZ3WllLSENVczVEd2k2UkpVb3Z2dkRZcElaVlpJTSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MjtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozMDoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2NoYW1icmVzIjt9fQ==', 1768676434),
('Yveq1YtwgSgg9jxuhDkwNmPu5LWpPyuZu3E0WOPU', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiUDhCVU1SclloanpFNWVUQnRaMXZ5VDJSYzhNMlhEUVZjbG1aNmw3eCI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo0NDoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL3Jlc2VydmF0aW9ucy9yZWNlcHRpb24iO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyNzoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2xvZ2luIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1768636626),
('Dy5kCThCAwGsWWpYjb0SfgheJSP73MOLWOfFdNI3', 2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoieWpXR294V1phUENFbUdDeTlIeE5UU2Fwc1RtWG5CMjMyclZXT29hNSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjI7fQ==', 1768608745),
('tz043qPmXgDSVbILUdiy2BZvZ24iHun2lHEnLpHw', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoicVhlbFlyTDJRaGw4M0pETTg4eXZmeHFYQ1prNnI0OGVVblJqNGFLMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6MzoidXJsIjthOjE6e3M6ODoiaW50ZW5kZWQiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jaGFtYnJlcyI7fX0=', 1768641264),
('VaOcL2sr3uDTx9ex4ZoHokVtNxjWIAs92aaQh2nI', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiaHRrRzVma1h6RUQwRzQ2dU1kYkZYaWFjVUpqcHJWYWtKdWpRbXhXWiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo0NDoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL3Jlc2VydmF0aW9ucy9yZWNlcHRpb24iO319', 1768608605),
('9BdXhK1GkYMwSaD2DDvqxQ2PVKnMROpr3YHumUol', 4, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiUTBvQlZ5YU5UTUk5eE5sdjhLczR3YnhoZ1E4bWJ0cVJkY2I3TENqTCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjQ7fQ==', 1768607715);

-- --------------------------------------------------------

--
-- Structure de la table `statut_commandes`
--

DROP TABLE IF EXISTS `statut_commandes`;
CREATE TABLE IF NOT EXISTS `statut_commandes` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `statut` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `statut_commandes`
--

INSERT INTO `statut_commandes` (`id`, `statut`, `created_at`, `updated_at`) VALUES
(1, 'en_attente', '2026-01-08 15:43:40', '2026-01-08 15:43:40'),
(2, 'confirmée', '2026-01-08 15:43:40', '2026-01-08 15:43:40'),
(3, 'annulée', '2026-01-08 15:43:40', '2026-01-08 15:43:40'),
(4, 'terminée', '2026-01-09 16:50:49', '2026-01-09 16:50:49');

-- --------------------------------------------------------

--
-- Structure de la table `type_chambres`
--

DROP TABLE IF EXISTS `type_chambres`;
CREATE TABLE IF NOT EXISTS `type_chambres` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `type_chambres`
--

INSERT INTO `type_chambres` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'VIP', '2026-01-08 15:43:40', '2026-01-08 15:43:40'),
(2, 'Standard', '2026-01-08 15:43:40', '2026-01-08 15:43:40'),
(3, 'Deluxe', '2026-01-08 15:43:40', '2026-01-08 15:43:40'),
(4, 'Familiale', '2026-01-08 15:43:40', '2026-01-08 15:43:40');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numero` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nationality` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `numero`, `photo`, `nationality`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'RAHERINANTENAINA Angelco', '0325412775', NULL, 'Malagasy', 'angiliorazafindrasolo@gmail.com', NULL, '$2y$12$2KwkUymdgt48q0gh8Rdfn.b24fkknXgCk9r0nDG6LwVfV5lknmyVW', NULL, '2026-01-08 15:44:29', '2026-01-14 03:01:19'),
(2, 'R Angilio', '0325412775', NULL, 'Malagasy', 'johntroaikkyman@gmail.com', NULL, '$2y$12$GAQg2a2JFl0EVqFpGrVn5uucXqoQuv.tcc.LLT6Rb1X2JKjptMjfy', 'hvr5XTkJZ1YDCbSAvwM5p6fQRjEMSYhbvazHmjkkMMUuRVHZffSTeGgd9VPw', '2026-01-09 08:26:13', '2026-01-09 08:26:13'),
(3, 'John Troaikkyman', '0325412775', NULL, 'Malagasy', 'razanamamitinamelina@gmail.com', NULL, '$2y$12$rtn7O0.L8.bAc7TjheirGuxRyNiD/cq6EGd6TyjukmkvQywO1SOo.', NULL, '2026-01-09 18:52:06', '2026-01-09 18:52:06'),
(4, 'Angelco RAHERINIRINA', '0325412775', NULL, 'Malagasy', 'angelco@gmail.com', NULL, '$2y$12$nq3XBP0PQp0DFjii/hebbO0cSYiKgi3zMokOBTxoKAoe19CcklIke', NULL, '2026-01-16 17:28:09', '2026-01-16 17:28:09');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `chambres`
--
ALTER TABLE `chambres`
  ADD CONSTRAINT `chambres_type_chambre_id_foreign` FOREIGN KEY (`type_chambre_id`) REFERENCES `type_chambres` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_chambre_id_foreign` FOREIGN KEY (`chambre_id`) REFERENCES `chambres` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservations_statut_commande_id_foreign` FOREIGN KEY (`statut_commande_id`) REFERENCES `statut_commandes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
