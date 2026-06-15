let books = [];

// Fetch books.json for book search
fetch('books.json')
  .then(response => response.json())
  .then(data => {
    books = data;
  })
  .catch(error => console.error('Error loading books:', error));

function searchBooks() {
  const input = document.getElementById('bookInput').value.toLowerCase();
  const suggestionBox = document.getElementById('suggestionBox');
  suggestionBox.innerHTML = '';  // Clear previous results
  
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(input) || 
    book.author.toLowerCase().includes(input) ||
    book.type.toLowerCase().includes(input)
  );

  if (filteredBooks.length > 0) {
    filteredBooks.forEach(book => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');
      bookDiv.innerHTML = `
        <strong class="book-title">${book.title}</strong>
        <p class="book-author">by ${book.author}</p>
        <p class="book-description">${book.description}</p>
      `;
      suggestionBox.appendChild(bookDiv);
    });
  } else {
    suggestionBox.innerHTML = '<p>No books found.</p>';
  }
}

// Three.js setup for a dynamic particle system
// let scene, camera, renderer, stars = [], starGeo, starMaterial, starField;

// function init() {
//   // Initialize Three.js scene
//   scene = new THREE.Scene();
//   camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//   camera.position.z = 5;

//   renderer = new THREE.WebGLRenderer({ alpha: true });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);

//   starGeo = new THREE.BufferGeometry();
//   let starVertices = [];

//   for (let i = 0; i < 1000; i++) {
//     let x = (Math.random() - 0.5) * 100;
//     let y = (Math.random() - 0.5) * 100;
//     let z = (Math.random() - 0.5) * 100;
//     starVertices.push(x, y, z);
//   }

//   starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
//   starMaterial = new THREE.PointsMaterial({
//     color: 0xffffff,
//     size: 0.7,
//     map: new THREE.TextureLoader().load('star.png'),
//     blending: THREE.AdditiveBlending,
//     depthTest: false,
//     transparent: true,
//   });

//   starField = new THREE.Points(starGeo, starMaterial);
//   scene.add(starField);

//   animate();
// }

function animate() {
  requestAnimationFrame(animate);
  starField.rotation.y += 0.001;
  renderer.render(scene, camera);
}

// Grab the theme toggle button
const themeToggle = document.querySelector('.theme-toggle');

// Theme toggling logic
function setTheme(theme) {
  document.body.classList.remove('light-mode', 'dark-mode');
  document.body.classList.add(`${theme}-mode`);
  localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  setTheme(currentTheme === 'light' ? 'dark' : 'light');
});

// On load, check saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Initialize Three.js
document.addEventListener('DOMContentLoaded', init);
