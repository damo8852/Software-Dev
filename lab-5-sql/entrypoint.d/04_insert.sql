-- TODO: Insert atleast 2 rows in each table
-- Insert rows into movies table
INSERT INTO movies (id, name, duration, year_of_release, gross_revenue, country, language, imdb_rating, platform)
VALUES 
(27, 'Inception', 148, 2010, 829895144, 'USA', 'English', 8.8, 'Netflix'),
(28, 'Parasite', 132, 2019, 263300000, 'South Korea', 'Korean', 8.6, 'Amazon Prime');

-- Insert rows into actors table
INSERT INTO actors (name, agency, active_since, location)
VALUES 
('Song Kang-ho', 'HoRang-i Entertainment', 1996, 'Seoul');

-- Insert rows into platforms table
INSERT INTO platforms (name, viewership_cost)
VALUES 
('Amazon Prime', 12);

-- Insert rows into genre table
INSERT INTO genre (name)
VALUES 
('Horror'),
('Animated');

-- Insert rows into movies_to_actors table
INSERT INTO movies_to_actors (movie_id, actor_id)
VALUES 
(27, 17),  -- Inception, Leonardo DiCaprio
(28, 21);  -- Parasite, Song Kang-ho

-- Insert rows into movies_to_genres table
INSERT INTO movies_to_genres (movie_id, genre_id)
VALUES 
(27, 4),  -- Inception, Action
(28, 7);  -- Parasite, Thriller
