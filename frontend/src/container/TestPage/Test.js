import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import '../../css/LearnSets.css'
import axios from 'axios'
import FolderSpecialRoundedIcon from '@mui/icons-material/FolderSpecialRounded';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const Test = () => {
    const [learnSets, setlearnSets] = useState([]);
    
    const findLearnSets = async() => {
        const { data: { msg, contents } } = await instance.get('/lectures');
        setlearnSets(contents);
    }

    const navigate = useNavigate();
    const navigateToCards = (name) => {
        navigate('/test/' + name);
    }

    useEffect(() => {
        findLearnSets();
    }, []);

    return (
        <>
            <div className='learnsetsContainer'>
                {
                    learnSets.map(item => (
                        <>
                            <div className='learnSet' key={uuidv4()} >
                                <FolderSpecialRoundedIcon 
                                    className='folderIcon' 
                                    onClick={() => navigateToCards(item.name)}
                                />
                                <Box className='name'>{item.name}</Box>
                            </div>
                        </>
                    ))
                }
            </div>
        </>
    );
}

export default Test;