import { useState, useEffect } from 'react';
import { Box, Button, Menu, MenuItem, Typography, List, ListItem, ListItemText, Select, FormControl, InputLabel } from '@mui/material';
import '../../css/LearnSets.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

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
    
    const questionNum = [1, 5, 10, 15, 20];

    const handleLearnSetChange = (e) => setLearnSetName(e.currentTarget);
    const handleAmountChange = (e) => setAmount(e.target.value);
    const handleTestType = (e) => setTestType(e.target.value);

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
    const navigateToChoice = (name, amount) => {
        navigate('/test/choice/' + name, { state: { amount : amount }});
    };
    const navigateToCloze = (name, amount) => {
        navigate('/test/cloze/' + name, { state: { amount : amount }});
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
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">選擇要考試的學習集</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={learnSets.length > 0 ?learnSets[0]:""}
                        value={learnSetName}
                        label="Amount"
                        onChange={handleLearnSetChange}
                    >
                        {learnSets.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
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
                        {questionNum.map(item => <MenuItem value={item}>{item}</MenuItem>)}
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
                    if(testType === "選擇題")
                        navigateToChoice(learnSets[selectedIndex], amount);
                    else
                        navigateToCloze(learnSets[selectedIndex], amount);
                }}>確定</Button>
            </Box>
        </>
    );
}

export default Test;