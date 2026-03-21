
fetch('product.json')
  .then(res => res.json())
  .then(data => {

    function render(list, selector) {
      const container = document.querySelector(selector);
      let html = "";

      list.forEach(item => {
        html += `
          <div class="col-lg-3 col-md-6 col-12">
            <div class="product-card">
              <img src="${item.img}" class="card-img-top" />

              <div class="card-body">
                <p class="card-title">${item.name}</p>
                <p class="card-price">
                  ${Number(item.price).toLocaleString('vi-VN')} ₫
                </p>
                <a href="#" class="btn-buy">Mua</a>
              </div>
            </div>
          </div>
        `;
      });

      container.innerHTML = html;
    }

    // 👉 lọc từng loại
    const hottrend = data.products.filter(p => p.category === "hottrend");
    const teddy = data.products.filter(p => p.category === "teddy");

    // 👉 render ra đúng chỗ
    render(hottrend, ".page-product-hottrend");
    render(teddy, ".page-product-teddy");
  });


let products = [];

// load data
fetch("./product.json")
  .then((res) => res.json())
  .then((data) => {
    products = data.products; // ✅ sửa ở đây
  });

const input = document.getElementById("searchInput");
const resultBox = document.getElementById("searchResult");

input.addEventListener("input", function () {
  const keyword = this.value.toLowerCase();

  if (!keyword) {
    resultBox.classList.add("d-none");
    return;
  }

  const filtered = products.filter((item) =>
    item.name.toLowerCase().includes(keyword)
  );

  showResult(filtered);
});

function showResult(list) {
  if (list.length === 0) {
    resultBox.innerHTML = `<div class="p-2">Không tìm thấy</div>`;
    resultBox.classList.remove("d-none");
    return;
  }

  resultBox.innerHTML = list
    .map(
      (item) => `
    <div class="search-item">
      <img src="${item.img}" />  <!-- ✅ sửa -->
      <div>
        <div>${item.name}</div>
      </div>
      <div class="price">
        ${Number(item.price).toLocaleString('vi-VN')} ₫
      </div>
    </div>
  `
    )
    .join("");

  resultBox.classList.remove("d-none");
}









