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
customer_id INTEGER references CUSTOMER(customer_id) ON DELETE CASCADE,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

create table CATEGORY(
category_id serial PRIMARY KEY,
name varchar(30) UNIQUE NOT NULL);

create table STATUS(
status_id serial PRIMARY KEY,
status varchar(20),
ticket_id INTEGER references TICKET(ticket_id)) ON DELETE CASCADE;

CREATE TABLE COMMENTS(comment_id serial PRIMARY KEY,
ticket_id INTEGER references TICKET(ticket_id) ON DELETE CASCADE,
comment varchar(30) NOT NULL,
user_id INTEGER references AGENT(user_id)) ON DELETE CASCADE;

create table ASSIGNMENT(assignment_id serial PRIMARY KEY,
ticket_id INTEGER references TICKET(ticket_id) ON DELETE CASCADE,
user_id INTEGER references AGENT(user_id)) ON DELETE CASCADE;



-- enums

create type ticket_status as enum('open','in-progess','closed');
ALTER TABLE status 
    ALTER COLUMN status TYPE ticket_status USING status::ticket_status;
ALTER TABLE status 
    ALTER COLUMN status SET DEFAULT 'open';


select count(*) from ticket join status on ticket.ticket_id = status.ticket_id where status.status = 'open';
select count(*) from ticket join assignment on ticket.ticket_id = assignment.ticket_id where assignment.user_id = '1';


-- select customer with five tickets open
select name 
from customer 
join ticket 
on customer.customer_id = ticket.customer_id 
join status on ticket.ticket_id = status.ticket_id
where status.status = 'open'
group by customer.customer_id , customer.name 
having count(*) = 5;

-- select customer with no tickets raised

select name
from customer
join ticket
on customer.customer_id != ticket.customer_id;

-- agents with no assigned tickets

select name 
from AGENT
join assignment
on AGENT.user_id != assignment.user_id;

-- oldest unresolved ticket

select * 
from ticket
join status
on ticket.ticket_id = status.ticket_id
where status.status = 'open'
order by ticket.created_at
limit 1;

--  filter by category and status

select count(*) 
from TICKET
join status
on TICKET.ticket_id = status.ticket_id
join CATEGORY
on TICKET.category_id = CATEGORY.category_id
where status.status = 'open' AND
CATEGORY.name = 'software';


-- day- 9

alter table assignment add constraint unique_ticket_assignment UNIQUE(ticket_id);

alter table status add constraint unique_ticket_status UNIQUE(ticket_id);

create table assignment_history(
history_id serial primary key,
ticket_id integer not null
references ticket(ticket_id) on delete cascade,
old_user_id integer
references agent(user_id) on delete set NULL,
new_user_id integer
references agent(user_id) on delete set NULL,
changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

-- transaction

begin;

update assignment set user_id = 2 where ticket_id = 1;

insert into assignment_history(ticket_id,old_user_id,new_user_id)
values (1,1,2);

INSERT INTO COMMENTS(ticket_id, comment, user_id)
VALUES (1, 'Ticket reassigned to agent 2', 2);

commit;

-- before indexing

explain analyze select count(*)
from ticket
join assignment
on ticket.ticket_id = assignment.ticket_id
where assignment.user_id = 2;

-- output

--                                                              QUERY PLAN                                                              
-- -------------------------------------------------------------------------------------------------------------------------------------
--  Aggregate  (cost=9.24..9.25 rows=1 width=8) (actual time=0.042..0.043 rows=1 loops=1)
--    ->  Nested Loop  (cost=0.14..9.24 rows=1 width=0) (actual time=0.024..0.025 rows=1 loops=1)
--          ->  Seq Scan on assignment  (cost=0.00..1.01 rows=1 width=4) (actual time=0.013..0.014 rows=1 loops=1)
--                Filter: (user_id = 2)
--          ->  Index Only Scan using ticket_pkey on ticket  (cost=0.14..8.16 rows=1 width=4) (actual time=0.009..0.009 rows=1 loops=1)
--                Index Cond: (ticket_id = assignment.ticket_id)
--                Heap Fetches: 1
--  Planning Time: 0.323 ms
--  Execution Time: 0.088 ms
-- (9 rows)

-- after indexing

--                                                              QUERY PLAN                                                              
-- -------------------------------------------------------------------------------------------------------------------------------------
--  Aggregate  (cost=9.24..9.25 rows=1 width=8) (actual time=0.025..0.026 rows=1 loops=1)
--    ->  Nested Loop  (cost=0.14..9.24 rows=1 width=0) (actual time=0.022..0.023 rows=1 loops=1)
--          ->  Seq Scan on assignment  (cost=0.00..1.01 rows=1 width=4) (actual time=0.010..0.010 rows=1 loops=1)
--                Filter: (user_id = 2)
--          ->  Index Only Scan using ticket_pkey on ticket  (cost=0.14..8.16 rows=1 width=4) (actual time=0.011..0.011 rows=1 loops=1)
--                Index Cond: (ticket_id = assignment.ticket_id)
--                Heap Fetches: 1
--  Planning Time: 0.124 ms
--  Execution Time: 0.049 ms
-- (9 rows)