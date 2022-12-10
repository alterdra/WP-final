import React, { useState, useEffect } from 'react';
import { Box, Button, Menu, MenuItem, Typography, List, ListItem, ListItemText, Select, FormControl, InputLabel } from '@mui/material';
import '../../css/LearnSets.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const Test = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [learnSets, setlearnSets] = useState([]);
    const [testRecords, setTestRecords] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [amount, setAmount] = useState(1);
    
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

    const findLearnSets = async () => {
        const { data: { msg, contents } } = await instance.get('/lectures');
        setlearnSets(contents.map((item) => item.name));
    };

    const findTestRecords = async () => {
        const { data: { msg, contents } } = await instance.get('/tests');
        setTestRecords(contents);
    }

    const deleteTestRecord = async (id) => {
        await instance.delete('/test', { data: { id } });
        await findTestRecords();
    }

    const navigate = useNavigate();
    const navigateToCards = (name, amount) => {
        navigate('/test/' + name, { state: { amount : amount }});
    };

    useEffect(() => {
        findLearnSets();
    }, []);

    useEffect(() => {
        findTestRecords();
    }, []);

    const displayTest = () => {
        return (
            testRecords.map((test) => (
                <Box key={uuidv4()}>
                    <Typography>{test.lecture}</Typography>
                    <Typography>{test.score}</Typography>
                    <Button onClick={() => deleteTestRecord(test.id)}>刪除紀錄</Button>
                </Box>
            ))
        )
    };

    return (
        <>
            <Typography>歷史成績</Typography>
            {testRecords.length !== 0 ? displayTest() : <Typography>目前還沒有成績喔...</Typography>}
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
                        defaultValue={1}
                        value={amount}
                        label="Amount"
                        onChange={handleAmountChange}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={() => navigateToCards(learnSets[selectedIndex], amount)}>確定</Button>
            </Box>
        </>
    );
}

export default Test;