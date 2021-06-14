import {Inject, Injectable, NestMiddleware} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken')

export function Role(roles): any {
    @Injectable()
    class RoleMiddleware implements NestMiddleware {
        use(req: Request, res: Response, next: NextFunction) {
            try {
                const token = req.headers.authorization.split(' ')[1]
                if (!token) {
                    return res.status(403).json({message: 'Пользователь не авторизован'})
                }
                const {roles: userRoles} = jwt.verify(token, process.env.SECRET)
                let hasRole = false
                userRoles.forEach(role => {
                    if (roles.includes(role)) {
                        hasRole = true
                    }
                })
                if (!hasRole) {
                    return res.status(403).json({message: 'У вас нет прав'})
                }
                next()
            } catch (e) {
                console.log(e)
                return res.status(403).json({message: 'Пользователь не авторизован'})
            }
        }
    }
    return RoleMiddleware
}