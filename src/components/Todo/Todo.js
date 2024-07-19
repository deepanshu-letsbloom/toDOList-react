import React, { useState, useEffect } from 'react'
import './ToDo.css';
import  {useToDos}  from './contexts/Context';
import   NavBar  from "../NavBar/NavBar.js"
// import {  useNavigate } from 'react-router-dom';


function Todo(){

    const [task, setTask] = useState("");
    // const [taskArray, setTaskArray] = useState([]);
    // const [totalTask, setTotalTasks] = useState(0);
    // const [completedTask, setCompletedTasks] = useState(0);
    // const [pendingTask, setPendingTasks] = useState(0);

    const handleTaskChange = (event) => {
        setTask(event.target.value);
    }

    // const navigate = useNavigate();

    const {
        taskArray, setTaskArray,
        totalTask, setTotalTasks,
        completedTask, setCompletedTasks,
        pendingTask, setPendingTasks,
    } = useToDos();

    // const moveToNavBar = ()=>{
    //     navigate("/navbar")
    // }

    const handleCheckboxChange = async  (index) =>{
        try{
            const response = await fetch ("https://jsonplaceholder.typicode.com/todos/" + taskArray[index].id, {
                method: 'PATCH',
                body : JSON.stringify({
                    completed : !taskArray[index].completed,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const data = await response.json();
            console.log(data)
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
        } catch (error){
            console.log(error)
        }
    }

    const submitTaskItem = async () => {
        try {
            var tempTask = task.trim();
            if (tempTask === "") {
                alert("Please insert a valid task!!!")
                return;
            }
            const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
                method: 'POST',
                body: JSON.stringify({
                    completed: false,
                    title: tempTask,
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

    const deleteTask = async (deleteIndex) => {
        try{
            const response = await fetch ("https://jsonplaceholder.typicode.com/todos/" + taskArray[deleteIndex].id, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log(data)
            setTotalTasks(totalTask - 1);
            if (taskArray[deleteIndex].completed) setPendingTasks(pendingTask - 1);
            else setCompletedTasks(completedTask - 1);
            const temp = taskArray.filter((item, index) => deleteIndex !== index);
            setTaskArray(temp);
        } catch (error){
            console.log(error)
        }
    }

    // const getFromAPI = async () => {
    //     try {
    //         const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    //             method: 'GET',
    //         });
    //         const data = await response.json();
    //         var temp = [];
    //         let tot = 0, pending = 0, completed = 0;
    //         data.forEach((value) => {
    //             temp.push({ "id": value.id, "title": value.title, "completed": value.completed });
    //             tot++;
    //             if (value.completed === true) completed++;
    //             else pending++;
    //         })
    //         setCompletedTasks(completed);
    //         setTotalTasks(tot);
    //         setPendingTasks(pending);
    //         setTaskArray(temp);
    //     } catch (error) {
    //         console.log('Error receiving data', error);
    //     }
    // }

    useEffect(() => {
        const getFromAPI = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
                    method: 'GET',
                });
                const data = await response.json();
                var temp = [];
                let tot = 0, pending = 0, completed = 0;
                data.forEach((value) => {
                    temp.push({"id" : value.id, "title" : value.title, "completed" : value.completed});
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
        };
        getFromAPI();
    }, [setTaskArray, setCompletedTasks, setPendingTasks, setTotalTasks]);

    return (
        <div className="flex-container">

            <div className="mainHeading"> TO DO List </div>
            {/* <button onClick={moveToNavBar} >NavBar</button> */}
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

            {/* <div className='taskBtn'>
                <div>Total tasks : {totalTask}</div>
                <div>Pending tasks : {pendingTask}</div>
                <div>completed tasks : {completedTask} </div>
            </div> */}
            <NavBar/>

            {/* <button className="btnAPI" onClick={getFromAPI}>Get From API</button> */}

            <ul className="taskList" id="myUL">
                {taskArray.map((task, index) => {
                    return <li>
                        <input type='checkbox' checked={task.completed} onChange={() => handleCheckboxChange(index)}/>
                        <p>{task.title}</p>
                        {task.completed && (
                            <button className="btn" onClick={() => deleteTask(index) }>Delete</button>
                        )}
                    </li>
                })}
            </ul>

        </div>
    );
}

export default Todo