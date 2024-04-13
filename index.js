const URL = "https://striveschool-api.herokuapp.com/api/product/";

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
      const row = document.getElementById("row");
      console.log(row);
      console.log(products);
      products.forEach((product) => {
        const col = document.createElement("div");
        col.classList.add("col");
        col.innerHTML = `<div class="card border-black shadow-sm"> 
        <img src=${product.imageUrl} class="card-img-top" width="100%" alt="${product.name}">
        <div class="card-body"> 
        <p class="card-text">${product.name}</p> 
        <p class="card-text">€${product.price}</p> 
        <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
        <a href="details.html?appId=${product._id}" class="btn btn-dark text-warning">Learn more</a>
        <a href="backoffice.html?appId=${product._id}" class="btn btn-dark text-warning">Edit</a>
        </div>
        <small class="text-dark">By ${product.brand}</small>
        </div>
        </div>
        </div>`;
        row.appendChild(col);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
