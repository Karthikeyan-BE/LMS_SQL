const express = require('express');
const env = require('dotenv');
const path = require('path');
const bookRoute = require('./Routes/bookRoute');
const userRoute = require('./Routes/userRoute');
const borrowRoute = require('./Routes/borrowRoute');
const fineRoute = require('./Routes/fineRoute');
const reservationRoute = require('./Routes/reservationRoute');
const cors = require('cors');
const { connectDB } = require('./Database/dbConnect');

env.config();
const app = express();
const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.ENVIRONMENT;


app.use(express.json());
app.use(cors());


app.use("/fine", fineRoute);
app.use("/books", bookRoute);
app.use("/users", userRoute);
app.use("/borrow", borrowRoute);
app.use("/reservations", reservationRoute);


if (ENVIRONMENT === 'PRODUCTION') {
  const __dirname1 = path.resolve();
  app.use(express.static(path.join(__dirname1, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname1, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`✅ Server is running on Port ${PORT}`);
});


connectDB();
