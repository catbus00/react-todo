const fetchAndSortTodos = async () => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
    },
  };
  const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    const message = `Error: ${response.status}`;
    throw new Error(message);
  }
  const data = await response.json();
  const todos = data.records.map((todo) => ({
    title: todo.fields.title,
    id: todo.id,
    createdTime: todo.createdTime,
    isChecked: todo.done,
  }));

  const sortedTodos = todos.sort((a, b) => {
    if (a.createdTime > b.createdTime) {
      return 1;
    } if (a.createdTime < b.createdTime) {
      return -1;
    }
    return 0;
  });

  return sortedTodos;
};

const postTodo = async (todo) => {
  const newTodo = {
    fields: {
      title: todo.title,
    },
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
    },
    body: JSON.stringify(newTodo),
  };

  const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const message = `Error has occurred: ${response.status}`;
      throw new Error(message);
    }

    const dataResponse = await response.json();
    return dataResponse;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const removeTodo = async (id) => {
  const deleteUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/${id}`;
  const deleteOptions = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
    },
  };
  try {
    const response = await fetch(deleteUrl, deleteOptions);
    if (!response.ok) {
      throw new Error(`Error deleting todo: ${response.status}`);
    }
    return id;
  } catch (error) {
    console.log('Delete Error:', error.message);
    return undefined;
  }
};

const addTodo = async (newTodo) => {
  const dataResponse = await postTodo(newTodo);
  if (dataResponse) {
    return dataResponse.id;
  }
  return undefined;
};

const api = {
  fetchAndSortTodos, postTodo, removeTodo, addTodo,
};

export default api;
 