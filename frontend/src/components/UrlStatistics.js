import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Alert,
} from "@mui/material";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

export default function UrlStatistics() {
  const [shortcode, setShortcode] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/shorturls/${shortcode}`);
      setStats(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch stats");
      setStats(null);
    }
  };

  return (
    <Paper elevation={2} style={{ padding: "1rem" }}>
      <Typography variant="h6" gutterBottom>
        URL Statistics
      </Typography>
      <TextField
        label="Shortcode"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
        style={{ marginRight: "1rem" }}
      />
      <Button variant="contained" onClick={fetchStats}>
        Get Stats
      </Button>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {stats && (
        <div style={{ marginTop: "1rem" }}>
          <Typography variant="subtitle1">
            Original URL: {stats.url}
          </Typography>
          <Typography variant="body2">
            Created: {stats.createdAt} | Expires: {stats.expiry}
          </Typography>
          <Typography variant="body1">
            Total Clicks: {stats.totalClicks}
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Click History
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Referrer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.clicks.map((click, i) => (
                <TableRow key={i}>
                  <TableCell>{click.timestamp}</TableCell>
                  <TableCell>{click.referrer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Paper>
  );
}
