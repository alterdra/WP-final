import { useState, useEffect } from 'react';
import { Button, Paper, Card, Stack, Divider, styled, TextField, Typography } from '@mui/material';
import ResultModal from '../../components/modals/ResultModal'
import '../../css/Cards.css'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useUserName } from '../hook/useUserName';

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
    const location = useLocation();
    const amount = location.state.amount;

    const [cards, setCards] = useState([]);
    const [cardIndex, setCardIndex] = useState(0);

    const [inputAnswer, setInputAnswer] = useState("");
    const [answers, setAnswers] = useState([]);

    const [showResultModal, setShowResultModal] = useState(false);
    const [score, setScore] = useState(0);
    const { user } = useUserName();
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

    const randomSubarray = (arr, size) => {
        let shuffled = arr.slice(0), i = arr.length, temp, index;
        while (i--) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(0, size);
    }

    const findCards = async () => {
        const { data: { msg, contents } } = await instance.get('/cards', { params:  { lecture, userName: user } });
        let slice = randomSubarray(contents, amount);
        setCards(slice);
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

    const saveResult = async (lecture, score) => {
        const id = uuidv4();
        const { data: { msg } } = await instance.post('/test', { lecture, score, id, User: user });
        console.log(msg);
    }

    const calScore = () => {
        let score = 0;
        for(let i = 0; i < cards.length; i++){
            if(cards[i].Japanese == answers[i])
                score += 1;
        }
        score /= cards.length;
        score *= 100;
        // console.log(score);
        score = parseInt(score,10);
        setScore(score);
        saveResult(lecture, score);
    }

    return (
        <>
            <Button onClick={navigateToTest}>回到測驗首頁</Button>
            <ResultModal 
                lecture={lecture}
                score={score}
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
                                /> | {cards[cardIndex].Chinese}
                            </div>
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
            </div> : <Typography>你還沒新增題目誒...</Typography>}
        </>
    )
}

export default Cards;