-- DROP DATABASE IF EXISTS PhillyMeIn;
-- CREATE DATABASE PhillyMeIn;

CREATE Table tours (
  id int AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description text(1000) NOT NULL,
  numberOfStops int(11) NOT NULL,
  tags varchar(255) NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NUll,
  URL varchar(1000) NOT NULL,
  PRIMARY KEY(id)
);

CREATE Table locations (
  id int AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description text(1000) NOT NULL,
  address text(1000) NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NUll,
  PRIMARY KEY(id)
);

CREATE Table Users (
  id int AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NUll,
  PRIMARY KEY(id)
);


