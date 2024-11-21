import React from 'react'
import {Container, Typography, Box } from '@mui/material';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

import './App.css'

const App: React.FC = () =>{
  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Todo
          </Typography>  
          <AddTodo />
          {/* <TodoList /> */}

      </Box>
      </Container> 
  )
}

export default App;
