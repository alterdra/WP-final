import React, { useState, useEffect } from 'react';
import { Box, Button, Menu, MenuItem, Typography, List, ListItem, ListItemText, Select, FormControl, InputLabel } from '@mui/material';
import '../../css/LearnSets.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const Test = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [learnSets, setlearnSets] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [amount, setAmount] = useState(0);
    
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }

    const findLearnSets = async() => {
        const { data: { msg, contents } } = await instance.get('/lectures');
        setlearnSets(contents.map((item) => item.name));
    };

    const navigate = useNavigate();
    const navigateToCards = (name) => {
        navigate('/test/' + name);
    };

    useEffect(() => {
        findLearnSets();
    }, []);

    return (
        <>
            <Box>
                <Typography>選擇要考試的學習集</Typography>
                <List component="nav" aria-label="Device settings">
                    <ListItem
                      button
                      aria-haspopup="true"
                      aria-controls="lock-menu"
                      aria-label="選擇學習集"
                      onClick={handleClickListItem}
                    >
                        <ListItemText
                            primary="學習集"
                            secondary={learnSets[selectedIndex]}
                        />
                    </ListItem>
                </List>
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {learnSets.map((option, index) => (
                        <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">題數</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={amount}
                        label="Amount"
                        onChange={handleAmountChange}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={35}>35</MenuItem>
                        <MenuItem value={40}>40</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={() => navigateToCards(learnSets[selectedIndex], amount)}>確定</Button>
            </Box>
        </>
    );
}

export default Test;