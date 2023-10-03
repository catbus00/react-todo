const url = (table) =>
  `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${table}`;

const fetchAndSortTodos = async (table, sortOptions) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
    },
  };
  const endpoint = `${url(table)}${sortOptions}`;
  const response = await fetch(endpoint, options);
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
    }
    if (a.createdTime < b.createdTime) {
      return -1;
    }
    return 0;
  });

  return sortedTodos;
};

const postTodo = async (table, title) => {
  const newTodo = {
    fields: {
      title,
    },
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
    },
    body: JSON.stringify(newTodo),
  };

  try {
    const endpoint = url(table);
    const response = await fetch(endpoint, options);
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

const removeTodo = async (table, id) => {
  const deleteUrl = `${url(table)}/${id}`;
  const deleteOptions = {
    method: "DELETE",
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
    console.log("Delete Error:", error.message);
    return undefined;
  }
};

const addTodo = async (table, title) => {
  const dataResponse = await postTodo(table, title);
  return dataResponse;
};

const api = {
  fetchAndSortTodos,
  postTodo,
  removeTodo,
  addTodo,
  url,
};

export default api;
