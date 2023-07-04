docker run -e POSTGRES_PASSWORD=<password> -p 5432:5432 postgres

docker ps

docker exec -it <password> psql -U postgres postgres

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

docker exec -it <password> psql -U postgres postgres

DROP TABLE blogs;

\d

netstat -ano | findstr :5432


taskkill /PID <PID> /F


