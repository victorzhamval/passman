CREATE DATABASE passman;

CREATE TABLE users (
	user_id UUID PRIMARY KEY NOT NULL,
	username VARCHAR(128) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	description VARCHAR(128) DEFAULT 'Add a description',
  profile_image VARCHAR(128) NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vaults (
	vault_id UUID PRIMARY KEY NOT NULL,
	title VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	site_url VARCHAR(255) NOT NULL,
	description VARCHAR(255) DEFAULT '/',
	is_pinned BOOLEAN DEFAULT FALSE,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	edited_at timestamp DEFAULT NULL,
	user_id UUID NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);
