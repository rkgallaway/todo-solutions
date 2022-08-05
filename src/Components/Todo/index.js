import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form.js';
import List from '../List';
import { AuthContext } from '../../Context/Auth/index.js';
import { v4 as uuid } from 'uuid';
import { When } from 'react-if';

const ToDo = ({ incomplete, setIncomplete }) => {

  const { can } = useContext(AuthContext);
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    // console.log(item);
    setList([...list, item]);
    // setShowList(true)
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function updateItem(id, data){
    const updatedItems = list.map(item => item.id === id ? {...item, ...data} : item)
    setList(updatedItems)
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

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

      <List list={list} toggleComplete={toggleComplete} deleteItem={deleteItem} updateItem={updateItem}/>

    </>
  );
};

export default ToDo;
