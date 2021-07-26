import React, { useContext, useEffect, useState } from "react";
import { Field } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, FieldArray } from "formik";
import { useCurrentUser } from "../../containers/CurrentUser";
import { ExperienceContext } from "../../containers/GetExperience";
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

function WorkExperience () {
    const classes = useStyles();
    const { loading, response, error, setExperienceID } = useContext(ExperienceContext);
    const [formValues, setFormValues] = useState(null);
    const currentUser = useCurrentUser();
    const [request, setRequest] = useState({ method: null, url: null });
    const [dialog, setDialog] = useState({ state:false, header: null, text: null });
    const [requestID, setRequestID] = useState(null);

    /** PREFILL FORM WITH SAVED DATA */
    useEffect(() => {
        if (response !== null) {
            if (Array.isArray(response)) {
                /*** 
                 * IF RESPONSE IS AN ARRAY
                 * GET EXPERIENCE/S RELATED TO THE CURRENT USER 
                 */
                const experiences = response.map((experience) => {
                    if (experience.user.id === currentUser.id) return experience; 
                    return null;
                }).filter((el) => { return el !== null });

                /***  SET SAVED DATA */
                if (experiences.length !== 0) {
                    const cleanedExperience = experiences.map((experience) => {
                        return {
                            id: experience.id,
                            from: experience.from,
                            to: experience.to,
                            job: experience.job,
                            employer: experience.employer
                        }
                    });

                    const savedData = { workExperiences: [] };
                    savedData.workExperiences.push(...cleanedExperience);
                    setFormValues(savedData);
                } else {
                    if (requestID === null) {
                        setRequest({ method: 'POST', url: 'http://localhost:1337/work-experiences' });
                    } else {
                        setExperienceID(requestID);
                    }
                }
            } else {
                /***
                 * RESPONSE IS NOT AN ARRAY
                 */
                const savedData = { workExperiences: [] };
                savedData.workExperiences.push(response);
                setFormValues(savedData);
            }
        }
    }, [response, currentUser.id, requestID, setExperienceID]);

    /** INITIAL VALUES */
    const initialValues = {
        workExperiences: [
            { from: new Date(), to: new Date(), job: '', employer: '' }
        ]
    };

    const validationSchema = Yup.object({
        workExperiences: Yup.array()
            .of(
                Yup.object().shape({
                    from: Yup.date().required('This field is required'),
                    to: Yup.date().required('This field is required'),
                    job: Yup.string().required('This field is required'),
                    employer: Yup.string().required('This field is required')
                })
            ).min(1).max(5)
    });
    
    const onSubmit = async function (values, actions) {

        // FUNCTION TO SAVE EACH EXPERIENCE
        const submitValues = async function (valuesToSubmit) {
            if (formValues !==  null) {
                for (let i = 0; i < formValues.workExperiences.length; i++) {
                    if ( formValues.workExperiences[i].id === valuesToSubmit.id ) {
                        setRequest({ method: 'PUT', url: `http://localhost:1337/work-experiences/${formValues.educations[i].id}` });
                    }
                }
            }

            const data = new FormData(); 
            
            const info = {
                'from': valuesToSubmit.from,
                'to': valuesToSubmit.to,
                'job': valuesToSubmit.job,
                'employer': valuesToSubmit.employer
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

        // MAP THROUGH EXPERIENCES
        values.workExperiences.map((experience) => (
            submitValues(experience)    
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
                        setExperienceID(requestID);
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
                                <FieldArray name="workExperiences">
                                    {({ push, remove }) =>(
                                        <>
                                            {values.workExperiences.map((_, index) => (
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
                                                                                name={`workExperiences[${index}].from`}
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
                                                                                name={`workExperiences[${index}].to`}
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
                                                                        label="Job Title"
                                                                        name={`workExperiences[${index}].job`}
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        helperText="Please use German word for your job title"
                                                                    />
                                                                </Box>
                                                                <Box px={4} pb={4} pt={2}>
                                                                    <Field
                                                                        component={TextField}
                                                                        type="text"
                                                                        label="Employer Data"
                                                                        name={`workExperiences[${index}].employer`}
                                                                        variant="outlined"
                                                                        fullWidth
                                                                    />
                                                                </Box>
                                                            </Grid>
                                                            <Grid container item lg={2} xs={12} justify="center" alignItems="center">
                                                                <Fab 
                                                                    color="secondary" 
                                                                    aria-label="add" 
                                                                    className={classes.margin} 
                                                                    onClick={
                                                                        () => { 
                                                                            remove(index);
                                                                            //setMethod('DELETE');
                                                                        }
                                                                    }
                                                                >
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
                                                    onClick={ () => push({ from: new Date(), to: new Date(), job: '', employer: '' }) }
                                                >
                                                        Add Experience
                                                </Button>
                                            </Box>
                                        </>
                                    )}
                                </FieldArray>
                            </MuiPickersUtilsProvider>
                            
                            <Box px={4} py={2} display="flex" justifyContent="flex-end">
                                <Button variant="contained" color="primary" type="submit" size="large">Save</Button>
                            </Box>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}

export default WorkExperience;