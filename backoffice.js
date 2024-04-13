const p = new URLSearchParams(window.location.search);
const id = p.get("appId");
const URL = id
  ? "https://striveschool-api.herokuapp.com/api/product/" + id
  : "https://striveschool-api.herokuapp.com/api/product/";
const met = id ? "PUT" : "POST";

window.onload = () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);
  const submitBtn = document.querySelector("button[type='submit']");
  const subtitle = document.getElementById("subtitle");

  if (id) {
    subtitle.innerText = "Edit product spec";
    submitBtn.classList.remove("btn-primary");
    submitBtn.classList.add("btn-success");
    submitBtn.innerText = "Edit";

    const delBtn = document.querySelector(".btn-danger");
    delBtn.addEventListener("click", handleDelete);
    delBtn.classList.remove("d-none");

    fetch(URL, {
      method: met,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTAzYjdmMzA0NjAwMWFlNTlmNTciLCJpYXQiOjE3MTI5MDYyOTksImV4cCI6MTcxNDExNTg5OX0._AqNCIr-c6jwkia_xiX-dt4Xe8vpunRnzSRUA6lp_E0",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Fetch error");
        }
      })
      .then((prodToModify) => {
        const { name, description, brand, imageUrl, price } = prodToModify;
        document.getElementById("name").value = name;
        document.getElementById("description").value = description;
        document.getElementById("brand").value = brand;
        document.getElementById("image").value = imageUrl;
        document.getElementById("price").value = price;
      })
      .catch((err) => console.log(err));
  } else {
    subtitle.innerText = "Add new product";
  }
};

const handleSubmit = (event) => {
  console.log("EVENT", event);
  event.preventDefault();
  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("image").value,
    price: document.getElementById("price").value,
  };

  fetch(URL, {
    method: met,
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTAzYjdmMzA0NjAwMWFlNTlmNTciLCJpYXQiOjE3MTI5MDYyOTksImV4cCI6MTcxNDExNTg5OX0._AqNCIr-c6jwkia_xiX-dt4Xe8vpunRnzSRUA6lp_E0",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Fetch error");
      }
    })
    .then((createdProduct) => {
      if (id) {
        alert("Product with id: " + createdProduct._id + " edited");
      } else {
        alert("Product with id: " + createdProduct._id + " created");
        event.target.reset();
      }
    })
    .catch((err) => console.log(err));
};
const handleDelete = () => {
  const confirmed = confirm("Do you really want to delete this product?");

  if (confirmed) {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTAzYjdmMzA0NjAwMWFlNTlmNTciLCJpYXQiOjE3MTI5MDYyOTksImV4cCI6MTcxNDExNTg5OX0._AqNCIr-c6jwkia_xiX-dt4Xe8vpunRnzSRUA6lp_E0",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Fetch error");
        }
      })
      .then((deletedProduct) => {
        alert("Product: " + deletedProduct.name + " deleted");
        window.location.assign("./index.html");
      })
      .catch((err) => console.log(err));
  }
};
