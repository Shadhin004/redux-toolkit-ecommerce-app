import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Stack direction={'row'} justifyContent={'flex-start'} spacing={2} >
                            <Button color='inherit' to="/" component={Link}>
                                Home
                            </Button>
                        </Stack>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Outlet />
        </Box>
    );
}