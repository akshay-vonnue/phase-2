CREATE TABLE CUSTOMER(
customer_id serial PRIMARY KEY,
name varchar(30) NOT NULL,
email varchar(30) UNIQUE NOT NULL);

CREATE TABLE AGENT(
user_id serial PRIMARY KEY,
name varchar(30) NOT NULL,
email varchar(30) UNIQUE NOT NULL);

CREATE TABLE TICKET(
ticket_id serial PRIMARY KEY,
title varchar(50) NOT NULL,
description varchar(50) NOT NULL,
customer_id INTEGER references CUSTOMER(customer_id),
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

create table CATEGORY(
category_id serial PRIMARY KEY,
name varchar(30) UNIQUE NOT NULL);

create table STATUS(
status_id serial PRIMARY KEY,
status varchar(20),
ticket_id INTEGER references TICKET(ticket_id));

CREATE TABLE COMMENTS(comment_id serial PRIMARY KEY,
ticket_id INTEGER references TICKET(ticket_id),
comment varchar(30) NOT NULL,
user_id INTEGER references AGENT(user_id));

create table ASSIGNMENT(assignment_id serial PRIMARY KEY,
ticket_id INTEGER references TICKET(ticket_id),
user_id INTEGER references AGENT(user_id));



-- enums

create type ticket_status as enum('open','in-progess','closed');
ALTER TABLE status 
    ALTER COLUMN status TYPE ticket_status USING status::ticket_status;
ALTER TABLE status 
    ALTER COLUMN status SET DEFAULT 'open';


