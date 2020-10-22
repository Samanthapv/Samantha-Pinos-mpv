CREATE TABLE `Articles` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(45) NOT NULL,
	`price` INT NOT NULL,
	`picture` varchar(255) NOT NULL,
	`description` varchar(500) NOT NULL,
	`colorId` varchar(40) NOT NULL,
	`inventory` INT NOT NULL,
	`categoryId` varchar(255) NOT NULL,
	`tags` varchar(200) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Categories` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`category_name` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Colors` (
	`id` BINARY NOT NULL AUTO_INCREMENT,
	`color_name` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Articles` ADD CONSTRAINT `Items_fk0` FOREIGN KEY (`colorId`) REFERENCES `Colors`(`id`);

ALTER TABLE `Articles` ADD CONSTRAINT `Items_fk1` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`);

