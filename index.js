const express = require('express');
const Users = require('./models/Users');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/user/register', async (req, res) => {
    try {
        const user = await Users.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const secretKey = 'your_secret_key';

app.post('/user/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordMatch = password === user.password;

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, secretKey, {
            expiresIn: '4h', 
        });

        // Return the token in the response
        res.status(200).json({ token, user:{ id: user.id, name: user.name, email: user.email} });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add more routes as needed

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
