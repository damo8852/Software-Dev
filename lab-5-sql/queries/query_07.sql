-- TODO: Update the platform for all 2004 movies to be Netflix. and return 'netflix' and the count of updated rows.
update movies
set platform = 'Netflix'
where year_of_release = 2004;
select 'Netflix' as platform, count(*) as updated_rows from movies where year_of_release = 2004;
