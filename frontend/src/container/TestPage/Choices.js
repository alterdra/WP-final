import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import instance from '../../api';
import { v4 as uuidv4 } from 'uuid';
import { Button, Paper, Stack, Divider, styled, Typography, ListItem, Fab } from '@mui/material';
import ResultModal from '../../components/modals/ResultModal';
import { useUserName } from '../hook/useUserName';
import '../../css/Cards.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const IndexItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '25vh',
}));

const ChoiceItem = styled(IndexItem)(({ theme }) => ({
    // background: theme.palette.info.main,
    background: '#5286e7',
    color: 'white',
    width: '45vw',
    height: '5vh'
}));


const Choices = () => {
    const { name } = useParams();
    const lecture = name;
    const location = useLocation();
    const amount = location.state.amount;

    const [cardIndex, setCardIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [questionList, setQuestionList] = useState([]);
    const [myChoices, setMyChoices] = useState([]);
    const [selected, setSelected] = useState(Array(4).fill(false));

    const [showResultModal, setShowResultModal] = useState(false);
    const [score, setScore] = useState(0);
    const { user } = useUserName();

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
        const prev = myChoices;
        prev[cardIndex] = index;
        setMyChoices(prev);
        console.log(myChoices)

        setSelected(
            prev => {
                prev = Array(4).fill(false);
                prev[index] = true;
                return prev;
            }
        )
    }

    const randomSubarray = (arr, size) => {
        let shuffled = arr.slice(0), i = arr.length, temp, index;
        while(i--){
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(0, size);
    }

    const findCards = async () => {
        const { data: { msg, contents } } = await instance.get('/cards', { params:  { lecture, userName: user } });

        const questionArr = [];
        const answersArr = [];
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        for(let i = 0; i < amount; i++){
            let slice = randomSubarray(contents, 4);
            const range = slice.length >= 4 ? 4: slice.length;
            const answerIndex = getRandomInt(range);
            const question = slice[answerIndex].Chinese;
            slice = slice.map(ele => ele.Japanese);
            questionArr.push({
                question, 
                choices: slice 
            });
            answersArr.push(answerIndex);
        }
        setQuestionList(questionArr);
        setAnswers(answersArr);
    }

    useEffect(() => {
        findCards();
    }, []);

    useEffect(() => {
        setSelected(
            prev => {
                prev = Array(4).fill(false);
                prev[myChoices[cardIndex]] = true;
                return prev;
            }
        )
    }, [cardIndex]);

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
        for(let i = 0; i < answers.length; i++){
            if(myChoices[i] == answers[i])
                score += 1;
        }
        console.log(myChoices, answers);
        score /= questionList.length;
        score *= 100;
        score = parseInt(score,10);
        setScore(score);
        saveResult(lecture, score);
    }

    const questionIndexs = [0, 1, 2, 3];
    return (
        <div className='choicesWrapper'>
            <ResultModal 
                lecture={lecture}
                score={score}
                showCreate={showResultModal}
                back={navigateToTest}
                reset={navigateToCur}
                handleClose={handleClose}
            />
            <ListItem >
                <Fab className='backIcon' variant="extended" onClick={navigateToTest}>
                    <ArrowBackIcon sx={{ mr: 1 }} />
                    回到測驗首頁
                </Fab>
            </ListItem>
            {questionList.length > 0 ?
            <div className='oneCardContainerChoice'>
                
                {
                    <div>     
                        <Stack spacing={2} justifyContent="center" marginBottom={5}>
                            <ChoiceItem textAlign="center">
                                <div style={{"font-size": "4vmin", "vertical-align": "middle"}} >
                                    Q{cardIndex + 1}: {questionList[cardIndex].question}
                                </div>  
                            </ChoiceItem>
                            {questionIndexs.map((ele, index) => 
                                <Button 
                                    className="oneCardChoices"
                                    variant={selected[index] ? "contained":"outlined"}
                                    color={selected[index] ? "success":"secondary"}
                                    onClick={() => changeMyChoices(index)}
                                    key={uuidv4()} 
                                    style={{"font-size": "4vmin"}}
                                >
                                    {index + 1}: {questionList[cardIndex].choices[index]}
                                </Button>
                            )}
                        </Stack>
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
                                : <IndexItem className='nextCard' onClick={increaseCardIndex}>下一題</IndexItem>
                            }
                        </Stack>
                    </div>
                }
            </div> : <Typography>你還沒新增題目誒...</Typography>}
        </div>
    )
}

export default Choices;