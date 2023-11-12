import express from 'express';
import ApartmentModel from '../models/apartmentModel';

const router = express.Router();

/**
 * @swagger
 * /apartments:
 *   get:
 *     summary: Get all apartments
 *     tags: [Apartments]
 *     responses:
 *       '200':
 *         description: A list of apartments
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: Apartment 1
 *                 description: Spacious and cozy
 *                 price: 100
 *                 location: New Cairo
 */
router.get('/', async (req, res) => {
  try {
    const apartments = await ApartmentModel.find();
    res.json(apartments);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /apartments/{id}:
 *   get:
 *     summary: Get details of a specific apartment
 *     tags: [Apartments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Details of the apartment
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Apartment 1
 *               description: Spacious and cozy
 *               price: 100
 *               location: New Cairo
 *       '404':
 *         description: Apartment not found
 */
router.get('/:id', async (req, res) => {
  const apartmentId = req.params.id;

  try {
    const apartment = await ApartmentModel.findById(apartmentId);
    if (apartment) {
      res.json(apartment);
    } else {
      res.status(404).json({ message: 'Apartment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /apartments:
 *   post:
 *     summary: Add a new apartment
 *     tags: [Apartments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number 
 *               location:
 *                 type: string
 *     responses:
 *       '201':
 *         description: The newly created apartment
 *         content:
 *           application/json:
 *             example:
 *               id: 2
 *               name: New Apartment
 *               description: Modern and stylish
 *               price: 100
 *               location: New Cairo
 *       '500':
 *         description: Internal Server Error
 */
router.post('/', async (req, res) => {
  const { name, description } = req.body;

  try {
    const newApartment = await ApartmentModel.create({ name, description });
    res.status(201).json(newApartment);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
