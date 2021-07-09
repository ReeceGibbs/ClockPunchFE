import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
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

const NewLogForm = () => {

    const [error, setError] = useState(null);

    const [isLoaded, setIsLoaded] = useState(false);

    const [employees, setEmployees] = useState([]);

    const [projects, setProjects] = useState([]);

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

    useEffect(() => {
        fetch("https://localhost:44327/api/projects", getRequest)
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setProjects(result);
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

    const [project, setProject] = useState("");

    const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));

    const [selectedHours, setHours] = useState(1);

    const handleEmployeeChange = (event) => {
        setEmployee(event.target.value);
    }

    const handleProjectChange = (event) => {
        setProject(event.target.value);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    const handleHoursChange = (event, hours) => {
        setHours(hours);
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
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <InputLabel id="date-picker-label" className={style.formControlLabel}>Date</InputLabel>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                labelId="date-picker-label"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                                className={style.datePicker}
                            />
                        </MuiPickersUtilsProvider>
                    </Box>
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
                    <Box m={1}>
                        <FormControl className={style.formControl}>
                            <InputLabel id="project-select-label" className={style.formControlLabel}>Project</InputLabel>
                            <Select labelId="project-select-label" id="project-select" value={project} onChange={handleProjectChange}>
                                {projects.map(item => {
                                    return (
                                        <MenuItem value={item["Id"]}>{item["ProjectName"]}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box m={1} className={style.hoursSliderDiv} alignSelf="flex-end">
                        <Typography id="hours-slider" gutterBottom className={style.formControlLabel}>Hours</Typography>
                        <ThemeProvider theme={componentTheme}>
                            <Slider
                                defaultValue={1}
                                getAriaValueText={hoursText}
                                aria-labelledBy="discrete-slider"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={1}
                                max={24}
                                onChangeCommitted={handleHoursChange}
                            />
                        </ThemeProvider>
                    </Box>
                    <Box m={1} alignSelf="center">
                        <ThemeProvider theme={componentTheme}>
                            <Button onClick={() => postTimeLog({
                                "EmployeeId": employee,
                                "ProjectId": project,
                                "LogDate": selectedDate,
                                "Hours": selectedHours
                            })}>Submit</Button>
                        </ThemeProvider>
                    </Box>
                </Box>
            </div>
        )
    }
}

export default NewLogForm