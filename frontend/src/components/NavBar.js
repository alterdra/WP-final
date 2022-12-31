import { useNavigate } from 'react-router-dom';
import '../css/NavBar.css'
import { useUserName } from '../container/hook/useUserName';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import TranslateIcon from '@mui/icons-material/Translate';
import QuizIcon from '@mui/icons-material/Quiz';

const NavBar = () => {
    const { signedIn } = useUserName();

    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    }
    const navigateToLearnSets = () => {
        if(signedIn) navigate('/learnSets');
        else alert("Sign in to unlock the area.")
    }
    const navigateToTest = () => {
        if(signedIn) navigate('/test');
        else alert("Sign in to unlock the area.")
    }

    const text = {
        fontSize: 30,
    };
    return (
        <div className='wrapper'>
            <List className='navBox'>
                <ListItem className='navIcon' onClick={navigateToHome}>
                    <ListItemAvatar>
                    <Avatar>
                        <HomeIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primaryTypographyProps={{ style: text }} primary="Home" secondary="主頁" />
                </ListItem>
                <ListItem className='navIcon' onClick={navigateToLearnSets}>
                    <ListItemAvatar>
                    <Avatar>
                        <TranslateIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primaryTypographyProps={{ style: text }} primary="Vocabulary" secondary="單字卡" />
                </ListItem>
                <ListItem className='navIcon' onClick={navigateToTest}>
                    <ListItemAvatar>
                    <Avatar>
                        <QuizIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primaryTypographyProps={{ style: text }} primary="Test" secondary="考試區" />
                </ListItem>
            </List>
        </div>
    );
}

export default NavBar;