// Define the measurement model for DynamoDB
module.exports = {
  TableName: 'Measurements',
  KeySchema: [ /* key schema here */ ],
  AttributeDefinitions: [ /* attribute definitions here */ ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};
