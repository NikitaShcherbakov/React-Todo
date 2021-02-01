import React from "react";

import AddTask from "./AddTask"
import ItemList from "./ItemList"
import Filter from "./Filter"
// import TaskMarker from "./TaskMarker"

const ToDoPage = () => {
    return (
        <>
            <AddTask />
            {/* <TaskMarker /> */}
            <Filter />
            <ItemList />
        </>
    )
}
export default ToDoPage;