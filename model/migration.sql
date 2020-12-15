
 CREATE TABLE `Articles` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(45) NOT NULL,
	`price` INT NOT NULL,
	`picture` varchar(255) NOT NULL,
	`description` varchar(500) NOT NULL,
	`colorId` INT(40) NOT NULL,
	`categoryId` INT(255) NOT NULL,
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
	PRIMARY KEY (`id`)
);

CREATE TABLE `Orders` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`userId` INT NOT NULL,
	`date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`confirmed` BOOLEAN NOT NULL DEFAULT false,
	PRIMARY KEY (`id`,`userId`)
);

CREATE TABLE `OrderDetails` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`orderId` INT NOT NULL,
	`ArticleId` INT NOT NULL,
	`Size` VARCHAR(255) NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Articles` ADD CONSTRAINT `Articles_fk0` FOREIGN KEY (`colorId`) REFERENCES `Colors`(`id`);

ALTER TABLE `Articles` ADD CONSTRAINT `Articles_fk1` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`);

ALTER TABLE `Orders` ADD CONSTRAINT `Orders_fk0` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`);

ALTER TABLE `OrderDetails` ADD CONSTRAINT `OrderDetails_fk0` FOREIGN KEY (`orderId`) REFERENCES `Orders`(`id`);

ALTER TABLE `OrderDetails` ADD CONSTRAINT `OrderDetails_fk1` FOREIGN KEY (`ArticleId`) REFERENCES `Articles`(`id`);