import {Body, Headers, Controller, Get, Post, Param} from '@nestjs/common'
import {UserService} from './user.service'
import {CreateUserDto} from './dto/create.user.dto'
import {ObjectId} from 'mongoose'

@Controller('/auth')
export class UserController{
    constructor(private userService: UserService) {
    }
    @Post('/registration')
    registration(@Body() dto: CreateUserDto){
        return this.userService.registration(dto)
    }
    @Post('/registration/:id')
    regConirm(@Param('id') id: ObjectId){
        return this.userService.regConfirm(id)
    }
    @Post('/login')
    login(@Body() dto: CreateUserDto){
        return this.userService.login(dto)
    }
    @Get('/:id')
    getOne(@Param('id') id: ObjectId){
        return this.userService.getOne(id)
    }
}
