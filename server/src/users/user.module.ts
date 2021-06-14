import {Module} from '@nestjs/common'
import {UserService} from './user.service'
import {UserController} from './user.controller'
import {MongooseModule} from '@nestjs/mongoose'
import {User, UserSchema} from './schemas/user.schema'
import {Role, RoleSchema} from './schemas/role.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        MongooseModule.forFeature([{name: Role.name, schema: RoleSchema}])
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}