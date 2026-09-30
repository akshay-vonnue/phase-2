import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import bcrypt from "bcrypt";
import { signToken, verifyToken } from "../../utils/jwt";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(`login running with`, req.body);
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "user not found",
    });
  }

  const { passwordHash, ...safeUser } = user;
  void passwordHash;

  if (await bcrypt.compare(password, user.passwordHash)) {
    const token = await signToken({ userId: user.id });

    return res.status(200).json({
      success: true,
      token: token,
      user: safeUser,
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "Incorrect email or password",
    });
  }
};

export const me = async (req: Request, res: Response) => {
  console.log("hitting me")
  const token = req.headers.authorization;
  console.log("hi ##### ", token);
  try {
    const user = verifyToken(token as string);
    console.log(user);
    return res.status(200).json({
      success: true,
      message: "valid token",
    });
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
      return res.status(401).json({
        success: false,
        message: "token expired",
      });
    }
  }
};
