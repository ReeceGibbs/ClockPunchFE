import React from 'react'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import MenuTile from './MenuTile'
import NewLogForm from './NewLogForm'
import EmployeesForm from './EmployeesForm'
import {makeStyles} from '@material-ui/core/styles'
import TimeLogLogo from '../images/icons/deadline.png'
import TeamLogo from '../images/icons/team.png'
import ProjectsLogo from '../images/icons/presentation.png'
import ReportsLogo from '../images/icons/analytics.png'

const menuStyle = makeStyles({
    mainContainer: {

        marginTop: "100px"
    }
})

const Menu = () => {

    const style = menuStyle();

    return (
        <div>
            <Container className={style.mainContainer}>
                <Box display="flex" justifyContent="center">
                    <Paper elevation={3} className={style.backPanel}>
                        <Box display="flex" justifyContent="center" flexDirection="row" flexWrap="wrap" p={1} m={1}>
                            <MenuTile logo={TimeLogLogo} text="New Time Log" modalBody={<NewLogForm />}/>
                            <MenuTile logo={TeamLogo} text="Employees" modalBody={<EmployeesForm />}/>
                            <MenuTile logo={ProjectsLogo} text="Projects" />
                            <MenuTile logo={ReportsLogo} text="Reports" />
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </div>
    )
}

export default Menu
