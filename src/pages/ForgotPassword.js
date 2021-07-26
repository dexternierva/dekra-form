import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { 
    Grid, 
    Paper, 
    Typography,
    Box,
    Button,
    FormHelperText,
    Divider
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
            .post('http://localhost:1337/auth/forgot-password', {
                email: `${values.email}`
            })
                .then(response => {
                    setDialog({ state: true, header: "Link sent to your email.", text: "Link was sent to create a new password via email." });
                })
                .catch(error => {
                    setDialog({ state: true, header: "Invalid email.", text: "Please enter your email address." });
                })
    }
    
    return (
        <>
        <Alert dialog={dialog} handleClick={ () => { setDialog(false) } } />
        <Formik
            initialValues={{ email: '' }}
            validationSchema={ 
                Yup.object({ 
                    email: Yup.string().email().required('No Email Provided!') 
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
                        <Typography variant="h5">Forgot Password</Typography>
                    </Box>
                    <Paper variant="outlined" square>
                        <Typography variant="body1">
                            <Box px={4} py={2}>Lost your password? Please enter your email address. You will receive a link to create a new password via email.</Box>
                        </Typography>
                        <Form noValidate>
                            <Box px={4} py={2}>
                                <Field
                                    component={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    // helperText="Your email will be kept confidential and will not be shared with others."
                                />
                            </Box>

                            <Box pt={0} pr={4} pb={3} pl={4}>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    color="primary"
                                >
                                    Submit Email
                                </Button>
                            </Box>
                            <Box pt={0} pr={4} pb={2} pl={4}>
                                <FormHelperText>Your email will be kept confidential and will not be shared with others.</FormHelperText>
                            </Box>

                            <Divider />

                            <Box pt={0} pr={4} pb={0} pl={4}>
                                <Button size="small" onClick={handleClick}>Back To Login</Button>
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