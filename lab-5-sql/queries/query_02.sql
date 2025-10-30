-- TODO: Find ALL the movies starring "Leonardo di Caprio".
select m.name, m.imdb_rating from movies m
join movies_to_actors mta on m.id = mta.movie_id
join actors a on mta.actor_id = a.id
where a.name = 'Leonardo di Caprio';
