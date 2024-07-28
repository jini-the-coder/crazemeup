const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://Jinisha:mongo@clustercrazemeup.njcqqbp.mongodb.net/crazeMeUpMern?retryWrites=true&w=majority&appName=clusterCrazeMeUp";
const mongoDB = async () => {
  await mongoose
    .connect(mongoURI)
    .then(async () => {
      console.log("Connected Successfully");
      // read data
      const clothItems = mongoose.connection.collection("cloth_items");
      const clothCategory = mongoose.connection.collection("cloth_category");
      try {
        const clothdata = await clothItems.find({}).toArray();
        const clothCategorydata = await clothCategory.find({}).toArray();
        global.cloth_items = clothdata;
        global.cloth_category = clothCategorydata;
      } catch (error) {
        console.error(error);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = mongoDB;
