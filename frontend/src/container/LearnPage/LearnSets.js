import { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import SetModal from '../../components/modals/SetModal';
import '../../css/LearnSets.css'
import axios from 'axios'
import FolderSpecialRoundedIcon from '@mui/icons-material/FolderSpecialRounded';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const LearnSets = () => {
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

    const navigate = useNavigate();
    const navigateToCards = (name) => {
        navigate('/learnSets/' + name);
    }

    useEffect(() => {
        findLearnSets();
    }, []);

    return (
        <>
            <Button onClick={() => (setShowSetModal(true))}>
                <CreateNewFolderIcon />
                建立學習集
            </Button>
            <SetModal 
                label="學習集名稱" 
                description="請輸入新學習集名稱"
                name={setName}
                changeName={changeSetName}
                createFunc={createLearnSet}
                showCreate={showSetModal}
                handleClose={handleClose}
            />
            <div className='learnsetsContainer'>
                {
                    learnSets.map(item => (
                        <>
                            <div className='learnSet' key={uuidv4()} >
                                <FolderSpecialRoundedIcon 
                                    className='folderIcon' 
                                    onClick={() => navigateToCards(item.name)}
                                />
                                <DeleteIcon 
                                    className='delete'
                                    onClick={() => handleRemoveSet(item.name)} 
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

export default LearnSets;