import {Body, Headers, Controller, Get, Post, Param, Res} from '@nestjs/common'
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
    @Get('/regconfirm/:id')
    regConfirm(@Param('id') id: ObjectId, @Res() res){
        return this.userService.regConfirm(id, res)
    }
    @Post('/login')
    login(@Body() dto: CreateUserDto){
        return this.userService.login(dto)
    }
    @Get('/:id')
    authBy(@Param('id') id: ObjectId){
        return this.userService.authBy(id)
    }
}
