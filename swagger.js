import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "This is my first Swagger API"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },

 // location of api docs files
  apis: ["./routes/*.js"]
};

export const swaggerSpecs = swaggerJsdoc(options)