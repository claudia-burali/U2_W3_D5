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
        col.innerHTML = `<div class="card"> 
        <img src=${product.imageUrl} class="card-img-top" alt="...">
        <div class="card-body position-relative border border-2"> 
        <p class="card-text">${product.name}</p> 
        <p class="card-text small">By ${product.brand}</p>
        <p class="card-text">€${product.price}</p> 
        <a href="details.html?appId=${product._id}" class="btn btn-primary">Details</a>
        <a href="backoffice.html?appId=${product._id}" class="btn btn-primary">Edit</a>
        </div>
        </div>`;
        row.appendChild(col);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
