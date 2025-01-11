import lodash from 'lodash';
import { Request, Response, NextFunction } from "express";
import { z, ZodError } from 'zod';
import { getUserBySessionToken } from "../models/user";
import { StatusCodes } from 'http-status-codes';
import { AuthRequest } from '../utils/express';
import { FORBIDDEN, BAD_REQUEST, UNAUTHORIZED, NOT_ALLOWED, INTERNAL_SERVER_ERROR } from '../constants/http.code';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const sessionToken = req.cookies['AUTH-COOKIE'];
    if (!sessionToken) {
      return res.sendStatus(UNAUTHORIZED)
    }
    const user = await getUserBySessionToken(sessionToken);
    if (!user) {
      return res.sendStatus(FORBIDDEN)
    }
    lodash.merge(req, { identity: user })
    next()
  } catch (error) {
    console.log(error)
    return res.sendStatus(BAD_REQUEST)
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
      return res.sendStatus(FORBIDDEN)
    }
    if (currentUserId.toString() !== id) {
      console.log("current owner does not match with comment owner")
      return res.sendStatus(FORBIDDEN)
    }
    next()
  } catch (error) {
    console.log(error)
    return res.sendStatus(BAD_REQUEST)
  }
}

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const currentUserId = lodash.get(req, 'identity._id') as string;
    const sessionToken = req.cookies['AUTH-COOKIE'];
    if (currentUserId && sessionToken) {
      const user = await getUserBySessionToken(sessionToken)
      if (!user) {
        return res.sendStatus(BAD_REQUEST)
      }
      if (user && user.isAdmin === true) {
        next()
      }
    }
  } catch (error) {
    console.log(error)
    return res.sendStatus(INTERNAL_SERVER_ERROR)
  }
}