import { useState, useEffect, type FC, type FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { useLoginMutation, useGetProfileQuery } from '@/features/api/apiSlice.ts';
import type { RootState } from '@/app';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Paper, CircularProgress, Alert } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import styles from './LoginPage.module.css';

const LoginPage: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [loginUser, { isLoading, isError }] = useLoginMutation();

  const token = useSelector((state: RootState) => state.auth.token);

  const { data: profile } = useGetProfileQuery(undefined, { skip: !token });

  useEffect(() => {
    if (profile && token) {
      navigate('/products', { replace: true });
    }
  }, [profile, navigate, token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await loginUser({ username, password }).unwrap();
    } catch (err: unknown) {
      console.error('Login Error:', err);
    }
  };

  const errorMessage = isError ? 'Login error. Check your username and password.' : null;

  return (
    <div className={styles.container}>
      <Paper
        component="form"
        className={styles.form}
        onSubmit={handleSubmit}
        elevation={8}
        sx={{
          bgcolor: '#fff',
          color: '#000',
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          className={styles.heading}
          sx={{
            color: '#000',
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          Magasin Dashboard Login
        </Typography>

        {errorMessage && (
          <Alert
            severity="error"
            sx={{
              bgcolor: '#fff',
              color: '#d32f2f',
              border: '1px solid #d32f2f',
            }}
          >
            {errorMessage}
          </Alert>
        )}

        <TextField
          label="Username"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          fullWidth
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#000',
              bgcolor: '#fff',
              '& fieldset': { borderColor: '#000' },
              '&:hover fieldset': { borderColor: '#222' },
              '&.Mui-focused fieldset': { borderColor: '#000' },
            },
            '& .MuiInputLabel-root': {
              color: '#000',
            },
          }}
        />

        <TextField
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#000',
              bgcolor: '#fff',
              '& fieldset': { borderColor: '#000' },
              '&:hover fieldset': { borderColor: '#222' },
              '&.Mui-focused fieldset': { borderColor: '#000' },
            },
            '& .MuiInputLabel-root': {
              color: '#000',
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
          sx={{
            mt: 1,
            bgcolor: '#000',
            color: '#fff',
            '&:hover': { bgcolor: '#222' },
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
      </Paper>
    </div>
  );
};

export default LoginPage;
