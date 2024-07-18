import React, {useState} from 'react';

export const useToDoState = () => {
    const [taskArray, setTaskArray] = useState([]);

    return{
        taskArray, setTaskArray,
    };
};