import { Controller, Get, Param, Post, Delete, Body, Put, Query } from '@nestjs/common';

import { UsersService } from './services';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly someService: UsersService,
  ) {}

  @Get(':id')
  public async getUser(
    @Param('id') id: number,
  ): Promise<any> {
    return this.someService.findById(id);
  }
  @Get()
  public async getUsers(): Promise<any> {
    return this.someService.findAll();
  }

  @Post()
  public async createUser(
    @Body() createUserDto: CreateUserDto
  ): Promise<any>  {
    return this.someService.create(createUserDto);
  }

  @Delete(':id')
  public async deleteUser(
    @Param('id') id: number,
  ): Promise<any> {
    return this.someService.delete(id);
  }

  @Put(':id/add/:friend')
  public async addFriend(
    @Param('id') id: number,
    @Param('friend') friendId: number
  ):Promise<any> {
    return this.someService.addFriend(id, friendId);
  }

  @Get(':id/friends')
  public async getFriends(
    @Param('id') id: number,
    @Query('hobby') hobby?: string,
    @Query('city') city?: string
  ): Promise<any> {
    const user:any = await this.someService.findById(id);

    if (!user) {
      return Promise.resolve([]);
    }

    return this.someService.getFriends(user, hobby, city);
  }
}
