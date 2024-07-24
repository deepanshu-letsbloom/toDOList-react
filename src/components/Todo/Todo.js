import React, { useState, useEffect } from 'react'
import './ToDo.css';
import  {useToDos}  from './contexts/Context';
import   NavBar  from "../NavBar/NavBar.js"
// import {  useNavigate } from 'react-router-dom';


function Todo(){

    const convertDate = (dateStr) => {
        const [year, month, day] = dateStr.split("-");
        return `${year}/${month}/${day}`;
      };

    const [task, setTask] = useState("");
    const [dueDate, setDueDate] = useState((new Date()).toISOString().split('T')[0]);
    const [beforeDate, setBeforeDate] = useState((new Date()).toISOString().split('T')[0]);
    const [isBefore, setIsBefore] = useState(false);
    // const [taskArray, setTaskArray] = useState([]);
    // const [totalTask, setTotalTasks] = useState(0);
    // const [completedTask, setCompletedTasks] = useState(0);
    // const [pendingTask, setPendingTasks] = useState(0);

    const handleTaskChange = (event) => {
        setTask(event.target.value);
    }

    const handleDateChange = (event) => {
        setDueDate(event.target.value);
    }

    const handleBeforeDateChange = (event) => {
        setBeforeDate(event.target.value);
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


    const submitTaskItem = async () => {
        try {
            var tempTask = task.trim();
            if (tempTask === "" || dueDate==="") {
                alert("Please insert a valid task!!!")
                return;
            }
            const response = await fetch("http://localhost:8080/tasks", {
                method: 'POST',
                body: JSON.stringify({
                    "completed": false,
                    "task": tempTask,
                    "dueDate" : convertDate(dueDate)
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
            setDueDate((new Date()).toISOString().split('T')[0])

        } catch (error) {
            console.log('Error receiving data', error);
        }
    }

    const handleCheckboxChange = async  (index) =>{
        try{
            const response = await fetch ("http://localhost:8080/tasks/" + taskArray[index].id, {
                method: 'PATCH',
                body : JSON.stringify({
                    completed : !taskArray[index].completed,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const data = await response.json();
            if (taskArray[index].completed){
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

    const getTasksBeforeDate = async () =>{
        try{
            setIsBefore(true);
            if (beforeDate === ""){
                alert("Please insert a valid date!!!")
                return;
            }
            const response = await fetch("http://localhost:8080/tasks/beforeDate/" + beforeDate, {
                method: 'GET',
            });
            const data = await response.json();
            console.log(data);
            var temp = [];              
            let tot = 0, pending = 0, completed = 0;
            data.forEach((value) => {
                temp.push({"id" : value.id, "task" : value.task, "completed" : value.completed, "dueDate" : value.dueDate});
                tot++;
                if (value.completed) completed++;
                else pending++;
            })
            setCompletedTasks(completed);
            setTotalTasks(tot);
            setPendingTasks(pending);
            setTaskArray(temp);
        } catch (error){
            console.log(error);
        }

    }

    const deleteTask = async (deleteIndex) => {
        try{
            const response = await fetch ("http://localhost:8080/tasks/" + taskArray[deleteIndex].id, {
                method: 'DELETE',
            });
            // const data = await response.ok;
            // console.log(data)
            setTotalTasks(totalTask - 1);
            if (!taskArray[deleteIndex].completed) setPendingTasks(pendingTask - 1);
            else setCompletedTasks(completedTask - 1);
            const temp = taskArray.filter((item, index) => deleteIndex !== index);
            setTaskArray(temp);
        } catch (error){
            console.log(error)
        }
    }


    

    const getFromAPI = async () => {
        try {
            setIsBefore(false)
            const response = await fetch("http://localhost:8080/tasks", {
                method: 'GET',
            });
            const data = await response.json();
            var temp = [];
            let tot = 0, pending = 0, completed = 0;
            data.forEach((value) => {
                temp.push({"id" : value.id, "task" : value.task, "completed" : value.completed, "dueDate" : value.dueDate});
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
    useEffect(() => {
        getFromAPI();
    }, []);

    return (
        <div className="flex-container">

            <div className="mainHeading"> TO DO List </div>
            {/* <button onClick={moveToNavBar} >NavBar</button> */}
            <p className="smallHeading"> Get your to do list </p>
            <div className='mainInputDiv'>
                <input
                    type="text"
                    className="addItem"
                    placeholder="to-do list..."
                    value={task}
                    onChange={handleTaskChange}
                />

                <input 
                    type = "date"
                    className='addDate'
                    name='Due Date'
                    value={dueDate}
                    onChange={handleDateChange}
                />
            </div>

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

            <div className='bigBeforeDiv'>
                <div className='beforeDiv'>
                    <p>  Get tasks before : </p>
                    <input 
                        type = "date"
                        className='beforeDate'
                        name='before Date'
                        value={beforeDate}
                        onChange={handleBeforeDateChange}
                    />
                </div>
                <div className='beforeDivSubmit'>
                    {!isBefore ? (<button onClick={() => getTasksBeforeDate()}>Get</button>) 
                    : (<button onClick={() => getFromAPI()}>Reset</button>)}
                    
                </div>
            </div>

            
            <NavBar/>

            {/* <button className="btnAPI" onClick={getFromAPI}>Get From API</button> */}

            <ul className="taskList" id="myUL">
                {taskArray.map((task, index) => {
                    return <li>
                        <input type='checkbox' checked={task.completed} onChange={() => handleCheckboxChange(index)}/>
                        <p className='taskText'>{task.task}</p>
                        <p className='dueDatePara'> Due Date - {task.dueDate}</p>
                        <button className="btn" onClick={() => deleteTask(index) }>Delete</button>
                    </li>
                })}
            </ul>

        </div>
    );
}

export default Todo