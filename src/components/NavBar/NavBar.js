import React from 'react'
// import { useToDos } from '../Todo/contexts/Context';
import "./NavBar.css"
import {useToDos} from '../Todo/contexts/Context';


function NavBar() {

    const {
        
        totalTask,
        completedTask,
        pendingTask,
    } = useToDos();

    return (
        <div className='taskBtn'>
            <div>Total tasks : {totalTask}</div>
            <div>Pending tasks : {pendingTask}</div>
            <div>completed tasks : {completedTask} </div>
        </div>
    )
}

export default NavBar