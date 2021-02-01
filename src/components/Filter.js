import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterItems } from "../constants";

const Filter = () => {
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState(filterItems[0]);
  const onFilterItems = (f) => {
    setActiveFilter(f)
    dispatch({type: "FILTER_BY", payload: {
      filterBy: f
    }})
  }

  return (
    <div className="box-switch" >
      {filterItems.map((f, index) =>
        <div className={activeFilter === f ? "switch-task active" : "switch-task"} onClick={() => onFilterItems(f)} key={index + f}>{f}</div>
      )}
    </div>
  );
};

export default Filter;