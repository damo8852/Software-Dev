-- TODO: Find 3 oldest movies. Return only THREE rows.
select name, year_of_release from movies
order by year_of_release
limit 3;
