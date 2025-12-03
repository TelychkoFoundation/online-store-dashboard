import type { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';

import styles from './Sidebar.module.css';

const navLinks = [
  { to: '/products', label: 'Products', icon: InventoryIcon },
  { to: '/users', label: 'Users', icon: PeopleIcon },
];

const Sidebar: FC = () => {
  const location = useLocation();

  return (
    <nav className={styles.sidebar}>
      <List component="nav" className={styles.list}>
        {navLinks.map((link) => {
          const isActive =
            location.pathname === link.to || location.pathname.startsWith(link.to + '/');

          return (
            <ListItem key={link.to} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={NavLink}
                to={link.to}
                selected={isActive}
                sx={{
                  color: '#000',
                  bgcolor: isActive ? '#f5f5f5' : '#fff',
                  fontWeight: isActive ? 600 : 400,
                  '&:hover': {
                    bgcolor: '#f0f0f0',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#000' }}>
                  <link.icon />
                </ListItemIcon>
                <ListItemText
                  primary={link.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      color: '#000',
                      fontWeight: isActive ? 700 : 500,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </nav>
  );
};

export default Sidebar;
