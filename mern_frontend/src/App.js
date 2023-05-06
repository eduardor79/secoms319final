import { useState, useEffect } from "react";
// import logo from "./logo.png";
import carLogo from "./carLogo.png";
function App() {
  const [car, setCar] = useState([]);
  const [viewer1, setViewer1] = useState(false);
  const [oneCar, setOneCar] = useState([]);
  const [viewer4, setViewer4] = useState(false);
  const [addNewCar, setAddNewCar] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
    color: "",
  });
  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);
  const [screen, setScreen] = useState("");
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    getAllCars();
  }, [checked4]);

  function getOneByOneCarNext() {
    if (car.length > 0) {
      if (index === car.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (car.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function getOneByOneCarPrev() {
    if (car.length > 0) {
      if (index === 0) setIndex(car.length - 1);
      else setIndex(index - 1);
      if (car.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function deleteOneCar(deleteid) {
    console.log("Car to delete :", deleteid);
    fetch("http://localhost:4000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a car completed : ", deleteid);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    setChecked4(!checked4);
  }

  function getAllCars() {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Cars :");
        console.log(data);
        setCar(data);
      });
    setViewer1(!viewer1);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewCar),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new car completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
  }

  const showOneItem = oneCar.map((el) => (
    <div key={el._id}>
      <img src={el.image} alt="" width={30} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Color:{el.color} <br />
    </div>
  ));

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      setAddNewCar({ ...addNewCar, _id: value });
    } else if (evt.target.name === "title") {
      setAddNewCar({ ...addNewCar, title: value });
    } else if (evt.target.name === "price") {
      setAddNewCar({ ...addNewCar, price: value });
    } else if (evt.target.name === "category") {
      setAddNewCar({ ...addNewCar, category: value });
    } else if (evt.target.name === "image") {
      const temp = value;
      setAddNewCar({ ...addNewCar, image: temp });
    } else if (evt.target.name === "color") {
      setAddNewCar({
        ...addNewCar,
        color: value,
      });
    }
  }

  function getOneCar(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:4000/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one car: ", id);
          console.log(data);
          const dataArr = [];
          dataArr.push(data);
          setOneCar(dataArr);
        });
      setViewer4(!viewer4);
    } else {
      console.log("Wrong number of Car ids.");
    }
  }

  //This function will update the price of the product
  function updateCar(id) {
    console.log(id, update);
    fetch("http://localhost:4000/update/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: update }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update car completed : ", id);
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
        }
      })
      .catch((err) => console.log("Error while updating car: ", err));
    setChecked4(!checked4);
  }

  const showAllItems = car.map((el) => (
    <div key={el._id} class="border-2 border-black">
      <img src={el.image} alt="" width={100} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Color :{el.color} <br />
    </div>
  ));
  const handleAdd = () => {
    setScreen("Add");
  };
  const handleRead = () => {
    setScreen("Read");
  };
  const handleUpdate = () => {
    setScreen("Update");
  };
  const handleDelete = () => {
    setScreen("Delete");
  };
  const handleBack = () => {
    setScreen("");
  };
  const handleCredits = () => {
    setScreen("Credits");
  };
  const chooseComponent = (screen) => {
    switch (screen) {
      case "Add": {
        return Add();
      }
      case "Read": {
        return Read();
      }
      case "Update": {
        return Update();
      }
      case "Delete": {
        return Delete();
      }
      case "Credits": {
        return Credits();
      }
      default:
        return (
          <div class="flex-col flex items-center justify-center gap-10">
            <button
              className="text-xl w-1/3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => {
                handleAdd();
              }}
              type="button"
            >
              Add
            </button>
            <button
              className="text-xl w-1/3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => {
                handleRead();
              }}
              type="button"
            >
              Read
            </button>
            <button
              className="text-xl w-1/3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => {
                handleDelete();
              }}
              type="button"
            >
              Delete
            </button>
            <button
              className="text-xl w-1/3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded "
              onClick={() => {
                handleUpdate();
              }}
              type="button"
            >
              Update
            </button>
            <button
              className="text-xl w-1/3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded "
              onClick={() => {
                handleCredits();
              }}
              type="button"
            >
              Credits
            </button>
          </div>
        );
    }
  };
  const Credits = () => {
    return (
      <div class="pt-5 flex-col flex items-center justify-center gap-10 ">
        <div class="inline-block align-middle text-center">
          <p>
            By -{" "}
            <b style={{}}>
              Eduardo Ramirez: eduardor@iastate.edu and Isabelle Raghavan:
              raghavan@iastate.edu
            </b>
          </p>
          <p>COMS 319: Construction of User Interfaces</p>
          <p>5/5/2023</p>
          <p>Abraham Aldaco</p>
          <p>
            This project is a final for COMS 319. It simulates a dealership
            application for their cars.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            onClick={() => {
              handleBack();
            }}
            type="button"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  };
  const Add = () => {
    return (
      <div class=" flex-col flex items-center justify-center p-2">
        <h3>Add a new car:</h3>
        <form action="">
          <div class="flex-col flex items-center justify-center gap-5  p-2">
            <div class="flex items-center gap-2 justify-center">
              <p>ID: </p>{" "}
              <input
                class="border-black border-2"
                type="number"
                placeholder="id?"
                name="_id"
                value={addNewCar._id}
                onChange={handleChange}
              />
            </div>
            <input
              class="border-black border-2"
              type="text"
              placeholder="Make and Model?"
              name="title"
              value={addNewCar.title}
              onChange={handleChange}
            />
            <div class="flex items-center gap-2 justify-center">
              <p>Price: </p>{" "}
              <input
                class="border-black border-2"
                type="number"
                placeholder="Price?"
                name="price"
                value={addNewCar.price}
                onChange={handleChange}
              />
            </div>
            <input
              class="border-black border-2"
              type="text"
              placeholder="Category?"
              name="category"
              value={addNewCar.category}
              onChange={handleChange}
            />
            <input
              class="border-black border-2"
              type="text"
              placeholder="Image?"
              name="image"
              value={addNewCar.image}
              onChange={handleChange}
            />
            <input
              class="border-black border-2"
              type="text"
              placeholder="Color?"
              name="color"
              value={addNewCar.color}
              onChange={handleChange}
            />
          </div>
          <div class="flex items-center gap-2 justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              type="submit"
              onClick={handleOnSubmit}
            >
              Submit
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => {
                handleBack();
              }}
              type="button"
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    );
  };

  const Read = () => {
    return (
      <div class=" flex-col flex items-center justify-center p-2">
        <div class="flex flex-col items-center gap-2 justify-center">
          <div class="flex items-center justify-center gap-5 p-2">
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => getAllCars()}
            >
              Show All Cars
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => {
                handleBack();
              }}
              type="button"
            >
              Go Back
            </button>
          </div>
          <div>{viewer1 && <div class="gap-2">Cars {showAllItems}</div>}</div>
        </div>
      </div>
    );
  };

  //this takes the new price inputted by the user and calls the function updateCar()
  //to update the price
  const Update = () => {
    return (
      <div class="flex items-center gap-2 justify-center">
        <div class="flex-col flex items-center justify-center gap-5  p-2">
          <div class="flex-row flex items-center justify-center  gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => getOneByOneCarPrev()}
            >
              Prev
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => getOneByOneCarNext()}
            >
              Next
            </button>
          </div>
          <div class="flex-row flex items-center justify-center  gap-2">
            <p>New Price: </p>
            <input
              type="text"
              class="border-2 border-black"
              placeholder="New price"
              value={update}
              onChange={(e) => setUpdate(e.target.value)}
            />
          </div>
          <div class="flex-row flex items-center justify-center  gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => updateCar(car[index]._id)}
            >
              Update
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => {
                handleBack();
              }}
              type="button"
            >
              Go Back
            </button>
          </div>

          <div key={car[index]._id}>
            <img src={car[index].image} alt="" width={100} /> <br />
            Id:{car[index]._id} <br />
            Title: {car[index].title} <br />
            Category: {car[index].category} <br />
            Price: {car[index].price} <br />
            Color :{car[index].color}
          </div>
        </div>
      </div>
    );
  };

  const Delete = () => {
    return (
      <div class="flex items-center gap-2 justify-center">
        <div class="flex-col flex items-center justify-center gap-5 p-2">
          <div class="flex items-center justify-center gap-5 p-2">
            <h3>Delete one car: </h3>
            <input
              type="checkbox"
              id="acceptdelete"
              name="acceptdelete"
              checked={checked4}
              onChange={(e) => setChecked4(!checked4)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => getOneByOneCarPrev()}
            >
              Prev
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => getOneByOneCarNext()}
            >
              Next
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => deleteOneCar(car[index]._id)}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => {
                handleBack();
              }}
              type="button"
            >
              Go Back
            </button>
          </div>
          <div>
            {checked4 && (
              <div key={car[index]._id} c>
                <img src={car[index].image} alt="" width={100} /> <br />
                Id:{car[index]._id} <br />
                Title: {car[index].title} <br />
                Category: {car[index].category} <br />
                Price: {car[index].price} <br />
                Color: {car[index].color}
                <br />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div style={{ height: "100%" }}>
      <h1 class="text-5xl font-extrabold dark:text-white bg-neutral-700 p-1 pb-3">
        Catalog of Cars
      </h1>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flex: 2 }}>
          <div class="flex justify-center ">
            <img class="object-center w-1/5" src={carLogo} alt="carLogo" />
          </div>{" "}
          {chooseComponent(screen)}
        </div>
      </div>
    </div>
  );
}
export default App;
