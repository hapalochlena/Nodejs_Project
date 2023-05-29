// const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'Hello from root!',
  });
});

app.get('/path', (req, res, next) => {
  return res.status(200).json({
    message: 'Hello from path!',
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Your function executed successfully!',
        input: event
      },
      null,
      2
    )
  };
};

// * handler = lambda handler

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Your function executed successfully!',
        input: event
      },
      null,
      2
    )
  };
};
