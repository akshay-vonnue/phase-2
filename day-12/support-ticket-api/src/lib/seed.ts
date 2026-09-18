import { db } from "../prisma/db";

async function seed() {
    let customer1 = await db.orm.public.Customer.create({ name: 'akshay', email: 'akshay@gmail.com' });
    let customer2 = await db.orm.public.Customer.create({ name: 'anjal', email: 'anjal@gmail.com' });

    let agent1 = await db.orm.public.Agent.create({ name: 'x', email: 'x@gmail.com' });
    let agent2 = await db.orm.public.Agent.create({ name: 'y', email: 'y@gmail.com' });

    let swCategory = await db.orm.public.Category.create({ name: 'software' });
    let hwCategory = await db.orm.public.Category.create({ name: 'hardware' });

    let ticket_1 = await db.orm.public.Ticket.create({
        title: 'issue 1',
        description: 'some issue no 1',
        priority: 'LOW',
        category_id: swCategory.id,
        customer_id: customer1.id
    })

    let ticket_2 = await db.orm.public.Ticket.create({
        title: 'issue 2',
        description: 'some issue no 2',
        priority: 'LOW',
        category_id: hwCategory.id,
        customer_id: customer2.id
    })

    await db.orm.public.Status.create({
        ticket_id: ticket_1.id,
        status:'open'
    })

    await db.orm.public.Status.create({
        ticket_id: ticket_2.id,
        status:'open'
    })

    await db.orm.public.Assignment.create({
        ticket_id: ticket_1.id,
        user_id: agent1.id
    })

    await db.orm.public.Assignment.create({
        ticket_id: ticket_2.id,
        user_id: agent2.id
    })

    await db.orm.public.Comment.create({
        ticket_id: ticket_1.id,
        user_id: agent1.id,
        comment:'try using this method to resolve the issue'
    })

}


seed()