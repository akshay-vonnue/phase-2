# SUPPORT TICKET API

## Create a new ticket

endpoint:
```
http://localhost:3000/api/ticket/create
```
Data:
```
{
    "title":"some service issue",
    "description":"mobile not working",
    "priority":"low",
    "createdBy":"akshay",
    "assignedTo":"somebody"
}
```
Response:
```
status code : 200
message : {
    message:'Ticket created Successfully'
}
```

## List tickets by user

endpoint:
```
http://localhost:3000/api/ticket/list
```
Data:
```
{
    "user":"username"
}
```
Response:
```
status code : 200
message : [
    {
        "id": "6a57087e-ead1-4c29-9785-0048d736dce0",
        "title": "some service issue",
        "description": "mobile not working",
        "priority": "low",
        "createdBy": "akshay",
        "assignedTo": null,
        "status": "pending"
    }
]
```

## Fetch a ticket

endpoint:
```
http://localhost:3000/api/ticket/ticket/${ticket_id}
```
Response:
```
status code : 200
message : {
    "id": "6a57087e-ead1-4c29-9785-0048d736dce0",
    "title": "some service issue",
    "description": "mobile not working",
    "priority": "low",
    "createdBy": "akshay",
    "assignedTo": null,
    "status": "pending"
}
```

## Update status of a ticket

endpoint:
```
http://localhost:3000/api/ticket/ticket/${ticket_id}/${status}$
```
Response:
```
status code : 200
message : {
    "message": "status updated successfully"
}
```

## Assign ticket to agent ( admin route )

endpoint:
```
http://localhost:3000/api/admin/ticket/${ticket_id}/assign
```
Data:
```
{
    "assignedTo": "agentName"
}
```

Response:
```
status code : 200
message : {
    "message": "Ticket assigned to fadhil successfully"
}
```

## Delete a ticket
endpoint:
```
http://localhost:3000/api/ticket/ticket/${ticket_id}$
```
Response:
```
{
    "message": "data deleted Successfully",
    "data": []
}
```