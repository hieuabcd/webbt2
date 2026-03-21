function limitWords(text, maxWords) {
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

let allProducts = [];
let currentLimit = 12;
let currentSort = "default";
let filteredProducts = []; // sản phẩm đã lọc giá

// ===== FETCH DATA =====
fetch("products.json")
  .then((res) => res.json())
  .then((data) => {
    allProducts = data;
    processAndRender();
    filteredProducts = [...allProducts]; // ban đầu chưa lọc
    processAndRenderFiltered();
  });

// ===== XỬ LÝ SORT + SHOW =====
function processAndRender() {
  // copy toàn bộ data
  let data = [...allProducts];

  // 🔹 Lấy sản phẩm hiện tại hiển thị (slice theo page)
  const start = (currentPage - 1) * currentLimit;
  const end = start + currentLimit;
  let showData = data.slice(start, end); // chỉ lấy page hiện tại

  // 🔹 Sort chỉ trong số sản phẩm đang show
  switch (currentSort) {
    case "name-asc":
      showData.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      showData.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "price-asc":
  showData.sort((a, b) =>a.price - b.price);
  break;

case "price-desc":
  showData.sort((a, b) => b.price - a.price);
  break;
  }

  // 🔹 Render
  renderProducts(showData);
  renderPagination();
}

// ===== RENDER =====
// function renderProducts(data) {
//   const container = document.getElementById("products-list");
//   let html = "";

//   data.forEach((item) => {
//     html += `
//       <div class="col-lg-4 col-md-6 col-12">
//         <div class="card h-100 product-card">
//         <a href="/product-detail.html">
//         <img class="card-img-top" src="${item.img}" />
//         <div class="card-body">
//             <p class="card-text" style="font-size:12px;"><a href="/product-detail.html" style="color:var(--mauphu)">${item.category}</a></p>
//             <p class="card-text" style="font-size:18px;"><a href="/product-detail.html">${item.name}</a></p>

            

//             <div class="d-flex justify-content-between align-items-center">
// <p class="card-price">${Number(item.price).toLocaleString('vi-VN')}đ</p>           
// <a href="#" class="buy-btn">Mua ngay</a>
//             </div>
//           </div>
//         </a>
          
          
//         </div>
//       </div>
//     `;
//   });

//   container.innerHTML = html;
// }

function renderProducts(data, append = false) {
  const container = document.getElementById("products-list");
  let html = "";

  data.forEach((item) => {
    html += `
      <div class="col-lg-4 col-md-6 col-12">
        <div class="card h-100 product-card">
          <a href="/product-detail.html">
            <img class="card-img-top" src="${item.img}" />
            <div class="card-body">
              <p class="card-text" style="font-size:12px;">
                <a href="/product-detail.html" style="color:var(--mauphu)">
                  ${item.category}
                </a>
              </p>
              <p class="card-text" style="font-size:18px;">
                <a href="/product-detail.html">${item.name}</a>
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <p class="card-price">${Number(item.price).toLocaleString('vi-VN')}đ</p>
                <a href="#" class="buy-btn">Mua ngay</a>
              </div>
            </div>
          </a>
        </div>
      </div>
    `;
  });

  if (append) {
    container.innerHTML += html; // append sản phẩm mới
  } else {
    container.innerHTML = html; // render mới
  }
}
// ===== LIMIT WORD =====
function limitWords(text, maxWords) {
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

// ===== EVENT SORT =====
document.getElementById("sort-select").addEventListener("change", function () {
  currentSort = this.value;
  processAndRender();
});

// ===== EVENT SHOW =====
document.getElementById("show-select").addEventListener("change", function () {
  currentLimit = parseInt(this.value);
  processAndRender();
});

let currentPage = 1;

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(allProducts.length / currentLimit);

  // Previous
  const prevDisabled = currentPage === 1 ? "disabled" : "";
  pagination.innerHTML += `<li class="page-item ${prevDisabled}">
    <button class="page-link" data-page="${currentPage - 1}">Previous</button>
  </li>`;

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const active = currentPage === i ? "active" : "";
    pagination.innerHTML += `<li class="page-item ${active}">
      <button class="page-link" data-page="${i}">${i}</button>
    </li>`;
  }

  // Next
  const nextDisabled = currentPage === totalPages ? "disabled" : "";
  pagination.innerHTML += `<li class="page-item ${nextDisabled}">
    <button class="page-link" data-page="${currentPage + 1}">Next</button>
  </li>`;

  // Bắt sự kiện click
  pagination.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const page = parseInt(btn.getAttribute("data-page"));
      if (page >= 1 && page <= totalPages) {
        currentPage = page;
        processAndRender();
      }
    });
  });
}

document
  .getElementById("price-filter-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const value = document.getElementById("price-input").value.trim();

    // Nếu ô input rỗng → reset về tất cả sản phẩm
    if (value === "") {
      filteredProducts = [...allProducts];
      renderProducts(filteredProducts); // chỉ render thôi, không sort
      return;
    }

    const maxPrice = parseFloat(value);
    if (isNaN(maxPrice)) {
      alert("Vui lòng nhập số hợp lệ");
      return;
    }

    filteredProducts = allProducts.filter((item) => item.price <= maxPrice);
    currentPage = 1;
    processAndRenderFiltered();
  });

function processAndRenderFiltered() {
  let data = [...filteredProducts];

  // 🔹 SORT trong số sản phẩm đang show
  switch (currentSort) {
    case "name-asc":
      data.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      data.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "price-asc":
      data.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      data.sort((a, b) => b.price - a.price);
      break;
  }

  // 🔹 SLICE theo page
  const start = (currentPage - 1) * currentLimit;
  const end = start + currentLimit;
  const showData = data.slice(start, end);

  renderProducts(showData);
  renderPaginationFiltered(data.length);
}

function renderPaginationFiltered(totalItems) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalItems / currentLimit);

  // Previous
  const prevDisabled = currentPage === 1 ? "disabled" : "";
  pagination.innerHTML += `<li class="page-item ${prevDisabled}">
    <button class="page-link" data-page="${currentPage - 1}">Previous</button>
  </li>`;

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const active = currentPage === i ? "active" : "";
    pagination.innerHTML += `<li class="page-item ${active}">
      <button class="page-link" data-page="${i}">${i}</button>
    </li>`;
  }

  // Next
  const nextDisabled = currentPage === totalPages ? "disabled" : "";
  pagination.innerHTML += `<li class="page-item ${nextDisabled}">
    <button class="page-link" data-page="${currentPage + 1}">Next</button>
  </li>`;

  // CLICK PAGINATION
  pagination.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const page = parseInt(btn.getAttribute("data-page"));
      if (page >= 1 && page <= totalPages) {
        currentPage = page;
        processAndRenderFiltered();
      }
    });
  });
}

function updateResultText(totalItems, startIndex, endIndex) {
  let end = endIndex;
  if (end > totalItems) end = totalItems;
  const textContainer = document.getElementById("result-text");
  textContainer.textContent = `Hiển thị ${startIndex + 1}–${end} của ${totalItems} kết quả`;
}



// // scroll event
// window.addEventListener("scroll", () => {
//   const scrollTop = window.scrollY;
//   const windowHeight = window.innerHeight;
//   const fullHeight = document.documentElement.scrollHeight;

//   // gần chạm đáy
//   if (scrollTop + windowHeight >= fullHeight - 100) {
//     if (currentIndex < allProducts.length) {
//       renderProducts();
//     }
//   }
// });
let currentIndex = 0;
const batchSize = 12;

function loadMoreProducts() {
  if (currentIndex >= allProducts.length) return;

  const nextBatch = allProducts.slice(currentIndex, currentIndex + batchSize);
  renderProducts(nextBatch, true); // append = true
  currentIndex += batchSize;
}

// gọi lần đầu tiên
loadMoreProducts();

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;

  if (scrollTop + windowHeight >= fullHeight - 100) {
    loadMoreProducts();
  }
});
// load lần đầu
document.getElementById("category-filter-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Lấy tất cả checkbox đã check
  const checkedCategories = Array.from(document.querySelectorAll("#category-filter-form input[type=checkbox]:checked"))
    .map(checkbox => checkbox.value);

  // Nếu không check gì → hiển thị tất cả
  if (checkedCategories.length === 0) {
    filteredProducts = [...allProducts];
  } else {
    filteredProducts = allProducts.filter(item => checkedCategories.includes(item.category));
  }

  // Reset page
  currentPage = 1;

  // Render ra màn hình (có sort + pagination)
  processAndRenderFiltered(); // hoặc processAndRender(), tùy bạn
});