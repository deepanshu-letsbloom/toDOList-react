import { createContext, useContext } from "react";
import {useToDoState} from "./ToDoStates";


const ToDoContext = createContext();
// const [taskArray, setTaskArray] = useState([]);

export const ToDoProvider = ({children}) => {
    const state = {
        ...useToDoState(),
    };
    return <ToDoContext.Provider value={state}>{children}</ToDoContext.Provider>
}

export const useToDos = () =>{
    return useContext(ToDoContext);
}