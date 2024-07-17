import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

const App = () => {

    const [task, setTask] = useState("");
    const [taskArray, setTaskArray] = useState([]);

    const handleTaskChange = (event) => {
        setTask(event.target.value);
    }
    const submitTaskItem = () => {
        var tempTask = task.trim();
        if (tempTask === "") {
            alert("Please insert a valid task!!!")
            return;
        }
        setTaskArray([task, ...taskArray]);
        setTask("")
    }

    const resetList = () => {
        setTaskArray([]);
    };

    const deleteTask = (deleteIndex) => {
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
            data.reverse().map((value) => {
                temp.push(value.title);
            })
            temp = temp.concat(taskArray);
            setTaskArray(temp);
        } catch (error) {
            console.log('Error receiving data', error);
        }
    }

    useEffect(() => {
        getFromAPI();
    },[]);


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

                <button className="btnEditDiv" onClick={resetList}>Reset List</button>
            </div>

            <button className="btnAPI" onClick={getFromAPI}>Get From API</button>

            <ul className="taskList" id="myUL">
                {taskArray.map((task, index) => {
                    return <li>
                        <p>{task}</p>
                        <button className="btn" onClick={() => deleteTask(index)}>Delete</button>
                    </li>
                })}
            </ul>

        </div>
    );
};

export default App;
