import { Controller, Get, Param, Query } from '@nestjs/common';

import { UsersService } from './services';

@Controller('hobby')
export class HobbyController {
  constructor(
    private readonly someService: UsersService,
  ) {}
  @Get()
  public async getHobbies(
    @Query('city') city?: string
  ): Promise<any> {
    if (!city) {
      return Promise.resolve([]);
    }

    return this.someService.getHobbiesByCity(city);
  }
}
