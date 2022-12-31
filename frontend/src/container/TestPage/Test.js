import { useState, useEffect } from 'react';
import { Box, Button, Fab, MenuItem, Typography, List, ListItem, ListItemText, Select, FormControl, InputLabel } from '@mui/material';
import '../../css/LearnSets.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useUserName } from '../hook/useUserName';
import NavBar from '../../components/NavBar';
import '../../css/Test.css'

import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import HistoryIcon from '@mui/icons-material/History';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const Test = () => {
    const [learnSets, setlearnSets] = useState([]);
    const [testRecords, setTestRecords] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [learnSetName, setLearnSetName] = useState("");
    const [amount, setAmount] = useState(5);
    const [testType, setTestType] = useState("選擇題");
    const { user } = useUserName();
    
    const questionNum = [1, 5, 10, 15, 20];

    const handleLearnSetChange = (e) => {
        setLearnSetName(e.target.value);
        setSelectedIndex(learnSets.findIndex(ele=>ele === e.target.value));
    }
    const handleAmountChange = (e) => setAmount(e.target.value);
    const handleTestType = (e) => setTestType(e.target.value);

    const findLearnSets = async () => {
        const { data: { msg, contents } } = await instance.get('/lectures',
        {
            params: {
                User: user,
            }
        });
        setlearnSets(contents.map((item) => item.name));
    };

    const findTestRecords = async () => {
        const { data: { msg, contents } } = await instance.get('/tests', 
        {
            params: {
                User: user,
            }
        });
        setTestRecords(contents);
    }

    const deleteTestRecord = async (id) => {
        await instance.delete('/test', { data: { id, User: user } });
        await findTestRecords();
    }

    const navigate = useNavigate();
    const navigateToChoice = (name, amount) => {
        navigate('/test/choice/' + name, { state: { amount }});
    };
    const navigateToCloze = (name, amount) => {
        navigate('/test/cloze/' + name, { state: { amount }});
    };

    useEffect(() => {
        findLearnSets();
    }, []);

    useEffect(() => {
        findTestRecords();
    }, []);

    const displayTest = () => {
        return (
            <List className='record'>
                {testRecords.map((test) => (
                    <ListItem className='score' key={uuidv4()}>
                        <ListItemAvatar>
                        <Avatar>
                            <HistoryEduIcon/>
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={`課程: ${test.lecture}`} 
                            secondary={`分數: ${test.score}`}/>
                        <Fab variant="extended"  onClick={() => deleteTestRecord(test.id)}>
                            <DeleteIcon sx={{ mr: 1 }} />
                            刪除紀錄
                        </Fab>
                    </ListItem>
                ))}
            </List>
        )
    };

    return (
        <div className='testContainer'>
            <div className='scores'>
                <Box className='box'>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">選擇要考試的學習集</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // defaultValue={learnSets.length > 0 ?learnSets[0]:""}
                            value={learnSetName}
                            label="LearnSet"
                            onChange={handleLearnSetChange}
                        >
                            {learnSets.map(option => (
                                <MenuItem 
                                    key={uuidv4()} 
                                    value={option}
                                >
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                            {questionNum.map(item => 
                                <MenuItem 
                                    value={item}
                                    key={uuidv4()} 
                                >
                                    {item}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">考試方式</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue="填充題"
                            value={testType}
                            label="TestType"
                            onChange={handleTestType}
                        >
                            <MenuItem value="選擇題">選擇題</MenuItem>
                            <MenuItem value="填充題">填充題</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={() => {
                        if(learnSetName === "")
                            return;
                        if(testType === "選擇題")
                            navigateToChoice(learnSets[selectedIndex], amount);
                        else
                            navigateToCloze(learnSets[selectedIndex], amount);
                    }}>確定</Button>
                </Box>
                <br></br>
                <List className='history'>
                    <ListItem >
                        <ListItemAvatar>
                        <Avatar>
                            <HistoryIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="歷史成績" />
                    </ListItem>
                </List>
                
                {testRecords.length !== 0 ? displayTest()
                : <Typography>目前還沒有成績喔...</Typography>}
            </div>
        </div>
    );
}

export default Test;