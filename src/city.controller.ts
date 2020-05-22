import { Controller, Get, Param, Query } from '@nestjs/common';

import { UsersService } from './services';

@Controller('city')
export class CityController {
  constructor(
    private readonly someService: UsersService,
  ) {}
  @Get()
  public async getCitites(
    @Query('hobby') hobby?: string
  ): Promise<any> {
    if (!hobby) {
      return Promise.resolve([]);
    }

    return this.someService.getCitiesByHobby(hobby);
  }
}
