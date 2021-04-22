import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterItems } from "../constants";
import { filterBy as actionFilterBy} from "../redux/Actions"

const Filter = () => {
  const allItemCounting = useSelector((state) => state.allItemCounting);
  const allItemChecked = useSelector((state) => state.allItemChecked);
  const allItemUnchecked = allItemCounting - allItemChecked;

  let itemStatusAndQuantity = [
    {
      name: 'All',
      value: allItemCounting
    },
    {
    name: 'Checked',
    value: allItemChecked
  },
  {
    name: 'Unchecked',
    value: allItemUnchecked
  },
]

  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState(filterItems[0]);

  const onFilterItems = (selectedItem) => {
    setActiveFilter(selectedItem);
    dispatch(actionFilterBy(selectedItem));
  };
  return (
    <div className="box-switch">
      {itemStatusAndQuantity.map(({name, value}) => (
        <div
          className={activeFilter === name ? "switch-task active" : "switch-task"}
          onClick={() => onFilterItems(name)}
          key={name + value}>
          {name} : {value}
        </div>
      ))}
    </div>
  );
};
export default Filter;
