import React, { useEffect, useState, useContext, useCallback } from 'react';
import useForm from '../../hooks/form.js';
import List from '../List';
import { AuthContext } from '../../Context/Auth/index.js';
import { v4 as uuid } from 'uuid';
import { When } from 'react-if';
import useAxios from '../../hooks/useAxios.js';

const ToDo = ({ incomplete, setIncomplete }) => {

  const { makeRequest, response } = useAxios();

  const { can } = useContext(AuthContext);
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    const options = {
      baseURL: 'https://api-js401.herokuapp.com/api/v1',
      url: 'todo',
      method: 'post',
      data: item,
    }
    makeRequest(options);
  }

  function deleteItem(id) {
    const options = {
      baseURL: 'https://api-js401.herokuapp.com/api/v1',
      url: `todo/${id}`,
      method: 'delete',
    }
    makeRequest(options);
  }

  function updateItem(id, data) {
    console.log('data from update', data)
    const item = list.filter(item => item._id === id)[0] || {}
    console.log('item from update', item )
    if (item._id) {
      const options = {
        baseURL: 'https://api-js401.herokuapp.com/api/v1',
        url: `todo/${id}`,
        method: 'put',
        data: {...item, assignee: data.assignee}
      }
      console.log('options from update', options)
      makeRequest(options);
    }
  }

  function toggleComplete(id) {
    const item = list.filter(item => item._id === id)[0] || {}
    if (item._id) {
      const options = {
        baseURL: 'https://api-js401.herokuapp.com/api/v1',
        url: `todo/${id}`,
        method: 'put',
        data: {...item, complete: !item.complete}
      }
      makeRequest(options);
    }
  }

  const getToDoList = useCallback(async () => {
    const options = {
      baseURL: 'https://api-js401.herokuapp.com/api/v1',
      url: 'todo',
      method: 'get',
    }
    makeRequest(options);
  }, [makeRequest])

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  useEffect(() => {
    if (response.results) {
      setList(response.results)
    } else {
      getToDoList();
    }
  }, [response, getToDoList])

  useEffect(() => {
    getToDoList();
  }, [getToDoList])

  return (
    <>

      <When condition={can('create')}>
        <form onSubmit={handleSubmit}>

          <h2>Add To Do Item</h2>

          <label>
            <span>To Do Item</span>
            <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
          </label>

          <label>
            <span>Assigned To</span>
            <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
          </label>

          <label>
            <span>Difficulty</span>
            <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
          </label>

          <label>
            <button type="submit">Add Item</button>
          </label>
        </form>
      </When>

      <List list={list} toggleComplete={toggleComplete} deleteItem={deleteItem} updateItem={updateItem} />

    </>
  );
};

export default ToDo;
