import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './components/App.css';
import TodoContainer from './components/TodoContainer';
import AddTodoForm from './components/AddTodoForm';
import TodoLanding from './components/TodoLanding';

const table = process.env.REACT_APP_TABLE_NAME;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todo" element={<AddTodoForm />} />
        <Route path="/" element={<TodoContainer tableName={table} />} />
        <Route path="/home" element={<TodoContainer tableName={table} />} />
        <Route path="/landing" element={<TodoLanding />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App; 