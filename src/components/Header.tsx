import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@app/store.ts';
import { logout } from '@/features/auth/authSlice.ts';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

const Header: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: '#fff',
        borderBottom: '1px solid #eee',
        color: '#000',
      }}
    >
      <Toolbar disableGutters sx={{ minHeight: '60px', px: 4 }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            color: '#000',
            fontWeight: 700,
            textDecoration: 'none',
            flexGrow: 1,
            letterSpacing: 1,
          }}
        >
          MAGASIN DASHBOARD
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user && (
            <Typography
              variant="body2"
              sx={{
                color: '#444',
                mr: 2,
                fontWeight: 500,
              }}
            >
              Welcome, {user.firstName} {user.lastName}!
            </Typography>
          )}

          <IconButton
            onClick={handleLogout}
            sx={{
              color: '#000',
              bgcolor: '#f5f5f5',
              '&:hover': {
                bgcolor: '#e0e0e0',
              },
            }}
            aria-label="Logout"
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
