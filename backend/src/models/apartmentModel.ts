import mongoose, { Schema, Document } from 'mongoose';

interface Apartment extends Document {
  name: string;
  description: string;
  location: string;
  price: number;
}

const apartmentSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
});

const ApartmentModel = mongoose.model<Apartment>('Apartment', apartmentSchema);

export default ApartmentModel;
