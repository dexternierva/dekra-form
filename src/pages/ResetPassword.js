import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { 
    Grid, 
    Paper, 
    Typography,
    Box,
    Button,
} from '@material-ui/core';

import Alert from "../components/Alert";

import * as Yup from "yup";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import { TextField } from 'formik-material-ui';

function ForgotPassword () {
    let history = useHistory();
    const handleClick = () => {
        history.push("/");
    }
    const [dialog, setDialog] = useState({ state:false, header: null, text: null });

    const onSubmit = async function(values, actions) {
        await axios
            .post('http://localhost:1337/auth/reset-password', {
                code: 'privateCode', // code contained in the reset link of step 3.
                password: 'userNewPassword',
                passwordConfirmation: 'userNewPassword',
            })
                .then(response => {
                    setDialog({ state: true, header: "Password Reset", text: "Congratulations! Your password has been reset." });
                })
                .catch(error => {
                    setDialog({ state: true, header: "Reset Failed", text: "An error occurred, please try again later." });
                })
    }
    
    return (
        <>
        <Alert dialog={dialog} handleClick={ () => { setDialog(false) } } />
        <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={ 
                Yup.object({ 
                    password: Yup.string().required('No Password Provided!'),
                    confirmPassword: Yup.string().required('Please Confirm Password!')
                }) 
            }
            onSubmit={ onSubmit }
        >
            <Grid 
                container 
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={10} md={8} lg={5}>
                    <Box pb={1} mt={8}>
                        <Typography variant="h5">Reset Password</Typography>
                    </Box>
                    <Paper variant="outlined" square>
                        <Typography variant="body1">
                            <Box px={4} py={2}>Use the form below to change the password for your account.</Box>
                        </Typography>
                        <Form noValidate>
                            <Box pt={2} pr={4} pb={1} pl={4}>
                                <Field
                                    component={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="password"
                                />
                            </Box>

                            <Box pt={0} pr={4} pb={2} pl={4}>
                                <Field
                                    component={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="confirmPassword"
                                />
                            </Box>

                            <Box pt={0} pr={4} pb={3} pl={4}>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    color="primary"
                                >
                                    Reset Password
                                </Button>
                            </Box>
                        </Form>
                    </Paper>
                </Grid>
            </Grid>
        </Formik>
        </>
    );
}

export default ForgotPassword;