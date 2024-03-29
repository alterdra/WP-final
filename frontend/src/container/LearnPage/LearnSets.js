import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import instance from '../../api';
import { v4 as uuidv4 } from 'uuid';
import { Box, ListItem, Fab, Paper, styled } from '@mui/material';
import FolderSpecialRoundedIcon from '@mui/icons-material/FolderSpecialRounded';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUserName } from '../hook/useUserName';
import SetModal from '../../components/modals/SetModal';
import NavBar from '../../components/NavBar';
import Header from '../../components/Header';
import '../../css/LearnSets.css';
import '../../css/Homepage.css';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


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
            alert.error(<div style={{ padding: '5px' }}>此學習集已存在</div>);
        else
            alert.success(<div style={{ padding: '5px' }}>新增成功</div>);
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
            <div className="loginBar">
				<Header />
			</div>	
            <NavBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <div className='allWrapper'>
                    <ListItem className='createIcon'>
                        <Fab className='Icon' color='primary' variant="extended"  onClick={() => (setShowSetModal(true))}>
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
                        {learnSets.map(item => (
                            <div className='learnSetWrapper'>
                                <Paper elevation={3} className='learnSet' key={uuidv4()} >
                                    <FolderSpecialRoundedIcon 
                                        className='folderIcon' 
                                        onClick={() => navigateToCards(item.name)}
                                    />
                                    <DeleteIcon 
                                        className='deleteIcon'
                                        onClick={() => handleRemoveSet(item.name)} 
                                    />
                                    <Box className='name'>{item.name}</Box>
                                </Paper>
                            </div>
                        ))}
                    </ListItem>
                </div>
            </Box>
        </Box>
    );
}

export default LearnSets;