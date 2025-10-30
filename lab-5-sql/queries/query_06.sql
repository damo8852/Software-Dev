-- TODO: Top 3 highest grossing thriller movies.
select m.name, m.gross from movies m
join genres g on m.genre = g.name
where g.name = 'Thriller'
order by m.gross desc
limit 3;
