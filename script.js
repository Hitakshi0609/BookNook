// ---------- Book data ----------
const books = [
  { title: "Atomic Habits", author: "James Clear", genre: "Self-Help", rating: 4.8,
    review: "Practical and easy to follow. Small changes really do add up.", color: "#2a9d8f" },
  { title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", rating: 4.2,
    review: "A simple, inspiring story about following your dreams.", color: "#e76f51" },
  { title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", rating: 4.6,
    review: "Dense but unforgettable world-building and politics.", color: "#bc6c25" },
  { title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", genre: "Fantasy", rating: 4.7,
    review: "A magical start that is hard to put down.", color: "#6d597a" },
  { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", rating: 4.5,
    review: "A cozy adventure with great characters.", color: "#588157" },
  { title: "1984", author: "George Orwell", genre: "Fiction", rating: 4.4,
    review: "Dark, thought-provoking and still very relevant.", color: "#457b9d" },
  { title: "Ikigai", author: "Hector Garcia", genre: "Self-Help", rating: 3.9,
    review: "A calm read about finding purpose, though a bit repetitive.", color: "#d4a373" },
  { title: "The Martian", author: "Andy Weir", genre: "Sci-Fi", rating: 4.6,
    review: "Funny, fast and full of clever science problem-solving.", color: "#ae2012" }
];

// ---------- Helper functions ----------
function makeStars(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

function showBooks(containerId, list) {
  const container = document.getElementById(containerId);
  if (!container) return;           // this page doesn't have this container
  container.innerHTML = "";
  list.forEach(function (book) {
    container.innerHTML += `
      <div class="card">
        <div class="cover" style="background:${book.color}">${book.title}</div>
        <h3>${book.title}</h3>
        <p class="author">${book.author} &bull; ${book.genre}</p>
        <p class="stars">${makeStars(book.rating)} ${book.rating}</p>
        <p class="review">${book.review}</p>
      </div>`;
  });
}

// ---------- Home page: first 3 books ----------
showBooks("featuredGrid", books.slice(0, 3));

// ---------- Top picks page: rating 4.5+ ----------
showBooks("topGrid", books.filter(function (b) { return b.rating >= 4.5; }));

// ---------- Browse page: search + genre filter ----------
const searchBox = document.getElementById("search");
const genreBox = document.getElementById("genre");

function filterBooks() {
  const text = searchBox.value.toLowerCase();
  const genre = genreBox.value;

  const result = books.filter(function (b) {
    const matchesText = b.title.toLowerCase().includes(text) ||
                        b.author.toLowerCase().includes(text);
    const matchesGenre = genre === "all" || b.genre === genre;
    return matchesText && matchesGenre;
  });

  showBooks("bookGrid", result);
  document.getElementById("noResults").classList.toggle("hidden", result.length > 0);
}

if (searchBox && genreBox) {
  showBooks("bookGrid", books);
  searchBox.addEventListener("input", filterBooks);
  genreBox.addEventListener("change", filterBooks);
}

// ---------- Contact page: form validation ----------
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();   // stop the page from reloading

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const msg = document.getElementById("formMsg");

    if (name === "" || email === "" || message === "") {
      msg.textContent = "Please fill in all fields.";
      msg.className = "error";
    } else if (!email.includes("@") || !email.includes(".")) {
      msg.textContent = "Please enter a valid email address.";
      msg.className = "error";
    } else {
      msg.textContent = "Thanks, " + name + "! Your suggestion has been received.";
      msg.className = "success";
      form.reset();
    }
  });
}