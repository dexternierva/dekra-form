import React, { useContext, useEffect, useState } from "react";
import { Field } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, FieldArray } from "formik";
import { useCurrentUser } from "../../containers/CurrentUser";
import { EducationContext } from "../../containers/GetEducation";
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

function Education () {
    const classes = useStyles();
    const { loading, response, error, setEducationID } = useContext(EducationContext);
    const [formValues, setFormValues] = useState(null);
    const currentUser = useCurrentUser();
    const [request, setRequest] = useState({ method: null, url: null });
    const [dialog, setDialog] = useState({ state:false, header: null, text: null });
    const [requestID, setRequestID] = useState(null);

    /** PREFILL FORM WITH SAVED DATA */
    useEffect(() => {
        if (response !== null) {
            if(Array.isArray(response)) {
                const educations = response.map((edu) => {
                    if (edu.user.id === currentUser.id) return edu;
                    return null;
                }).filter((el) => { return el !== null });

                if (educations.length !== 0) {
                    const cleanedEducation = educations.map((edu) => {
                        return {
                            id: edu.id,
                            from: edu.from,
                            to: edu.to,
                            course: edu.course,
                            university: edu.university,
                        }
                    });

                    const savedData = { educations: [] };
                    savedData.educations.push(...cleanedEducation);
                    setFormValues(savedData);
                } else {
                    if (requestID === null) {
                        setRequest({ method: 'POST', url: 'https://dekra-form-api-m8bsw.ondigitalocean.app/educations' });
                    } else {
                        setEducationID(requestID);
                    }
                }
            } else {
                const savedData = { educations: [] };
                savedData.educations.push(response);
                setFormValues(savedData);
            }
        }
    }, [response, currentUser.id, requestID, setEducationID]);

    /** INITIAL VALUES */
    const initialValues = {
        educations: [
            { from: new Date(), to: new Date(), course: '', university: '' }
        ]
    };

    const validationSchema = Yup.object({
        educations: Yup.array()
            .of(
                Yup.object().shape({
                    from: Yup.date().required('This field is required'),
                    to: Yup.date().required('This field is required'),
                    course: Yup.string().required('This field is required'),
                    university: Yup.string().required('This field is required')
                })
            ).min(1).max(4)
    });
    
    const onSubmit = async function (values, actions) {

        // FUNCTION TO SAVE EACH EXPERIENCE
        const submitValues = async function (valuesToSubmit) {
            if (formValues !==  null) {
                for (let i = 0; i < formValues.educations.length; i++) {
                    if ( formValues.educations[i].id === valuesToSubmit.id ) {
                        setRequest({ method: 'PUT', url: `https://dekra-form-api-m8bsw.ondigitalocean.app/educations/${formValues.educations[i].id}` });
                    }
                }
            }

            const data = new FormData(); 
            
            const info = {
                'from': valuesToSubmit.from,
                'to': valuesToSubmit.to,
                'course': valuesToSubmit.course,
                'university': valuesToSubmit.university
            }

            data.append('data', JSON.stringify(info));

            await axios({
                method: request.method,
                url: request.url,
                data,
                withCredentials: true
            })
                .then((res) => {
                    setRequestID(res.data.id);
                    setDialog({ state: true, header: "Status: Successful", text: request.method === "POST" ? "Information Successfully CREATED!" : "Information Successfully UPDATED!" });
                })
                .catch(error => {
                    setDialog({ state: true, header: "An Error Occurred!", text: "Oh snap! Something went wrong. Please change a few things up and try submitting again. Thank you!" });
                });
        }

        // MAP THROUGH EDUCATIONS
        values.educations.map((education) => (
            submitValues(education)    
        ))
    }

    return (
        <>
            { loading && 
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop> 
            }
            { error && <Typography variant="overline" color="secondary" display="block" align="center">No previously saved data.</Typography> }

            <Alert 
                dialog={dialog}
                handleClick={ 
                    () => { 
                        setDialog(false);
                        setEducationID(requestID);
                    }
                }
            />

            <Formik
                initialValues={ formValues ||initialValues }
                validationSchema={ validationSchema }
                onSubmit={ onSubmit }
                enableReinitialize
            >
                {
                    ({submitForm, isSubmitting, touched, errors, values}) => (
                        <Form>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <FieldArray name="educations">
                                    {({ push, remove }) =>(
                                        <>
                                            {values.educations.map((_, index) => (
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
                                                                                name={`educations[${index}].from`}
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
                                                                                name={`educations[${index}].to`}
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
                                                                        label="Course / Degree"
                                                                        name={`educations[${index}].course`}
                                                                        variant="outlined"
                                                                        fullWidth
                                                                    />
                                                                </Box>
                                                                <Box px={4} pb={4} pt={2}>
                                                                    <Field
                                                                        component={TextField}
                                                                        type="text"
                                                                        label="Name &amp; Address Of School / University"
                                                                        name={`educations[${index}].university`}
                                                                        variant="outlined"
                                                                        fullWidth
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
                                                    onClick={ () => push({ from: new Date(), to: new Date(), course: '', university: '' })}
                                                >
                                                        Add Education
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

export default Education;