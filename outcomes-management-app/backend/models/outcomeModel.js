// Define the outcome model for DynamoDB
module.exports = {
  TableName: 'Outcomes',
  KeySchema: [ /* key schema here */ ],
  AttributeDefinitions: [ /* attribute definitions here */ ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};
