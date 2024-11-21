import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createTodo, fetchTodos, updateTodo } from '../services/todoApis'
import { Todo } from '../types/todo';
import TodoList from './TodoList';


const AddTodo: React.FC = () => {
    const [title, setTitle]     = useState<string>('');
    const [id,setId] = useState<number | undefined>();
    const [selectedTodo,setSelectedTodo] = useState<Todo|undefined>(undefined);
    // const queryClient = useQueryClient();
    const getTodos = useQuery({
        queryFn: fetchTodos
    })

    const addMutation = useMutation(createTodo, {
        onSuccess: () => {
            getTodos.refetch()
            resetForm();
            setSelectedTodo(undefined);
        }
    })

    const updateMutation = useMutation( {
        mutationFn: async(data:{id:number } & Partial<Todo>) =>updateTodo(data?.id, data),
        onSuccess: () => {
            getTodos.refetch()
            resetForm();
            setSelectedTodo(undefined);
        }
    });

    const handleAddOrUpdateTodo = () =>{
        if (!title.trim()) return; 
    
        if (id) {
            updateMutation.mutate({ id, title });
           
        } else {
            addMutation.mutate({ title });
        }
    }

    const resetForm = () => {
        setId(undefined);
        setTitle(''); 
    };
    
    const handleEditTodo = (data: Todo) => {    
        setTitle(data.title);
        setId(data.id);
    }

    return (
        <Box sx={{padding:2}}>

            <Box display="flex" alignItems="center" mt={4} gap={2}>
                <TextField 
                label="Add todo" 
                variant='outlined' 
                fullWidth value={title} 
                onChange={(e) => setTitle(e.target.value)} />
                <Button
                    variant='contained' 
                    color='primary' 
                    onClick={handleAddOrUpdateTodo} 
                    disabled={addMutation.isLoading || updateMutation.isLoading}>
                    {addMutation.isLoading || updateMutation.isLoading ? "Processing..." : id ? "Update" : "Add"}

                </Button>
            </Box>
            <TodoList handleEdit={handleEditTodo} />
        </Box>

    );
};

export default AddTodo;

// const handleUpdate = (id: number, title:string) => {
//     if (!id) {
//         console.error("Todo ID is required for updating!");
//         return;
//     }
//     updateMutation.mutate({ id, title});
// };

// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUpdate((prev) => ({
//         ...prev,
//         [e.target.name]: e.target.value,
//     }));
// };

// const handleAddTodo = () => {
//     if (!title.trim()) return;
//     console.log(id);
//     if(id){
//         handleAddOrUpdateTodo();
//     }else{
//     addMutation.mutate({ title });
//     }
//     setTitle("");
// };
