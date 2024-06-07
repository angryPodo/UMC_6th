import SwaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: 'UMC Study API',
      version: '1.0.0',
      description: 'UMC Study API with express, API 설명'
    },
    host: 'localhost:3000',
    basePath: '/'
  },
  apis: ['./swagger/*.yaml']
};

export const specs = SwaggerJsdoc(options);
