INSERT INTO tour (title, description, neighborhood, numberOfStops, URL, duration, tags, createdAt, updatedAt) 
VALUES 
 ("Fishtown Coffee Tour", "Fishtown is home to multiple roasters and unique coffee shops, sporting local fare and eclectic atmospheres.", "Fishtown", "4", "https://www.wheretraveler.com/sites/default/files/images/Philly_LaColombe-Fishtown2_0.jpg", "60", "Food, Culture, Art", now(), now()), 

("East Passyunk Crafted Philly Tour", "From the crochet bollard covers to Isaiah Zagar's eclectic mixed-media murals, South Philly is home to some of the best street art and made-in-philly flair.", "East Passyunk", "6", "http://www.flyingkitemedia.com/galleries/Features/2013/Issue_123/passyunk(fountain).jpg", "120", "Art, Culture", now(), now()), 

("Old City Historical Houses Tour", "Visit the homes of celebrated founding fathers, like William Penn and Benjamin Franklin, along with the Betsy Ross house and Edgar Allen Poe historical site. This tour will delight the young and the young at heart as you walk through the historical wonders of our nations first capitol.", "Old City", "9", "http://pabook2.libraries.psu.edu/palitmap/ElfrethPanorama2.jpg", "120", "History, Culture", now(), now())

INSERT INTO locations (title, description, address, createdAt, updatedAt) 
VALUES 
("La Calombe", "Innovation is in our DNA. To leading the 4th wave of coffee, to the fastest growing RTD coffee beverage on the market, pushing the boundaries has been a part of who we are since the ‘94. 1335 Frankford is a window into our world. With our eyes on tomorrow, we’re changing the way we look at coffee, turning the impossible to possible and making the world a better place.", "1335 Frankford Ave", now(), now() )

INSERT INTO tours
        (locations_id)
 SELECT tours.id
   FROM tours AS id
        INNER JOIN locations AS location ON locations.id = locations_id
                   AND locations.id IS NOT NULL






