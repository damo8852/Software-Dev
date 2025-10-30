-- TODO: Get movies available on Hulu orderd by id.
select m.name, m.platform from movies m
join platforms p on m.platform = p.name
where p.name = 'Hulu'
order by m.id;
