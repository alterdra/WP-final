import { useState, useEffect } from 'react';
import { Button, Paper, Card, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CardModal from '../components/CardModal';
import '../css/LearnSet.css'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const LearnSet = () => {

    const { name } = useParams();
    const lecture = name;
    // console.log("Lecture name: " + lecture)

    const [vocabChinese, setVocabChinese] = useState("");
    const [vocabJapanese, setVocabJapanese] = useState("");
    const [cards, setCards] = useState([]);
    const [showCardModal, setShowCardModal] = useState(false);

    const [tileMode, setTileMode] = useState(true);
    const [cardIndex, setCardIndex] = useState(0);
    
    const increaseCardIndex = () => {
        if(cardIndex === cards.length - 1) setCardIndex(0);
        else setCardIndex(prev => prev + 1);
    }

    const changeVocabJapanese = (event) => { setVocabJapanese(event.target.value) };
    const changeVocabChinese = (event) => { setVocabChinese(event.target.value) };

    const handleClose = () => {
        setShowCardModal(false);
        setVocabChinese('');
        setVocabJapanese('');
    };

    const addCard = async( lecture, vocab ) => {
        const { data: { msg } } = await instance.post('/card', { lecture, vocab })
    }
    const findCards = async () => {
        const { data: { msg, contents } } = await instance.get('/cards', { params:  { lecture } });
        setCards(contents);
    }

    const handleAddCard = async () => {
        const vocab = { Japanese: vocabJapanese, Chinese: vocabChinese };
        await addCard(lecture, vocab);
        await findCards(lecture);
        handleClose();
    }
    const handleRemoveCard = async ( Japanese, Chinese ) => {
        const {data: { msg }} = await instance.delete("/cards", { data:  { Japanese, Chinese }});
        // console.log(msg);
        await findCards(lecture);
        if(cardIndex === cards.length - 1) // Last card is removed;
            setCardIndex(prev => 0);
        // console.log(cardIndex)
    }

    useEffect(() => {
        findCards();
    }, []);

    const navigate = useNavigate();
    const navigateToCards = () => {
        navigate('/cards');
    }

    function stopBubbling(e) {
        e = window.event || e;
        if (e.stopPropagation) {
            e.stopImmediatePropagation();
        } else {
            e.cancelBubble = true;   //ie
        }
    }

    return (
        <>
            <Paper>{lecture}</Paper>
            <Button onClick={navigateToCards}>上一頁</Button>
            {!tileMode ? 
                <Button onClick={() => { 
                    setTileMode(!tileMode);
                    setCardIndex(prev => 0);
                }}>
                    啟用並排模式
                </Button>
            :<div>點選單字卡啟用單字循環模式</div>
            }
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
            {tileMode ?
                <div className='cardContainer'>
                    {
                        cards.map((item, index) => (
                            <Card 
                                key={uuidv4()} 
                                className='card'
                                onClick={event => { 
                                    setTileMode(!tileMode);
                                    setCardIndex(prev => index);
                                }}
                            >
                                <div className='vocab'>{item.vocab.Japanese} | {item.vocab.Chinese}</div>
                                <div className='index'>{index}</div>
                                <CloseIcon
                                    className='close'
                                    onClick={event => {
                                        handleRemoveCard(item.vocab.Japanese, item.vocab.Chinese);
                                        // stopBubbling(event);
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
                        <Card className='oneCard' onClick={increaseCardIndex}>
                            <div className='oneVocab'>{cards[cardIndex].vocab.Japanese} | {cards[cardIndex].vocab.Chinese}</div>
                            <div className='index'>{cardIndex}</div>
                            <CloseIcon
                                className='close'
                                onClick={event => {
                                    handleRemoveCard(
                                        cards[cardIndex].vocab.Japanese, 
                                        cards[cardIndex].vocab.Chinese
                                    );
                                    // stopBubbling(event);
                                }}
                            />
                        </Card>
                    }
                </div> : null
            }
        </>
        
    )
}
export default LearnSet;