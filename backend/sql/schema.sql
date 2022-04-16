CREATE TABLE book (
	id UUID PRIMARY KEY,
	title TEXT NOT NULL,
	author TEXT NOT NULL,
	description TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO book (id, title, author, description) VALUES (gen_random_uuid(), 'Harry potter', 'J.K. Rowling', 'wizards harry');
