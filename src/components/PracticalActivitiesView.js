import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
    Box,
    Paper,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    grid: {
        margin: '0 0 4rem 0',
        borderLeft: '4px solid #008B4F',
    },
    table: {
        margin: '-.75rem 0 0 0'
    },
    intro: {
        padding: '1rem',
        margin: '0 0 2rem 0',
        borderLeft: '4px solid #008B4F',
    },
    paper: {
        background: 'transparent'
    }
}));

const StyledRating = withStyles({
    grid: {
        margin: '0 0 4rem 0',
        borderLeft: '4px solid #008B4F',
    },
    icon: {
        color: 'rgba(0, 0, 0, 0.12)',
    },
    iconFilled: {
        color: '#008B4F',
    },
    iconHover: {
        color: 'rgba(0, 0, 0, 0.24)',
    },
})(Rating);

function  PracticalActivitiesView({ response }) {
    const classes = useStyles();
    if (response.practical_activity !== null) {
        return (
            <Grid container spacing={3} alignItems="center" className={classes.grid}>
                <Grid item xs={12} sm={12}>
                    <div className={classes.intro}>
                        <Paper elevation={0} className={classes.paper}>
                            <Typography variant="h5" component="h2">
                                Practical Activities
                            </Typography>
                            <Typography variant="body2" component="p">
                                Self-assessment of the participant <br />
                                0 (not known), 1 (known in theory), 2 (practical implementation observed), 3 (carried out under supervision), 4 (independent implementation), 5 (expert, guidance of other collegues).
                            </Typography>
                        </Paper>
                    </div>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                            A - Assessment of patients, nursing diagnosis, care planning
                        </Typography>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Gain information about patients
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Collect basic parameters (e.g. size, weight) and vital parameters (by manual measurement, by means of monitoring)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.a1}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Identify physical (physical, neurological) and cognitive state of patients</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.a2}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Fill in scales and indicators</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.a3}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Evaluate the parameters collected in compliance with the clinical</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.a4}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box px={4}>
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
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.a5}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Set care diagnosis</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.a6}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Applying care standards</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.a7}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Careplanning
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
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.a8}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Planning and carrying out care measures</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.a9}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Apply special care plans (disease pictured-related)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.a10}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                { /*** PROFESSIONAL CARE */ }
                <Grid item xs={12} sm={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                            B - Professional Care
                        </Typography>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Basic care and personal care
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Support and take over partial and whole body care (including skin care, washing and dressing, use care products, apply special methods [e.B. basal stimulation, bobath], at the sink, in bed)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.b1}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Application of compression bandages and compression stockings</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.b2}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12}>
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
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.b3}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Create, document nutrition plans</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.b4}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Use food probes (including PEG)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.b5}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12}>
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
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.b6}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Perform prophylactic measures (decubitus, contractur, thrombosis prophylaxis)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.b7}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Create and maintain mobilization plans</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.b8}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12}>
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
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.b9}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Dealing with incontinence, continence training</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.b10}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Discharge systems (e.g. urinary catheterism, stool dissipation systems)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.b11}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Administer ingesudes</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.b12}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                { /*** PROFESSIONAL CARE */ }
                <Grid item xs={12} sm={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                            Pflegeintervention
                        </Typography>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Participation in medical and diagnostic procedures
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Blood collection, physical examination</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.c1}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Assistance with medical measures (e.g. endoscopy, admission examination in the hospital)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.c2}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
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
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.c3}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Blood and blood products (transfusion)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.c4}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Dealing with narcotics</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.c5}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
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
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.c6}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Wound assessment</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.c7}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Wound treatment (e.g. dressings and change)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.c8}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
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
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.c9}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
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
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.c10}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Devices for measuring vital parameters (e.g. blood pressure, blood sugar, monitoring)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.c11}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Special equipment (e.g. suction devices, ECG, defibrillators, ventilators)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.c12}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
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
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.c13}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Advanced life support</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.c14}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                            D - Hygiene
                        </Typography>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Apply hygiene measures
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Various disinfection measures (e.g. hand, skin, surface disinfection)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.d1}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Perform infection control measures (e.g. isolation of patients)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.d2}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Use sterile procedures (e.g. laying permanent catheters)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.d3}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
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
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.d4}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Operating sterilizers</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.d5}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
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
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.d6}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Reduce the risk of accidents (e.g. accident prevention regulations)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.d7}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>External protection and self-protection</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.d8}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
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
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.d9}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                            E - Communication with colleagues, patients and others
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Lead team and case meetings</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.e1}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Introducing, guiding and guilding employees</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.e2}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Shift line station line</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.e3}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Write rosters</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.e4}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Educate and advice relatives</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.e5}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Educate and advice relatives</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.e6}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                            F - Documentation and quality
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Document primary care and treatment care measures (care report)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.f1}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Placing order</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.f2}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Documenting and evaluating visits</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.f3}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Write letters (e.g. care transition)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.f4}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Ensure cleanliness and order at the workplace (station rooms, patient rooms)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.f5}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Apply quality assurance and control measures (e.g. drug check)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.f6}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={10}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Resource-saving working methods</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Box px={4}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.f7}
                            icon={<CheckBoxIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Box>
                </Grid>
            </Grid>
        )
    } else {
        return (
            <Box py={4}>
                <div className={classes.notification} color="secondary">
                    <ErrorOutlineIcon color="secondary" />&nbsp; 
                    Applicant has not filled out his/her Practical Knowledge form.
                </div>
            </Box>
        )
    }
}

export default PracticalActivitiesView;