import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import skillRoutes from './routes/skillRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
let PORT = parseInt(process.env.PORT, 10) || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/skillgraph';

// Middleware
app.use(cors());
app.use(express.json());

// Global connection state tracking
let dbConnected = false;
global.isMongoConnected = () => dbConnected;

// Connect to MongoDB
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    dbConnected = true;
    console.log(`⚡ MongoDB Connected Successfully to: ${MONGODB_URI}`);
  } catch (err) {
    dbConnected = false;
    console.warn(`⚠️ MongoDB connection notice: ${err.message}`);
    console.warn('ℹ️ Running in-memory database fallback mode.');
  }
};

// Mongoose connection event listeners
mongoose.connection.on('connected', () => { dbConnected = true; });
mongoose.connection.on('disconnected', () => { dbConnected = false; });
mongoose.connection.on('error', () => { dbConnected = false; });

// API Routes
app.use('/api/skills', skillRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);

// Health & DB status endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'SkillGraph API',
    mongoStatus: dbConnected ? 'Connected' : 'Disconnected (Fallback Active)',
    timestamp: new Date()
  });
});

// Serve static React production build files directly via Node.js Express
const clientBuildPath = path.join(__dirname, '../client/dist');
const publicBuildPath = path.join(__dirname, 'public');

app.use(express.static(clientBuildPath));
app.use(express.static(publicBuildPath));

// Catch-all route to render React single page app
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    const indexPath = path.existsSync(path.join(clientBuildPath, 'index.html'))
      ? path.join(clientBuildPath, 'index.html')
      : path.join(publicBuildPath, 'index.html');
    res.sendFile(indexPath);
  }
});

// Start Node.js Server with Port Fallback Listener
const startServer = (portToTry) => {
  const server = app.listen(portToTry, async () => {
    console.log(`\n======================================================`);
    console.log(`🚀 SkillGraph Node.js App running at http://localhost:${portToTry}`);
    console.log(`======================================================\n`);
    await connectDB();
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${portToTry} is in use. Trying port ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer(PORT);
