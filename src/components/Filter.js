import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterItems } from "../constants";

const Filter = () => {
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState(filterItems[0]);
  const onFilterItems = (selectedItem) => {
    setActiveFilter(selectedItem);
    dispatch({type: "FILTER_BY", payload: {
      filterBy: selectedItem
    }});
  }

  return (
    <div className="box-switch" >
      {filterItems.map((selectedItem, index) =>
        <div className={activeFilter === selectedItem ? "switch-task active" : "switch-task"} onClick={() => onFilterItems(selectedItem)} key={index}>{selectedItem}</div>
      )}
    </div>
  );
};
export default Filter;