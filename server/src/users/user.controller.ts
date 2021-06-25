import {Body,Headers, Controller, Get, Post} from '@nestjs/common'
import {UserService} from './user.service'
import {CreateUserDto} from './dto/create.user.dto'

@Controller('/auth')
export class UserController{
    constructor(private userService: UserService) {
    }
    @Post('/registration')
    registration(@Body() dto: CreateUserDto){
        return this.userService.registration(dto)
    }
    @Post('/login')
    login(@Body() dto: CreateUserDto){
        return this.userService.login(dto)
    }
    @Get('/')
    auth(@Headers() token){
        return this.userService.auth(token)
    }
    @Post('/install')
    install(){
        return this.userService.install()
    }

}
