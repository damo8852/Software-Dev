-- TODO: Add your `CREATE` statements to this file.

create table movies (
    id int primary key,
    name varchar(255),
    duration int,
    year_of_release int,
    gross_revenue int,
    country varchar(255),
    language varchar(255),
    imdb_rating decimal,
    platform varchar(255),
)

create table actors(
    id serial primary key,
    name varchar(100) not null,
    agency varchar(100),
    active_since int,
    location varchar(100)
);

create table platforms (
    id serial primary key,
    name varchar(100) not null,
    viewership_cost int
);

create table genre (
    id serial primary key,
    name varchar(100) not null
);

create table movies_to_actors (
    movie_id int,
    actor_id int
);

create table movies_to_genres (
    movie_id int,
    genre_id int
);



--               List of relations
--  Schema |       Name       | Type  |  Owner
-- --------+------------------+-------+----------
--  public | actors           | table | postgres
--  public | genre            | table | postgres
--  public | movies           | table | postgres
--  public | movies_to_actors | table | postgres
--  public | movies_to_genres | table | postgres
--  public | platforms        | table | postgres
-- (6 rows)