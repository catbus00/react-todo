import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './components/App.css';
import TodoContainer from './components/TodoContainer';
import AddTodoForm from './components/AddTodoForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todo" element={<AddTodoForm />} />
        <Route path="/" element={<TodoContainer />} />
        <Route path="/home" element={<TodoContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 