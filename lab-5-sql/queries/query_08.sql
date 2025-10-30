-- TODO: Find the platform with the most movies.
select platform, count(*) as movie_count from movies
group by platform
order by movie_count desc
limit 1;
