-- TODO: Actors from Missouri that starred in a Romcom ordered by name.
select a.name from actors a
join movies_to_actors mta on a.id = mta.actor_id
join movies m on mta.movie_id = m.id
join genres g on m.genre = g.name
where a.state = 'Missouri' and g.name = 'Romcom'
order by a.name;
