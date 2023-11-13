const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./model/dataBase.db');
const generateQRCode = require('./controllers/generateAndSendEmailcontroller')
const app = express();

app.use(bodyParser.json());
const corsOptions = {
    origin: 'https://invitationwebsitefrontend-production.up.railway.app/',
    credentials: true,
    optionSuccessStatus: 200,
    methods: ["GET", "POST"]
};

app.use(cors(corsOptions));
app.post('/generateQRCode', generateQRCode.generateAndSendEmail);

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        company TEXT,
        email TEXT,
        phone TEXT,
        job_title TEXT,
        date DATE
    )
`);
});


/*db.all(`SELECT * FROM users`, (err, rows) => {
   console.log(rows);
 });*/
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
