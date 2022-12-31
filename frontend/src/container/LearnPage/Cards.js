import { useState, useEffect } from 'react';
import { Button, Paper, Card, Stack, Divider, styled, Checkbox, FormControlLabel, Switch, List, Fab } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CloseIcon from '@mui/icons-material/Close';
import CardModal from '../../components/modals/CardModal';
import '../../css/Cards.css'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useUserName } from '../hook/useUserName';
import Slide from '@mui/material/Slide';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '19.5vh',
}));

const ItemUnlearned = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '13.5vh',
}));

const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const Cards = () => {

    const { name } = useParams();
    const lecture = name;
    // console.log("Lecture name: " + lecture)

    const [vocabChinese, setVocabChinese] = useState("");
    const [vocabJapanese, setVocabJapanese] = useState("");
    const [cards, setCards] = useState([]);
    const [showCardModal, setShowCardModal] = useState(false);

    const [tileMode, setTileMode] = useState(true);
    const [cardIndex, setCardIndex] = useState(0);
    const [unlearnedMode, setMode] = useState(false);
    const { user } = useUserName();

    const [checked, setChecked] = useState(true);
    const [increaseOrDecrease, setIncreaseOrDecrease] = useState("");
    const handleChecked = (param) => {
        setChecked(false);
        setIncreaseOrDecrease(param);
    }
    
    const increaseCardIndex = () => {
        if(cardIndex === cards.length - 1) setCardIndex(0);
        else setCardIndex(prev => prev + 1);
    }
    const decreaseCardIndex = () => {
        if(cardIndex === 0) setCardIndex(cards.length - 1);
        else setCardIndex(prev => prev - 1);
    }

    const changeVocabJapanese = (event) => { setVocabJapanese(event.target.value) };
    const changeVocabChinese = (event) => { setVocabChinese(event.target.value) };

    const handleClose = () => {
        setShowCardModal(false);
        setVocabChinese('');
        setVocabJapanese('');
    };

    const addCard = async( Japanese, Chinese ) => {
        const { data: { msg } } = await instance.post('/card', { lecture, Japanese, Chinese, userName: user });
    }
    const findCards = async () => {
        const { data: { msg, contents } } = await instance.get('/cards', { params:  { lecture, userName: user } });
        // console.log(unlearnedMode);
        const tmpCards = 
        unlearnedMode ? contents.filter(ele => ele.Learned === false)
        : contents;

        if(cards.length > 0){
            let newIndex = tmpCards.findIndex(ele => ele._id === cards[cardIndex]._id);
            newIndex =  newIndex === -1 ? cardIndex >= tmpCards.length ? 0 : cardIndex : newIndex;
            setCardIndex(newIndex);
        }
        else {
            setCardIndex(0);
        }
        setCards(tmpCards);
    }
    const updateCardStatus = async (Japanese, Chinese) => {
        const { data: { msg } } = await instance.post('/learn', { lecture, Japanese, Chinese, userName: user } );
        console.log('changed success!');
        await findCards();
    }

    const handleAddCard = async () => {
        await addCard(vocabJapanese, vocabChinese);
        await findCards();
        handleClose();
    }
    const handleRemoveCard = async ( Japanese, Chinese ) => {
        const {data: { msg }} = await instance.delete("/cards", { data:  { lecture, Japanese, Chinese, userName: user }});
        // console.log(msg);
        await findCards();
        if(cardIndex === cards.length - 1) // Last card is removed;
            setCardIndex(prev => 0);
        // console.log(cardIndex)
    }

    useEffect(() => {
        console.log(unlearnedMode);
        findCards();
    }, [unlearnedMode]);

    
    useEffect(() => {
        if(checked == true)
            return;
        const wait = async() => {
            const delay = (n) => new Promise( r => setTimeout(r, n*1000));
            await delay(0.2);
            setChecked(true);
            if(increaseOrDecrease === "increase")
                increaseCardIndex();
            else if(increaseOrDecrease === "decrease")
                decreaseCardIndex();
            else if(increaseOrDecrease === "remove")
                handleRemoveCard(
                    cards[cardIndex].Japanese, 
                    cards[cardIndex].Chinese
                );
            else if(increaseOrDecrease === "update")
                updateCardStatus(
                    cards[cardIndex].Japanese, 
                    cards[cardIndex].Chinese
                );
        }
        wait();
    }, [checked])

    const navigate = useNavigate();
    const navigateToLearnSets = () => {
        navigate('/learnSets');
    }

    // function stopBubbling(e) {
    //     e = window.event || e;
    //     if (e.stopPropagation) {
    //         e.stopPropagation();
    //     } else {
    //         e.cancelBubble = true;   //ie
    //     }
    // }
    // console.log(checked, increaseOrDecrease);

    return (
        <>
            {!tileMode ? <div>貼心提醒：點選單字卡後，會啟用並排模式喔~</div>
            :<div>貼心提醒：點選單字卡後，會啟用單字卡循環模式喔~</div>}
            <List className='lectureName'>
                <ListItem >
                    <ListItemAvatar>
                    <Avatar>
                        <LocalLibraryIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`課程：${lecture}`} />
                </ListItem>
                <ListItem>
                    <Fab variant="extended" onClick={navigateToLearnSets}>
                        <ArrowBackIcon sx={{ mr: 1 }} />
                        回到上一頁
                    </Fab>
                </ListItem>
                <ListItem>
                    <Fab variant="extended" onClick={() => (setShowCardModal(true))}>
                        <AddIcon sx={{ mr: 1 }} />
                        新增單字組
                    </Fab>
                </ListItem>
                <ListItem>
                    <FormControlLabel control={<Switch checked={unlearnedMode} onClick={() => setMode(prev => !prev)}/>} label="顯示未學字卡" />
                </ListItem>
            </List>
            
            <CardModal 
                description="請輸入欲新增單字名稱"
                label1="單字日文名稱" label2="單字中文名稱"
                name1={vocabJapanese} name2={vocabChinese}
                changeName1={changeVocabJapanese} changeName2={changeVocabChinese}
                handleAddCard={handleAddCard}
                showCreate={showCardModal}
                handleClose={handleClose}
            />
            {tileMode ?
                <div className='cardContainer'>
                    {
                        cards.map((item, index) => (
                            <div className='cardWrapper'>
                                <Card 
                                    key={uuidv4()} 
                                    className='card'
                                    elevation={2}
                                    onClick={() => { 
                                        setTileMode(!tileMode);
                                        setCardIndex(prev => index);
                                    }}
                                >
                                    <div className='vocab'>{item.Japanese} | {item.Chinese}</div>
                                    <div className='index'>{index}</div>
                                    <CloseIcon
                                        className='close'
                                        onClick={event => {
                                            handleRemoveCard(item.Japanese, item.Chinese);
                                            event.stopPropagation();
                                        }}
                                    />
                                    <Checkbox
                                        className='learned'
                                        icon={item.Learned ? <BookmarkIcon style={{ color: 'lime' }}/> : <BookmarkBorderIcon style={{ color: 'gray' }}/>}
                                        checkedIcon={item.Learned ? <BookmarkBorderIcon style={{ color: 'gray' }} /> : <BookmarkIcon style={{ color: 'lime' }}/>}
                                        onClick={event => {
                                            updateCardStatus(item.Japanese, item.Chinese);
                                            event.stopPropagation();
                                        }}
                                    />
                                </Card>
                            </div>
                        ))
                    }
                </div>
            : 
                cards.length > 0 ? 
                <div className='oneCardContainer'>
                    {
                        <div>
                            <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
                                <Card 
                                    className='oneCard' 
                                    elevation={2}
                                    onClick={() => { 
                                        setTileMode(!tileMode);
                                        setCardIndex(prev => 0);
                                    }}
                                >
                                    <div className='oneVocab'>{cards[cardIndex].Japanese} | {cards[cardIndex].Chinese}</div>
                                    <div className='index'>{cardIndex}</div>
                                </Card>
                            </Slide>
                            <Stack
                                direction="row"
                                divider={<Divider orientation="vertical" flexItem />}
                                justifyContent="center"
                                spacing={2}
                                flexWrap="wrap"
                            >
                                {!unlearnedMode ?
                                <>
                                    <Item className='nextCard' onClick={() => handleChecked("decrease")}>上個單字卡</Item>
                                    <Item className='removeCard' onClick={() => handleChecked("remove")}>刪除這張單字卡</Item>
                                    <Item className='nextCard' onClick={() => handleChecked("increase")}>下個單字卡</Item>
                                </>
                                :<>
                                    <ItemUnlearned className='nextCard' onClick={() => handleChecked("decrease")}>上個單字卡</ItemUnlearned>
                                    <ItemUnlearned className='removeCard' onClick={() => handleChecked("remove")}>刪除這張單字卡</ItemUnlearned>
                                    <ItemUnlearned className='learnCard' onClick={() => handleChecked("update")}>我學會了</ItemUnlearned>
                                    <ItemUnlearned className='nextCard' onClick={() => handleChecked("increase")}>下個單字卡</ItemUnlearned>
                                </>}
                                    
                                
                                
                                
                            </Stack>
                        </div>
                    }
                </div> : 
                <div>
                    🥳恭喜你學完所有單字🥳
                    <Button onClick={() => setTileMode(true)}>回並排模式</Button>
                </div>
            }
        </>
        
    )
}

export default Cards;