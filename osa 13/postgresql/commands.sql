CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
	title TEXT NOT NULL,
	likes INT DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Blog Adder', 'localhost', 'First Blog Added');

INSERT INTO blogs (author, url, title) VALUES ('Adder Of Blogs', 'localhost', 'Second Blog Added');

SELECT * FROM blogs;