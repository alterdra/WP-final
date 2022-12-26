import { useState, useEffect } from 'react';
import { Button, Paper, Card, Stack, Divider, styled, Checkbox, FormControlLabel } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CloseIcon from '@mui/icons-material/Close';
import CardModal from '../../components/modals/CardModal';
import '../../css/Cards.css'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useUserName } from '../hook/useUserName';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '18.5vh',
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
        const { data: { msg } } = await instance.post('/card', { lecture, Japanese, Chinese, userName: user })
    }
    const findCards = async () => {
        const { data: { msg, contents } } = await instance.get('/cards', { params:  { lecture, userName: user } });
        console.log(unlearnedMode);
        if(unlearnedMode)
            setCards(contents.filter(ele => ele.Learned === false));
        else
            setCards(contents);
    }
    const updateCardStatus = async (Japanese, Chinese) => {
        const { data: { msg } } = await instance.post('/learn', { lecture, Japanese, Chinese, userName: user } );
        console.log('changed success!');
        await findCards();
    }

    const handleAddCard = async () => {
        await addCard(vocabJapanese, vocabChinese);
        await findCards(lecture);
        handleClose();
    }
    const handleRemoveCard = async ( Japanese, Chinese ) => {
        const {data: { msg }} = await instance.delete("/cards", { data:  { lecture, Japanese, Chinese, userName: user }});
        // console.log(msg);
        await findCards(lecture);
        if(cardIndex === cards.length - 1) // Last card is removed;
            setCardIndex(prev => 0);
        // console.log(cardIndex)
    }

    useEffect(() => {
        console.log(unlearnedMode);
        findCards();
    }, [unlearnedMode]);

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

    return (
        <>
            {!tileMode ? <div>註：點選單字卡啟用並排模式</div>
            :<div>註：點選單字卡啟用單字循環模式</div>}
            <Paper>{lecture}</Paper>
            <Button onClick={navigateToLearnSets}>上一頁</Button>
            
            <Button onClick={() => (setShowCardModal(true))}>新增單字組</Button>
            <CardModal 
                description="請輸入欲新增單字名稱"
                label1="單字日文名稱" label2="單字中文名稱"
                name1={vocabJapanese} name2={vocabChinese}
                changeName1={changeVocabJapanese} changeName2={changeVocabChinese}
                handleAddCard={handleAddCard}
                showCreate={showCardModal}
                handleClose={handleClose}
            />
            <FormControlLabel control={<Checkbox />} label="未學習模式" onClick={() => setMode(prev => !prev)} />
            {tileMode ?
                <div className='cardContainer'>
                    {
                        cards.map((item, index) => (
                            <Card 
                                key={uuidv4()} 
                                className='card'
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
                        ))
                    }
                </div>
            : 
                cards.length > 0 ? 
                <div className='oneCardContainer'>
                    {
                        <div>
                            <Card 
                                className='oneCard' 
                                onClick={() => { 
                                    setTileMode(!tileMode);
                                    setCardIndex(prev => 0);
                                }}
                            >
                                <div className='oneVocab'>{cards[cardIndex].Japanese} | {cards[cardIndex].Chinese}</div>
                                <div className='index'>{cardIndex}</div>
                            </Card>
                            <Stack
                                direction="row"
                                divider={<Divider orientation="vertical" flexItem />}
                                justifyContent="center"
                                spacing={2}
                            >
                                <Item className='nextCard' onClick={decreaseCardIndex}>上個單字卡</Item>
                                <Item className='removeCard' onClick={() => handleRemoveCard(
                                        cards[cardIndex].Japanese, 
                                        cards[cardIndex].Chinese
                                )}>刪除這張單字卡</Item>
                                <Item className='nextCard' onClick={increaseCardIndex}>下個單字卡</Item>
                            </Stack>
                        </div>
                    }
                </div> : null
            }
        </>
        
    )
}

export default Cards;