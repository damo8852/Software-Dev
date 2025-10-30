-- TODO: Find the highest rated movie.
-- If there is a tie, return only one of highest rated movies.
select name, imdb_rating from movies
order by imdb_rating desc
limit 1;
