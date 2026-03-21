const container = document.querySelector(".thumb-container");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const scrollAmount = 68; // 60px + gap

nextBtn.addEventListener("click", () => {
  container.scrollBy({
    left: scrollAmount * 1, // mỗi lần đi 2 ảnh
    behavior: "smooth"
  });
});

prevBtn.addEventListener("click", () => {
  container.scrollBy({
    left: -scrollAmount * 1,
    behavior: "smooth"
  });
});




const mainContainer = document.querySelector(".main-img-wrapper"); // bọc ảnh chính
const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach((img) => {
  img.addEventListener("click", () => {
    const videoSrc = img.getAttribute("data-video");

    // reset active
    thumbs.forEach(i => i.classList.remove("active"));
    img.classList.add("active");

    // nếu là video
    if (videoSrc) {
      mainContainer.innerHTML = `
        <video controls autoplay style="width:100%; border-radius:8px;">
          <source src="${videoSrc}" type="video/mp4">
        </video>
      `;
    } else {
      // nếu là ảnh
      mainContainer.innerHTML = `
        <img src="${img.src}" class="main-img" />
      `;
    }
  });
});


const loginBtn = document.querySelector(".btn-login");
const form = document.querySelector(".comment-form");
const list = document.querySelector(".comment-list");
const textarea = document.querySelector("textarea");

// fake login
loginBtn.onclick = () => {
  loginBtn.style.display = "none";
  form.classList.remove("hidden");
};

// gửi comment
document.querySelector(".btn-send").onclick = () => {
  const text = textarea.value.trim();
  if (!text) return;

  const html = `
    <div class="comment-item">
      <img src="https://i.pravatar.cc/40" class="avatar" />
      <div class="comment-content">
        <div class="comment-name">Người dùng</div>
        <div class="comment-text">${text}</div>
      </div>
    </div>
  `;

  list.innerHTML += html;
  textarea.value = "";
};


