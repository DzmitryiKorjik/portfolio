import express from 'express';
import dotenv from 'dotenv';
import contactHandler from './api/contact.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// API Route for contact form
app.post('/api/contact', async (req, res) => {
    try {
        await contactHandler(req, res);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Clean URLs (without .html extension)
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/about', (_req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/projects', (_req, res) => res.sendFile(path.join(__dirname, 'project.html')));
app.get('/contact', (_req, res) => res.sendFile(path.join(__dirname, 'contact.html')));

// 404 handler
app.use((_req, res) => res.status(404).sendFile(path.join(__dirname, '404.html')));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
