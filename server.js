const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON and handle form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Load users from JSON file
const loadUsers = () => {
    const data = fs.readFileSync('users.json');
    return JSON.parse(data);
};

// Save users to JSON file
const saveUsers = (users) => {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
};

// Sign-up route
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    let users = loadUsers();

    // Check if user already exists
    if (users.some(user => user.email === email)) {
        return res.status(400).send('User already exists.');
    }

    // Add new user
    users.push({ name, email, password });
    saveUsers(users);

    res.status(201).send('User registered successfully.');
});

// Sign-in route
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    let users = loadUsers();

    // Check if user exists and password matches
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        return res.status(200).send(`Welcome back, ${user.name}!`);
    }

    res.status(401).send('Invalid email or password.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
