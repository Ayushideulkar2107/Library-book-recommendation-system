// Get elements
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Toggle between sign-up and sign-in panels
signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// Sign-up functionality
const signUpForm = document.querySelector('.sign-up-container form');
signUpForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const name = signUpForm.querySelector('input[placeholder="Name"]').value;
	const email = signUpForm.querySelector('input[placeholder="Email"]').value;
	const password = signUpForm.querySelector('input[placeholder="Password"]').value;
	
	if (name && email && password) {
		let users = JSON.parse(localStorage.getItem('users')) || [];
		
		// Check if user already exists
		if (users.some(user => user.email === email)) {
			alert("User already exists with this email.");
			return;
		}
		
		// Add user to the "mock database"
		users.push({ name, email, password });
		localStorage.setItem('users', JSON.stringify(users));
		alert('Account created successfully! Please sign in.');
		signInButton.click(); // Switch to the sign-in panel after successful sign-up
	} else {
		alert('Please fill in all fields.');
	}
});

// Sign-in functionality
// Sign-in functionality
const signInForm = document.querySelector('.sign-in-container form');
signInForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = signInForm.querySelector('input[placeholder="Email"]').value;
    const password = signInForm.querySelector('input[placeholder="Password"]').value;

    if (email && password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if user exists and password matches
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            alert(`Welcome back, ${user.name}!`);
            // Redirect to index.html after successful login
            window.location.href = 'books.html';
        } else {
            alert('Invalid email or password.');
        }
    } else {
        alert('Please fill in all fields.');
    }
});

