// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

const App = () => {

    const [task, setTask] = useState("");
    const [taskArray, setTaskArray] = useState([]);
    const [totalTask, setTotalTasks] = useState(0);
    const [completedTask, setCompletedTasks] = useState(0);
    const [pendingTask, setPendingTasks] = useState(0);

    const handleTaskChange = (event) => {
        setTask(event.target.value);
    }

    const handleCheckboxChange = (index) =>{
        if (taskArray[index].completed === true){
            setCompletedTasks(completedTask-1);
            setPendingTasks(pendingTask+1);
            taskArray[index].completed = false;
        }
        else{
            setCompletedTasks(completedTask+1);
            setPendingTasks(pendingTask-1);
            taskArray[index].completed = true;
        }
    }

    const submitTaskItem = async () => {
        try {
            var tempTask = task.trim();
            if (tempTask === "") {
                alert("Please insert a valid task!!!")
                return;
            }
            // console.log("here ", tempTask)
            const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
                method: 'POST',
                body: JSON.stringify({
                    completed: false,
                    title: tempTask,
                    id: 1000
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const data = await response.json();
            setTotalTasks(totalTask + 1);
            if (data.completed === true) setCompletedTasks(completedTask + 1);
            else setPendingTasks(pendingTask + 1);
            setTaskArray([data, ...taskArray]);
            setTask("")

        } catch (error) {
            console.log('Error receiving data', error);
        }
    }

    // const resetList = () => {
    //     setTaskArray([]);
    // };

    const deleteTask = (deleteIndex) => {
        setTotalTasks(totalTask - 1);
        if (taskArray[deleteIndex].completed) setPendingTasks(pendingTask - 1);
        else setCompletedTasks(completedTask - 1);
        const temp = taskArray.filter((item, index) => deleteIndex !== index);
        setTaskArray(temp);
    }

    const getFromAPI = async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
                method: 'GET',
            });
            const data = await response.json();
            var temp = [];
            let tot = 0, pending = 0, completed = 0;
            data.forEach((value) => {
                temp.push({ "id": value.id, "title": value.title, "completed": value.completed });
                tot++;
                if (value.completed === true) completed++;
                else pending++;
            })
            setCompletedTasks(completed);
            setTotalTasks(tot);
            setPendingTasks(pending);
            setTaskArray(temp);
        } catch (error) {
            console.log('Error receiving data', error);
        }
    }

    useEffect(() => {
        getFromAPI();
    }, []);


    return (
        <div className="flex-container">

            <div className="mainHeading"> TO DO List </div>
            <p className="smallHeading"> Get your to do list </p>
            <input
                type="text"
                className="addItem"
                placeholder="to-do list..."
                value={task}
                onChange={handleTaskChange}
            />

            <div className="editDiv">
                <button
                    type="submit"
                    className="addListButton"
                    onClick={submitTaskItem}
                >
                    Add list item
                </button>

                {/* <button className="btnEditDiv" onClick={resetList}>Reset List</button> */}
            </div>

            <div className='taskBtn'>
                <div>Total tasks : {totalTask}</div>
                <div>Pending tasks : {pendingTask}</div>
                <div>completed tasks : {completedTask} </div>
            </div>

            {/* <button className="btnAPI" onClick={getFromAPI}>Get From API</button> */}

            <ul className="taskList" id="myUL">
                {taskArray.map((task, index) => {
                    return <li>
                        <input type='checkbox' checked={task.completed} onChange={() => handleCheckboxChange(index)}/>
                        <p>{task.title}</p>
                        <button className="btn" onClick={() => deleteTask(index)}>Delete</button>
                    </li>
                })}
            </ul>

        </div>
    );
};

export default App; 
