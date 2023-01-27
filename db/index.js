// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app
const user = process.env.MONGO_USER_NAME;
const password = process.env.MONGO_PASSWORD;

const url = `mongodb+srv://${user}:${password}@cluster0.t389saj.mongodb.net/?retryWrites=true&w=majority`

const MONGO_URI =
    url || "mongodb://127.0.0.1:27017/toDo-Dashboard";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
