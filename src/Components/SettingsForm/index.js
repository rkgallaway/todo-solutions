import { useContext, useState } from "react";
import { SettingsContext } from "../../Context/Settings";
import useForm from '../../hooks/form.js';

import './styles.css';

const SettingsForm = () => {
  const { showCompleted, changeItems, sortBy, storeSettings } = useContext(SettingsContext);
  const [defaultValues] = useState({});
  const { handleChange, handleSubmit } = useForm(updateSettings, defaultValues);

  function updateSettings(newSettings){
    if(newSettings.completed || newSettings.completed === false) showCompleted();
    if(newSettings.pageItems) changeItems(newSettings.pageItems);
    if(newSettings.sort) sortBy(newSettings.sort);
    storeSettings();
  }

  return (
    <form id="settings" onSubmit={handleSubmit}>

        <h1>Change Settings</h1>

        <label>
          <span>Show Completed Items</span>
          <input onChange={handleChange} name="completed" type="text" placeholder="true or false" />
        </label>

        <label>
          <span>To Do's per Page</span>
          <input onChange={handleChange} name="pageItems" type="text" placeholder="# of to-do's" />
        </label>

        <label>
          <span>Sort By:</span>
          <input onChange={handleChange} name="sort" type="text" placeholder="key word" />
        </label>

        <label>
          <button type="submit">Change Settings</button>
        </label>
      </form>
  )

};

export default SettingsForm;
