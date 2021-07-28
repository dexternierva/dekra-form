import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from "../Alert";

import * as Yup from "yup";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import { TextField } from 'formik-material-ui';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link to="www.a-vantageinternational.com" style={{ color: 'inherit', textDecoration: 'inherit'}}>
            {new Date().getFullYear()} A-Vantage International Recruitment Corp. <br /> All rights reserved.
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignUp() {
    const classes = useStyles();
    const history = useHistory();
    const [terms, setTerms] = useState(false);
    const [dialog, setDialog] = useState({ state:false, header: null, text: null });
    const handleCheck = (event) => { setTerms(event.currentTarget.checked) }
    
    const initialValues = {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
    }

    const validationSchema = Yup.object({
        firstname: Yup.string().required('This field is required'),
        lastname: Yup.string().required('This field is required'),
        username: Yup.string().required('This field is required'),
        email: Yup.string().email().required('This field is required'),
        password: Yup.string().required('This field is required'),
    })
    
    const onSubmit = async function (values, actions) {
        axios
            .post('https://dekra-form-api-m8bsw.ondigitalocean.app/auth/local/register', {
                firstname: `${values.firstname}`,
                lastname: `${values.lastname}`,
                username: `${values.username}`,
                email: `${values.email}`,
                password: `${values.password}`
            })
                .then(response => {
                    setDialog({ state: true, header: "Account Successfully Created.", text: "Login and start entering your information." });
                })
                .catch(error => {
                    setDialog({ state: true, header: "Sorry but your form was not submitted!", text: "Please change a few things up and try submitting again. Thank you!" });
                });
    }

    return (
        <>
            <Alert 
                dialog={dialog}
                handleClick={ 
                    () => { 
                        setDialog(false);
                        history.push("/")
                    }
                }
            />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                    ({submitForm, isSubmitting, touched, errors, values}) => (
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <div className={classes.paper}>
                                <Avatar className={classes.avatar} src="/img/logo.png" />
                                <Typography component="h1" variant="h5">Sign up</Typography>
                                <Form className={classes.form} noValidate>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Field
                                                component={TextField}
                                                name="firstname"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="firstname"
                                                label="First Name"
                                                autoComplete="firstname"
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                component={TextField}
                                                name="lastname"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="lastname"
                                                label="Last Name"
                                                autoComplete="lastname"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                component={TextField}
                                                name="username"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="username"
                                                label="Username"
                                                autoComplete="username"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                component={TextField}
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                component={TextField}
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="current-password"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox 
                                                        value="AgreeToTerms" 
                                                        color="primary" 
                                                        onChange={ handleCheck }
                                                    />
                                                }
                                                label="I agree to the Terms and Conditons."
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button type="submit" fullWidth variant="contained" disabled={ !terms } color="primary">Register</Button>
                                    <Box mt={1}>
                                        <Grid container justify="flex-end">
                                            <Grid item>
                                                <Link to="/" variant="body2" style={{ color: '#1EA0BA', textDecoration: 'inherit'}}>
                                                    Already have an account? Sign in
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Form>
                            </div>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </Container>
                    )
                }
            </Formik>
        </>
    );
}

export default SignUp;