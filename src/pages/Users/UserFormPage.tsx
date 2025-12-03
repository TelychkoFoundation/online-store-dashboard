import { useState, useEffect, type FC, type ChangeEvent, type FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} from '@/features/api/apiSlice.ts';
import type { UserFormPayload } from '@/typings';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const INITIAL_STATE: UserFormPayload = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  phone: '',
  age: 0,
  gender: 'male',
};

const UserFormPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const userId = id ? parseInt(id) : null;
  const { data: userToEdit, isLoading: isFetching } = useGetUserByIdQuery(userId as number, {
    skip: !userId,
  });
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [formData, setFormData] = useState<UserFormPayload>(INITIAL_STATE);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const isEditMode = !!userId;
  const isLoading = isFetching || isCreating || isUpdating;

  const pageTitle = isEditMode ? `Edit User ID: ${userId}` : 'Create new user';

  useEffect(() => {
    if (isEditMode && userToEdit) {
      setFormData({
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
        email: userToEdit.email,
        username: userToEdit.username,
        phone: userToEdit.phone,
        age: userToEdit.age,
        gender: userToEdit.gender,
      });
    } else if (!isEditMode) {
      setFormData(INITIAL_STATE);
    }
  }, [isEditMode, userToEdit]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>,
  ) => {
    const { name, value } = e.target as { name: keyof UserFormPayload; value: string | number };
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value as string) || 0 : value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      gender: e.target.value as 'male' | 'female',
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    try {
      if (isEditMode && userId) {
        await updateUser({ id: userId, ...formData }).unwrap();
      } else {
        await createUser(formData).unwrap();
      }

      setIsSnackbarOpen(true);
      setTimeout(() => navigate('/users', { replace: true }), 1500);
    } catch {
      setSubmitError('Failed to save user. Please try again.');
    }
  };

  if (isEditMode && isFetching) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: '#000' }}>
        {pageTitle}
      </Typography>

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/users')}
        variant="outlined"
        sx={{
          mb: 3,
          color: '#000',
          borderColor: '#000',
          '&:hover': { bgcolor: '#f5f5f5', borderColor: '#222' },
        }}
      >
        To the list of users
      </Button>

      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 4,
          maxWidth: 600,
          bgcolor: '#fff',
          color: '#000',
          boxShadow: 2,
        }}
      >
        {submitError && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              bgcolor: '#fff',
              color: '#d32f2f',
              border: '1px solid #d32f2f',
            }}
          >
            {submitError}
          </Alert>
        )}

        <TextField
          label="First name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
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
          label="Last name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
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
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
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
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
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
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
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

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
            margin="normal"
            sx={{
              flex: 1,
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
          <FormControl fullWidth margin="normal" sx={{ flex: 1 }}>
            <InputLabel id="gender-label" sx={{ color: '#000' }}>
              Sex
            </InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleSelectChange}
              label="Sex"
              sx={{
                color: '#000',
                bgcolor: '#fff',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#222' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
              }}
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            sx={{
              bgcolor: '#000',
              color: '#fff',
              '&:hover': { bgcolor: '#222' },
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            {isEditMode ? 'Save' : 'Create'}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={1500}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setIsSnackbarOpen(false)}
          severity="success"
          sx={{
            width: '100%',
            bgcolor: '#fff',
            color: '#000',
            border: '1px solid #000',
            fontWeight: 600,
          }}
        >
          User successfully {isEditMode ? 'updated' : 'created'}!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserFormPage;
