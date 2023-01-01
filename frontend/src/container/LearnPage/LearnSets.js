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
import { useUserName } from '../hook/useUserName';
import { ListItem, Fab, Paper } from '@mui/material';
import NavBar from '../../components/NavBar';
import { useAlert } from 'react-alert'

import { styled } from '@mui/material/styles';
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})


const LearnSets = () => {
    const [setName, setSetName] = useState('');
    const [learnSets, setlearnSets] = useState([]);
    const [showSetModal, setShowSetModal] = useState(false);
    const { user } = useUserName();
    const alert = useAlert();
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
                User: user,
            }
        )
        if(msg ===  "The set already exists.")
            alert.error(<div style={{ padding: '5px' }}>{msg}</div>);
        else
            alert.success(<div style={{ padding: '5px' }}>{msg}</div>);
    }
    const findLearnSets = async() => {
        const { data: { msg, contents } } = await instance.get('/lectures',
            {
                params: {
                    User: user
                }
            }
        );
        setlearnSets(contents);
    }

    const createLearnSet = async () => {
        // Todo: send to DB and create a new learnset
        await addLearnSet();
        await findLearnSets();
        handleClose();
    }

    const handleRemoveSet = async (Name) => {
        const { data: { msg } } = await instance.delete("/lecture", { data: { Name, User: user } });
        console.log(msg)
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
        <Box sx={{ display: 'flex' }}>
            <NavBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <div className='allWrapper'>
                    <ListItem className='createIcon'>
                        <Fab className='Icon' variant="extended"  onClick={() => (setShowSetModal(true))}>
                            <CreateNewFolderIcon sx={{ mr: 1 }} />
                            建立學習集
                        </Fab>
                    </ListItem>
                    <SetModal 
                        label="學習集名稱" 
                        description="請輸入新學習集名稱"
                        name={setName}
                        changeName={changeSetName}
                        createFunc={createLearnSet}
                        showCreate={showSetModal}
                        handleClose={handleClose}
                    />
                    <ListItem className='learnsetsContainer'>
                        
                        {
                            learnSets.map(item => (
                                <div className='learnSetWrapper'>
                                    <Paper elevation={3} className='learnSet' key={uuidv4()} >
                                        <FolderSpecialRoundedIcon 
                                            className='folderIcon' 
                                            onClick={() => navigateToCards(item.name)}
                                        />
                                        <DeleteIcon 
                                            className='delete'
                                            onClick={() => handleRemoveSet(item.name)} 
                                        />
                                        
                                        <Box className='name'><div>{item.name}</div></Box>
                                    </Paper>
                                </div>
                            ))
                        }
                    </ListItem>
                </div>
            </Box>
        </Box>
    );
}

export default LearnSets;