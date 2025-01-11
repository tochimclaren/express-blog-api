import { authentication, random } from "../helpers/index";
import { createUser, getUserByEmail, updateUserById, userUpdateType } from "../models/user";
import { Request, Response } from "express";
import { BAD_REQUEST, FORBIDDEN, OK, INTERNAL_SERVER_ERROR } from "../constants/http.code"

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')
        let data;
        if (!user) {
            return res.sendStatus(BAD_REQUEST)
        }
        let passwordHash = null

        if (user.authentication.salt) {
            passwordHash = authentication(user.authentication.salt, password)
            data = {
                email: user.email,
                username: user.username,
                created: user.created,
                updated: user.updated
            }

        } else {
            return res.sendStatus(BAD_REQUEST)
        }
        if (passwordHash && user.authentication.password !== passwordHash) {
            return res.sendStatus(FORBIDDEN)
        }
        const salt = random()
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save()

        res.cookie("AUTH-COOKIE", user.authentication.sessionToken, { domain: 'localhost', path: "/" })
        return res.status(OK).json(data).end();

    } catch (error) {
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}


export const register = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.sendStatus(BAD_REQUEST)
        }
        const userExists = await getUserByEmail(email);
        if (userExists) {
            return res.sendStatus(BAD_REQUEST)
        }

        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })
        return res.status(OK).json(user).end();

    } catch (error) {
        console.log(error)
        return res.sendStatus(BAD_REQUEST)
    }
}
export const updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId } = req.params
        const { username, email, isAdmin } = req.body
        if (!userId) {
            return res.status(BAD_REQUEST).send({ "message": "query param missing user id" })
        }
        const data: userUpdateType = {
            username,
            email,
            isAdmin
        }
        const user = await updateUserById(userId, data)
        if (user) {
            return res.status(OK).send(user)
        } else {
            return res.status(BAD_REQUEST).send({ "message": "unable to complete action" })
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }

}


export const changePasswordByEmail = async (req: Request, res: Response): Promise<any> => {

    try {
        const { email, password, oldPassword } = req.body
        const user = await getUserByEmail(email)
        if (!user) {
            return res.sendStatus(BAD_REQUEST)
        }
        if (user && authentication(user.authentication.salt, oldPassword) === user.authentication.password) {
            const salt = random();
            user.authentication.password = authentication(salt, password)
            user.save()
            return res.status(OK).send({ "message": "password changed successfully" })
        }
        return res.sendStatus(FORBIDDEN)

    } catch (error) {
        console.log(error)
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}


export const logout = async (_: Request, res: Response): Promise<any> => {
    res.clearCookie("AUTH-COOKIE");
    return res.status(OK).send({ message: "logged out!" })
}