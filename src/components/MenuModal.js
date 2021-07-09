import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core';
import Modal from '@material-ui/core/Modal'

const modalStyle = makeStyles({

    modalBackground: {

        position: "absolute",
        width: 400,
        backgroundColor: "#ffffff",
    }
})

const MenuModal = ({openButton}) => {

    const style = modalStyle();

    const [showModal, setShow] = useState(false);

    const handleOpen = () => setShow(true);

    const handleClose = () => setShow(false);

    return (
        <div>
            <Modal 
                open={showModal}
                onClose={handleClose}
            >
                <div className={style.modalBackground}>
                    <h1>Test</h1>
                </div>
            </Modal>
        </div>
    )
}

export default MenuModal