import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';

import styles from './NotFoundPage.module.css';

const NotFoundPage: FC = () => {
  return (
    <Container maxWidth="sm" className={styles.container}>
      <Paper elevation={3} className={styles.paper} sx={{ bgcolor: '#fff' }}>
        <Typography
          variant="h1"
          component="div"
          sx={{
            fontSize: '6rem',
            fontWeight: 800,
            color: '#000',
            mb: 2,
          }}
        >
          404
        </Typography>

        <Typography variant="h4" gutterBottom sx={{ mb: 1, color: '#222' }}>
          Page Not Found
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, color: '#555' }}>
          Sorry, the page you are looking for does not exist or has been moved.
        </Typography>

        <Button
          component={RouterLink}
          to="/products"
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          sx={{
            bgcolor: '#000',
            color: '#fff',
            '&:hover': { bgcolor: '#222' },
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          Go to Products
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;
