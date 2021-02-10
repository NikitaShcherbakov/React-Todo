import React from "react";
import { useSelector } from "react-redux";
import { searchError } from "../constants.js";

const ParserItem = (props) => {
    const timestamp = props.match.params.timestamp;

    const itemSelector = (state) => state.newArr.filter((item) => item.timestamp === timestamp)[0];

    const item = useSelector((state) => itemSelector(state));

    return(
        <div className="box-parser-details">
            {item ? (
                <div className="box-item-parser">
                    <div className="parser-item-title">{item.title}</div>
                    <div className="parser-item-content">{item.content}</div>
                    <img src={item.link} className="parser-item-id" />
                    <div className="parser-item-updated">{item.updated}</div>
                </div>) : {searchError}}
        </div>
    )
}

export default ParserItem;