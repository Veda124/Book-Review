var express = require('express');
require('dotenv').config(); //for passwords 
const connectDB = require('./utils/db');
const authRoutes = require('./routes/authRoutes'); // ✅ import routes
const bookRoutes = require('./routes/bookRoutes'); // ✅ import routes
const reviewRoutes = require('./routes/reviewRoutes'); // ✅ import routes

var app = express();
const port = process.env.PORT || 5000;
//DDB connected
connectDB();

// ✅ middleware to parse JSON
app.use(express.json());

// ✅ called auth routes
app.use('/', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', reviewRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
