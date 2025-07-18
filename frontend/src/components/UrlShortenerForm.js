import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import axios from "axios";

const MAX_FIELDS = 5;
const BACKEND_URL = "http://localhost:5000";

export default function UrlShortenerForm() {
  const [inputs, setInputs] = useState(
    Array(MAX_FIELDS).fill({ url: "", validity: "", shortcode: "" })
  );
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const isValidUrl = (url) =>
    /^https?:\/\/[^\s$.?#].[^\s]*$/gm.test(url.trim());

  const handleSubmit = async () => {
    setError("");
    setResults([]);
    const promises = [];

    for (let i = 0; i < MAX_FIELDS; i++) {
      const { url, validity, shortcode } = inputs[i];

      if (!url.trim()) continue; // Skip empty rows
      if (!isValidUrl(url)) {
        setError(`Invalid URL at Row ${i + 1}`);
        return;
      }

      const payload = { url };
      if (validity) payload.validity = parseInt(validity);
      if (shortcode) payload.shortcode = shortcode;

      promises.push(
        axios
          .post(`${BACKEND_URL}/shorturls`, payload)
          .then((res) => res.data)
          .catch((err) => ({ error: err.response?.data?.error || "Error" }))
      );
    }

    const responses = await Promise.all(promises);
    setResults(responses);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shorten up to 5 URLs
      </Typography>
      <Grid container spacing={2}>
        {inputs.map((input, i) => (
          <Grid item xs={12} key={i}>
            <Paper elevation={2} style={{ padding: "1rem" }}>
              <Typography variant="subtitle2">URL {i + 1}</Typography>
              <TextField
                label="Long URL"
                fullWidth
                margin="dense"
                value={input.url}
                onChange={(e) => handleChange(i, "url", e.target.value)}
              />
              <TextField
                label="Validity (mins)"
                type="number"
                margin="dense"
                value={input.validity}
                onChange={(e) => handleChange(i, "validity", e.target.value)}
                style={{ marginRight: "1rem" }}
              />
              <TextField
                label="Custom Shortcode"
                margin="dense"
                value={input.shortcode}
                onChange={(e) => handleChange(i, "shortcode", e.target.value)}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: "1rem" }}
      >
        Shorten URLs
      </Button>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {results.length > 0 && (
        <Paper elevation={3} style={{ padding: "1rem", marginTop: "2rem" }}>
          <Typography variant="h6">Results</Typography>
          {results.map((res, i) => (
            <div key={i}>
              {res.shortLink ? (
                <p>
                  <strong>Short URL:</strong>{" "}
                  <a href={res.shortLink} target="_blank" rel="noreferrer">
                    {res.shortLink}
                  </a>{" "}
                  <br />
                  <strong>Expires at:</strong> {res.expiry}
                </p>
              ) : (
                <Alert severity="error">{res.error}</Alert>
              )}
              <hr />
            </div>
          ))}
        </Paper>
      )}
    </>
  );
}
