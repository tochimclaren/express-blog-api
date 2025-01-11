import lodash from 'lodash';
import { Request, Response, NextFunction } from "express";
import { z, ZodError } from 'zod';
import { getUserBySessionToken } from "../models/user";
import { StatusCodes } from 'http-status-codes';
import { AuthRequest } from '../utils/express';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const sessionToken = req.cookies['AUTH-COOKIE'];
    if (!sessionToken) {
      return res.sendStatus(401)
    }
    const user = await getUserBySessionToken(sessionToken);
    if (!user) {
      return res.sendStatus(403)
    }
    lodash.merge(req, { identity: user })
    next()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }

}

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
      }
    }
  };
}

export function validateObject(schema: z.ZodEffects<any, any>) {
  // this is just a sill copy and paste, typescript makes me sick
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
      }
    }
  };
}

export const isOwner = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params
    const currentUserId = lodash.get(req, 'identity._id') as string;
    if (!currentUserId) {
      console.log("missing user id")
      return res.sendStatus(403)
    }
    if (currentUserId.toString() !== id) {
      console.log("current owner does not match with comment owner")
      return res.sendStatus(403)
    }
    next()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  console.log("checking if this user has permission to delete this")
  next()
}