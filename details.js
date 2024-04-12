const p = new URLSearchParams(window.location.search);
const id = p.get("appId");
const URL = "https://striveschool-api.herokuapp.com/api/product/" + id;
console.log(id);

window.addEventListener("DOMContentLoaded", () => {
  fetch(URL, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTAzYjdmMzA0NjAwMWFlNTlmNTciLCJpYXQiOjE3MTI5MDYyOTksImV4cCI6MTcxNDExNTg5OX0._AqNCIr-c6jwkia_xiX-dt4Xe8vpunRnzSRUA6lp_E0",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Error getting the images");
      }
    })
    .then((products) => {
      const detail = document.getElementById("detail");
      console.log(detail);
      console.log(products);
      const info = document.createElement("div");
      info.classList.add("info");
      info.innerHTML = ` 
    <img src=${products.imageUrl} alt="...">
    <div> 
    <h3>${products.name}</h3> 
    <p>${products.description}</p>
    <p>By ${products.brand}</p>
    <p>€${products.price}</p> 
    <p>Product ID: ${products._id}</p>
    <a href="backoffice.html?appId=${products._id}" class="btn btn-primary">Edit</a>
    </div>`;
      detail.appendChild(info);
    })
    .catch((err) => {
      console.log(err);
    });
});
