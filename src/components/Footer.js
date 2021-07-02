import React from 'react'
import Box from '@material-ui/core/Box'

const Footer = ({text, logo}) => {
    return (
        <div className="footer">
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
