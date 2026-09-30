import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import { IssueUncheckedCreateInput } from "../../generated/prisma/models";

export const getAll = async (req: Request, res: Response) => {
  try {
    const result = await prisma.issue.findMany();
    console.log(result)

    const serialisedData = result.map(issue => ({
      ...issue,
      overdue:issue.overdue.toString()
    }))
  
    return res.status(200).json({
      success: true,
      data: serialisedData,
    });
  } catch (error) {
    console.log("some error",(error as Error).message)
    return res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const createIssue = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      resolverId,
      resolverName,
      overdue,
    } = req.body as IssueUncheckedCreateInput;

    if (
      !title ||
      !description ||
      !status ||
      !priority ||
      !resolverId ||
      !resolverName ||
      !overdue
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    console.log(resolverId);

    const result = await prisma.issue.create({
      data: {
        title: title,
        description: description,
        status: status,
        priority: priority,
        overdue: overdue,
        resolverId: resolverId,
        resolverName: resolverName,
      },
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const deleteIssue = async (req: Request, res: Response) => {
  try {
    const id = req.params["id"] as string;
    const issue = await prisma.issue.findUnique({
      where: {
        id: id,
      },
    });

    if (!issue) {
      return res.status(400).json({
        success: false,
        message: "issue not found",
      });
    }

    const result = await prisma.issue.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const updateIssue = async (req: Request, res: Response) => {
  try {
    const id = req.params["id"] as string;
    console.log(id);
    const updateData = req.body;
    console.log(updateData);
    const issue = await prisma.issue.findUnique({
      where: {
        id: id,
      },
    });

    if (!issue) {
      return res.status(400).json({
        success: false,
        message: "issue not found",
      });
    }

    const result = await prisma.issue.update({
      where: {
        id: id,
      },
      data: {
        ...updateData,
      },
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const getIssue = async (req: Request, res: Response) => {
  try {
    const id = req.params["id"] as string;
    console.log(id)
    const result = await prisma.issue.findUnique({
      where: {
        id: id,
      },
    });
    console.log(result)
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
