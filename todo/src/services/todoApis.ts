
import {Todo, CreateTodo} from '../types/todo';

const API = `https://jsonplaceholder.typicode.com/`;

export const fetchTodos = async (): Promise <Todo[]> => {
    const response =  await fetch(`${API}/posts`);
    if (!response.ok) {
        throw new Error("Failed to fetch todos");
    }
    const data = await response.json();
    return data;        
}

export const createTodo = async (todo: CreateTodo): Promise <Todo> => {
    const response=  await fetch(`${API}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        throw new Error("Failed to create todo");
    }
    const data = await response.json();
    return data;
}

export const updateTodo = async(
    id: number,
    updatedTodo: Partial<Todo>) =>{

        console.log(id,'--->',  updatedTodo);

       await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedTodo),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        });
}; 

export const deleteTodo = async(id: number): Promise<void> =>{
    const response = await fetch(`${API}/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    });
    if (!response.ok) {
        throw new Error(`Failed to delete todo with ID ${id}. Status: ${response.status}`);
    }
}