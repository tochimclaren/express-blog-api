import { authentication, random } from "../helpers/index";
import { createUser, getUserByEmail, updateUserById, userUpdateType } from "../models/user";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')
        let data;
        if (!user) {
            return res.sendStatus(400)
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
            return res.sendStatus(400)
        }
        if (passwordHash && user.authentication.password !== passwordHash) {
            return res.sendStatus(403)
        }
        const salt = random()
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save()

        res.cookie("AUTH-COOKIE", user.authentication.sessionToken, { domain: 'localhost', path: "/" })
        return res.status(200).json(data).end();

    } catch (error) {
        return res.sendStatus(500)
    }
}


export const register = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.sendStatus(400)
        }
        const userExists = await getUserByEmail(email);
        if (userExists) {
            return res.sendStatus(400)
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
        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}
export const updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId } = req.params
        const { username, email, isAdmin } = req.body
        if (!userId) {
            return res.status(400).send({ "message": "query param missing user id" })
        }
        const data: userUpdateType = {
            username,
            email,
            isAdmin
        }
        const user = await updateUserById(userId, data)
        if (user) {
            return res.status(200).send(user)
        } else {
            return res.status(400).send({ "message": "unable to complete action" })
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }

}


export const changePasswordByEmail = async (req: Request, res: Response): Promise<any> => {

    try {
        const { email, password, oldPassword } = req.body
        const user = await getUserByEmail(email)
        if (!user) {
            return res.sendStatus(400)
        }
        if (user && authentication(user.authentication.salt, oldPassword) === user.authentication.password) {
            const salt = random();
            user.authentication.password = authentication(salt, password)
            user.save()
            return res.status(200).send({ "message": "password changed successfully" })
        }
        return res.sendStatus(403)

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}


export const logout = async (_: Request, res: Response): Promise<any> => {
    res.clearCookie("AUTH-COOKIE");
    return res.status(200).send({ message: "logged out!" })
}