CREATE TABLE `Articles` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`price` INT NOT NULL,
	`picture` VARCHAR(255) NOT NULL,
	`description` VARCHAR(255) NOT NULL,
	`colorId` INT NOT NULL,
	`categoryId` INT NOT NULL,
	`tags` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Categories` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`category_name` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Colors` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`color_name` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`username` VARCHAR(255) NOT NULL,
	`password` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL,
	`address` VARCHAR(255) NOT NULL,
	`order` INT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Orders` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`article_id` INT NOT NULL,
	`date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Articles` ADD CONSTRAINT `Articles_fk0` FOREIGN KEY (`colorId`) REFERENCES `Colors`(`id`);

ALTER TABLE `Articles` ADD CONSTRAINT `Articles_fk1` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`);

ALTER TABLE `Users` ADD CONSTRAINT `Users_fk0` FOREIGN KEY (`order`) REFERENCES `Orders`(`id`);

ALTER TABLE `Orders` ADD CONSTRAINT `Orders_fk0` FOREIGN KEY (`article_id`) REFERENCES `Articles`(`id`);
