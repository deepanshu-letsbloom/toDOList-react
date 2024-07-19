import {useState} from 'react';

export const useToDoState = () => {
    const [taskArray, setTaskArray] = useState([]);
    const [totalTask, setTotalTasks] = useState(0);
    const [completedTask, setCompletedTasks] = useState(0);
    const [pendingTask, setPendingTasks] = useState(0);

    return{
        taskArray, setTaskArray,
        totalTask, setTotalTasks,
        completedTask, setCompletedTasks,
        pendingTask, setPendingTasks,

    };
};