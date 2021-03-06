import React, { useContext, useEffect, useState } from "react";
import { Field } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, FieldArray } from "formik";
import { useCurrentUser } from "../../containers/CurrentUser";
import { TrainingContext } from "../../containers/GetTraining";
import Alert from "../Alert";
import { 
    Box, 
    Button,
    Grid,
    Fab,
    Paper,
    Typography,
    Backdrop,
    CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { TextField } from 'formik-material-ui';
import { DatePicker } from 'formik-material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    }
}));

function Training () {
    const classes = useStyles();
    const { loading, response, error, setTrainingID } = useContext(TrainingContext);
    const [formValues, setFormValues] = useState(null);
    const currentUser = useCurrentUser();
    const [request, setRequest] = useState({ method: null, url: null });
    const [dialog, setDialog] = useState({ state:false, header: null, text: null });
    const [requestID, setRequestID] = useState(null);

    /** PREFILL FORM WITH SAVED DATA */
    useEffect(() => {
        if (response !== null) {
            if(Array.isArray(response)) {
                const trainings = response.map((training) => {
                    if (training.user.id === currentUser.id) return training;
                    return null;
                }).filter((el) => { return el !== null });

                if (trainings.length !== 0) {
                    const cleanedTrainings = trainings.map((training) => {
                        return {
                            id: training.id,
                            from: training.from,
                            to: training.to,
                            provider: training.provider,
                            skills: training.skills,
                        }
                    });

                    const savedData = { trainings: [] };
                    savedData.trainings.push(...cleanedTrainings);
                    setFormValues(savedData);
                } else {
                    if (requestID === null) {
                        setRequest({ method: 'POST', url: 'https://dekra-form-api-m8bsw.ondigitalocean.app/trainings' });
                    } else {
                        setTrainingID(requestID);
                    }
                }
            } else {
                const savedData = { trainings: [] };
                savedData.trainings.push(response);
                setFormValues(savedData);
            }
        }
    }, [response, currentUser.id, requestID, setTrainingID]);

    /** INITIAL VALUES */
    const initialValues = {
        trainings: [
            { from: new Date(), to: new Date(), provider: '', skills: '' }
        ]
    };

    const validationSchema = Yup.object({
        trainings: Yup.array()
            .of(
                Yup.object().shape({
                    from: Yup.date().required('This field is required'),
                    to: Yup.date().required('This field is required'),
                    provider: Yup.string().required('This field is required'),
                    skills: Yup.string().required('This field is required')
                })
            ).min(1).max(4)
    });
    
    const onSubmit = async function (values, actions) {

        // FUNCTION TO SAVE EACH EXPERIENCE
        const submitValues = async function (valuesToSubmit) {
            if ( typeof valuesToSubmit.id === 'undefined' ) {
                const data = new FormData(); 
            
                const info = {
                    'from': valuesToSubmit.from,
                    'to': valuesToSubmit.to,
                    'provider': valuesToSubmit.provider,
                    'skills': valuesToSubmit.skills
                }

                data.append('data', JSON.stringify(info));

                await axios({
                    method: 'POST',
                    url: 'https://dekra-form-api-m8bsw.ondigitalocean.app/trainings',
                    data,
                    withCredentials: true
                })
                    .then((res) => {
                        //setRequestID(res.data.id);
                        setDialog({ state: true, header: "Status: Successful", text: request.method === "POST" ? "Information Successfully CREATED!" : "Information Successfully UPDATED!" });
                    })
                    .catch(error => {
                        setDialog({ state: true, header: "An Error Occurred!", text: "Oh snap! Something went wrong. Please change a few things up and try submitting again. Thank you!" });
                    });
            } else {
                return;
            }
        }

        // MAP THROUGH TRAININGS
        values.trainings.map((training) => (
            submitValues(training)    
        ))
    }

    return (
        <>
            { loading && 
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop> 
            }
            { error && <Typography variant="overline" color="secondary" display="block" align="center">Please Refresh the Browser.</Typography> }

            <Alert 
                dialog={dialog}
                handleClick={ 
                    () => { 
                        setDialog(false);
                        setTrainingID(requestID);
                    }
                }
            />

            <Formik
                initialValues={ formValues || initialValues }
                validationSchema={ validationSchema }
                onSubmit={ onSubmit }
                enableReinitialize
            >
                {
                    ({submitForm, isSubmitting, touched, errors, values}) => (
                        <Form>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <FieldArray name="trainings">
                                    {({ push, remove }) =>(
                                        <>
                                            {values.trainings.map((_, index) => (
                                                <Box px={4} py={2} key={index}>
                                                    <Paper variant="outlined">
                                                        <Grid container>
                                                            <Grid item lg={10} xs={12}>
                                                                <Box px={4} pt={4} pb={2}>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item lg={6} xs={12}>
                                                                            <Field
                                                                                component={DatePicker}
                                                                                label="From:"
                                                                                name={`trainings[${index}].from`}
                                                                                inputVariant="outlined"
                                                                                variant="dialog"
                                                                                views={["year", "month"]}
                                                                                fullWidth
                                                                            />
                                                                        </Grid>
                                                                        <Grid item lg={6} xs={12}>
                                                                            <Field
                                                                                component={DatePicker}
                                                                                label="To:"
                                                                                name={`trainings[${index}].to`}
                                                                                inputVariant="outlined"
                                                                                variant="dialog"
                                                                                views={["year", "month"]}
                                                                                fullWidth
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Box>
                                                                <Box px={4} py={2}>
                                                                    <Field
                                                                        component={TextField}
                                                                        type="text"
                                                                        label="Training Provider"
                                                                        name={`trainings[${index}].provider`}
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        multiline
                                                                        rows={6}
                                                                        helperText="Please provide the title of the training and on a new line the name of the training provider"
                                                                    />
                                                                </Box>
                                                                <Box px={4} pb={4} pt={2}>
                                                                    <Field
                                                                        component={TextField}
                                                                        type="text"
                                                                        label="Skills Acquired"
                                                                        name={`trainings[${index}].skills`}
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        helperText="Please enter comma separated values"
                                                                    />
                                                                </Box>
                                                            </Grid>
                                                            <Grid container item lg={2} xs={12} justify="center" alignItems="center">
                                                                <Fab color="secondary" aria-label="add" className={classes.margin} onClick={() => remove(index)}>
                                                                    <RemoveIcon />
                                                                </Fab>
                                                            </Grid>
                                                        </Grid>
                                                    </Paper>
                                                </Box>
                                            ))}

                                            <Box px={4} py={2}>
                                                <Button 
                                                    size="large" 
                                                    color="primary"
                                                    startIcon={<AddIcon />}
                                                    onClick={ () => push({ from: new Date(), to: new Date(), provider: '', skills: '' })}
                                                >
                                                        Add Training
                                                </Button>
                                            </Box>
                                        </>
                                    )}
                                </FieldArray>
                            </MuiPickersUtilsProvider>
                            
                            <Box px={4} py={2} display="flex" justifyContent="flex-end">
                                <Button variant="contained" color="primary" type="submit" size="large">Submit</Button>
                            </Box>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}

export default Training;