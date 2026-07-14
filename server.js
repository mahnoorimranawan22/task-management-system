const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');

// Load environment variables matching local configuration context file parameters
dotenv.config({ path: './server/.env' });

// Initialize express engine instantiation logic profile tracking
const app = express();

// Activate core system middleware engines
app.use(cors()); // Allow cross-origin communication metrics exchanges
app.use(express.json()); // Body parser system to natively read application/json payload formats
app.use(logger); // Apply request activity terminal auditor loggers

// Establish Database connection mappings immediately prior to exposing interface endpoints
connectDB();

// Import discrete route routers mapping tracking layers
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Associate operational structural routes into baseline endpoint paths tracking spaces
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// General catch-all root server validation fallback ping configuration framework check
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Task Manager System Core API Gateway Running smoothly.' });
});

// Configure fallback global application error boundary handling configurations mapping routes
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Target routing point or asset context could not be located inside system definitions' });
});

// Expose operational deployment port mapping contexts tracking configuration bounds
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`[System Active] Server running in [${process.env.NODE_ENV}] deployment scope on port address: ${PORT}`);
});