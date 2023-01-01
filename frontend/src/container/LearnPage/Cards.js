import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Paper, Card, Stack, Divider, styled, Checkbox, FormControlLabel, Switch, List,
    Fab, Slide, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CloseIcon from '@mui/icons-material/Close';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { useUserName } from '../hook/useUserName';
import CardModal from '../../components/modals/CardModal';
import '../../css/Cards.css';

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

    const [vocabChinese, setVocabChinese] = useState("");
    const [vocabJapanese, setVocabJapanese] = useState("");
    const [cards, setCards] = useState([]);
    const [showCardModal, setShowCardModal] = useState(false);

    const [tileMode, setTileMode] = useState(true);
    const [cardIndex, setCardIndex] = useState(0);
    const [unlearnedMode, setMode] = useState(false);
    const { user } = useUserName();
    const [disabled, setDisabled] = useState(false);

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
        const tmpCards = unlearnedMode ? contents.filter(ele => ele.Learned === false) : contents;

        if(cards.length > 0){
            let newIndex = tmpCards.findIndex(ele => ele._id === cards[cardIndex]._id);
            newIndex =  newIndex === -1 ? cardIndex >= tmpCards.length ? 0 : cardIndex : newIndex;
            setCardIndex(newIndex);
        }
        else 
            setCardIndex(0);
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
        await findCards();
        if(cardIndex === cards.length - 1) // Last card is removed;
            setCardIndex(0);
    }

    useEffect(() => {
        console.log(unlearnedMode);
        findCards();
    }, [unlearnedMode]);

    
    useEffect(() => {
        if(checked == true)
            return;
        const wait = async() => {
            const delay = (n) => new Promise(r => setTimeout(r, n*1000));
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

    useEffect(() => {
        if(!unlearnedMode && cards.filter(ele => ele.Learned === false).length === 0)
            setDisabled(true);
        else setDisabled(false);
        const wait = async() => {
            const delay = (n) => new Promise(r => setTimeout(r, n*1000));
            await delay(2);
            setTileMode(true);
            setMode(false);
        }
        if(cards.length === 0)
            wait();
    }, [cards])

    const navigate = useNavigate();
    const navigateToLearnSets = () => {
        navigate('/learnSets');
    }

    return (
        <>
            {tileMode ? <div style={{ marginTop: '18px' }}>貼心提醒：點選單字卡後，會啟用字卡循環模式喔~</div>
            : <div style={{ marginTop: '18px' }}>貼心提醒：點選單字卡後，會啟用字卡並排模式喔~</div>}
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
                    <FormControlLabel control={
                        <Switch 
                            checked={unlearnedMode} 
                            onClick={() => setMode(prev => !prev)}
                            disabled={disabled}
                        />
                    } label="顯示尚未學習的單字卡" />
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
                    {cards.map((item, index) => (
                        <Card 
                            key={uuidv4()} 
                            className='card'
                            elevation={2}
                            onClick={() => { 
                                setTileMode(!tileMode);
                                setCardIndex(index);
                            }}
                        >
                            <div className='vocab'>
                                <div className='vocab1'>{item.Japanese}</div>
                                <div className='vocab2'>{item.Chinese}</div>
                            </div>
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
                                sx={{bottom:'5px'}}
                                icon={item.Learned ? <BookmarkIcon style={{ color: 'rgba(75, 140, 201, 0.75)' }}/> : <BookmarkBorderIcon style={{ color: 'gray' }}/>}
                                checkedIcon={item.Learned ? <BookmarkBorderIcon style={{ color: 'gray' }} /> : <BookmarkIcon style={{ color: 'rgba(75, 140, 201, 0.75)' }}/>}
                                onClick={event => {
                                    updateCardStatus(item.Japanese, item.Chinese);
                                    event.stopPropagation();
                                }}
                            />
                        </Card>
                    ))}
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
                                        setCardIndex(0);
                                    }}
                                >
                                    <div className='oneVocab'>
                                        <div>{cards[cardIndex].Japanese}</div>
                                        <div>{cards[cardIndex].Chinese}</div>
                                    </div>
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
                <div style={{ fontSize: '100px' }}>🥳恭喜你學完所有單字🥳</div>
            }
        </>
    )
}

export default Cards;