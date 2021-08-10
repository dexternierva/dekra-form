import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { Select } from "formik-material-ui";
import axios from "axios";
import Alert from "../Alert";
import {
    Card, 
    CardContent,
    Box,
    Typography,
    Grid,
    Button,
    Divider,
    Paper,
    CircularProgress,
    Step,
    StepLabel,
    Stepper,
    MenuItem,
} from '@material-ui/core';


function PracticalKnowledgeForm ({ setPracticalActivitiesState }) {
    const [dialog, setDialog] = useState({ state:false, header: null, text: null });

    return (
        <>
        <Alert 
            dialog={dialog}
            handleClick={() => {
                setPracticalActivitiesState(false);
                setDialog(false);
                // window.location.reload(); /** => RESEARCH FOR AN ALTERNATIVE */
            }} 
        />
        <Box mb={4}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Practical activities
                    </Typography>
                    <Typography variant="body2" component="p">
                        <strong>0</strong> <em>(not known)</em>, <strong>1</strong> <em>(known in theory)</em>, <strong>2</strong> <em>(practical implementation observed)</em>, <strong>3</strong> <em>(carried out under supervision)</em>, <br /><strong>4</strong> <em>(independent implementation)</em>, <strong>5</strong> <em>(expert, guidance of other colleagues)</em>
                    </Typography>
                </CardContent>
            </Card>
        </Box>

        <FormikStepper
            initialValues = {{
                a1: 0,
                a2: 0,
                a3: 0,
                a4: 0,
                a5: 0,
                a6: 0,
                a7: 0,
                a8: 0,
                a9: 0,
                a10: 0,

                b1: 0,
                b2: 0,
                b3: 0,
                b4: 0,
                b5: 0,
                b6: 0,
                b7: 0,
                b8: 0,
                b9: 0,
                b10: 0,
                b11: 0,
                b12: 0,

                c1: 0,
                c2: 0,
                c3: 0,
                c4: 0,
                c5: 0,
                c6: 0,
                c7: 0,
                c8: 0,
                c9: 0,
                c10: 0,
                c11: 0,
                c12: 0,
                c13: 0,
                c14: 0,

                d1: 0,
                d2: 0,
                d3: 0,
                d4: 0,
                d5: 0,
                d6: 0,
                d7: 0,
                d8: 0,
                d9: 0,

                e1: 0,
                e2: 0,
                e3: 0,
                e4: 0,
                e5: 0,
                e6: 0,

                f1: 0,
                f2: 0,
                f3: 0,
                f4: 0,
                f5: 0,
                f6: 0,
                f7: 0
            }}

            onSubmit={async (values) => {
                const data = new FormData();

                const info = {
                    'a1': values.a1,
                    'a2': values.a2,
                    'a3': values.a3,
                    'a4': values.a4,
                    'a5': values.a5,
                    'a6': values.a6,
                    'a7': values.a7,
                    'a8': values.a8,
                    'a9': values.a9,
                    'a10': values.a10,

                    'b1': values.b1,
                    'b2': values.b2,
                    'b3': values.b3,
                    'b4': values.b4,
                    'b5': values.b5,
                    'b6': values.b6,
                    'b7': values.b7,
                    'b8': values.b8,
                    'b9': values.b9,
                    'b10': values.b10,
                    'b11': values.b11,
                    'b12': values.b12,

                    'c1': values.c1,
                    'c2': values.c2,
                    'c3': values.c3,
                    'c4': values.c4,
                    'c5': values.c5,
                    'c6': values.c6,
                    'c7': values.c7,
                    'c8': values.c8,
                    'c9': values.c9,
                    'c10': values.c10,
                    'c11': values.c11,
                    'c12': values.c12,
                    'c13': values.c13,
                    'c14': values.c14,

                    'd1': values.d1,
                    'd2': values.d2,
                    'd3': values.d3,
                    'd4': values.d4,
                    'd5': values.d5,
                    'd6': values.d6,
                    'd7': values.d7,
                    'd8': values.d8,
                    'd9': values.d9,

                    'e1': values.e1,
                    'e2': values.e2,
                    'e3': values.e3,
                    'e4': values.e4,
                    'e5': values.e5,
                    'e6': values.e6,

                    'f1': values.f1,
                    'f2': values.f2,
                    'f3': values.f3,
                    'f4': values.f4,
                    'f5': values.f5,
                    'f6': values.f6,
                    'f7': values.f7,
                }

                data.append('data', JSON.stringify(info));

                await axios({
                    method: 'POST',
                    url: 'https://dekra-form-api-m8bsw.ondigitalocean.app/practical-activities',
                    data,
                    withCredentials: true
                })
                    .then(() => {
                        setDialog({ state: true, header: "Status: Successful", text: "Practical Activities Successfully CREATED!" });
                    })
                    .catch(error => {
                        setDialog({ state: true, header: "An Error Occurred!", text: "Oh snap! Something went wrong. Please change a few things up and try submitting again. Thank you!" });
                    });

            }}
        >
            {/**
             * FORMIK STEP 1:
             * A - ASSESSMENT OF PATIENTS, NURSING DIAGNOSIS, CARE PLANNING
             * 
             */}
            <FormikStep 
                label="Practical Activities A"
                validationSchema={Yup.object({
                    a1: Yup.number().min(0).max(5),
                    a2: Yup.number().min(0).max(5),
                    a3: Yup.number().min(0).max(5),
                    a4: Yup.number().min(0).max(5),
                    a5: Yup.number().min(0).max(5),
                    a6: Yup.number().min(0).max(5),
                    a7: Yup.number().min(0).max(5),
                    a8: Yup.number().min(0).max(5),
                    a9: Yup.number().min(0).max(5),
                    a10: Yup.number().min(0).max(5),
                })}
            >
                <Box py={2} px={4}>
                    <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                        A - Assessment of patients, nursing diagnosis, care planning
                    </Typography>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                        Gain information about patients
                    </Typography>
                </Box>

                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Collect basic parameters (e.g. size, weight) and vital parameters (by manual measurement, by means of monitoring)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="a1"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Identify physical (physical, neurological) and cognitive state of patients</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="a2"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Fill in scales and indicators</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="a3"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Evaluate the parameters collected in compliance with the clinical</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="a4"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box py={2} px={4}>
                            <Typography variant="subtitle2" display="block" gutterBottom>
                                Care problems and care diagnosis
                            </Typography>
                        </Box>  
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Identify supply deficits, provide adequate support</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="a5"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Set care diagnosis</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="a6"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Applying care standards</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="a7"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box py={2} px={4}>
                            <Typography variant="subtitle2" display="block" gutterBottom>
                                Care planning
                            </Typography>
                        </Box>  
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Set care goals and update care plans</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="a8"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Planning and carrying out care measures</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="a9"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Apply special care plans (disease pictured-related)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="a10"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>
                </Grid>{ /* END OF: .container */ }
            </FormikStep>

            {/**
             * FORMIK STEP 2:
             * B - PROFESSIONAL CARE
             * 
             */}
            <FormikStep 
                label="Practical Activities B"
                validationSchema={Yup.object({
                    a1: Yup.number().min(0).max(5),
                    a2: Yup.number().min(0).max(5),
                    a3: Yup.number().min(0).max(5),
                    a4: Yup.number().min(0).max(5),
                    a5: Yup.number().min(0).max(5),
                    a6: Yup.number().min(0).max(5),
                    a7: Yup.number().min(0).max(5),
                    a8: Yup.number().min(0).max(5),
                    a9: Yup.number().min(0).max(5),
                    a10: Yup.number().min(0).max(5),
                })}
            >
                <Box py={2} px={4}>
                    <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                        B - Professional Care
                    </Typography>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                        Basic care and personal care
                    </Typography>
                </Box>

                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Support and take over partial and whole body care (including skin care, washing and dressing, use care products, apply special methods [e.B. basal stimulation, bobath], at the sink, in bed)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="b1"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Application of compression bandages and compression stockings</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="b2"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box py={2} px={4}>
                            <Typography variant="subtitle2" display="block" gutterBottom>
                                Diet
                            </Typography>
                        </Box>  
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Prepare, distribute, rich (feed) food and beverages</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="b3"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Create, document nutrition plans</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="b4"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Use food probes (including PEG)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="b5"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box py={2} px={4}>
                            <Typography variant="subtitle2" display="block" gutterBottom>
                                Mobility
                            </Typography>
                        </Box>  
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Support, maintain, restore mobility</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="b6"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Perform prophylactic measures (decubitus, contractur, thrombosis prophylaxis)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="b7"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Create and maintain mobilization plans</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="b8"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box py={2} px={4}>
                            <Typography variant="subtitle2" display="block" gutterBottom>
                                Retirement
                            </Typography>
                        </Box>  
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Assisting in the excretion</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="b9"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Dealing with incontinence, continence training</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="b10"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Discharge systems (e.g. urinary catheterism, stool dissipation systems)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="b11"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Administer ingesudes</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="b12"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                </Grid>{ /* END OF: .container */ }
            </FormikStep>
            
            {/**
             * FORMIK STEP 3:
             * C - PFLEGEINTERVENTION
             * 
             */}
            <FormikStep 
                label="Practical Activities C"
                validationSchema={Yup.object({
                    c1: Yup.number().min(0).max(5),
                    c2: Yup.number().min(0).max(5),
                    c3: Yup.number().min(0).max(5),
                    c4: Yup.number().min(0).max(5),
                    c5: Yup.number().min(0).max(5),
                    c6: Yup.number().min(0).max(5),
                    c7: Yup.number().min(0).max(5),
                    c8: Yup.number().min(0).max(5),
                    c9: Yup.number().min(0).max(5),
                    c10: Yup.number().min(0).max(5),
                    c11: Yup.number().min(0).max(5),
                    c12: Yup.number().min(0).max(5),
                    c13: Yup.number().min(0).max(5),
                    c14: Yup.number().min(0).max(5),
                })}
            >
                <Box py={2} px={4}>
                    <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                        C - Pflegeintervention
                    </Typography>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                        Participation in medical and diagnostic procedures and procedures
                    </Typography>
                </Box>

                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Blood collection, physical examination</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="c1"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Assistance with medical measures (e.g. endoscopy, admission examination in the hospital)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="c2"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box py={2} px={4}>
                            <Typography variant="subtitle2" display="block" gutterBottom>
                                Medications
                            </Typography>
                        </Box>  
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Manage, prepare, administer (e.g. oral, intravenous)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="c3"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Blood and blood products (transfusion)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="c4"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Dealing with narcotics</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="c5"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box py={2} px={4}>
                            <Typography variant="subtitle2" display="block" gutterBottom>
                                Wound management
                            </Typography>
                        </Box>  
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Wound avoidance, Prophylaxen</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="c6"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Wound assessment</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="c7"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Wound treatment (e.g. dressings and change)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="c8"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box py={2} px={4}>
                            <Typography variant="subtitle2" display="block" gutterBottom>
                                Ostomy care
                            </Typography>
                        </Box>  
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Care of different stomata (e.g. tracheostoma, ileostoma, urostoma)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="c9"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box py={2} px={4}>
                            <Typography variant="subtitle2" display="block" gutterBottom>
                                Applying medical devices
                            </Typography>
                        </Box>  
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Care aids, mobilization aids, transfer aids, wheelchairs</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="c10"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Devices for measuring vital parameters (e.g. blood pressure, blood sugar, monitoring)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="c11"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Special equipment (e.g. suction devices, ECG, defibrillators, ventilators)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="c12"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box py={2} px={4}>
                            <Typography variant="subtitle2" display="block" gutterBottom>
                                Life-saving measures
                            </Typography>
                        </Box>  
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Basic life support</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="c13"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Advanced life support</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="c14"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                </Grid>{ /* END OF: .container */ }
            </FormikStep>

            {/**
             * FORMIK STEP 4:
             * D - HYGIENE
             * 
             */}
            <FormikStep 
                label="Practical Activities D"
                validationSchema={Yup.object({
                    d1: Yup.number().min(0).max(5),
                    d2: Yup.number().min(0).max(5),
                    d3: Yup.number().min(0).max(5),
                    d4: Yup.number().min(0).max(5),
                    d5: Yup.number().min(0).max(5),
                    d6: Yup.number().min(0).max(5),
                    d7: Yup.number().min(0).max(5),
                    d8: Yup.number().min(0).max(5),
                    d9: Yup.number().min(0).max(5),
                })}
            >
                <Box py={2} px={4}>
                    <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                        D - Hygiene
                    </Typography>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                        Apply hygiene measures
                    </Typography>
                </Box>

                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Various disinfection measures (e.g. hand, skin, surface disinfection)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="d1"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Perform infection control measures (e.g. isolation of patients)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="d2"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Use sterile procedures (e.g. laying permanent catheters)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="d3"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box py={2} px={4}>
                            <Typography variant="subtitle2" display="block" gutterBottom>
                                Sterilization
                            </Typography>
                        </Box>  
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Process, appropriately package and store medical devices</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="d4"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Operating sterilizers</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="d5"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box py={2} px={4}>
                            <Typography variant="subtitle2" display="block" gutterBottom>
                                Occupational health and safety
                            </Typography>
                        </Box>  
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Transports of patients</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="d6"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Reduce the risk of accidents (e.g. accident prevention regulations)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="d7"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>External protection and self-protection</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="d8"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box py={2} px={4}>
                            <Typography variant="subtitle2" display="block" gutterBottom>
                                Dealing with disasters
                            </Typography>
                        </Box>  
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Fire, emergencies, mass attack on patients</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="d9"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>
                </Grid>{ /* END OF: .container */ }
            </FormikStep>

            {/**
             * FORMIK STEP 5:
             * E - COMMUNICATION WITH COLLEAGUES, PATIENTS AND OTHERS
             * 
             */}
            <FormikStep 
                label="Practical Activities E"
                validationSchema={Yup.object({
                    e1: Yup.number().min(0).max(5),
                    e2: Yup.number().min(0).max(5),
                    e3: Yup.number().min(0).max(5),
                    e4: Yup.number().min(0).max(5),
                    e5: Yup.number().min(0).max(5),
                    e6: Yup.number().min(0).max(5),
                })}
            >
                <Box py={2} px={4}>
                    <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                        E - Communication with colleagues, patients and others
                    </Typography>
                </Box>

                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Lead team and case meetings</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="e1"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Introducing, guiding and guilding employees</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="e2"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Shift line station line</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="e3"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Write rosters</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="e4"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Educate and advice patients</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="e5"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Educate and advice relatives</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="e6"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>
                </Grid>{ /* END OF: .container */ }
            </FormikStep>

            {/**
             * FORMIK STEP 6:
             * F - DOCUMENTATION AND QUALITY
             * 
             */}
            <FormikStep 
                label="Practical Activities F"
                validationSchema={Yup.object({
                    f1: Yup.number().min(0).max(5),
                    f2: Yup.number().min(0).max(5),
                    f3: Yup.number().min(0).max(5),
                    f4: Yup.number().min(0).max(5),
                    f5: Yup.number().min(0).max(5),
                    f6: Yup.number().min(0).max(5),
                    f7: Yup.number().min(0).max(5),
                })}
            >
                <Box py={2} px={4}>
                    <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                        F - Documentation and quality
                    </Typography>
                </Box>

                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Document primary care and treatment care measures (care report)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="f1"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Placing order</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="f2"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Documenting and evaluating visits</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="f3"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Write letters (e.g. care transition)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="f4"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Ensure cleanliness and order at the workplace (station rooms, patient rooms)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="f5"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Apply quality assurance and control measures (e.g. drug check)</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="f6"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <Box px={4}>
                            <Typography variant="body2" gutterBottom>Resource-saving working methods</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box px={4}>
                            <Field
                                component={Select}
                                name="f7"
                                defaultValue="0"
                                variant="outlined"
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Field>
                        </Box>
                    </Grid>
                </Grid>{ /* END OF: .container */ }
            </FormikStep>
        </FormikStepper>
        </>
    )
}

/** 
 * FORMIKSTEPPER 
 * 
 */
 export function FormikStep({ children }) {
    return <>{children}</>;
}

export function FormikStepper ({ children, ...props }) {
    const childrenArray = React.Children.toArray(children);
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];
    const [completed, setCompleted] = useState(false);

    const isLastStep = () => {
        return step === childrenArray.length - 1;
    }

    return (
        <Formik
            {...props}
            validationSchema={ currentChild.props.validationSchema }
            onSubmit={
                async (values, helpers) => {
                    if (isLastStep()) {
                        await props.onSubmit(values, helpers);
                        setCompleted(true);
                    } else {
                        setStep((s) => s + 1);
                        helpers.setTouched({});
                    }
                }
            }
        >
            {({ isSubmitting }) => (
                <Form autoComplete="off">
                    <Paper>
                        <Box pt={2} pb={2}>
                            <Stepper alternativeLabel activeStep={step}>
                                {childrenArray.map((child, index) => (
                                    <Step key={child.props.label} completed={step > index || completed}>
                                        <StepLabel>{child.props.label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            <Divider />

                            <Box mt={6} mb={3}>{currentChild}</Box>
                            <Box px={4} py={4}>
                                <Grid container spacing={2} justify="center">
                                    {step > 0 ? (
                                    <Grid item>
                                        <Button
                                            disabled={isSubmitting}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => setStep((s) => s - 1)}
                                            size="large"
                                        >
                                            Back
                                        </Button>
                                    </Grid>
                                    ) : null}
                                    <Grid item>
                                        <Button
                                            startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                                            disabled={isSubmitting}
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            size="large"
                                        >
                                            {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Paper>
                </Form>
            )}
        </Formik>
    )
}

export default PracticalKnowledgeForm;
