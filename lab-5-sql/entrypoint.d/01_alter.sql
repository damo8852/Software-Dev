-- TODO: Make the column platform_id a FOREIGN KEY in the movies table.
ALTER TABLE movies
ADD CONSTRAINT fk_platform
FOREIGN KEY (platform_id) REFERENCES platforms(id)
ON DELETE CASCADE;

/*
movies_db=# \d movies
                           Table "public.movies"
     Column      |          Type          | Collation | Nullable | Default
-----------------+------------------------+-----------+----------+---------
 id              | integer                |           | not null |
 title           | character varying(255) |           |          |
 duration        | integer                |           |          |
 year_of_release | integer                |           |          |
 gross_revenue   | integer                |           |          |
 country         | character varying(255) |           |          |
 language        | character varying(255) |           |          |
 imdb_rating     | numeric                |           |          |
 platform_id     | integer                |           |          |
Indexes:
    "movies_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "fk_platform" FOREIGN KEY (platform_id) REFERENCES platforms(id) ON DELETE CASCADE

*\