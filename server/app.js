const express = require('express');
const authRoutes = require('./router/auth');
const userRoutes = require('./router/user');
const calendarRoutes = require('./router/calendar');
const weatherRoutes = require('./router/weather');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(helmet());

app.use(cors());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/calendar', calendarRoutes);
app.use('/weather', weatherRoutes);


const port = 5625;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
