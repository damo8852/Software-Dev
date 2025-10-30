-- TODO: Verify that the data was correctly inserted into each table.
/*
id |                             name                              | duration | year_of_release | gross_revenue |     country      |         language          | imdb_rating | platform_id
----+---------------------------------------------------------------+----------+-----------------+---------------+------------------+---------------------------+-------------+-------------
  1 | Shadow Riders, The                                            |        1 |            2002 |        614488 | Croatia          | Italian                   |         9.3 |           6
  2 | Saban, Son of Saban                                           |        3 |            2000 |        497138 | Portugal         | Indonesian                |         9.8 |           6
  3 | Stand, The                                                    |        3 |            1998 |        357507 | Indonesia        | Afrikaans                 |         8.1 |           5
  4 | Smoke Signals                                                 |        2 |            2002 |        514212 | Japan            | Yiddish                   |         3.9 |           6
  5 | Miracle                                                       |        3 |            2011 |        411214 | Philippines      | Kyrgyz                    |         6.2 |           1
  6 | American History X                                            |        3 |            1994 |        558888 | Armenia          | Bengali                   |         9.0 |           6
  7 | Secret Honor                                                  |        4 |            1996 |        690973 | Poland           | Lithuanian                |        10.0 |           1
  8 | Satan's Tango (Sátántangó)                                    |        3 |            2004 |        524659 | United States    | Telugu                    |         4.9 |           1
  9 | Miguel and William (Miguel y William)                         |        2 |            1992 |        286501 | Poland           | Quechua                   |         3.9 |           3
 10 | Kid, The                                                      |        3 |            2001 |        524241 | China            | Northern Sotho            |         7.2 |           3
 11 | Angus                                                         |        3 |            1991 |        439725 | China            | Estonian                  |         8.5 |           7
 12 | Cover-Up                                                      |        3 |            2004 |        618728 | United States    | Bislama                   |         7.0 |           7
 13 | Holy Flying Circus                                            |        2 |            2007 |        431889 | Peru             | Arabic                    |         7.6 |           1
 14 | Weary River                                                   |        1 |            2012 |        617264 | China            | Dzongkha                  |         7.5 |           3
 15 | Beneath                                                       |        2 |            2003 |        639454 | Portugal         | Māori                     |         9.4 |           3
 16 | Cabinet of Dr. Caligari, The (Cabinet des Dr. Caligari., Das) |        2 |            2010 |        562512 | Portugal         | Gujarati                  |         7.7 |           6
 17 | Midsummer Night's Sex Comedy, A                               |        1 |            2004 |        874906 | China            | Spanish                   |         1.0 |           3
 18 | So It Goes (Korsoteoria)                                      |        2 |            1997 |        274951 | Philippines      | Macedonian                |         6.7 |           3
 19 | Backwood Philosopher (Havukka-ahon ajattelija)                |        2 |            2006 |        776793 | China            | West Frisian              |         6.7 |           1
 20 | Ballad of a Soldier (Ballada o soldate)                       |        3 |            2008 |        843458 | Tanzania         | Amharic                   |         4.4 |           5
 21 | Mammy                                                         |        1 |            1988 |        938708 | Peru             | New Zealand Sign Language |         2.9 |           7
 22 | Midnight Movies: From the Margin to the Mainstream            |        2 |            1994 |        398190 | Falkland Islands | Swati                     |         6.6 |           1
 23 | Our Fathers                                                   |        4 |            1992 |        455841 | Japan            | Dari                      |         5.0 |           4
 24 | I'm So Excited (Los amantes pasajeros)                        |        1 |            2002 |        426835 | Czech Republic   | English                   |         9.3 |           2
 25 | Dawn Rider, The                                               |        3 |            1993 |        696567 | Indonesia        | Bislama                   |         6.1 |           6
 26 | Shutter Island                                                |        2 |            2010 |     294805697 | United States    | English                   |         8.2 |           1

  id |  name   | viewership_cost 
----+---------+-----------------
  1 | Netflix |             521
  2 | Demizz  |             403
  3 | Agimba  |             653
  4 | Gabcube |             311
  5 | Yabox   |             200
  6 | Hulu    |             508
  7 | Oba     |             524
(7 rows)


 id |        name        |            agency             | active_since |    location    
----+--------------------+-------------------------------+--------------+----------------
  1 | Bern               | Mills, Okuneva and Kuphal     |         1992 | Pennsylvania
  2 | Andria             | Farrell-Jacobi                |         2001 | Georgia
  3 | Marysa             | Fahey, Purdy and Fay          |         2003 | Louisiana
  4 | Nikolaus           | Larson-Jerde                  |         2013 | Pennsylvania
  5 | Hildegaard         | Borer-Rodriguez               |         2010 | Kentucky
  6 | Orlan              | Price-Ratke                   |         1995 | Texas
  7 | Camala             | Effertz, Murray and McDermott |         2009 | Florida
  8 | Truda              | Swift, Nicolas and Schoen     |         1999 | California
  9 | Nicholle           | Weissnat-Greenholt            |         2013 | Connecticut
 10 | Adi                | Pacocha, Walsh and Kassulke   |         2010 | Tennessee
 11 | Kristos            | Labadie LLC                   |         2002 | California
 12 | Tiena              | Auer-Rolfson                  |         2001 | North Carolina
 13 | Washington         | Shields, Hermiston and Grant  |         1995 | Colorado
 14 | Marco              | Dach, McDermott and Goyette   |         2006 | Michigan
 15 | Jethro             | Hauck, Walsh and Upton        |         1997 | Texas
 16 | Desiree            | Steuber Inc                   |         2004 | California
 17 | Leonardo di Caprio | Bruen, Medhurst and Doyle     |         2004 | South Carolina
 18 | Rockie             | Jacobson-Paucek               |         1987 | Florida
 19 | Malachi            | Mohr-Johnson                  |         2008 | Missouri
 20 | Oliver             | Hammes Group                  |         2007 | Maryland
(20 rows)


id |   name
----+-----------
  1 | Drama
  2 | Fantasy
  3 | Comedy
  4 | Action
  5 | War
  6 | Adventure
  7 | Thriller
  8 | Romcom
(8 rows)


 movie_id | actor_id
----------+----------
        1 |        1
       18 |        1
        4 |        1
        2 |        2
       24 |        2
        3 |        3
        4 |        4
       19 |        4
        5 |        4
        5 |        5
        6 |        5
       18 |        5
        6 |        6
       21 |        6
       11 |        6
        7 |        7
       17 |        7
        8 |        8
       23 |        8
        9 |        9
       19 |        9
       17 |        9
        1 |        9
       10 |       10
       12 |       10
        2 |       10
       11 |       11
        1 |       11
       21 |       11
       12 |       12
        6 |       12
       24 |       12
       13 |       13
        3 |       13
       14 |       14
        7 |       14
       15 |       15
        8 |       15
       16 |       16
        6 |       16
       17 |       17
        7 |       17
       20 |       17
        8 |       17
        5 |       17
        4 |       17
       18 |       18
        2 |       18
        8 |       18
        1 |       18
        5 |       18
       19 |       19
        9 |       19
       23 |       19
       17 |       19
       20 |       20
       21 |       20
       22 |       20
       23 |       20
       25 |       20
       26 |       17
(61 rows)


 movie_id | genre_id
----------+----------
        1 |        6
        2 |        6
        3 |        5
        4 |        6
        5 |        1
        6 |        6
        7 |        1
        8 |        2
        9 |        3
       10 |        3
       11 |        7
       12 |        7
       13 |        1
       14 |        3
       15 |        8
       16 |        6
       17 |        8
       18 |        3
       19 |        1
       20 |        5
       21 |        7
       22 |        1
       23 |        4
       24 |        2
       25 |        3
       26 |        7
(26 rows)
*\
