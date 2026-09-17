-- filtering tickets that have status 'open'.

select * from ticket inner join status on ticket.ticket_id = status.ticket_id where status.status = 'open';

-- filtering tickets where priority = 'low'.

select * from ticket where ticket.priority = 'low'; 

-- update status of a ticket

update status set status = 'closed' where ticket_id = 1;