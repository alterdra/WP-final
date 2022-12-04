import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper } from '@mui/material';

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const Cards = () => {
    const [vocab, setVocab] = useState("");
    const [lecture, setLecture] = useState("");
    const [cards, setCards] = useState([]);

    console.log(cards)

    const changeVocab = (event) => { setVocab(event.target.value) };
    const changeLecture = (event) => { setLecture(event.target.value) };

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