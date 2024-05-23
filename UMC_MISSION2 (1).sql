CREATE TABLE `user` (
	`id`	bigint	NOT NULL,
	`name`	varchar(20)	NULL,
	`age`	int	NULL,
	`gender`	int	NULL	COMMENT '0:m
1:f',
	`status`	int	NULL	COMMENT '0:active
1:inactive',
	`inactive_date`	datetime	NULL,
	`address`	varchar(30)	NULL,
	`small_address`	varchar(40)	NULL,
	`email`	varchar(30)	NULL,
	`point`	int	NULL,
	`created_at`	datetime(6)	NULL,
	`upadated_at`	datetime(6)	NULL
);

CREATE TABLE `mission` (
	`id`	bigint	NOT NULL,
	`store_id`	bigint	NOT NULL,
	`reward`	int	NULL,
	`body`	text	NULL,
	`created_at`	datetime(6)	NULL,
	`upadated_at`	datetime(6)	NULL
);

CREATE TABLE `agreement` (
	`id`	bigint	NOT NULL,
	`title`	varchar(20)	NULL,
	`body`	text	NULL,
	`option`	boolean	NULL,
	`created_at`	datetime(6)	NULL,
	`upadated_at`	datetime(6)	NULL
);

CREATE TABLE `store` (
	`id`	bigint	NOT NULL,
	`region_id`	bigint	NOT NULL,
	`name`	varchar(20)	NULL,
	`address`	varchar(50)	NULL,
	`star_rating`	float	NULL,
	`created_at`	datetime(6)	NULL,
	`upadated_at`	datetime(6)	NULL
);

CREATE TABLE `review` (
	`id`	bigint	NOT NULL,
	`store_id`	bigint	NOT NULL,
	`user_id`	bigint	NOT NULL,
	`body`	text	NULL,
	`star_rating`	float	NULL,
	`created_at`	datetime(6)	NULL,
	`upadated_at`	datetime(6)	NULL
);

CREATE TABLE `region` (
	`id`	bigint	NOT NULL,
	`created_at`	datetime(6)	NULL,
	`upadated_at`	datetime(6)	NULL,
	`name`	varchar(30)	NULL
);

CREATE TABLE `user_agree` (
	`id`	bigint	NOT NULL,
	`user_id`	bigint	NOT NULL,
	`term_id`	bigint	NOT NULL,
	`created_at`	datetime(6)	NULL,
	`upadated_at`	datetime(6)	NULL
);

CREATE TABLE `user_mission` (
	`id`	bigint	NOT NULL,
	`user_id`	bigint	NOT NULL,
	`mission_id`	bigint	NOT NULL,
	`status`	int	NULL	COMMENT '0:s
1:f',
	`created_at`	datetime(6)	NULL,
	`upadated_at`	datetime(6)	NULL
);

CREATE TABLE `review_image` (
	`id`	bigint	NOT NULL,
	`review_id`	bigint	NOT NULL,
	`image_url`	text	NULL,
	`created_at`	datetime(6)	NULL,
	`upadated_at`	datetime(6)	NULL
);

CREATE TABLE `food_category` (
	`id`	bigint	NOT NULL,
	`name`	varchar(30)	NULL,
	`created_at`	datetime(6)	NULL,
	`updated_at`	datetime(6)	NULL
);

CREATE TABLE `prefer` (
	`id`	bigint	NOT NULL,
	`user_id`	bigint	NOT NULL,
	`category_id`	bigint	NOT NULL,
	`created_at`	datetime(6)	NULL,
	`updated_at`	datetime(6)	NULL
);

ALTER TABLE `user` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`id`
);

ALTER TABLE `mission` ADD CONSTRAINT `PK_MISSION` PRIMARY KEY (
	`id`,
	`store_id`
);

ALTER TABLE `agreement` ADD CONSTRAINT `PK_AGREEMENT` PRIMARY KEY (
	`id`
);

ALTER TABLE `store` ADD CONSTRAINT `PK_STORE` PRIMARY KEY (
	`id`,
	`region_id`
);

ALTER TABLE `review` ADD CONSTRAINT `PK_REVIEW` PRIMARY KEY (
	`id`,
	`store_id`,
	`user_id`
);

ALTER TABLE `region` ADD CONSTRAINT `PK_REGION` PRIMARY KEY (
	`id`
);

ALTER TABLE `user_agree` ADD CONSTRAINT `PK_USER_AGREE` PRIMARY KEY (
	`id`,
	`user_id`,
	`term_id`
);

ALTER TABLE `user_mission` ADD CONSTRAINT `PK_USER_MISSION` PRIMARY KEY (
	`id`,
	`user_id`,
	`mission_id`
);

ALTER TABLE `review_image` ADD CONSTRAINT `PK_REVIEW_IMAGE` PRIMARY KEY (
	`id`,
	`review_id`
);

ALTER TABLE `food_category` ADD CONSTRAINT `PK_FOOD_CATEGORY` PRIMARY KEY (
	`id`
);

ALTER TABLE `prefer` ADD CONSTRAINT `PK_PREFER` PRIMARY KEY (
	`id`,
	`user_id`,
	`category_id`
);

ALTER TABLE `mission` ADD CONSTRAINT `FK_store_TO_mission_1` FOREIGN KEY (
	`store_id`
)
REFERENCES `store` (
	`id`
);

ALTER TABLE `store` ADD CONSTRAINT `FK_region_TO_store_1` FOREIGN KEY (
	`region_id`
)
REFERENCES `region` (
	`id`
);

ALTER TABLE `review` ADD CONSTRAINT `FK_store_TO_review_1` FOREIGN KEY (
	`store_id`
)
REFERENCES `store` (
	`id`
);

ALTER TABLE `review` ADD CONSTRAINT `FK_user_TO_review_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`id`
);

ALTER TABLE `user_agree` ADD CONSTRAINT `FK_user_TO_user_agree_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`id`
);

ALTER TABLE `user_agree` ADD CONSTRAINT `FK_agreement_TO_user_agree_1` FOREIGN KEY (
	`term_id`
)
REFERENCES `agreement` (
	`id`
);

ALTER TABLE `user_mission` ADD CONSTRAINT `FK_user_TO_user_mission_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`id`
);

ALTER TABLE `user_mission` ADD CONSTRAINT `FK_mission_TO_user_mission_1` FOREIGN KEY (
	`mission_id`
)
REFERENCES `mission` (
	`id`
);

ALTER TABLE `review_image` ADD CONSTRAINT `FK_review_TO_review_image_1` FOREIGN KEY (
	`review_id`
)
REFERENCES `review` (
	`id`
);

ALTER TABLE `prefer` ADD CONSTRAINT `FK_user_TO_prefer_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`id`
);

ALTER TABLE `prefer` ADD CONSTRAINT `FK_food_category_TO_prefer_1` FOREIGN KEY (
	`category_id`
)
REFERENCES `food_category` (
	`id`
);

