import swaggerJsDoc from 'swagger-jsdoc';

const options: swaggerJsDoc.Options = {
  openapi: '3.0.0',
  swaggerDefinition: <swaggerJsDoc.SwaggerDefinition>{
    info: <swaggerJsDoc.Information>{
      title: 'App',
      description: 'Swagger for easier testing',
      version: '1.0.0',
    },
    servers: ['http://localhost:3000'],
  },
  apis: ['**/*.ts'],
};

const swaggerDocs = swaggerJsDoc(options);

export default swaggerDocs;
