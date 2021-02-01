import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import TaskMarker from "./TaskMarker";


const AddTask = () => {
    const [selectedColor, setSelectedColor] = useState("");
    const dispatch = useDispatch();
    let inputRef = useRef();

    const addItem = (event) => {
        const newItem = {
            text: inputRef.current.value,
            id: Date.now(),
            status: "pending",
            checked: false,
            description: "",
            selectedColor
        };
        event.preventDefault();
        if (!!newItem.text.trim()) {
            dispatch({ type: "CREATE_ITEM", payload: newItem});
          }
          inputRef.current.value = "";
          inputRef.current.focus();
    }
    const onUpdateMarker = (marker) => {
        setSelectedColor(marker);
      };
    return(
            <div>
                <h1>Task list</h1>
                <div className="row-1">
                    <form onSubmit={addItem}>
                        <input 
                        maxLength="50"
                        className="edit-project-name" 
                        type="text" placeholder="Add new item" 
                        defaultValue="" 
                        ref={inputRef} />
                        <button className="btn-save btn-page" type="submit">Add</button>
                    </form>
                </div>
                <TaskMarker onSelectMarker={onUpdateMarker} selectedColor={selectedColor}/>
            </div>
    )
}
export default AddTask;