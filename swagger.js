const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Tên dự án của bạn',
      version: '1.0.0',
      description: 'Mô tả dự án của bạn',
    },
  },
  apis: ['./src/routes/*.js'], // Đường dẫn đến các tệp router
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
