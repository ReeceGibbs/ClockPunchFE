import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { createMuiTheme } from '@material-ui/core/styles'
import { makeStyles, ThemeProvider } from '@material-ui/styles'

const accentColour = "#fb532c";

const formStyle = makeStyles({

    formControl: {
        minWidth: 150,
        paddingTop: 15
    },
    formControlLabel: {
        color: accentColour,
        fontSize: "15px"
    },
    hoursSliderDiv: {
        width: 300,
        marginBottom: 0
    },
    textField: {
        "& > *": {
            width: "64ch"
        }
    }
})

const componentTheme = createMuiTheme({

    overrides: {
        MuiSlider: {
            thumb: {
                color: accentColour
            },
            track: {
                color: accentColour
            },
            rail: {
                color: "black"
            }
        },
        MuiButton: {
            text: {
                // Some CSS
                background: accentColour,
                borderRadius: 3,
                color: 'white',
                height: 48,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            }
        }
    }
})

const hoursText = (value) => {
    return `${value}hrs`;
}

const EmployeesForm = () => {

    const [error, setError] = useState(null);

    const [isLoaded, setIsLoaded] = useState(false);

    const [employees, setEmployees] = useState([]);

    const getRequest = {
        method: "GET",
        headers: { "Content-Type": "application/json"}
    }

    useEffect(() => {
        fetch("https://localhost:44327/api/employees", getRequest)
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setEmployees(result);
            },
            (error) => {
                setIsLoaded(false);
                setError(error);
            })
    }, [])

    const postTimeLog = (timeLogData) => {

        const postRequest = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(timeLogData)
        }

        fetch("https://localhost:44327/api/timelogs", postRequest)
        .then(res => res.json())
        .then(() => {
            window.location.reload();
        },
        (error) => {
            setError(error);
        })
    }

    const style = formStyle();

    const [employee, setEmployee] = useState("");

    const [employeeName, setEmployeeName] = useState("EmployeeName");

    const handleEmployeeChange = (event) => {
        setEmployee(event.target.value);
    }

    if (error) {
        return <div>{error.message}</div>
    }
    else if (!isLoaded || employees.length < 1) {
        return <div>Loading...</div>
    }    
    else {
        return (
            <div>
                <Box display="flex" flexDirection="row" flexWrap="wrap">
                    <Box m={1}>
                        <FormControl className={style.formControl}>
                            <InputLabel id="employee-select-label" className={style.formControlLabel}>Employee</InputLabel>
                            <Select labelId="employee-select-label" id="employee-select" value={employee} onChange={handleEmployeeChange}>
                                {employees.map(item => {
                                    return (
                                        <MenuItem value={item["Id"]}>{item["EmployeeName"]}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box m={1} alignSelf="flex-end">
                        <TextField id="employeeNameField" label="Employee Name" />
                    </Box>
                    <Box m={1} alignSelf="flex-end">
                        <ThemeProvider theme={componentTheme}>
                            <Button onClick={() => postTimeLog({
                                "EmployeeId": employee,
                                "EmployeeName": ""
                            })}>Submit Changes</Button>
                        </ThemeProvider>
                    </Box>
                </Box>
            </div>
        )
    }
}

export default EmployeesForm