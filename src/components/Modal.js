import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import TaskMarker from "./TaskMarker";

const Modal = (props) => {
  const [selectedTitle, setSelectedTitle] = useState(props.selectedItem?.text);
  const [selectedColor, setSelectedMarker] = useState(props.selectedItem.selectedColor);
  const [selectedDescription, setSelectedDescription] = useState([]);

  const handleChangeTitle = (event) => {
    setSelectedTitle(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setSelectedDescription(event.target.value);
  };
  const onUpdateMarker = (marker) => {
    setSelectedMarker(marker);

    if (marker === props.selectedItem.selectedColor) {
        setSelectedMarker("");
    }

  };
  const isCloseModal = () => {
    props.onModalClose(true);
  };
  const onSave = () => {
    props.onUpdate(selectedTitle, selectedColor, selectedDescription);
    isCloseModal();
  };

  const onSaveKey = (event) => {
    const isEnter = event.key === "Enter" || event.keyCode === 13;
    if (isEnter) {
      onSave();
    }
  };
  useEffect(() => {
    setSelectedTitle(props.selectedItem?.text);
    setSelectedMarker(props.selectedItem.selectedColor);
    setSelectedDescription(props.selectedItem.description)
  }, props.selectedItem);
  return (
    <React.Fragment>
      <div className={props.isOpenModal ? "modal" : "modal active"}>
        <div className="box-modal-2">
        <textarea
            className="edit-text title"
            placeholder="edit title"
            maxLength="50"
            autoFocus
            value={selectedTitle}
            onChange={handleChangeTitle}
            onKeyPress={() => onSaveKey(event)}
          ></textarea>
          <textarea
            className="edit-text description"
            placeholder="add description"
            value={selectedDescription}
            onChange={handleChangeDescription}
            maxLength="250"
          ></textarea>
        </div>
        <TaskMarker onSelectMarker={onUpdateMarker} selectedColor={selectedColor}/>
        <div className="box-modal-1">
          <button className="btn-modal" onClick={onSave}>
            Save
          </button>
          <button className="btn-modal" onClick={isCloseModal}>
            Close
          </button>
        </div>
      </div>
      <div className={props.isOpenModal ? "overlay" : "overlay active"}></div>
    </React.Fragment>
  );
};
Modal.propTypes = {
  isOpenModal: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  selectedItem: PropTypes.object.isRequired
};
export default Modal;
