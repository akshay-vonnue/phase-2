import { Response, Request } from "express";
import {
  deleteTicketFromFile,
  handleError,
  readfile,
  TicketNotFoundError,
  UnauthorisedAccessError,
  updateTicketInFile,
  UserNotFoundError,
  validateQuery,
  writeToFile,
} from "../lib/utils.js";
import { Status } from "../lib/types.js";
import ticketService from "../services/ticket.service.js";
import { verifyToken } from "../lib/jwt.js";
import jwt from "jsonwebtoken";

const { TokenExpiredError } = jwt;

export const createTicket = async (req: Request, res: Response) => {
  try {
    let title = req.body.title;
    let description = req.body.description;
    let priority = req.body.priority;
    let createdBy = req.body.createdBy;
    let category_id = req.body.category_id;
    // console.log(title,description,priority,createdBy,assignedTo)

    const token = req.headers["authorization"]?.split(" ")[1];
    const user = await verifyToken(token as string);

    console.log(`repo:`, user.id);

    if (!title || !description || !priority || !createdBy || !category_id) {
      return res.status(422).json({
        success: false,
        message: "All fields are required.",
      });
    }

    let data = await ticketService.createTicket(
      user,
      title,
      description,
      priority,
      createdBy,
      category_id,
    );

    if (!(data instanceof Error)) {
      return res.status(200).json({
        success: true,
        data: data,
        message: "Ticket created Successfully",
      });
    } else {
      return res.status(401).json({
        success: false, 
        message: data.message,
      });
    }
  } catch (error) {
    if (error instanceof Error) handleError(res, error.message);
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({
        message: "Unauthorised access:Token expired",
      });
    }
  }

  console.log("createTicket");
};

export const listTickets = async (req: Request, res: Response) => {
  console.log("listTicket");

  const validationResult = validateQuery(req.query);
  if (validationResult.errors.length > 0) {
    return res.status(400).json({
      error: validationResult.errors,
    });
  }

  const token = req.headers["authorization"]?.split(" ")[1];
  const user = await verifyToken(token as string);

  // let page = req.query.page || 1
  // let pageSize = req.query.pageSize || 5

  // let status = req.query.status
  // let priority = req.query.priority
  // let assignee = req.query.assignee
  // let search = req.query.search
  // let sortField = req.query.sortField
  // let sortDirection = req.query.sortDirection

  // let whereClause: Record<string, unknown> = {}
  // if (status) whereClause.status = status
  // if (priority) whereClause.priority = priority
  // // if (assignee) whereClause.assignee = assignee

  // if (search) {
  //     whereClause.title = {
  //         contains: search,
  //         mode: 'insensitive'
  //     }
  // }

  // let user = req.body.userId
  // console.log(user)

  // const data = await ticketService.listTickets(
  //     user,
  //     validationResult.page,
  //     validationResult.pageSize,
  //     Number(validationResult.assignee),
  //     validationResult.sortField,
  //     validationResult.sortDirection,
  //     whereClause
  // );

  const data = await ticketService.listTicketsDB(user, validationResult);

  console.log(data);

  if (data) {
    return res.status(200).json({
      success: true,
      data: data,
    });
  }
  return res.status(400).json({
    success: false,
    message: "something went wrong while reading data",
  });
};

export const getTicket = async (req: Request, res: Response) => {
  try {
    let reqParams = req.params;
    let ticketId = reqParams["id"] as string;
    console.log(ticketId, "controller");

    const token = req.headers["authorization"]?.split(" ")[1];
    const user = await verifyToken(token as string);

    let data = await ticketService.getTicket(user, ticketId);

    if (data instanceof TicketNotFoundError) {
      return res.status(200).json({
        success: false,
        message: "ticket not found",
      });
    } else if (data instanceof UnauthorisedAccessError) {
      return res.status(400).json({
        success: false,
        message: data.message,
      });
    }
    if (data) {
      return res.status(200).json({
        success: true,
        data: data,
      });
    }
  } catch (e) {
    if (e instanceof Error) {
      return handleError(res, e.message);
    }
  }

  console.log("getTicket");
};

export const updateStatus = async (req: Request, res: Response) => {
  console.log("updateStatus");
  try {
    let reqParams = req.params;

    let ticketId = reqParams["id"] as string;
    let status = reqParams["status"] as Status;

    const token = req.headers["authorization"]?.split(" ")[1];
    const user = await verifyToken(token as string);

    console.log(ticketId, status);

    if (ticketId && status) {
      let updateResponse = await ticketService.updateStatus(
        user,
        ticketId,
        status,
      );

      if (updateResponse instanceof TicketNotFoundError) {
        return res.status(400).json({
          success: false,
          message: updateResponse.message,
        });
      }

      if (updateResponse instanceof UnauthorisedAccessError) {
        return res.status(400).json({
          success: false,
          message: updateResponse.message,
        });
      }

      if (updateResponse) {
        return res.status(200).json({
          success: true,
          message: "status updated successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Ticket not found",
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        message: "ticketId and Status are required",
      });
    }
  } catch (e) {
    if (e instanceof Error) return handleError(res, e.message);
  }
};

export const assignTicket = async (req: Request, res: Response) => {
  console.log("assign ticket");

  try {
    let reqParams = req.params;
    let ticketId = reqParams["id"] as string;
    let user = req.body.assignedTo;

    const token = req.headers["authorization"]?.split(" ")[1];
    const authUser = await verifyToken(token as string);

    if (ticketId && user) {
      let updatedResponse = await ticketService.assignTicket(
        authUser,
        ticketId,
        user,
      );

      if (updatedResponse instanceof UnauthorisedAccessError) {
        return res.status(400).json({
          success: false,
          message: updatedResponse.message,
        });
      }

      if (updatedResponse instanceof TicketNotFoundError) {
        return res.status(400).json({
          success: false,
          message: updatedResponse.message,
        });
      }

      if (updatedResponse instanceof UserNotFoundError) {
        return res.status(400).json({
          success: false,
          message: updatedResponse.message,
        });
      }

      if (updatedResponse) {
        return res.status(200).json({
          success: true,
          message: `Ticket assigned to ${user} successfully`,
        });
      } else {
        return res.status(200).json({
          success: false,
          message: `Ticket not found`,
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "All fields are required.",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      return handleError(res, error.message);
    }
  }
};

export const deleteTicket = async (req: Request, res: Response) => {
  try {
    let reqParams = req.params;
    let ticketId = reqParams["id"] as string;

    const token = req.headers["authorization"]?.split(" ")[1];
    const user = await verifyToken(token as string);

    if (ticketId) {
      let isDeleted = await ticketService.deleteTicket(user, ticketId);

      if (isDeleted instanceof TicketNotFoundError) {
        return res.status(400).json({
          success: false,
          message: isDeleted.message,
        });
      }

      if (isDeleted instanceof UnauthorisedAccessError) {
        return res.status(400).json({
          success: false,
          message: isDeleted.message,
        });
      }

      if (isDeleted) {
        return res.status(200).json({
          success: true,
          message: "data deleted Successfully",
          data: isDeleted,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "ticket id not found",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      return handleError(res, error.message);
    }
  }
};
