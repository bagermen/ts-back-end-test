import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './services/users.service';
import { UserController } from './user.controller';
import { HobbyController } from './hobby.controller';
import { CityController } from './city.controller';
import { UserSchema } from './schemas/user.schema';

@Module({
  controllers: [
    UserController,
    HobbyController,
    CityController,
  ],
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/test-task',
      {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [
    UsersService,
  ],
})
export class AppModule {}
