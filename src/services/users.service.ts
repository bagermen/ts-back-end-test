import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(CreateUserDto: CreateUserDto): Promise<User> {
    const created = new this.userModel(CreateUserDto);
    return created.save();
  }

  async findById(id:number): Promise<User> {
    return this.userModel.findById(id);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async delete(id:number): Promise<any> {
    return this.userModel.findById(id).remove();
  }

  async addFriend(userId:number,friendId:number): Promise<any> {
    const
      user1:Model|null = await this.userModel.findById(userId),
      user2:Model|null = await this.userModel.findById(friendId);

    if (!user1 || !user2) {
      throw new Error('No users found');
    }

    if (user1.friends.some((id:number) => id == user2.id)) {
      return Promise.resolve(user1);
    }

    user1.friends.push(user2);

    return user1.save();
  }

  async getFriends(user:User, hobby?:string, city?:string): Promise<any> {
    let query:object = {'$and': [{'_id': {'$in': user.friends}}]};

    if (hobby) {
      query['$and'].push({'hobbies.name': {'$eq': hobby}});
    }

    if (city) {
      query['$and'].push({'cities.name': {'$eq': city}});
    }

    return this.userModel.find(query).exec();
  }

  async getHobbiesByCity(city:string): Promise<any> {
    return this.userModel.aggregate(
        [
          { $unwind: "$hobbies" },
          {'$match': {'cities.name': city}},
          { $group: { _id: "$hobbies.name" } },
        ]
      );
  }

  async getCitiesByHobby(hobby:string): Promise<any> {
    return this.userModel.aggregate(
        [
          { $unwind: "$cities" },
          {'$match': {'hobbies.name': hobby}},
          { $group: { _id: "$cities.name" } },
        ]
      );
  }
}
