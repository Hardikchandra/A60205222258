import React from 'react';
import { Container, Typography, Tabs, Tab, Box } from '@mui/material';
import UrlShortenerForm from './components/UrlShortenerForm';
import UrlStatistics from './components/UrlStatistics';

export default function App() {
  const [tab, setTab] = React.useState(0);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        URL Shortener Service
      </Typography>
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
        <Tab label="Shorten URLs" />
        <Tab label="View Stats" />
      </Tabs>
      <Box mt={4}>
        {tab === 0 && <UrlShortenerForm />}
        {tab === 1 && <UrlStatistics />}
      </Box>
    </Container>
  );
}