import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { validationResult } from 'express-validator';
import { CreateUserDto } from './dto/create.user.dto';
import * as mailService from './mailService';
import { Account, AccountDocument } from './schemas/account.schema';
import { Session, SessionDocument } from './schemas/session.schema';
const bcrypt = require('bcryptjs');
require('dotenv').config();
const randomColor = require('randomcolor');
const ObjectId = require('mongodb').ObjectID;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
  ) {}

  async registration(dto: CreateUserDto) {
    try {
      const errors = validationResult(CreateUserDto);
      if (!errors.isEmpty()) {
        return new HttpException(
          `Ошибка при регистрации ${errors}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const candidate = await this.userModel.findOne({ name: dto.name });
      if (candidate) {
        return new HttpException('Ник занят', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const hashPassword = await bcrypt.hash(dto.password, 7);
      const hashURL = await bcrypt.hash(dto.name, 5);
      const replaceHashUrl = hashURL.replace(/\//g, '');
      const hashToken = await bcrypt.hash(dto.email, 5);
      const color = randomColor();
      const user = new this.userModel({
        email: dto.email,
        name: dto.name,
        hash: replaceHashUrl,
        password: hashPassword,
        color: color,
        created_at: Date(),
        updated_at: Date(),
      });
      await user.save();

      const account = new this.accountModel({
        userId: user,
        accessToken: hashToken,
        created_at: Date(),
        updated_at: Date(),
      });
      await account.save();

      await mailService.main(dto.email, replaceHashUrl);
      return user;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Registration failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async regConfirm(id, res) {
    try {
      const user = await this.userModel.findOne({ hash: id });
      user.hash = null;
      user.email_verified = true;
      await user.save();
      return res.redirect('http://87.236.22.121:3000/');
    } catch (e) {
      console.log(e);
    }
  }
  async login(dto: CreateUserDto) {
    try {
      const user = await this.userModel.findOne({ email: dto.email });
      const account = await this.accountModel.findOne({ userId: user._id });
      const session = await this.sessionModel.findOne({ userId: user._id });
      if (!user) {
        return new HttpException(
          `Пользователь не найден`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if (!session) {
        const newSession = new this.sessionModel({
          userId: user._id,
          sessionToken: await bcrypt.hash(user.email, 5),
          accessToken: account.accessToken,
          created_at: Date(),
          updated_at: Date(),
        });
        await newSession.save();
      } else {
        session.sessionToken = await bcrypt.hash(user.email, 5);
        session.updated_at = new Date();
        await session.save();
      }
      if (!user.email_verified) {
        return new HttpException(
          `Email не подтвержден`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const validPassword = bcrypt.compare(dto.password, user.password);
      if (!validPassword) {
        return new HttpException(
          'Введен не верный пороль',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        color: user.color,
        accessToken: account.accessToken,
      };
    } catch (e) {
      console.log(e);
      return new HttpException(
        'Login failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async authBy(id) {
    try {
      console.log(id);

      const user = await this.userModel.findOne(ObjectId(id));

      console.log(user);

      const account = await this.accountModel.findOne({ userId: id });
      if (!user) {
        return new HttpException(
          `Пользователь не найден`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        color: user.color,
        accessToken: account.accessToken,
      };
    } catch (e) {
      console.log(e);
      return new HttpException(
        'Login failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
