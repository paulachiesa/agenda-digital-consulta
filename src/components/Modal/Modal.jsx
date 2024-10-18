import Modal from '@mui/material/Modal';
import Button from '../Button/Button';
import { Box } from "@mui/material";
import * as React from "react";
import "./Modal.css";

const CustomModal = ({ abrirModal, setAbrirModal, children, tituloModal }) => {
  return (
    <div>
      <Modal
        open={abrirModal}
        onClose={() => setAbrirModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='modalBoxContainer'>
          <div>
            {children}
          </div>
          {/* <br /> */}
          <div className='modalBoxFooter'>
            <div className='buttonContainer'>
              <Button textoBoton='Cerrar' onClickFunction={() => setAbrirModal(false)}/>
            </div>
          </div>

        </Box>
      </Modal>
    </div>
  );
}


export default CustomModal;