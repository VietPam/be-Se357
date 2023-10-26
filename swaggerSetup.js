const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // Import tệp cấu hình Swagger

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
