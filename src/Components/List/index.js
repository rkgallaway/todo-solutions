import { useState, useContext } from "react";
import { AuthContext } from "../../Context/Auth";
import { SettingsContext } from '../../Context/Settings';
import { EditableText } from '@blueprintjs/core';
import Auth from "../Auth";
import './styles.scss'

const List = ({ list, toggleComplete, deleteItem, updateItem }) => {

  const settings = useContext(SettingsContext);
  const { can } = useContext(AuthContext);
  const [page, setPage] = useState(0);
  const update = can('update');

  // Pagination
  const renderList = settings.completed ? list : list.filter(item => settings.completed ? true : !item.complete)
  const listStart = settings.pageItems * page || 0;
  const listEnd = listStart + settings.pageItems || list.length;
  const pages = new Array(Math.ceil(renderList.length / settings.pageItems)).fill('');
  const displayList = renderList ? renderList.slice(listStart, listEnd) : [];

  const handlePrevious = () => {
    const prev = Object.keys(pages)[page - 1] || 0;
    setPage(prev);
  }

  const handleNext = () => {
    const nxt = Object.keys(pages)[page + 1] || pages.length
    setPage(nxt);
  }

  return (
    <>
      {displayList.map(item => (
        <div key={item._id}>
          {
            update ?
              <>
                <span>Task: </span>
                <EditableText style={{ display: 'inline-block' }} onConfirm={(value) => updateItem(item._id, { text: value })} defaultValue={item.text} placeholder={item.text} />
              </>
              :
              <p>{item.text}</p>
          }
          {
            update ?
              <>
                <span>Assigned To: </span>
                <EditableText onConfirm={(value) => updateItem(item._id, { assignee: value })} defaultValue={item.assignee} placeholder={item.assignee} />
              </>
              :
              <p>{item.assignee}</p>
          }
          {
            update ?
              <>
                <span>Difficulty: </span>
                <EditableText onConfirm={(value) => updateItem(item._id, { difficulty: value })} defaultValue={item.difficulty} placeholder={item.text} />
              </>
              :
              <p>{item.difficulty}</p>
          }
          <button onClick={() => toggleComplete(item._id)}>Complete: {item.complete.toString()}</button>
          <Auth capability={'delete'}>
            <button onClick={() => deleteItem(item._id)}> Delete </button>
          </Auth>
          <Auth capability={'update'}>
            <p>task editing available</p>
          </Auth>
          <hr />
        </div>
      ))}

      {page >= 1 && <button onClick={handlePrevious}>&lt;&lt;</button>}
      {
        pages.length > 1 && pages.map((n, index) => (
          <button key={`page-${index}`} onClick={() => setPage(index)}>{index + 1}</button>
        ))
      }
      {page + 2 <= pages.length && <button onClick={handleNext}>&gt;&gt;</button>}
    </>
  )
}

export default List;
