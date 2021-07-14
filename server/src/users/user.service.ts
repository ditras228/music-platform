import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {User, UserDocument} from './schemas/user.schema'
import {Model} from 'mongoose'
import {validationResult} from 'express-validator'
import {CreateUserDto} from './dto/create.user.dto'
import * as mailService from './mailService'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
require('dotenv').config()

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async registration(dto: CreateUserDto) {
        try {
            const errors = validationResult(CreateUserDto)
            if (!errors.isEmpty()) {
                return new HttpException(`Ошибка при регистрации ${errors}`, HttpStatus.INTERNAL_SERVER_ERROR)
            }
            const candidate =
                await this.userModel.findOne({name: dto.name})
            if (candidate) {
                return new HttpException('Ник занят', HttpStatus.INTERNAL_SERVER_ERROR)
            }
            const hashPassword = await bcrypt.hash(dto.password, 7)
            const hashURL = await bcrypt.hash(dto.name, 5)
            const user = new this.userModel(
                {email: dto.email,  name: dto.name,
                    hash: hashURL, password: hashPassword,
                    created_at: Date(), updated_at:  Date()})
            await user.save()
            await mailService.main(dto.email, hashURL)
            return user
        } catch (e) {
            console.log(e)
            throw  new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async regConfirm(id, res) {
        try {
            const user = await this.userModel.findOne({hash: id})
            user.hash = null
            user.email_verified = true
            user.save()
            return res.redirect('http://localhost:3000/');
        } catch (e) {
            console.log(e)
        }
    }

    async login(dto: CreateUserDto) {
        try {
            const user = await this.userModel.findOne({email: dto.email})
            if (!user) {
                return new HttpException
                (`Пользователь не найден`, HttpStatus.INTERNAL_SERVER_ERROR)

            }
            if (!user.email_verified) {
                return new HttpException
                (`Email не подтвержден`, HttpStatus.INTERNAL_SERVER_ERROR)

            }
            const validPassword = bcrypt.compare(dto.password, user.password)
            if (!validPassword) {
                return new HttpException
                ('Введен не верный пороль', HttpStatus.INTERNAL_SERVER_ERROR)
            }
            return `Bearer ${jwt.sign(
                {user:{name: user.name, email: user.email, image: user.image }},
                process.env.SECRET)}`
        } catch (e) {
            console.log(e)
            return new HttpException
            ('Login failed', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getOne(id) {
        try {
            const user = await this.userModel.findOne({_id: id})
            if (!user) {
                return new HttpException
                (`Пользователь не найден`, HttpStatus.INTERNAL_SERVER_ERROR)
            }
            return user
        } catch (e) {
            console.log(e)
            return new HttpException
            ('Login failed', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}