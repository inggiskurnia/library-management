require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./models');
const bookRoutes = require('./routes/bookRoutes');
const memberRoutes = require('./routes/memberRoutes');
const borrowingRoutes = require('./routes/borrowingRoutes');

app.use(express.json());

app.use('/books', bookRoutes);
app.use('/member', memberRoutes)
app.use('/borrowing', borrowingRoutes)

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch(err => {
    console.error('Database sync error:', err);
});
