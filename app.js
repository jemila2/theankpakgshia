








// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path")

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(path.join(__dirname,'pages'))
app.use(express.static('pages'));
 app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, 'pages', 'index.html'));
 });

  app.get('/home', (req, res) => {
     res.sendFile(path.join(__dirname, 'pages', 'home.html'));
 });

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can replace this with your email service
    auth: {

         user: 'j62277247@gmail.com',
            pass: 'vqteksjlldpcflam', 
        // user: 'your-email@gmail.com', // Your email
        // pass: 'your-email-password' // Your email app password
    }
});

// Endpoint for complaints
app.post('/api/Complaint', (req, res) => {
    const { name, email, complaint } = req.body;
    const mailOptions = {
        from: email,
        to: 'abubakarjemiletu08@gmail.com', // Where the email will be sent
        subject: 'New Complaint from ' + name,
        text: `Name: ${name}\nEmail: ${email}\nComplaint: ${complaint}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Complaint sent successfully!');
    });
});

// Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});









