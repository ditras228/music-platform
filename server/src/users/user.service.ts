import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {User, UserDocument} from './schemas/user.schema'
import {Model} from 'mongoose'
import {validationResult} from 'express-validator'
import {CreateUserDto} from './dto/create.user.dto'
import * as mailService from './mailService'

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
                await this.userModel.findOne({username: dto.username})
                || await this.userModel.findOne({nickname: dto.username})
            if (candidate) {
                return new HttpException('Ник занят', HttpStatus.INTERNAL_SERVER_ERROR)
            }
            const hashPassword = bcrypt.hashSync(dto.password, 7)
            const hashURL = await bcrypt.hash(dto.username, 5)
            const user = new this.userModel({...dto, hash: hashURL, password: hashPassword})
            await user.save()
            await mailService.main(dto.username, hashURL)
            return user
        } catch (e) {
            console.log(e)
            throw  new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async regConfirm(id) {
        try {
            const user = await this.userModel.findById(id)
            user.hash = null
            user.email_verified = true
            user.save()
            return {url: 'http://localhost:3000/auth'};
        } catch (e) {
            console.log(e)
        }
    }

    async login(dto: CreateUserDto) {
        try {
            const user = await this.userModel.findOne({username: dto.username})
            if (!user || !user.email_verified) {
                return new HttpException
                (`Пользователь ${dto.username} не найден`, HttpStatus.INTERNAL_SERVER_ERROR)

            }
            const validPassword = bcrypt.compareSync(dto.password, user.password)
            if (!validPassword) {
                return new HttpException
                ('Введен не верный пороль', HttpStatus.INTERNAL_SERVER_ERROR)
            }
            return user
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