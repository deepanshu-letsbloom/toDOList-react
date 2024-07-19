// import logo from './logo.svg';
import './App.css';
// import React, { useState, useEffect, createContext } from 'react';
import Todo from './components/Todo/Todo';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToDoProvider } from './components/Todo/contexts/Context';
import NavBar from './components/NavBar/NavBar';

const App = () => {
    return (
        <BrowserRouter>
            <ToDoProvider>
                <Routes>
                    <Route path="/" >
                        <Route path="" element = {<Todo/>}> </Route>
                        <Route path="*" element={<p> page does not exists</p>}/>
                        <Route path="navbar" element={<NavBar/>} ></Route>
                    </Route>
                </Routes>
            </ToDoProvider>
        </BrowserRouter>
    )
};

export default App; 
