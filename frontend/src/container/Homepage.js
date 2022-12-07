import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';

const Homepage = () => {
    /*
    Todo: 
    1. using map to render all the 學習集
    2. using map to render all the 測驗紀錄
    */
    const [learnSet, setLearnSet] = useState([]);
    const [testSet, setTestSet] = useState([]);

    useEffect(() => {
        // take the data from backend while entering
    }, [learnSet]);
    useEffect(() => {
        // take the data from backend while entering
    }, [testSet]);
    
    const displayLearnSet = () => {
        if(learnSet.length === 0)
            return <></>;
        // Todo: Content includes Icon, Name, num of vocab
        return (
            learnSet.map((item, index) => (
                <Box>{`${item} ${index}`}</Box>
            ))
        );
    }
    const displayTestSet = () => {
        if(testSet.length === 0)
            return <></>;
        // Todo: Content includes Icon, which learnset(name), score
        return (
            learnSet.map((item, index) => (
                <Box>{`${item} ${index}`}</Box>
            ))
        );
    }
    return (
        <>
            <div>Hi, I'm Homepage</div>
            <Box>
                <div>
                    {displayLearnSet()}
                    {/* add a learn set here*/}
                    <Button>Add</Button>
                </div>
                <div>
                    {displayTestSet()}
                </div>
                
            </Box>
        </>
    );
}
export default Homepage;