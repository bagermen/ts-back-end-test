import * as mongoose from 'mongoose';
import { HobbySchema } from './hobby.schema';
import { CitySchema } from './city.schema';

export const UserSchema = new mongoose.Schema({
  name: String,
  hobbies: [HobbySchema],
  cities: [CitySchema],
  friends: [{ type: mongoose.ObjectId, ref: 'User' }],
  features: {
    type: Map,
    of: Array,
    default: {}
  }
});

UserSchema.pre('save', function(next) {
  let
    doc = this,
    hobby:string,
    features:object = {
      guitar: {concerts: ['111', '222', '333']},
      skiing: {resorts: ['222', '333', '444']},
      stamp: {stamps: ['555', '666']}
    };

  for (hobby in features) {
    if (doc.hobbies.some((rec) => rec.name == hobby)) {
      doc.features = {...features[hobby] };
    }
  }

  next();
});