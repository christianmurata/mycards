import mongoose from "mongoose";

import { IField, ICard } from "../common/interfaces";

const Field = new mongoose.Schema<IField>({
  name: String,
  value: String,
});

const CardSchema = new mongoose.Schema<ICard>({
  name: String,
  description: String,
  type: String,
  price: Number,
  fields: [Field],
});

CardSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

CardSchema.set('toJSON', {
  virtuals: true
});

export const Card = mongoose.model<ICard>('Card', CardSchema);