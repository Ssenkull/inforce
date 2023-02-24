import {useState} from "react";
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import AddItem from "../../UI/Modal";

const AddButton = ({setUpdate,update}) => {

  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    setIsOpen(!isOpen);
    setUpdate(!update)
  }

    return (
      <>
      <Modal
        open={isOpen}
        onClose={openHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddItem openHandler={openHandler}/>
      </Modal>
      <Button variant="contained" onClick={openHandler}>Add</Button>
      </>
    );
};

export default AddButton;