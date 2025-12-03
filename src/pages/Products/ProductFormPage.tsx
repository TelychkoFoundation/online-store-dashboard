import { useState, useEffect, type FC, type ChangeEvent, type FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} from '@/features/api/apiSlice.ts';
import type { ProductMutationPayload } from '@/typings';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const INITIAL_STATE: ProductMutationPayload = {
  title: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
};

const ProductFormPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const productId = id ? parseInt(id) : null;
  const { data: productToEdit, isLoading: isFetching } = useGetProductByIdQuery(
    productId as number,
    { skip: !productId },
  );
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [formData, setFormData] = useState<ProductMutationPayload>(INITIAL_STATE);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const isEditMode = !!productId;
  const isLoading = isFetching || isCreating || isUpdating;

  const pageTitle = isEditMode ? `Edit product ID: ${productId}` : 'Create new product';

  useEffect(() => {
    if (isEditMode && productToEdit) {
      setFormData({
        title: productToEdit.title,
        description: productToEdit.description,
        price: productToEdit.price,
        stock: productToEdit.stock,
        category: productToEdit.category,
      });
    } else if (!isEditMode) {
      setFormData(INITIAL_STATE);
    }
  }, [isEditMode, productToEdit]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    try {
      if (isEditMode && productId) {
        await updateProduct({ id: productId, ...formData }).unwrap();
      } else {
        await createProduct(formData).unwrap();
      }

      setIsSnackbarOpen(true);
      setTimeout(() => navigate('/products', { replace: true }), 1500);
    } catch {
      setSubmitError('Failed to save product. Try again.');
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
        onClick={() => navigate('/products')}
        variant="outlined"
        sx={{
          mb: 3,
          color: '#000',
          borderColor: '#000',
          '&:hover': { bgcolor: '#f5f5f5', borderColor: '#222' },
        }}
      >
        To the list of products
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
          label="Title"
          name="title"
          value={formData.title}
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
          label="Category"
          name="category"
          value={formData.category}
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
          label="Price ($)"
          name="price"
          type="number"
          value={formData.price}
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
          label="In stock"
          name="stock"
          type="number"
          value={formData.stock}
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
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
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
          Product successfully {isEditMode ? 'updated' : 'created'}!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductFormPage;
