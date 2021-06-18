import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {User} from './schemas/user.schema'
import {Model} from 'mongoose'
import {UserDocument} from './schemas/user.schema'
import jwt = require('jsonwebtoken')
import {validationResult} from 'express-validator'
import {Role, RoleDocument} from './schemas/role.schema'
import {CreateUserDto} from './dto/create.user.dto'

const bcrypt = require('bcryptjs')

require('dotenv').config()

const generateAccessToken = (id, username, roles) => {
    const payload = {
        id,
        username,
        roles
    }
    return jwt.sign(payload, process.env.SECRET, {expiresIn: '24h'})
}

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                @InjectModel(Role.name) private roleModel: Model<RoleDocument>) {
    }

    async registration(dto: CreateUserDto) {
        try {
            const errors = validationResult(CreateUserDto)
            if (!errors.isEmpty()) {
                return new HttpException(`Ошибка при регистрации ${errors}`, HttpStatus.INTERNAL_SERVER_ERROR)
            }
            const candidate = await this.userModel.findOne({username: dto.username})
            if (candidate) {
                return new HttpException('Ник занят', HttpStatus.INTERNAL_SERVER_ERROR)
            }
            const hashPassword = bcrypt.hashSync(dto.password, 7)
            const userRole = await this.roleModel.findOne({value: 'USER'})
            const user = new this.userModel({...dto, password: hashPassword, roles: [userRole.value]})
            await user.save()
            new HttpException('Пользователь успешно зарегистрирован', HttpStatus.INTERNAL_SERVER_ERROR)
        } catch (e) {
            console.log(e)
            throw  new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async login(dto: CreateUserDto) {
        try {
            const user = await this.userModel.findOne({username: dto.username})
            if (!user) {
                return new HttpException
                (`Пользователь ${dto.username} не найден`, HttpStatus.INTERNAL_SERVER_ERROR)

            }
            const validPassword = bcrypt.compareSync(dto.password, user.password)
            if (!validPassword) {
                return new HttpException
                ('Введен не верный пороль', HttpStatus.INTERNAL_SERVER_ERROR)
            }
            return {
                user: {username: user.username, roles: user.roles},
                token: generateAccessToken(user._id, user.username, user.roles)
            }
        } catch (e) {
            console.log(e)
            return new HttpException
            ('Login failed', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async auth(token) {
        try {
            console.log(token)
            const parseToken = token.split(' ')
            console.log(parseToken[1])

            const validToken = jwt.verify(parseToken[1], process.env.SECRET)
            if (!validToken) {
                return new HttpException
                (`Токен не валиден`, HttpStatus.INTERNAL_SERVER_ERROR)
            }
            const decodedHeader = jwt.verify(token, process.env.SECRET) as any
            console.log(decodedHeader)
            const user = await this.userModel.findOne({_id: decodedHeader._id})
            if (!user) {
                return new HttpException
                (`Пользователь ${decodedHeader.username} не найден`, HttpStatus.INTERNAL_SERVER_ERROR)
            }
            return {
                user: {username: user.username, roles: user.roles},
                token: generateAccessToken(user._id, user.username, user.roles)
            }
        } catch (e) {
            console.log(e)
            return new HttpException
            ('Auth error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async install() {
        try {
            const userRole = new this.roleModel()
            const adminRole = new this.roleModel({value: 'ADMIN'})
            await userRole.save()
            await adminRole.save()
        } catch (e) {
            console.log(e)
        }
    }

    async getUsers() {
        try {
            const users = await this.userModel.find()
            return users
        } catch (e) {
            console.log(e)

        }
    }
}