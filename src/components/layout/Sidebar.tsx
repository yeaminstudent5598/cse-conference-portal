import { List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Courses', path: '/courses' },
  { text: 'Categories', path: '/categories' },
  { text: 'Enrollments', path: '/enrollments' },
  { text: 'Users', path: '/users' },
  { text: 'Roles', path: '/roles' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Paper elevation={2} className="w-64 h-full fixed top-16 left-0 rounded-none bg-white border-r border-gray-200">
      <List className="pt-4">
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              className={location.pathname === item.path ? 'bg-blue-50 border-r-4 border-blue-600' : ''}
            >
              <ListItemText 
                primary={<span className="font-medium text-gray-700">{item.text}</span>} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Sidebar;