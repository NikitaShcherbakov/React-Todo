import React from "react";
import PropTypes from 'prop-types';
import { colors } from "../constants";

const TaskMarker = (props) => {
    const addLabel = (color) => {
        props.onSelectMarker(color)
        if (color === props.selectedColor) {
            props.onSelectMarker("");
        }
    }

    return(
        <div className="row-2">
            <div className="color-selection">
            {colors.map((color) => {
                return <div style={{background: color}} 
                className={props.selectedColor === color ? "item-marker checked" : "item-marker"} 
                onClick={() => addLabel(color)} 
                key={color}/>
            })}
            </div>
        </div>
    )
}
TaskMarker.defaultProps = {
    selectedColor: ""
}
TaskMarker.propTypes = {
    onSelectMarker: PropTypes.func.isRequired,
    selectedColor: PropTypes.string.isRequired
};
export default TaskMarker;
