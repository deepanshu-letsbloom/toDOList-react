// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, createContext } from 'react';
import Todo from './components/Todo/Todo';
import { ToDoProvider } from './components/Todo/contexts/Context';

// const toDoContext = createContext();
const App = () => {
    return (
        <ToDoProvider>
            <Todo />
            <Todo />
            <Todo />
        </ToDoProvider>
    )
};

export default App; 
