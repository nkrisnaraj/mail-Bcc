const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests only from this domain
    methods: ['GET', 'POST'],        // Allow specific HTTP methods
    allowedHeaders: ['Content-Type'], // Allow headers
}));
app.post('/api/send-email', async (req, res) => {
    const { subject, body, receiversMails } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nknkrisna@gmail.com', // Your email address
            pass: 'qbqs hadc zymr gbyc',   // Your email password or app-specific password
        },
    });

    const mailOptions = {
        from: 'nknkrisna@gmail.com',
        to: receiversMails,
        subject: subject,
        text: body,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully', info });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error });

    }

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
