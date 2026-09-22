import {
  AssignmentUncheckedCreateInput,
  TicketUncheckedCreateInput,
} from "../generated/prisma/models.js";
import { prisma } from "../lib/prisma.js";
import {
  TicketNotFoundError,
  UnauthorisedAccessError,
  UserNotFoundError,
} from "../lib/utils.js";

function canCreateTicket(user: {
  id: any;
  userName: any;
  role: any;
  email: any;
}) {
  return user.role === "USER";
}

function canAccessTicket(
  user: {
    id: any;
    userName: any;
    role: any;
    email: any;
  },
  ticket: Partial<TicketUncheckedCreateInput>,
) {
  if (user.role === "ADMIN" || user.role === "AGENT") {
    return true;
  }

  return ticket.customer_id === user.id && user.role === "USER";
}

function canAssignTicket(user: {
  id: any;
  userName: any;
  role: any;
  email: any;
}) {
  return user.role === "ADMIN";
}

function canDeleteTicket(
  user: {
    id: any;
    userName: any;
    role: any;
    email: any;
  },
  ticket: Partial<TicketUncheckedCreateInput>,
) {
  return user.id === ticket.customer_id && ticket.status === "open";
}

function canUpdateStatus(
  user: {
    id: any;
    userName: any;
    role: any;
    email: any;
  },
  ticket: Partial<TicketUncheckedCreateInput>,
  assignment: Partial<AssignmentUncheckedCreateInput>,
) {
  if (user.role === "ADMIN") return true;
  if (user.role === "USER") return false;
  return assignment.user_id === user.id && ticket.status != "closed";
}

class TicketRepository {
  async createTicket(
    user: {
      id: any;
      userName: any;
      role: any;
      email: any;
    },
    title: string,
    description: string,
    priority: "LOW" | "HIGH",
    category_id: string,
    createdBy: string,
    status: string,
  ) {
    try {
      if (canCreateTicket(user)) {
        console.log("user can create ticket");
        console.log("category_id", Number(category_id));
        console.log(`customer id`, Number(user.id));
        const result = await prisma.$transaction([
          prisma.ticket.create({
            data: {
              title: title,
              description: description,
              priority: priority,
              category_id: Number(category_id),
              customer_id: Number(user.id),
              status: status,
            },
          }),
        ]);

        return result;
      } else {
        return new Error("user is not allowed to create ticket");
      }
    } catch (error) {
      console.log(error);
      throw new Error("something went wrong while accessing data");
    }
  }

  // @pagination in service-layer

  // async listTickets(id: string) {
  //     console.log(id,": user id")
  //     const query = `
  //         select * from ticket
  //         where ticket.customer_id = $1;
  //     `

  //     try {
  //         const { rows } = await pool.query(query, [id]);
  //         console.log(rows)
  //         return rows
  //     } catch (error) {
  //         console.log(error)
  //         throw new Error(`something went wrong while accessing data`)
  //     }
  // }

  async getTicket(
    user: {
      id: any;
      userName: any;
      role: any;
      email: any;
    },
    id: string,
  ) {
    try {
      const ticketId = parseInt(id);

      const result = await prisma.ticket.findUnique({
        where: {
          id: ticketId,
        },
      });

      if (!result) {
        return new TicketNotFoundError();
      }

      console.log("##########33hi###########");
      console.log(result);

      if (canAccessTicket(user, result as TicketUncheckedCreateInput)) {
        console.log(`can access ticket`);
        return result;
      } else {
        console.log(user, result);
        console.log("UnauthorisedAccessError");
        return new UnauthorisedAccessError();
      }
    } catch (error) {
      console.log(error);
      throw new Error(`something went wrong while accessing data`);
    }
  }

  async updateStatus(
    user: {
      id: any;
      userName: any;
      role: any;
      email: any;
    },
    id: string,
    status: string,
  ) {
    const ticketId = parseInt(id, 10);
    try {
      const currentTicket = await prisma.ticket.findUnique({
        where: { id: ticketId },
        select: { status: true },
      });

      if (!currentTicket) return new TicketNotFoundError();

      if (!canAccessTicket(user, currentTicket)) {
        return new UnauthorisedAccessError();
      }

      const assignment = await prisma.assignment.findFirst({
        where: {
          ticket_id: Number(id),
        },
      });

      if (
        !canUpdateStatus(
          user,
          currentTicket,
          assignment as AssignmentUncheckedCreateInput,
        )
      ) {
        return new UnauthorisedAccessError();
      }

      const result = await prisma.$transaction([
        prisma.ticket.update({
          where: {
            id: ticketId,
          },
          data: {
            status: status,
          },
        }),
        prisma.status_history.create({
          data: {
            ticket_id: ticketId,
            from: currentTicket?.status,
            to: status,
          },
        }),
      ]);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(`something went wrong while accessing data`);
    }
  }

  async assignTicket(
    user: {
      id: any;
      userName: any;
      role: any;
      email: any;
    },
    id: string,
    assignedTo: string,
  ) {
    try {
      if (!canAssignTicket(user)) {
        return new UnauthorisedAccessError();
      }

      const ticket = await prisma.ticket.findUnique({
        where: {
          id: Number(id),
        },
      });

      console.log("ticket", ticket);

      if (!ticket) return new TicketNotFoundError();
      console.log("ticket not found here");
      const agent = await prisma.agent.findUnique({
        where: {
          id: Number(assignedTo),
        },
      });

      if (!agent) return new UserNotFoundError();

      const result = await prisma.assignment.create({
        data: {
          ticket_id: parseInt(id, 10),
          user_id: parseInt(assignedTo, 10),
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(`something went wrong while accessing data`);
    }
  }

  async deleteTicket(
    user: {
      id: any;
      userName: any;
      role: any;
      email: any;
    },
    id: string,
  ) {
    const query = `
            delete from ticket
            where ticket_id = $1;
        `;

    try {
      const ticket = await prisma.ticket.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!ticket) return new TicketNotFoundError();

      if (!canDeleteTicket(user, ticket)) {
        return new UnauthorisedAccessError();
      }

      const result = await prisma.ticket.delete({
        where: {
          id: parseInt(id, 10),
        },
      });

      return result;
    } catch (error) {
      console.log(error);
      throw new Error("something went wrong while accessing data");
    }
  }
}

export default new TicketRepository();
