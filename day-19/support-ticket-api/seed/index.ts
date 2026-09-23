import { agent } from 'supertest';
import { Priority } from '../src/generated/prisma/enums';
import { prisma } from '../src/lib/prisma.js'

async function main() {

    
    
    const customers = await prisma.customer.createManyAndReturn({
        data: Array.from({ length: 20 }, (_, i) => ({
            name: `customer ${i + 1}`,
            email: `customer${i + 1}@example.com`,
            role: 'USER',
            password:"123456"
        })),
    });

    const agents = await prisma.agent.createManyAndReturn({
        data: Array.from({ length: 5 }, (_, i) => ({
            name: `agent ${i + 1}`,
            email: `agent${i + 1}@example.com`,
            role: 'AGENT',
            password:'123456'
        })),
    });

    const categories = await prisma.category.createManyAndReturn({
        data: [
          { name: "Technical Support" },
          { name: "Billing" },
          { name: "Account" },
          { name: "Bug Report" },
          { name: "Feature Request" },
        ],
    });

    const statuses = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];

    for (let i = 0; i < 100; i++){
        const ticket = await prisma.ticket.create({
            data: {
                title: `t${i}`,
                description: `d${i}`,
                customer_id: customers[i % customers.length].id,
                category_id: categories[i % categories.length].id,
                status: statuses[i % statuses.length],
                priority: i % 3 === 0 ? Priority.HIGH : Priority.LOW,

                assignments: {
                    create: {
                        user_id: agents[i % agents.length].id
                    }
                },

                comments: {
                    create: {
                        comment: `c${i}`,
                        user_id:agents[i % agents.length].id
                    }
                },

                statusHistories: {
                    create: {
                        from: 'OPEN',
                        to:statuses[i % statuses.length]
                    }
                }
            },
        })
    }

}

main()