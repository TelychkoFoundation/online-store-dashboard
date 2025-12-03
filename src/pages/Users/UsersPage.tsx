import { useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery, useDeleteUserMutation } from '@/features/api/apiSlice.ts';
import type { User } from '@/typings';

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
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UsersPage: FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetUsersQuery(30);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState<number | null>(null);
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
        Failed to load users
      </Alert>
    );
  }

  const users: User[] = data?.users || [];

  const handleDeleteClick = (id: number) => {
    setUserToDeleteId(id);
    setDeleteDialogOpen(true);
    setDeleteError(null);
  };

  const handleConfirmDelete = async () => {
    if (userToDeleteId) {
      try {
        await deleteUser(userToDeleteId).unwrap();
        setDeleteDialogOpen(false);
      } catch {
        setDeleteError('Error deleting user.');
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>
          👤 Users Management ({data?.total || 0})
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          sx={{
            bgcolor: '#000',
            color: '#fff',
            '&:hover': { bgcolor: '#222' },
            fontWeight: 600,
            letterSpacing: 1,
          }}
          onClick={() => navigate('/users/create')}
        >
          Add User
        </Button>
      </Box>

      {deleteError && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
            bgcolor: '#fff',
            color: '#d32f2f',
            border: '1px solid #d32f2f',
          }}
        >
          {deleteError}
        </Alert>
      )}

      <TableContainer component={Paper} elevation={2} sx={{ bgcolor: '#fff' }}>
        <Table stickyHeader aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 60, color: '#000', fontWeight: 700 }}>Photo</TableCell>
              <TableCell sx={{ color: '#000', fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ color: '#000', fontWeight: 700 }}>Username</TableCell>
              <TableCell sx={{ color: '#000', fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ color: '#000', fontWeight: 700 }}>Phone</TableCell>
              <TableCell align="center" sx={{ width: 150, color: '#000', fontWeight: 700 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                hover
                sx={{ bgcolor: '#fff', '&:hover': { bgcolor: '#f5f5f5' } }}
              >
                <TableCell>
                  <Avatar alt={`${user.firstName} ${user.lastName}`} src={user.image} />
                </TableCell>
                <TableCell sx={{ color: '#000' }}>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell sx={{ color: '#000' }}>{user.username}</TableCell>
                <TableCell sx={{ color: '#000' }}>{user.email}</TableCell>
                <TableCell sx={{ color: '#000' }}>{user.phone}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <IconButton
                      onClick={() => navigate(`/users/edit/${user.id}`)}
                      sx={{
                        color: '#000',
                        bgcolor: '#fff',
                        border: '1px solid #000',
                        '&:hover': { bgcolor: '#f5f5f5', borderColor: '#222' },
                        minWidth: 36,
                        minHeight: 36,
                      }}
                    >
                      <EditIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteClick(user.id)}
                      disabled={isDeleting}
                      sx={{
                        color: '#fff',
                        bgcolor: '#000',
                        border: '1px solid #000',
                        '&:hover': { bgcolor: '#222', borderColor: '#222' },
                        minWidth: 36,
                        minHeight: 36,
                      }}
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
            Are you sure you want to delete the user with ID: {userToDeleteId}?
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

export default UsersPage;
