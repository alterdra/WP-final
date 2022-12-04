import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Modal, Typography, Stack, Box } from '@mui/material';
import CardModal from '../components/CardModal';
import SetModal from '../components/SetModal';
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
    const [setName, setSetName] = useState('');
    const [learnSets, setlearnSets] = useState([]);

    const [showCardModal, setShowCardModal] = useState(false);
    const [showSetModal, setShowSetModal] = useState(false);

    const changeSetName = (event) => { setSetName(event.target.value) };
    const changeVocab = (event) => { setVocab(event.target.value) };
    const changeLecture = (event) => { setLecture(event.target.value) };
    
    const handleClose = () => {
        setShowCardModal(false);
        setShowSetModal(false);
        setSetName('');
        setVocab('');
        setLecture('');
    };
    
    const addLearnSet = async() => {
        console.log(setName);
        const { data: { msg } } =  await instance.post('/lecture',
            {
                Name: setName,
            }
        )
        console.log(msg);
    }
    const findLearnSets = async() => {
        const { data: { msg, contents } } = await instance.get('/lectures');
        setlearnSets(contents);
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

    const createLearnSet = async () => {
        // Todo: send to DB and create a new learnset
        await addLearnSet();
        await findLearnSets();
        handleClose();
    }
    const handleAddCard = async () => {
        await addCard(lecture, vocab);
        await findCards();
        handleClose();
    }
    const handleRemoveCard = async () => {
        await instance.delete("/cards");
        await findCards();
    }

    useEffect(() => {
        findCards();
    }, []);
    useEffect(() => {
        findLearnSets();
    }, []);

    return (
        <>
            <Button onClick={() => (setShowSetModal(true))}>建立學習集</Button>
            <Button onClick={() => (setShowCardModal(true))}>新增單字組</Button>
            <SetModal 
                label="學習集名稱" 
                description="請輸入新學習集名稱"
                name={setName}
                changeName={changeSetName}
                createLearnSet={createLearnSet}
                showCreate={showSetModal}
                handleClose={handleClose}
            />
            <CardModal 
                description="請輸入欲新增單字及所屬單元"
                label1="單元名稱" label2="單字名稱"
                name1={lecture} name2={vocab}
                changeName1={changeLecture} changeName2={changeVocab}
                handleAddCard={handleAddCard}
                showCreate={showCardModal}
                handleClose={handleClose}
            />
            <div>
                {
                    learnSets.map((item, index) => (
                        <Paper>{item.name}</Paper>
                    ))
                }
            </div>
            <div>
                {
                    cards.map((item, index) => (
                        <Paper>{item.lecture} {item.vocab} {index}</Paper>
                    ))
                }
            </div>
            <Button onClick={handleRemoveCard}>刪除所有單字組</Button>
        </>
    );
}
export default Cards;