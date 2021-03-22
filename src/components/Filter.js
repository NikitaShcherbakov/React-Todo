import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";

const Filter = () => {
  const allItemCounting = useSelector((state) => state.allItemCounting);
  const allItemChecked = useSelector((state) => state.allItemChecked);
  const allItemUnchecked = allItemCounting - allItemChecked;
  const filterItems = [
    `All=${+ allItemCounting}`,
    `Checked=${+ allItemChecked}`,
    `Unchecked=${+ allItemUnchecked}`
  ];
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState(filterItems[0]);

  const onFilterItems = (selectedItem) => {
    setActiveFilter(selectedItem);

  const actionFilterBy = (selectedItem) => {
    return { 
      type: "FILTER_BY",
      payload: {
          filterBy: selectedItem
        }
    };
  } 
  dispatch(actionFilterBy(selectedItem));
  }
  return (
    <div className="box-switch">
      {filterItems.map((selectedItem, index) =>
        <div className={activeFilter === selectedItem ? "switch-task active" : "switch-task"} onClick={() => onFilterItems(selectedItem)} key={index}>{selectedItem}</div>
      )}
    </div>
  )
};
export default Filter;