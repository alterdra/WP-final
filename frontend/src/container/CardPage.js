import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import SetModal from '../components/SetModal';
import '../css/Cards.css'
import axios from 'axios'
import LearnSet from './LearnSet';
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const Cards = () => {
    const [setName, setSetName] = useState('');
    const [learnSets, setlearnSets] = useState([]);
    const [showSetModal, setShowSetModal] = useState(false);

    const changeSetName = (event) => { setSetName(event.target.value) };
    
    const handleClose = () => {
        setShowSetModal(false);
        setSetName('');
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

    const createLearnSet = async () => {
        // Todo: send to DB and create a new learnset
        await addLearnSet();
        await findLearnSets();
        handleClose();
    }

    const handleRemoveSet = async (Name) => {
        await instance.delete("/lecture", { data: { Name } });
        await findLearnSets();
    }

    useEffect(() => {
        findLearnSets();
    }, []);

    return (
        <>
            <Button onClick={() => (setShowSetModal(true))}>建立學習集</Button>
            <SetModal 
                label="學習集名稱" 
                description="請輸入新學習集名稱"
                name={setName}
                changeName={changeSetName}
                createFunc={createLearnSet}
                showCreate={showSetModal}
                handleClose={handleClose}
            />
            <div>
                {
                    learnSets.map((item, index) => (
                        <>
                            <LearnSet 
                                key={item.name}
                                lecture={item.name}
                                instance={instance}
                            />
                            <Button onClick={() => handleRemoveSet(item.name) }>刪除學習集</Button>
                        </>
                    ))
                }
            </div>
        </>
    );
}
export default Cards;