const express = require('express');
const logger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = 3000;


app.use(express.json());

app.use(logger);

app.use('/students', studentRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Student Management REST API');
});

app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});