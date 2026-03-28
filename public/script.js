const upload = document.getElementById("upload");
const image = document.getElementById("image");
const buttons = document.querySelectorAll(".filter-buttons button");
const range = document.getElementById("range");
const filterName = document.getElementById("filter-name");
const filterValue = document.getElementById("filter-value");

// default values
let currentFilter = "brightness";

let filters = {
  brightness: 100,
  contrast: 100,
  blur: 0,
  grayscale: 0,
  saturate: 100,
  opacity: 100
};

// upload image
upload.addEventListener("change", () => {
  const file = upload.files[0];
  if (file) {
    image.src = URL.createObjectURL(file);
  }
});

// filter button click
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    btn.classList.add("active");

    currentFilter = btn.dataset.filter;
    filterName.innerText = currentFilter;

    range.value = filters[currentFilter];
    filterValue.innerText = range.value + "%";
  });
});

// slider change
range.addEventListener("input", () => {
  filters[currentFilter] = range.value;
  filterValue.innerText = range.value + "%";
  applyFilters();
});

// apply filters
function applyFilters() {
  image.style.filter = `
    brightness(${filters.brightness}%)
    contrast(${filters.contrast}%)
    blur(${filters.blur}px)
    grayscale(${filters.grayscale}%)
    saturate(${filters.saturate}%)
    opacity(${filters.opacity}%)
  `;
}

// ================= ROTATE & FLIP =================

let rotate = 0, flipXVal = 1, flipYVal = 1;

function rotateLeft() {
  rotate -= 90;
  applyTransform();
}

function rotateRight() {
  rotate += 90;
  applyTransform();
}

function flipX() {
  flipXVal *= -1;
  applyTransform();
}

function flipY() {
  flipYVal *= -1;
  applyTransform();
}

function applyTransform() {
  image.style.transform = `rotate(${rotate}deg) scale(${flipXVal}, ${flipYVal})`;
}

// ================= RESET =================

function resetImage() {
  filters = {
    brightness: 100,
    contrast: 100,
    blur: 0,
    grayscale: 0,
    saturate: 100,
    opacity: 100
  };

  rotate = 0;
  flipXVal = 1;
  flipYVal = 1;

  range.value = 100;
  filterValue.innerText = "100%";

  applyFilters();
  applyTransform();
}

// ================= SAVE IMAGE =================

function saveImage() {
  const link = document.createElement("a");
  link.href = image.src;
  link.download = "edited-image.png";
  link.click();
}
