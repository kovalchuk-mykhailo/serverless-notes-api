import * as uuid from "uuid";
import dynamoDbWrapper from "../libs/dynamodb-lib";
import handler from "../libs/handler-lib";

export const create = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.categoriesTableName,
    Item: {
      // The attributes of the item to be created
      categoryId: uuid.v1(), // A unique uuid
      categoryName: data.categoryName, // Parsed from request body
    },
  };

  await dynamoDbWrapper.put(params);

  return params.Item;
});

export const get = handler(async (event, context) => {
  console.log('Categories.get.context: ', context);

  const params = {
    TableName: process.env.categoriesTableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      categoryId: event.pathParameters.id, // The id of the note from the path
    },
  };

  const result = await dynamoDbWrapper.get(params);
  
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return result.Item;
});