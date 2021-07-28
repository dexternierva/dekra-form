import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useCurrentUser, useDispatchCurrentUser } from "../../containers/CurrentUser";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Alert from "../Alert";

import * as Yup from "yup";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import { TextField } from 'formik-material-ui';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link to="www.a-vantageinternational.com" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            {new Date().getFullYear()} A-Vantage International Recruitment Corp. <br /> All rights reserved.
            </Link>{' '}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/featured/?nature)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Login() {
    const [dialog, setDialog] = useState({ state:false, header: null, text: null });
    const currentUser = useCurrentUser();
    const dispatch = useDispatchCurrentUser();
    const history = useHistory();

    const classes = useStyles();

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string().email().required('No email provided!'),
        password: Yup.string().required('No password provided!')
    })

    useEffect(() => {
        if(currentUser.isAuthenticated) {
            history.push("/dashboard")
        }
    }, [currentUser.isAuthenticated, history]);

    const onSubmit = async function (values, actions) {
        //setDialogHeader(null);

        await axios
            .post('https://dekra-form-api-m8bsw.ondigitalocean.app/auth/local', {
                identifier: values.email,
                password: values.password,
            }, {
                withCredentials: true,
                headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
            })
                .then(response => {
                    // Handle success.    
                    dispatch({ type: "LOGIN", user: response.data.user });
                    //(response.data.user.role.id === 3) ? history.push("/users") : history.push("/dashboard");
                    //(response.data.user.role.id === 3) ? console.log("/users") : console.log("/dashboard");
                    // (response.data.user.role.id === 3) ? setLoc("/users") : setLoc("/dashboard");
                    history.push("/dashboard");
                })
                .catch(error => {
                    // Handle error.
                    setDialog({ state: true, header: "The email and password you entered did not match our records.", text: "Please change a few things up and try submitting again. Thank you!" });
                });
    };

    return (
        <>
            <Alert 
                dialog={dialog} 
                handleClick={() => { setDialog(false); }}
            /> 
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                    ({ submitForm, isSubmitting, touched, errors, values }) => (
                        <Grid container component="main" className={classes.root}>
                            <CssBaseline />
                            <Grid item xs={false} sm={4} md={7} className={classes.image} />
                            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                                <div className={classes.paper}>
                                    <Avatar className={classes.avatar} src="/img/logo.png" />
                                    <Typography component="h1" variant="h5">Sign in</Typography>
                                    <Form className={classes.form} noValidate>
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
                                        />
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
                                        <FormControlLabel
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Remember me"
                                        />
                                        <Button type="submit" fullWidth variant="contained" color="primary">Sign In</Button>
                                        <Box mt={1}>
                                            <Grid container>
                                                <Grid item xs>
                                                    <Link to="/forgotpassword" variant="body2" style={{ color: '#1EA0BA', textDecoration: 'inherit'}}>Forgot password?</Link>
                                                </Grid>
                                                <Grid item>
                                                    <Link to="/signup" variant="body2" style={{ color: '#1EA0BA', textDecoration: 'inherit'}}>{"Don't have an account? Sign Up"}</Link>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box mt={5}>
                                            <Copyright />
                                        </Box>
                                    </Form>
                                </div>
                            </Grid>
                        </Grid>
                    )
                }
            </Formik>
        </>
    );
}

export default Login;