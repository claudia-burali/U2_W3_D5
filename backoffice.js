const URL = "https://striveschool-api.herokuapp.com/api/product/";

window.onload = () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);
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
    method: "POST",
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
      alert("Product with id: " + createdProduct._id + " created");

      event.target.reset();
    })
    .catch((err) => console.log(err));
};
