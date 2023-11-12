import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 
import apartmentRoutes from './routes/apartments';
import { specs, swaggerUiExpress } from '../swagger';

const app = express();
const port = 3001;

// Use cors middleware
app.use(cors());

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/apartmentsListing';


mongoose.connect(mongoURI);


// Check connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use('/apartments', apartmentRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
