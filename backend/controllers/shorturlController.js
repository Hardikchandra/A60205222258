// controllers/shorturlController.js
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const store = require('../db/store');
const isValidUrl = require('../utils/validateUrl');

function generateShortcode() {
  return uuidv4().slice(0, 6);
}

exports.createShortUrl = (req, res) => {
  console.log("Received POST body:", req.body);
  const { url, validity = 30, shortcode } = req.body;
  if (!isValidUrl(url)) return res.status(400).json({ error: 'Invalid URL' });

  const code = shortcode || generateShortcode();
  if (store.has(code)) return res.status(400).json({ error: 'Shortcode already in use' });

  const expiry = moment().add(validity, 'minutes').toISOString();
  store.set(code, {
    url,
    createdAt: new Date().toISOString(),
    expiry,
    clicks: []
  });

  res.status(201).json({
    shortLink: `http://localhost:5000/${code}`,
    expiry
  });
};

exports.redirectToOriginal = (req, res) => {
  const { shortcode } = req.params;
  const entry = store.get(shortcode);
  if (!entry) return res.status(404).json({ error: 'Shortcode not found' });

  if (new Date() > new Date(entry.expiry)) {
    return res.status(410).json({ error: 'Link expired' });
  }

  entry.clicks.push({
    timestamp: new Date().toISOString(),
    referrer: req.get('Referrer') || 'Direct'
  });

  res.redirect(entry.url);
};

exports.getStats = (req, res) => {
  const { shortcode } = req.params;
  const entry = store.get(shortcode);
  if (!entry) return res.status(404).json({ error: 'Shortcode not found' });

  res.json({
    url: entry.url,
    createdAt: entry.createdAt,
    expiry: entry.expiry,
    totalClicks: entry.clicks.length,
    clicks: entry.clicks
  });
};
