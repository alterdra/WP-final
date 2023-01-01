import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserName } from '../container/hook/useUserName';
import { styled, useTheme } from '@mui/material/styles';
import Header from './Header';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import QuizIcon from '@mui/icons-material/Quiz';
import HomeIcon from '@mui/icons-material/Home';
import { useAlert } from 'react-alert';
import Logo from './Japan.svg';
import '../css/NavBar.css';

const MiniDrawer = () => {
    const drawerWidth = 200;
    const alert = useAlert();
    const { signedIn } = useUserName();
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    }
    const navigateToLearnSets = () => {
        if(signedIn) navigate('/learnSets');
        else alert.info(<div style={{ padding: '5px'}}>請先登入來解鎖</div>);
    }
    const navigateToTest = () => {
        if(signedIn) navigate('/test');
        else alert.info(<div style={{ padding: '5px'}}>請先登入來解鎖</div>);
    }
    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });
    
    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });
    
    const DrawerHeader = styled('div')(({ theme }) => ({
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));
    
    const AppBar = styled(MuiAppBar, {
      shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      background: '#73c2e3',
      ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }));
    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
          opacity: '75%',
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
          }),
          ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
          }),
        }),
    );
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
    <>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Header />
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <div className='icon-container'>
                    <img className='icon' src={Logo} alt='logo'/>
                </div>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <List>
                {[{name: '首頁', func: navigateToHome}, {name: '單字區', func: navigateToLearnSets}, 
                    {name: '考試區', func: navigateToTest}].map((item, index) => (
                <ListItem key={item.name} disablePadding sx={{ display: 'block' }} onClick={item.func}>
                    <Divider />
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            {index === 0 ? <HomeIcon /> : index === 1 ? <GTranslateIcon /> : <QuizIcon />}
                        </ListItemIcon>
                        <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                    {index === 2 && <Divider />}
                </ListItem>
                ))}
            </List>
        </Drawer>
    </>
    );
}

export default MiniDrawer;
