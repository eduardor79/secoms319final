const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Car = require("./dataSchema.js");

app.use(express.json());
app.use(cors());

app.use(express.static("public"));
app.use("/images", express.static("images"));

mongoose.connect("mongodb://localhost:27017/reactdata", {
  dbName: "reactdata",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const port = process.env.PORT || 4000;
const host = "localhost";

app.listen(port, () => {
  console.log(`App listening at http://%s:%s`, host, port);
});

app.get("/", async (req, resp) => {
  const query = {};
  const allCars = await Car.find(query);
  console.log(allCars);
  resp.send(allCars);
});
app.get("/:id", async (req, resp) => {
  const id = req.params.id;
  const query = { _id: id };
  const oneCar = await Car.findOne(query);
  console.log(oneCar);
  resp.send(oneCar);
});
app.post("/insert", async (req, res) => {
  console.log(req.body);
  const c_id = req.body._id;
  const ctitle = req.body.title;
  const cprice = req.body.price;
  const ccategory = req.body.category;
  const cimage = req.body.image;
  const ccolor = req.body.rating.color;
  const formData = new Car({
    _id: c_id,
    title: ctitle,
    price: cprice,
    category: ccategory,
    image: cimage,
    color: ccolor,
  });
  try {
    // await formData.save();
    await Car.create(formData);
    const messageResponse = { message: `Car ${p_id} added correctly` };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while adding a new car:" + err);
  }
});
app.delete("/delete", async (req, res) => {
  console.log("Delete :", req.body);
  try {
    const query = { _id: req.body._id };
    await Car.deleteOne(query);
    const messageResponse = {
      message: `Car ${req.body._id} deleted correctly`,
    };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while deleting :" + p_id + " " + err);
  }
});

app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: id };
  const update = req.body;

  try {
    const updatedCar = await Car.findOneAndUpdate(query, update, {
      new: true,
    });

    if (!updatedCar) {
      return res.status(404).send({ message: "Car not found" });
    }

    res.send(updatedCar);
  } catch (err) {
    console.log("Error while updating a car:" + err);
    res.status(500).send({ message: "Internal server error" });
  }
});
