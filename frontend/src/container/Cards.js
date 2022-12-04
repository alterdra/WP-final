import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Modal, Typography, Stack, Box } from '@mui/material';
import '../css/Cards.css'
import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const Cards = () => {
    // vocab
    const [vocab, setVocab] = useState("");
    const [lecture, setLecture] = useState("");
    const [cards, setCards] = useState([]);

    // learnset
    const [learnSet, setlearnSet] = useState([]);
    const [setName, setsetName] = useState('');
    const [showCreate, setshowCreate] = useState(false);

    const handleClose = () => {
        setshowCreate(false);
        setsetName('');
    };
    const changeSetName = (event) => { setsetName(event.target.value) };
    const changeVocab = (event) => { setVocab(event.target.value) };
    const changeLecture = (event) => { setLecture(event.target.value) };
    
    const createLearnSet = async () => {
        console.log(setName);
        handleClose();
        // Todo: send to DB and create a new learnset
        // setLearnset
    }

    const addCard = async( lecture, vocab ) => {
        console.log(lecture, vocab)
        const { data: { msg } } = await instance.post('/card',
            { 
                lecture,
                vocab,
                vocabID: 0
            }
        )
        console.log(msg);
    }

    const findCards = async() => {
        const { data: { msg, contents } } = await instance.get('/cards');
        setCards(contents);
    }

    const handleAdd = async () => {
        await addCard(lecture, vocab);
        await findCards();
    }
    const handleRemove = async () => {
        await instance.delete("/cards");
        await findCards();
    }

    useEffect(()=>{
        findCards();
    }, [])

    return (
        <>
            <Button onClick={() => (setshowCreate(true))}>建立學習集</Button>
            <Modal
                open={showCreate}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
            >
                <Box className='modal'>
                    <Box className='content'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            請輸入新學習集名稱
                        </Typography>
                        <TextField 
                            id="outlined-basic" 
                            label="學習集名稱" 
                            variant="outlined" 
                            value={setName} 
                            onChange={changeSetName} 
                        />
                        <Stack direction='row'>
                            <Button onClick={createLearnSet} >確定</Button>
                            <Button onClick={handleClose} >取消</Button>
                        </Stack>
                    </Box>
                </Box>
            </Modal>
            <TextField 
                id="outlined-basic" 
                label="單字名稱" 
                variant="outlined" 
                value={vocab} 
                onChange={changeVocab} 
            />
            <TextField 
                id="outlined-basic" 
                label="單元名稱" 
                variant="outlined" 
                value={lecture} 
                onChange={changeLecture} 
            />
            <Button onClick={handleAdd}>新增單字組</Button>
            <div>
                {
                    cards.map((item, index) => (
                        <Paper>{item.lecture} {item.vocab} {index}</Paper>
                    ))
                }
            </div>
            <Button onClick={handleRemove}>刪除所有單字組</Button>
        </>
    );
}
export default Cards;