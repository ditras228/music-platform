import {Module} from '@nestjs/common'
import {UserService} from './user.service'
import {UserController} from './user.controller'
import {MongooseModule} from '@nestjs/mongoose'
import {User, UserSchema} from './schemas/user.schema'
import {Account, AccountSchema} from './schemas/account.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        MongooseModule.forFeature([{name: Account.name, schema: AccountSchema}]),
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}