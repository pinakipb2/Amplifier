-- CreateIndex
CREATE FULLTEXT INDEX `Podcast_name_description_speaker_idx` ON `Podcast`(`name`, `description`, `speaker`);
