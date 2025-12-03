import { useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery, useDeleteProductMutation } from '@/features/api/apiSlice.ts';
import type { Product } from '@/typings';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const ProductsPage: FC = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetProductsQuery(30);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          <Skeleton width="40%" />
        </Typography>
        <Skeleton variant="rectangular" height={50} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={400} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert
        severity="error"
        sx={{ m: 3, bgcolor: '#fff', color: '#000', border: '1px solid #ccc' }}
      >
        Failed to load products.
      </Alert>
    );
  }

  const products: Product[] = data?.products || [];

  const handleDeleteClick = (id: number) => {
    setProductToDeleteId(id);
    setDeleteDialogOpen(true);
    setDeleteError(null);
  };

  const handleConfirmDelete = async () => {
    if (productToDeleteId) {
      try {
        await deleteProduct(productToDeleteId).unwrap();
        setDeleteDialogOpen(false);
      } catch {
        setDeleteError('Error deleting product.');
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>
          📦 Products Management ({data?.total || 0})
        </Typography>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          sx={{
            bgcolor: '#000',
            color: '#fff',
            '&:hover': { bgcolor: '#222' },
            fontWeight: 600,
            letterSpacing: 1,
          }}
          onClick={() => navigate('/products/create')}
        >
          Add Product
        </Button>
      </Box>

      {deleteError && (
        <Alert
          severity="error"
          sx={{ mb: 2, bgcolor: '#fff', color: '#d32f2f', border: '1px solid #d32f2f' }}
        >
          {deleteError}
        </Alert>
      )}

      <TableContainer component={Paper} elevation={2} sx={{ bgcolor: '#fff' }}>
        <Table stickyHeader aria-label="products table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 80, color: '#000', fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ color: '#000', fontWeight: 700 }}>Title</TableCell>
              <TableCell sx={{ color: '#000', fontWeight: 700 }}>Category</TableCell>
              <TableCell align="right" sx={{ color: '#000', fontWeight: 700 }}>
                Price
              </TableCell>
              <TableCell align="center" sx={{ color: '#000', fontWeight: 700 }}>
                In stock
              </TableCell>
              <TableCell align="center" sx={{ width: 150, color: '#000', fontWeight: 700 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                hover
                sx={{ bgcolor: '#fff', '&:hover': { bgcolor: '#f5f5f5' } }}
              >
                <TableCell sx={{ color: '#000' }}>{product.id}</TableCell>
                <TableCell sx={{ color: '#000' }}>{product.title}</TableCell>
                <TableCell sx={{ color: '#000' }}>{product.category}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: '#000' }}>
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell align="center" sx={{ color: '#000' }}>
                  {product.stock}
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <IconButton
                      sx={{
                        color: '#000',
                        bgcolor: '#fff',
                        border: '1px solid #000',
                        '&:hover': { bgcolor: '#f5f5f5', borderColor: '#222' },
                        minWidth: 36,
                        minHeight: 36,
                      }}
                      onClick={() => navigate(`/products/edit/${product.id}`)}
                    >
                      <EditIcon sx={{ fontSize: 18 }} />
                    </IconButton>

                    <IconButton
                      sx={{
                        color: '#fff',
                        bgcolor: '#000',
                        border: '1px solid #000',
                        '&:hover': { bgcolor: '#222', borderColor: '#222' },
                        minWidth: 36,
                        minHeight: 36,
                      }}
                      onClick={() => handleDeleteClick(product.id)}
                      disabled={isDeleting}
                    >
                      <DeleteIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle sx={{ color: '#000', bgcolor: '#fff' }}>Confirm Deletion</DialogTitle>
        <DialogContent sx={{ bgcolor: '#fff' }}>
          <Typography sx={{ color: '#000' }}>
            Are you sure you want to delete the product with ID: {productToDeleteId}?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#fff' }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={isDeleting}
            variant="outlined"
            sx={{
              color: '#000',
              borderColor: '#000',
              '&:hover': { bgcolor: '#f5f5f5', borderColor: '#222' },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            disabled={isDeleting}
            startIcon={isDeleting ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
            sx={{
              bgcolor: '#000',
              color: '#fff',
              '&:hover': { bgcolor: '#222' },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsPage;
