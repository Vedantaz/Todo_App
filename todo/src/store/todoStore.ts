import { create } from 'zustand'
import { Todo } from '../types/todo';


interface TodoState{
    todos: Todo[];
    setTodos:(todos: Todo[]) => void;

}

const useToDoStore = create<TodoState>((set) => ({
  todos: [],
  setTodos: (todos) => set({todos}),
}))

export default useToDoStore;
