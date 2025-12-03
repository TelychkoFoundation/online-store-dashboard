import { useEffect, type FC, type ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app';
import { useGetProfileQuery } from '../features/api/apiSlice';
import { setProfile, logout } from '../features/auth/authSlice';
import { CircularProgress, Box, Typography } from '@mui/material';

interface RootInitializerProps {
  children: ReactNode;
}

const RootInitializer: FC<RootInitializerProps> = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const {
    data: profile,
    isLoading,
    isError,
    isFetching,
  } = useGetProfileQuery(undefined, { skip: !token });

  useEffect(() => {
    if (profile && !isLoading && !isFetching) {
      dispatch(setProfile(profile));
    }
  }, [profile, isLoading, isFetching, dispatch]);

  useEffect(() => {
    if (isError && token) {
      console.error('Token is invalid. Exit.');
      dispatch(logout());
    }
  }, [isError, token, dispatch]);

  if (token && (isLoading || isFetching)) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress sx={{ color: '#D31D33' }} />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading profile...
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
};

export default RootInitializer;
