import { useState, useEffect } from 'react';
import { Button, Paper, Card, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CardModal from '../components/CardModal';
import '../css/LearnSet.css'
import { v4 as uuidv4 } from 'uuid';

const LearnSet = ({ lecture, instance }) => {
    // vocab
    const [vocabChinese, setVocabChinese] = useState("");
    const [vocabJapanese, setVocabJapanese] = useState("");
    const [cards, setCards] = useState([]);
    const [showCardModal, setShowCardModal] = useState(false);

    const changeVocabJapanese = (event) => { setVocabJapanese(event.target.value) };
    const changeVocabChinese = (event) => { setVocabChinese(event.target.value) };

    const handleClose = () => {
        setShowCardModal(false);
        setVocabChinese('');
        setVocabJapanese('');
    };

    const addCard = async( lecture, vocab ) => {
        console.log(lecture, vocab);
        const { data: { msg } } = await instance.post('/card',
            { 
                lecture,
                vocab,
            }
        )
        console.log(msg);
    }
    const findCards = async() => {
        const { data: { msg, contents } } = await instance.get('/cards');
        setCards(contents);
        // console.log(contents);
    }

    const handleAddCard = async () => {
        const vocab = { Japanese: vocabJapanese, Chinese: vocabChinese };
        await addCard(lecture, vocab);
        await findCards();
        handleClose();
    }
    const handleRemoveCard = async (Japanese, Chinese) => {
        const {data: { msg }} = await instance.delete("/cards", { data:  { Japanese, Chinese }});
        console.log(msg);
        await findCards();
    }

    useEffect(() => {
        findCards();
    }, []);

    return (
        <>
            <Paper>{lecture}</Paper>
            <Button onClick={() => (setShowCardModal(true))}>新增單字組</Button>
            <Button onClick={handleRemoveCard}>刪除所有單字組</Button>
            <CardModal 
                description="請輸入欲新增單字名稱"
                label1="單字日文名稱" label2="單字中文名稱"
                name1={vocabJapanese} name2={vocabChinese}
                changeName1={changeVocabJapanese} changeName2={changeVocabChinese}
                handleAddCard={handleAddCard}
                showCreate={showCardModal}
                handleClose={handleClose}
            />
            <div className='cardContainer'>
                {
                    cards.map((item, index) => (
                        <Card key={uuidv4()} className='card'>
                            <div className='vocab'>{item.vocab.Japanese} | {item.vocab.Chinese}</div>
                            <div className='index'>{index}</div>
                            <CloseIcon
                                className='close'
                                onClick={() => handleRemoveCard(item.vocab.Japanese, item.vocab.Chinese)}
                            />
                        </Card>
                    ))
                }
            </div>
        </>
        
    )
}
export default LearnSet;