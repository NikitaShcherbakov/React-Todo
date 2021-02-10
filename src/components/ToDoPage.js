import React from "react";
import AddTask from "./AddTask"
import ItemList from "./ItemList"
import Filter from "./Filter"

const ToDoPage = () => {
    return (
        <>
            <AddTask />
            <Filter />
            <ItemList />
        </>
    )
}
export default ToDoPage;