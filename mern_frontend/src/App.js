import { useState, useEffect } from "react";
import logo from "./logo.png";
function App() {
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);
  const [oneProduct, setOneProduct] = useState([]);
  const [viewer4, setViewer4] = useState(false);
  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
    rating: { rate: 0.0, count: 0 },
  });
  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);
  const [screen, setScreen] = useState("");
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    getAllProducts();
  }, [checked4]);

  function getOneByOneProductNext() {
    if (product.length > 0) {
      if (index === product.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function getOneByOneProductPrev() {
    if (product.length > 0) {
      if (index === 0) setIndex(product.length - 1);
      else setIndex(index - 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a product completed : ", deleteid);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    setChecked4(!checked4);
  }

  function getAllProducts() {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
    setViewer1(!viewer1);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new product completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
  }

  const showOneItem = oneProduct.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={30} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      setAddNewProduct({ ...addNewProduct, _id: value });
    } else if (evt.target.name === "title") {
      setAddNewProduct({ ...addNewProduct, title: value });
    } else if (evt.target.name === "price") {
      setAddNewProduct({ ...addNewProduct, price: value });
    } else if (evt.target.name === "description") {
      setAddNewProduct({ ...addNewProduct, description: value });
    } else if (evt.target.name === "category") {
      setAddNewProduct({ ...addNewProduct, category: value });
    } else if (evt.target.name === "image") {
      const temp = value;
      setAddNewProduct({ ...addNewProduct, image: temp });
    } else if (evt.target.name === "rate") {
      setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
    } else if (evt.target.name === "count") {
      const temp = addNewProduct.rating.rate;
      setAddNewProduct({
        ...addNewProduct,
        rating: { rate: temp, count: value },
      });
    }
  }

  function getOneProduct(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:4000/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          const dataArr = [];
          dataArr.push(data);
          setOneProduct(dataArr);
        });
      setViewer4(!viewer4);
    } else {
      console.log("Wrong number of Product id.");
    }
  }

  //This function will update the price of the product
  function updateProduct(id) {
    console.log(id, update);
    fetch("http://localhost:4000/update/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: update }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update product completed : ", id);
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
        }
      });
    setChecked4(!checked4);
  }

  const showAllItems = product.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={30} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rate :{el.rating.rate} and Count:{el.rating.count} <br />
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
      default:
        return (
          <div>
            <button
              onClick={() => {
                handleAdd();
              }}
              type="button"
            >
              Add
            </button>
            <button
              onClick={() => {
                handleRead();
              }}
              type="button"
            >
              Read
            </button>
            <button
              onClick={() => {
                handleDelete();
              }}
              type="button"
            >
              Delete
            </button>
            <button
              onClick={() => {
                handleUpdate();
              }}
              type="button"
            >
              Update
            </button>
          </div>
        );
    }
  };

  const Add = () => {
    return (
      <div>
        <h3>Add a new product :</h3>
        <form action="">
          <input
            type="number"
            placeholder="id?"
            name="_id"
            value={addNewProduct._id}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="title?"
            name="title"
            value={addNewProduct.title}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="price?"
            name="price"
            value={addNewProduct.price}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="description?"
            name="description"
            value={addNewProduct.description}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="category?"
            name="category"
            value={addNewProduct.category}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="image?"
            name="image"
            value={addNewProduct.image}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="rate?"
            name="rate"
            value={addNewProduct.rating.rate}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="count?"
            name="count"
            value={addNewProduct.rating.count}
            onChange={handleChange}
          />
          <button type="submit" onClick={handleOnSubmit}>
            submit
          </button>
          <button
            onClick={() => {
              handleBack();
            }}
            type="button"
          >
            Go Back
          </button>
        </form>
      </div>
    );
  };

  const Read = () => {
    return (
      <div>
        <button onClick={() => getAllProducts()}>Show All products</button>
        <h1>Show all available Products.</h1>
        <hr></hr>
        {viewer1 && <div>Products {showAllItems}</div>}
        <hr></hr>
        <button
          onClick={() => {
            handleBack();
          }}
          type="button"
        >
          Go Back
        </button>
      </div>
    );
  };

  //this takes the new price inputted by the user and calls the function updateProduct()
  //to update the price
  const Update = () => {
    return (
      <div>
        <button onClick={() => getOneByOneProductPrev()}>Prev</button>
        <button onClick={() => getOneByOneProductNext()}>Next</button>
        <input
          type="text"
          placeholder="New price"
          value={update}
          onChange={(e) => setUpdate(e.target.value)}
        />
        <button onClick={() => updateProduct(product[index]._id)}>
          Update
        </button>
        <button
          onClick={() => {
            handleBack();
          }}
          type="button"
        >
          Go Back
        </button>
        <div key={product[index]._id}>
          <img src={product[index].image} width={30} /> <br />
          Id:{product[index]._id} <br />
          Title: {product[index].title} <br />
          Category: {product[index].category} <br />
          Price: {product[index].price} <br />
          Rate :{product[index].rating.rate} and Count:
          {product[index].rating.count} <br />
        </div>
      </div>
    );
  };

  const Delete = () => {
    return (
      <div>
        <h3>Delete one product:</h3>
        <input
          type="checkbox"
          id="acceptdelete"
          name="acceptdelete"
          checked={checked4}
          onChange={(e) => setChecked4(!checked4)}
        />
        <button onClick={() => getOneByOneProductPrev()}>Prev</button>
        <button onClick={() => getOneByOneProductNext()}>Next</button>
        <button onClick={() => deleteOneProduct(product[index]._id)}>
          Delete
        </button>
        <button
          onClick={() => {
            handleBack();
          }}
          type="button"
        >
          Go Back
        </button>
        {checked4 && (
          <div key={product[index]._id}>
            <img src={product[index].image} width={30} /> <br />
            Id:{product[index]._id} <br />
            Title: {product[index].title} <br />
            Category: {product[index].category} <br />
            Price: {product[index].price} <br />
            Rate :{product[index].rating.rate} and Count:
            {product[index].rating.count} <br />
          </div>
        )}
      </div>
    );
  };
  return (
    <div>
      <h1>Catalog of Products</h1>

      <div style={{ display: "flex" }}>
        <div style={{ width: "25%", flex: 1 }}>
          <img src={logo} alt="Sunset in the mountains" />
          <div>
            <h1> Store</h1>
            <p className="text-gray-700 text-white">
              {" "}
              by -{" "}
              <b style={{ color: "orange" }}>
                Eduardo Ramirez and Isabelle Raghavan
              </b>
            </p>
          </div>
        </div>
        <div style={{ flex: 2 }}>{chooseComponent(screen)}</div>
      </div>
    </div>
  );
}
export default App;
