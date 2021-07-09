import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'

const footerStyle = makeStyles({

    footer: {
        color: "#fb532c",
        fontFamily: "Roboto",
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        textAlign: "right",
        paddingRight: "15px"
    }
})

const Footer = ({text, logo}) => {

    const style = footerStyle();

    return (
        <div className={style.footer}>
            <Box display="flex" justifyContent="flex-end" flexDirection="row" p={1} m={1}>
                <Box p={1}>
                    <h1>{text}</h1>
                </Box>
                <Box p={1}>
                    <img src={logo} />
                </Box>
            </Box>
        </div>
    )
}

Footer.defaultProps = {
    text: "{footer}"
}

export default Footer
