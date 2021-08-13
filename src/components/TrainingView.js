import React from "react";
import styled from "styled-components";

import { useTranslate } from "react-translate";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme) => ({
    grid: {
        margin: '0 0 4rem 0',
        borderLeft: '4px solid #008B4F',
    },
    table: {
        margin: '-.75rem 0 0 0'
    },
    notification: {
        ...theme.typography.button,
        padding: theme.spacing(2),
        display: 'flex',
        aligItems: 'center',
        justifyContent: 'center',
        border: '1px solid #008B4F',
        textAlign: 'center'
    },
}));

const SectionTitle = styled.div`
    margin-left: 1rem;
    color: #008B4F;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 700;
`;

function TrainingView({ response }) {
    let t = useTranslate("Training");
    const classes = useStyles();

    if (response.trainings.length !== 0) {
        function createTrainingData(name, value) {
            return { name, value };
        }
        
        const trainingrows = [
            createTrainingData(t('Period'), t("From: ") + response.trainings.from + " | " + t(" To: ") + response.trainings.to),
            createTrainingData(t('Name of training provider'), response.trainings.provider),
            createTrainingData(t('Skills acquired'), response.trainings.skills),
        ];

        return (
            <Grid container spacing={0} className={classes.grid}>
                <Grid item xs={12} sm={3}>
                    <SectionTitle>{t("Training and further education")}</SectionTitle>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TableContainer className={classes.table}>
                        <Table aria-label="simple table">
                            <TableBody>
                            {trainingrows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell align="right">{row.value}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        )
    } else {
        return (
            <Box py={4}>
                <div className={classes.notification} color="secondary">
                    <ErrorOutlineIcon color="secondary" />&nbsp;
                    Applicant has not filled out his/her Training(s) form.
                </div>
            </Box>
        )
    }
}

export default TrainingView;