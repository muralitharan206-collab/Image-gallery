// List of image sources, titles, categories — in the SAME order
// as the cards appear in index.html (card 0, card 1, card 2...)
var images = [
  { src: "https://picsum.photos/seed/mountain1/800/600", title: "Misty Peaks",   category: "Nature" },
  { src: "https://picsum.photos/seed/city1/800/600",     title: "Night Skyline", category: "Urban" },
  { src: "https://picsum.photos/seed/forest1/800/600",   title: "Deep Woods",    category: "Nature" },
  { src: "https://picsum.photos/seed/food1/800/600",     title: "Plated Dish",   category: "Food" },
  { src: "https://picsum.photos/seed/street1/800/600",   title: "Rainy Alley",   category: "Urban" },
  { src: "https://picsum.photos/seed/coffee1/800/600",   title: "Morning Brew",  category: "Food" },
  { src: "https://picsum.photos/seed/desert1/800/600",   title: "Golden Dunes",  category: "Nature" },
  { src: "https://picsum.photos/seed/bridge1/800/600",   title: "Steel Bridge",  category: "Urban" },
  { src: "https://picsum.photos/seed/dessert1/800/600",  title: "Sweet Tart",    category: "Food" },
  { src: "https://picsum.photos/seed/lake1/800/600",     title: "Still Water",   category: "Nature" },
  { src: "https://picsum.photos/seed/market1/800/600",   title: "Busy Market",   category: "Urban" },
  { src: "https://picsum.photos/seed/salad1/800/600",    title: "Fresh Greens",  category: "Food" }
];

// grab the lightbox elements once
var lightbox  = document.getElementById("lightbox");
var lbImg     = document.getElementById("lbImg");
var lbCaption = document.getElementById("lbCaption");

// keeps track of which photo is currently open
var currentIndex = 0;

// called by onclick="openLightbox(n)" on each card
function openLightbox(index) {
  currentIndex = index;
  showImage();
  lightbox.className = "lightbox open";
}

// called by the X button
function closeLightbox() {
  lightbox.className = "lightbox";
}

// called by the right arrow button
function nextImage() {
  currentIndex = currentIndex + 1;

  // wrap back to the first image after the last one
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }

  showImage();
}

// called by the left arrow button
function prevImage() {
  currentIndex = currentIndex - 1;

  // wrap to the last image if we go before the first one
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }

  showImage();
}

// updates the lightbox image + caption to match currentIndex
function showImage() {
  var photo = images[currentIndex];

  lbImg.src = photo.src;
  lbImg.alt = photo.title;
  lbImg.className = "show"; // makes the image visible (CSS sets opacity:0 by default)
  lbCaption.innerHTML = "<strong>" + photo.title + "</strong> — " + photo.category;
}

// optional: keyboard support (Escape, Left, Right)
document.addEventListener("keydown", function (event) {
  var isOpen = lightbox.className.indexOf("open") !== -1;

  if (isOpen === true) {
    if (event.key === "Escape") {
      closeLightbox();
    }
    if (event.key === "ArrowRight") {
      nextImage();
    }
    if (event.key === "ArrowLeft") {
      prevImage();
    }
  }
});

// FILTER BUTTONS
// (cards are plain HTML; this just shows/hides them
//  based on each card's data-category attribute)
function filterImages(category, clickedButton) {
  var allCards = document.querySelectorAll(".card");

  for (var i = 0; i < allCards.length; i++) {
    var card = allCards[i];
    var cardCategory = card.getAttribute("data-category");

    if (category === "All" || cardCategory === category) {
      card.className = "card";
    } else {
      card.className = "card hidden";
    }
  }

  // update which filter button looks "active"
  var allButtons = document.querySelectorAll(".filter-btn");
  for (var j = 0; j < allButtons.length; j++) {
    allButtons[j].className = "filter-btn";
  }
  clickedButton.className = "filter-btn active";
}