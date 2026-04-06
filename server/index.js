import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, 'data.json');

// Get all projects
app.get('/api/projects', (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// Update entire projects array
app.post('/api/projects', (req, res) => {
  try {
    const newProjects = req.body;
    fs.writeFileSync(dataPath, JSON.stringify(newProjects, null, 2));
    res.json({ success: true, message: 'Data saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

const settingsPath = path.join(__dirname, 'settings.json');

// Get settings
app.get('/api/settings', (req, res) => {
  try {
    const data = fs.readFileSync(settingsPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Failed to read settings' });
  }
});

// Update settings
app.post('/api/settings', (req, res) => {
  try {
    const newSettings = req.body;
    fs.writeFileSync(settingsPath, JSON.stringify(newSettings, null, 2));
    res.json({ success: true, message: 'Settings saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save settings' });
  }
});

const selectedPath = path.join(__dirname, 'selected.json');

app.get('/api/selected', (req, res) => {
  try {
    const data = fs.readFileSync(selectedPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    if (err.code === 'ENOENT') res.json([]);
    else res.status(500).json({ error: 'Failed to read selected' });
  }
});

app.post('/api/selected', (req, res) => {
  try {
    const newSelected = req.body;
    fs.writeFileSync(selectedPath, JSON.stringify(newSelected, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save selected' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend API Server running on http://localhost:${PORT}`);
});
