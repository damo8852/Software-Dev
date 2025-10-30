-- TODO: Actor with the overall highest revenue?
select a.name, sum(m.gross) as revenue from actors a
join movies_to_actors mta on a.id = mta.actor_id
join movies m on mta.movie_id = m.id
group by a.name
order by revenue desc
limit 1;
