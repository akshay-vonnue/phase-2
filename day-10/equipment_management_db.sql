DROP DATABASE IF EXISTS equipments_db;

CREATE DATABASE equipments_db;

-- enums
create type USER_ROLES AS ENUM ('admin','technician','manager','employee');

create type EQUIPMENT_STATUS AS ENUM('booked','available','maintanence');

create type BOOKING_STATUS AS ENUM('pending_approval','cancelled','rejected','approved');

create type APPROVAL_STATUS AS ENUM('pending_approval','rejected','approved');

create type MAINTANENCE_RECORD_STATUS AS ENUM('scheduled','in-progress','cancelled','resolved');

CREATE TABLE EMPLOYEES(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    role USER_ROLES NOT NULL
);

CREATE TABLE CATEGORY(
    id SERIAL PRIMARY KEY,
    name VARCHAR(15) UNIQUE NOT NULL
);

CREATE TABLE EQUIPMENT(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL,
    category_id INTEGER references CATEGORY(id),
    status EQUIPMENT_STATUS NOT NULL
);

CREATE TABLE BOOKINGS(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER references EMPLOYEES(id) NOT NULL,
    equipment_id INTEGER references EQUIPMENT(id) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status BOOKING_STATUS NOT NULL DEFAULT 'pending_approval',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE APPROVAL(
    id serial PRIMARY KEY,
    booking_id INTEGER references BOOKINGS(id) NOT NULL,
    approver_id INTEGER references EMPLOYEES(id) NOT NULL,
    status APPROVAL_STATUS NOT NULL,
    comments VARCHAR(30),
    approved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE MAINTANENCE_RECORD(
    id SERIAL PRIMARY KEY,
    equipment_id INTEGER references EQUIPMENT(id) NOT NULL,
    technician_id INTEGER references EMPLOYEES(id) NOT NULL,
    issue_description VARCHAR(30) NOT NULL,
    resolution_details VARCHAR(30) NOT NULL,
    cost DECIMAL(10,2) DEFAULT 0.00,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    status MAINTANENCE_RECORD_STATUS NOT NULL DEFAULT 'scheduled'
);

-- seed

INSERT INTO EMPLOYEES(name,email,role) values
('akshay','akshay@gmail.com','admin'),
('anjal','anjal@gmail.com','manager'),
('delwin','delwin@gmail.com','technician'),
('sharan','sharan@gmail.com','employee');

INSERT INTO CATEGORY(name) values
('laptop'),('lab equipment'),('power tools'),('vehicles');

INSERT INTO EQUIPMENT(name,category_id,status) values('macbook',1,'available');
INSERT INTO EQUIPMENT(name,category_id,status) values('microscope',2,'available');
INSERT INTO EQUIPMENT(name,category_id,status) values('cutter',3,'available');
INSERT INTO EQUIPMENT(name,category_id,status) values('tesla',4,'available');

INSERT INTO BOOKINGS(employee_id,equipment_id,start_time,end_time) values
(1,1,NOW() + INTERVAL '1 hour',NOW() + INTERVAL '3 hours'),
(2,2,NOW() + INTERVAL '2 hour',NOW() + INTERVAL '5 hours'),
(2,3,NOW() + INTERVAL '1 hour',NOW() + INTERVAL '8 hours'),
(2,4,NOW() + INTERVAL '2 hour',NOW() + INTERVAL '4 hours');

INSERT INTO MAINTANENCE_RECORD (equipment_id, technician_id, issue_description, resolution_details, cost, start_time, end_time, status) VALUES 
(1, 3, 'Screen flickering', 'Replaced display cable', 150.00, NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day', 'resolved'),
(4, 3, 'Battery heating', 'Pending diagnostic test', 0.00, NOW(), NOW() + INTERVAL '2 days', 'in-progress'),
(2, 3, 'Lens calibration', 'Pending parts arrival', 50.00, NOW() + INTERVAL '1 day', NOW() + INTERVAL '3 days', 'scheduled');

-- transaction
BEGIN;

INSERT INTO APPROVAL(booking_id,approver_id,status,comments)
values (2,2,'approved','handle with care');

UPDATE BOOKINGS 
set status = 'approved'
where id = 1;

UPDATE EQUIPMENT 
set status = 'booked' 
where id = 1;

COMMIT;


-- equipments that are currently in maintanence
select e.id , e.name
from EQUIPMENT e
join MAINTANENCE_RECORD m on e.id = m.equipment_id
where m.status in ('in-progress','scheduled');

-- fetch all bookings made by a specific employee
select b.id , e.name
from BOOKINGS b
join EMPLOYEES e
on b.employee_id = e.id
where b.employee_id = 1;

-- fetch equipment that are not currently booked
select id,status
from BOOKINGS
where id not in (select equipment_id from bookings);

-- total maintanence cost as per category
select c.name , sum(m.cost)
from CATEGORY c
join EQUIPMENT e on c.id = e.category_id
join MAINTANENCE_RECORD m on e.id = m.equipment_id
group by c.name;

-- most frequently booked equipment
select e.name
from EQUIPMENT e
join BOOKINGS b on e.id = b.equipment_id
group by e.name
order by count(b.id) desc
limit 1;

--  find conflicting time slots
select b1.equipment_id,b1.id,b2.id,b1.start_time,b1.end_time
from BOOKINGS b1
join BOOKINGS b2
on b1.equipment_id = b2.equipment_id and b1.id < b2.id
where (b1.start_time ,b1.end_time) overlaps (b2.start_time,b2.end_time);

-- pending approvals with employee details
select b.id , emp.name , e.name , b.start_time , b.end_time
from BOOKINGS b
join EMPLOYEES emp on b.employee_id = emp.id
join EQUIPMENT e on b.equipment_id = e.id
where b.status = 'pending_approval';

-- count how many tasks are assigned to each technicians

select emp.name as technician,count(m.id) as active_tasks
from EMPLOYEES emp
left join MAINTANENCE_RECORD m on emp.id = m.technician_id and m.status in ('scheduled','in-progress')
where emp.role = 'technician'
group by emp.name;

-- find equipments available to book right now
select id,name,status
from EQUIPMENT
where status = 'available'
and id not in (
    select equipment_id from MAINTANENCE_RECORD
    where status = 'in-progress' OR(status = 'scheduled' AND NOW() between start_time and end_time)
);


-- 
-- 
-- indexes

-- it helps in finding booking that are conflicting with each other fastly
create index id_booking_time on BOOKINGS(equipment_id,start_time,end_time);

-- helps in filtering maintanence records that are still in progress and scheduled
-- after a long time there will be more resolved records and would be harder to filter other records from it
create index id_maintanence 
on MAINTANENCE_RECORD(id) 
where status in ('in-progress','scheduled');