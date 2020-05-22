import { City } from './city.interface';
import { Hobby } from './hobby.interface';

export interface User {
    name: string,
    hobbies: [Hobby],
    cities: [City],
    friends: [User]
}