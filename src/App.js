// import logo from './logo.svg';
import './App.css';
// import React, { useState, useEffect, createContext } from 'react';
import Todo from './components/Todo/Todo';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToDoProvider } from './components/Todo/contexts/Context';

const App = () => {
    return (
        <BrowserRouter>
            <ToDoProvider>
                <Routes>
                    <Route path="/" element = {<Todo/>}/>
                     {/* <Todo /> */}
                     <Route path="*" element={<p> page does not exists</p>}/>
                </Routes>
            </ToDoProvider>
        </BrowserRouter>
    )
};

export default App; 
