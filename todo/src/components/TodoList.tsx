import React, {useState} from 'react';
import { List, ListItem, ListItemText, Radio, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import {useQuery, useMutation, useQueryClient}  from 'react-query';
import {fetchTodos, deleteTodo} from "../services/todoApis"
import {Todo} from "../types/todo"


// interface TodoListProps {
//     todos: Todo[];
//     handleToggle: (todo: Todo) => void;
//     handleDelete: (id: number) => void;
// }

const TodoList: React.FC<{handleEdit?:(todo:Todo)=>void}> = ({handleEdit}) =>{

    const queryClient = useQueryClient();
    
    const {data:todos, isLoading} = useQuery<Todo[]> ('todos', fetchTodos);
    const [selectedTodo] = useState<Todo|null>(null);
    
   const handleToggle = (todo: Todo)=>{
    if(handleEdit){
        handleEdit(todo);
        console.log(todo);
        }
   }
    const deleteMutation = useMutation(deleteTodo,{
        onSuccess: () =>queryClient.invalidateQueries('todos'),
        onError: ()=>console.log("Error is coming")
    });

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete this todo?")) {
            deleteMutation.mutate(id); // Trigger the delete mutation
        }
    };

    if(isLoading)  return <div> Loading... </div>;

    return (
        <List> 
            {
            todos?.map((todo)=>(
                
            <ListItem key={todo.id}  dense sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 1,
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '8px 12px',
            }} >

            <Radio
                edge="start" 
                checked={selectedTodo?.id === todo.id}
                onChange ={()=>handleToggle(todo)
                }
            />
            <ListItemText 
            
                primary={todo.title}
                style={{textDecoration: todo.completed ? 'line-through' : 'none',}}

            />

            <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(todo.id)}
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
            </ListItem>    
        ) )}
        </List>
        // </Card>
    );
};

export default TodoList;