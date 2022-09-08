import { useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  Typography,
  ListItemButton,
  ListItem,
  Box,
  IconButton,
} from '@mui/material';
import { useSelector } from 'react-redux';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';

const Sidebar = () => {
  const user = useSelector((state: any) => state.user.value);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const sidebarWidth = 250;

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        width: sidebarWidth,
        height: '100vh',
        '& > div': {
          borderRight: 'none',
        },
      }}
    >
      <List
        disablePadding
        sx={{
          width: sidebarWidth,
          height: '100vh',
          backgroundColor: '#292929',
        }}
      >
        <ListItem>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" color="white" fontWeight={700}>
              {user.username}
            </Typography>
            <IconButton onClick={logout} color="primary">
              <LogoutOutlined fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
        <ListItemButton
          selected={pathname === '/chart/add'}
          component={Link}
          to="chart/add"
          sx={{
            pl: '20px',
          }}
        >
          <Typography
            variant="body2"
            color="white"
            fontWeight={700}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Chart Data
          </Typography>
        </ListItemButton>
        <ListItemButton
          selected={pathname === '/chart/display'}
          component={Link}
          to="chart/display"
          sx={{
            pl: '20px',
          }}
        >
          <Typography
            variant="body2"
            color="white"
            fontWeight={700}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Chart Display
          </Typography>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
