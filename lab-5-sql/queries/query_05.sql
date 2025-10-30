-- TODO: Find the actor who has acted in the maximum number of movies.
select a.name, count(mta.movie_id) as movie_count from actors a
join movies_to_actors mta on a.id = mta.actor_id
group by a.name
order by movie_count desc
limit 1;
