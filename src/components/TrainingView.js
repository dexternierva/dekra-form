import React from "react";
import styled from "styled-components";
import moment from 'moment';
import 'moment/locale/de';

import { useTranslate } from "react-translate";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

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
    specializationList: {
        padding: '0',
        margin: '0',
        listStylePosition: 'inside'
    },
    col1: { width: '30%' },
    col2: { width: '70%' },
}));

const SectionTitle = styled.div`
    margin-left: 1rem;
    color: #008B4F;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 700;
`;

function TrainingTemplate({ training, idx }) {
    let t = useTranslate("Training");
    const classes = useStyles();
    
    function createKeyFiguresData(name, value) {
        return { name, value };
    }
    
    const keyfigurerows = [
        createKeyFiguresData(t('Period'), t("From: ") + moment(training.from).locale('de').format('MMMM YYYY') + " | " +  t(" To: ") + moment(training.to).locale('de').format('MMMM YYYY')),
        createKeyFiguresData(t('Name of training provider'), training.provider),
        // createKeyFiguresData(t('Skills acquired'), training.skills),
    ];

    return (
        <Grid container spacing={0} className={classes.grid}>
            <Grid item xs={12} sm={3}>
                <SectionTitle>{t("Training and further education")} {idx + 1}</SectionTitle>
            </Grid>
            <Grid item xs={12} sm={9}>
                <TableContainer className={classes.table}>
                    <Table aria-label="simple table">
                        <TableBody>
                        {keyfigurerows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row" className={classes.col1}>{row.name}</TableCell>
                                <TableCell className={classes.col2}><p className={classes.pWrap}>{row.value}</p></TableCell>
                            </TableRow>
                        ))}
                            <TableRow>
                                <TableCell className={classes.col2}>
                                    <ol className={classes.specializationList}>
                                        {training.skills.split(',').map((step) => <li>{step}</li>)}
                                    </ol>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

function TrainingView ({ response }) {
    const trainings = response.trainings.map((training, idx) => {
        return <TrainingTemplate training={training} idx={idx} key={idx} />
    })

    return <>{trainings}</>
}

export default TrainingView;