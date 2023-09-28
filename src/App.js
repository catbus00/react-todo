import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './components/App.css';
import TodoContainer from './components/TodoContainer';
import AddTodoForm from './components/AddTodoForm';

const table = process.env.REACT_APP_TABLE_NAME;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todo" element={<AddTodoForm />} />
        <Route path="/" element={<TodoContainer tableName={table} />} />
        <Route path="/home" element={<TodoContainer tableName={table} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 