import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './components/App.css';
import TodoContainer from './components/TodoContainer';
import AddTodoForm from './components/AddTodoForm';
import TodoLanding from './components/TodoLanding';
import TodoNavigation from './components/TodoNavigation';

const table = process.env.REACT_APP_TABLE_NAME;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todo" element={<AddTodoForm />} />
        <Route path="/" element={<TodoLanding />} />
        <Route path="/home" element={<TodoContainer tableName={table} />} />
        <Route path="/landing" element={<TodoLanding />} />
        <Route path="/navigation" element={<TodoNavigation />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App; 