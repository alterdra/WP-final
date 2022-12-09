import { useState, useEffect } from 'react';
import { Button, Paper, Card, Stack, Divider, styled, TextField } from '@mui/material';
import ResultModal from '../../components/modals/ResultModal'
import '../../css/Cards.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '31.5vh',
}));

const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const Cards = () => {

    const { name } = useParams();
    const lecture = name;

    const [cards, setCards] = useState([]);
    const [cardIndex, setCardIndex] = useState(0);

    const [inputAnswer, setInputAnswer] = useState("");
    const [answers, setAnswers] = useState([]);

    const [showResultModal, setShowResultModal] = useState(false);
    const [score, setScore] = useState(0);
    const handleClose = () => {
        setShowResultModal(false);
    };
    
    const increaseCardIndex = () => {
        if(cardIndex === cards.length - 1) return;
        else setCardIndex(prev => prev + 1);
    }
    const decreaseCardIndex = () => {
        if(cardIndex === 0) return;
        else setCardIndex(prev => prev - 1);
    }

    const changeInputAnswer = (event) => { 
        setInputAnswer(event.target.value);
        setAnswers(prev => {
            prev[cardIndex] = event.target.value;
            return prev;
        });
    }


    const findCards = async () => {
        const { data: { msg, contents } } = await instance.get('/cards', { params:  { lecture } });
        setCards(contents);
    }

    useEffect(()=> {
        if(answers[cardIndex] !== undefined)
            setInputAnswer(answers[cardIndex]);
        else{
            setInputAnswer("");
        }
    }, [cardIndex]);

    useEffect(() => {
        findCards();
    }, []);

    const navigate = useNavigate();
    const navigateToTest = () => navigate('/test');
    const navigateToCur = () => window.location.reload();

    const calScore = () => {
        let score = 0;
        for(let i = 0; i < cards.length; i++){
            // console.log(`Q${i} Answer:`,cards[i].vocab.Japanese);
            // console.log(`Q${i}:`,answers[i]);
            if(cards[i].vocab.Japanese == answers[i])
                score+=1;
        }
        score /= cards.length;
        score *= 100;
        // console.log(score);
        setScore(score);
    }

    return (
        <>
            <Button onClick={navigateToTest}>回到測驗首頁</Button>
            <ResultModal 
                description={`您的分數：${score}/100`}
                showCreate={showResultModal}
                back={navigateToTest}
                reset={navigateToCur}
                handleClose={handleClose}
            />
            {cards.length > 0 ?
            <div className='oneCardContainer'>
                {
                    <div>
                        <Card className='oneCard' >
                            <div className='oneVocab'>
                                <TextField 
                                    id="standard-basic" 
                                    label="" 
                                    variant="standard" 
                                    value={inputAnswer}
                                    onChange={changeInputAnswer}
                                />
                                 | {cards[cardIndex].vocab.Chinese}</div>
                            <div className='index'>{cardIndex}</div>
                        </Card>
                        <Stack
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem />}
                            justifyContent="center"
                            spacing={2}
                        >
                            <Item className='removeCard' onClick={decreaseCardIndex}>上一題</Item>
                            {cardIndex === cards.length - 1 ?
                                <Item className='nextCard' onClick={event => {
                                    calScore();
                                    setShowResultModal(true);
                                    console.log(score)
                                    event.stopPropagation();
                                }}>確定</Item>
                                :<Item className='nextCard' onClick={increaseCardIndex}>下一題</Item>
                            }
                        </Stack>
                    </div>
                }
            </div> : null}
        </>
        
    )
}
export default Cards;