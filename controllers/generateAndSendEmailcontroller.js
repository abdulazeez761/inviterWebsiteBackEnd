const nodemailer = require('nodemailer');
const qr = require('qr-image');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./model/dataBase.db');
exports.generateAndSendEmail = async (req, res) => {
    const userInfo = req.body;
    const sql = `
        INSERT INTO users (username, company,email, phone, job_title, date)
        VALUES (?, ?, ?, ?, ?, ? )
    `;

    db.all(`SELECT * FROM users WHERE email = ?`, [userInfo.email], (err, rows) => {
        if (rows.length == 0) {
            db.run(sql, [userInfo.name, userInfo.company, userInfo.email, userInfo.phone, userInfo.JobTitle, userInfo.date], function (err) {
                if (err) {
                    return console.error(err.message);
                }
            });
        }
    });


    const jsonString = JSON.stringify(userInfo);
    let cleanedString = jsonString
        .replace(/[\{\}\"]/g, '')
        .replace(/,/g, ',\n')
        .replace(/:/g, ': ');
    const qrCode = qr.image(cleanedString, { type: 'png' });

    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your email provider here
        auth: {
            user: 'abd828981@gmail.com',
            pass: 'ucyt swab mnhk xxkh',
        },
    });

    // Send an email with the QR code embedded in the HTML content
    const mailOptions = {
        from: 'abd828981@gmail.com',
        to: userInfo.email,
        subject: 'Your QR Code',
        html: `
           
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VIENNA Advantage Launch Event</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      direction: ltr;
      text-align: left;
    }

    h1, p {
      color: #333333;
    }

    .event-details {
      margin-bottom: 20px;
    }

    .event-details p {
      font-weight: bold;
      color: black; /* Black color for dates */
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      background-color: #0704c7; /* Dark blue for button */
      color: #FFF;
      font-weight: bolder;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }

    .button:hover {
      background-color: #003366; /* Darker blue on hover */
    }

    .footer {
      margin-top: 20px;
      text-align: center;
      color: #888888;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>VIENNA Advantage Launch Event</h1>
    <div class="event-details">
      <p>Welcome to VIENNA Advantage Launch Event hosted by Vienna Advantage Arabia!</p>
      <p><span style="font-size: 1.2em;">Date:</span> <span style="font-weight: bold; color: black;">Sunday, November 26</span></p>
      <p><span style="font-size: 1.2em;">Time:</span> <span style="font-weight: bold; color: black;">08:00 AM – 03:15 PM</span></p>
    </div>
    <p>Your presence adds immense value and significance to this occasion.</p>
    <p>As you step into our world, we hope you feel the warmth of our hospitality and the excitement that fills the air.</p>
    <p>This event has been crafted with precision and passion, aiming to inspire, connect, and create lasting impressions.</p>
    <p>Your participation is not just a moment in our timeline; it's an essential part of our story.</p>
    <p>Your insights, experiences, and interactions will color this event and make it truly memorable.</p>
    <p>We encourage you to explore, engage, and savor every moment.</p>
    <p>The agenda is designed to offer you an insightful and delightful experience, brimming with opportunities to network, learn, and enjoy.</p>
    <p>Thank you for gracing us with your presence. Your contribution, whether through discussions, collaborations, or simply by being here, is invaluable to us.</p>
    <p>Welcome to a day filled with innovation, camaraderie, and the spirit of Vienna Advantage Arabia. We hope you leave not only inspired but also connected to the vision we proudly uphold.</p>
    <a href="#" class="button">Event Details</a>
    <p class="footer">Best regards,<br>The Vienna Advantage Arabia Team</p>
  </div>
</body>
</html>

        `,
        attachments: [
            {
                filename: 'qrcode.png',
                content: qrCode, // Provide the QR code data URL here
                encoding: 'base64',
            },
        ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Email could not be sent.' });
        } else {

            res.json({ message: 'Email sent successfully.' });
        }
    });

}


/*
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vienna Advantage Arabia Event</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #333333;
    }

    p {
      color: #555555;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      background-color: blue;
      color: #ffffff;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }

    .button:hover {
      background-color: #00308F;
    }

    .footer {
      margin-top: 20px;
      text-align: center;
      color: #888888;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Vienna Advantage Arabia Event</h1>
    <p>We are thrilled to announce the launch of our first-ever Vienna Advantage Arabia Event and are excited to have you join us.</p>
    <p>Your presence at this event is invaluable, and we can't wait to share this remarkable experience with you.</p>
    <p>If you encounter any issues or have questions, feel free to reach out.</p>
    <a href="https://invitationwebsitefrontend-production.up.railway.app/" class="button">Confirm Registration</a>
    <p class="footer">Looking forward to seeing you at the VA Arabia Event!<br>Best regards,</p>
  </div>
</body>
</html>
 */
