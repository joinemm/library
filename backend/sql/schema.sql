CREATE TABLE book (
	id UUID PRIMARY KEY,
	title TEXT NOT NULL,
	author TEXT NOT NULL,
	description TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT NOW()
);
