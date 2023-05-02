const mongoose = require("mongoose");
const ReactFormDataSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    title: { type: String },
    price: { type: Number },
    category: { type: String },
    image: { type: String },
    color: { type: String },
  },
  { collection: "dealership" }
);
const Car = mongoose.model("Car", ReactFormDataSchema);
module.exports = Car;
