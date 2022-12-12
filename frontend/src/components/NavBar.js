import { useNavigate } from 'react-router-dom';
import { Box, Stack, Paper } from '@mui/material';
import { styled } from "@mui/material/styles";
import '../css/NavBar.css'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette
        .mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const NavBar = () => {
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    }
    const navigateToLearnSets = () => {
        navigate('/learnSets');
    }
    const navigateToTest = () => {
        navigate('/test');
    }

    return (
        <div className='Header'>
            <Box>
            Some Logo
            </Box>
            <Stack direction="row" className='navIcon' spacing={5}>
                <Item onClick={navigateToHome}>Home</Item>
                <Item onClick={navigateToLearnSets}>Vocabulary</Item>
                <Item onClick={navigateToTest}>Test</Item>
            </Stack>
        </div>
    );
}

export default NavBar;