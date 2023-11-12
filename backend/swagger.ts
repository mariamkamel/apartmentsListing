import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Apartments API',
      version: '1.0.0',
      description: 'API for managing apartment listings',
    },
  },
  apis: ['./src/routes/*.ts'], 
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUiExpress };
