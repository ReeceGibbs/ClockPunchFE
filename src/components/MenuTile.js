import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/styles'

const modalX = 50;
const modalY = 50;

const modalHeight = 20;
const modalWidth = 70;

const menuTileStyle = makeStyles({

    tile: {
        height: "150px",
        width: "250px",
        background: "#fb532c"
    },
    text: {
        color: "#ffffff",
        fontFamily: "Roboto",
        marginTop: 0
    },
    modalBackground: {

        top: `${modalY - (modalHeight / 2)}vh`,
        left: `${modalX - (modalWidth / 2)}vw`,
        position: "absolute",
        height: `${modalHeight}vh`,
        width: `${modalWidth}vw`,
        backgroundColor: "#ffffff",
        outline: "none",
        borderRadius: 3
    },
    flexContainer: {
        height: `${modalHeight}vh`
    }
})

const MenuTile = ({ logo, text, modalBody }) => {

    const style = menuTileStyle();
    
    const [showModal, setShow] = useState(false);

    const handleOpen = () => setShow(true);

    const handleClose = () => setShow(false);

    return (
        <div>
            <Box m={2}>
                <Paper className={style.tile} onClick={handleOpen}>
                    <Box display="flex" flexDirection="column" justifyContent="center" p={3} m={1}>
                        <Box alignSelf="center">
                            <img src={logo} />
                        </Box>
                        <Box alignSelf="center">
                            <h2 className={style.text}>{text}</h2>
                        </Box>
                    </Box>
                </Paper>
            </Box>
            <Modal open={showModal} onClose={handleClose}>
                <div className={style.modalBackground}>
                    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" className={style.flexContainer}>
                        {modalBody}
                    </Box>
                </div>
            </Modal>
        </div>
    )
}

MenuTile.defaultProps = {
    text: "menu tile",
    modalBody: "this is a modal"
}

export default MenuTile