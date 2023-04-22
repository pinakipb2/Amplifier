-- CreateTable
CREATE TABLE `PodcastPlaylist` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `image` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PodcastPlaylist_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Podcast` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `category` ENUM('EDUCATION', 'PUBLIC', 'BUSINESS', 'COMEDY', 'ARTS', 'TECHNOLOGY') NOT NULL,
    `type` ENUM('AUDIO', 'VIDEO') NOT NULL,
    `speaker` VARCHAR(191) NOT NULL,
    `podcast_url` TEXT NOT NULL,
    `podcastPlaylistId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Podcast_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Podcast` ADD CONSTRAINT `Podcast_podcastPlaylistId_fkey` FOREIGN KEY (`podcastPlaylistId`) REFERENCES `PodcastPlaylist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
