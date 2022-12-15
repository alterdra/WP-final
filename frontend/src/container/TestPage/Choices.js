import { useState, useEffect } from 'react';
import { Button, Paper, Card, Stack, Divider, styled, TextField, Typography } from '@mui/material';
import ResultModal from '../../components/modals/ResultModal'
import '../../css/Cards.css'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const IndexItem = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '25vh',
}));

const ChoiceItem = styled(IndexItem)(({ theme }) => ({
    width: '60vh',
    height: '5vh'
}));

const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const Cards = () => {
    const { name } = useParams();
    const lecture = name;
    const location = useLocation();
    const amount = location.state.amount;

    const [cardIndex, setCardIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [questionList, setQuestionList] = useState([]);
    const [myChoices, setMyChoices] = useState([]);

    const [choiceFlag, setChoiceFlag] = useState(false)

    const [showResultModal, setShowResultModal] = useState(false);
    const [score, setScore] = useState(0);

    const handleClose = () => {
        setShowResultModal(false);
    };
    
    const increaseCardIndex = () => {
        if(cardIndex === questionList.length - 1) return;
        else setCardIndex(prev => prev + 1);
    }
    const decreaseCardIndex = () => {
        if(cardIndex === 0) return;
        else setCardIndex(prev => prev - 1);
    }
    const changeMyChoices = (index) => { 
        setMyChoices(prev => {
            prev[cardIndex] = index;
            return prev;
        });
        console.log(myChoices)
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
        const { data: { msg, contents } } = await instance.get('/cards', { params:  { lecture } });

        const questionArr = [];
        const answersArr = [];
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        for(let i = 0; i < amount; i++){
            let slice = randomSubarray(contents, 4);
            console.log(slice)
            const range = slice.length >= 4 ? 4: slice.length;
            const answerIndex = getRandomInt(range);
            const question = slice[answerIndex].vocab.Chinese;
            slice = slice.map(ele => ele.vocab.Japanese);
            questionArr.push({
                question, 
                choices: slice 
            });
            answersArr.push(answerIndex);
        }
        setQuestionList(questionArr);
        setAnswers(answersArr);
        // console.log(questionArr);
        // console.log(answersArr)
    }


    useEffect(() => {
        findCards();
    }, []);

    useEffect(()=>{
        setChoiceFlag(true);
    }, [myChoices])

    const navigate = useNavigate();
    const navigateToTest = () => navigate('/test');
    const navigateToCur = () => window.location.reload();

    const saveResult = async (lecture, score) => {
        const id = uuidv4();
        const { data: { msg } } = await instance.post('/test', { lecture, score, id });
        console.log(msg);
    }

    const calScore = () => {
        let score = 0;
        for(let i = 0; i < answers.length; i++){
            if(myChoices[i] == answers[i])
                score += 1;
        }
        score /= questionList.length;
        score *= 100;
        // console.log(score);
        setScore(score);
        saveResult(lecture, score);
    }

    const questionIndexs = [0, 1, 2, 3];
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
            {questionList.length > 0 ?
            <div className='oneCardContainer'>
                {
                    <div>     
                        <Stack 
                            spacing={2} 
                            justifyContent="center"
                        >
                            <ChoiceItem>
                                Q{cardIndex + 1}: {questionList[cardIndex].question}
                            </ChoiceItem>
                            {questionIndexs.map((ele, index) => 
                                <Button 
                                    className='choice'
                                    variant={myChoices[cardIndex] === index ? "contained":"outlined"}
                                    color={myChoices[cardIndex] === index ? "success":"secondary"}
                                    onClick={() => changeMyChoices(index)}
                                >
                                    {index}: {questionList[cardIndex].choices[index]}
                                </Button>
                            )}
                        </Stack>
                        <br></br>
                        <Stack
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem />}
                            justifyContent="center"
                            spacing={2}
                        >
                            <IndexItem className='removeCard' onClick={decreaseCardIndex}>上一題</IndexItem>
                            {cardIndex === questionList.length - 1 ?
                                <IndexItem className='nextCard' onClick={event => {
                                    calScore();
                                    setShowResultModal(true);
                                    console.log(score)
                                    event.stopPropagation();
                                }}>確定</IndexItem>
                                :<IndexItem className='nextCard' onClick={increaseCardIndex}>下一題</IndexItem>
                            }
                        </Stack>
                    </div>
                }
            </div> : <Typography>你還沒新增題目誒...</Typography>}
        </>
    )
}

export default Cards;