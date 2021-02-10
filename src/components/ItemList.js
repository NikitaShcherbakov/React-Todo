import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateOfCreation } from "../constants.js";

import Modal from "./Modal";
import Checkbox from "./Checkbox";
import SwipeItem from "./Swipe";

const ItemList = () => {
    const dispatch = useDispatch();
    const filterBy = useSelector((state) => state.filterBy);

    const filterItems = (state) => {
        if (state.filterBy === "Checked" || state.filterBy === "Unchecked") {
            let isChecked = "Checked" === filterBy;
            return state.items.filter(c => c.checked === isChecked);
        } else {
            return state.items.filter(Boolean);
        }
    }
    const items = useSelector((state) => filterItems(state))
    
    const [isOpen, setOpen] = useState(true);
    const [selectedItem, setSelectedItem] = useState({});

    const deleteItem = (id) => {
        dispatch({ type: "DELETE_ITEM", id });
    }
    const isOpenModal = (index) => {
        setSelectedItem(items.find(item => item.id == index));
        setOpen(false);
    }
    const isCloseModal = (boolean) => {
        setOpen(boolean)
    }
    const onUpdate = (itemText, itemMarker, description) => {
        selectedItem.text = itemText;
        selectedItem.selectedColor = itemMarker;
        selectedItem.description = description;
    }
    const onCheck = (id) => {
        dispatch({ type: "CHECKED", id });
    }
    return (
        <div className="box-item">
            {items.map(({ text, id, selectedColor, checked, description }) => {
                return <SwipeItem key={id} onCheck={() => onCheck(id)}>
                    <div className="item-list" key={id}>
                        <div className="row">
                            <div className="wrap-checkbox">
                                <Checkbox isChecked={checked} onCheck={() => onCheck(id)} />
                                {selectedColor ? <div className="item-marker" style={{ background: selectedColor }} /> : ""}
                            </div>
                            <div className="wrap-icon">
                                <div className="task-item-edit" onClick={() => isOpenModal(id)} />
                                <div className="task-item-remove" onClick={() => deleteItem(id)} />
                            </div>
                        </div>
                        <div className="wrap-title">
                            <span>{text}</span>
                        </div>
                        <div className="wrap-description">
                            {description ? <span>{description}</span> : ""}
                        </div>
                        <div className="wrap-date">
                            <span>{dateOfCreation}</span>
                        </div>
                    </div>
                </SwipeItem>
            })}
                <Modal 
                isOpenModal={isOpen} 
                onModalClose={isCloseModal} 
                selectedItem={selectedItem} 
                onUpdate={onUpdate} />
        </div>
    )
}
export default ItemList;