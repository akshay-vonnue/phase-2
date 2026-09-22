import { signToken, verifyToken } from "../lib/jwt";
import { prisma } from "../lib/prisma.js";
import bcrypt from 'bcrypt';
import { User } from "../lib/types";

class UserService {
    async signup(
        name: string,
        email: string,
        password: string,
        role: string
    ) {

        const passwordHash = await bcrypt.hash(password, 10);

        let existingUser;
        console.log(role)
        if (role == 'ADMIN' || role == 'AGENT') {
            existingUser = await prisma.agent.findUnique({
                where: { email: email }
            })

            if (!existingUser) {
                const agent = await prisma.agent.create({
                    data: {
                        name: name,
                        email: email,
                        password: passwordHash,
                        role: role
                    }
                })

                const { password, ...safeUser } = agent
                void password
                return safeUser

            } else {
                throw new Error(`Email already in use.`)
            }
        } else if (role == 'USER') {
            console.log(existingUser)
            existingUser = await prisma.customer.findUnique({
                where: { email: email }
            })
            console.log(existingUser)
            if (!existingUser) {
                const user = await prisma.customer.create({
                    data: {
                        name: name,
                        email: email,
                        password: passwordHash,
                        role: 'USER'
                    }
                })

                const { password, ...safeUser } = user
                void password
                return safeUser

            } else {
                throw new Error(`Email already in use.`)
            }
        }
        console.log("hello")
    }


    async login(
        email: string,
        password: string,
        role: string
    ) {

        if (role == 'AGENT' || role == 'ADMIN') {
            console.log("agent")
            const existingUser = await prisma.agent.findUnique({
                where: {
                    email: email
                }
            })

            if (!existingUser) {
                throw new Error(`User not found`)
            }

            const isValidUser = bcrypt.compare(password, existingUser.password);

            if (!isValidUser) {
                throw new Error('invalid password')
            }

            return signToken({
                userName: existingUser.name,
                role: existingUser.role as User,
                email:existingUser.email
            })

        } else if (role == 'USER') {
            console.log("user")
            const existingUser = await prisma.customer.findUnique({
                where: {
                    email: email
                }
            })

            if (!existingUser) {
                throw new Error('User not found')
            }

            const isValidUser = bcrypt.compare(password, existingUser.password);

            if (!isValidUser) {
                throw new Error('invalid password')
            }

            return signToken({
                userName: existingUser.name,
                role: existingUser.role as User,
                email: existingUser.email
            })
        }
    }

    async currentUser(token: string) {
        const user = await verifyToken(token);

        if (user && user.role == 'USER') {
            return await prisma.customer.findUnique({
                where: {
                    email:user.email
                }
            })
        } else {
            return await prisma.agent.findUnique({
                where: {
                    email:user.email
                }
            })
        }
    }
}

export default new UserService()