const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event, context) => {
  try {
    const authorizationHeader = event.headers['Authorization'];
    const token = authorizationHeader.split(' ')[1]; // Assuming the token is in the format "Bearer <token>"

    const decodedToken = jwt.decode(token);

    // Access the user information from the decoded token
    const { sub: userId, email } = decodedToken;
    const username = decodedToken['cognito:username'];

    // Instantiate the DynamoDB client
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    // Determine the HTTP method (GET, POST, PUT, DELETE)
    const httpMethod = event.httpMethod;

    if (httpMethod === 'GET') {
      // Retrieve all records from DynamoDB based on the userId
      const params = {
        TableName: 'Todos',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
      };

      const result = await dynamodb.query(params).promise();

      return {
        statusCode: 200,
        body: JSON.stringify(result.Items),
      };
    } else if (httpMethod === 'POST' || httpMethod === 'PUT') {
      // Extract the Todo item data from the request body
      const todo = event.body; // Parse the JSON string to an object
      const id = uuidv4(); // Generate a UUID for the id field

      // Add or update the Todo item in DynamoDB
      const params = {
        TableName: 'Todos',
        Item: {
          userId: userId,
          id: id,
          title: todo.title,
          body: todo.body,
        },
      };
      await dynamodb.put(params).promise();

      return {
        statusCode: 200,
        body: 'Todo item added/updated successfully',
      };
    }else if (httpMethod === 'DELETE') {
      // Extract the Todo item ID from the request path or query parameters
      const id = event.pathParameters.id;

      // Delete the Todo item from DynamoDB
      const params = {
        TableName: 'Todos',
        Key: {
          userId: userId,
          id: id,
        },
      };
      await dynamodb.delete(params).promise();

      return {
        statusCode: 200,
        body: 'Todo item deleted successfully',
      };
    } else {
      return {
        statusCode: 400,
        body: 'Invalid request method',
      };
    }  
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};
