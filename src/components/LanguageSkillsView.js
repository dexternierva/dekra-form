import React from "react";
import styled from "styled-components";
import moment from 'moment';

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
    noborderbottom: {
        "& th": {
            borderBottom: 'none'
        },
        "& td": {
            borderBottom: 'none'
        }
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

function LanguageSkillsView({ response }) {
    let t = useTranslate("Language");
    const classes = useStyles();
    
    if (response.cv !== null) {
        return (
            <Grid container spacing={0} className={classes.grid}>
                <Grid item xs={12} sm={3}>
                    <SectionTitle>{t("Language Skills")}</SectionTitle>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TableContainer className={classes.table}>
                        <Table aria-label="simple table">
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row" className={classes.col1}>{t('Native language')}</TableCell>
                                    <TableCell className={classes.col2}>response.cv.nativeLanguage</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row" className={classes.col1}>Deutschkenntnisse aktuell</TableCell>
                                    <TableCell className={classes.col2}>{response.cv.uptodateskills} {moment(response.cv.germanLanguageDate).format("DD.MM.YYYY")}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row" className={classes.col1}>{t('German B1-B2 Care')}</TableCell>
                                    <TableCell className={classes.col2}>voraussichtlich {moment(response.cv.germanCare).format("DD.MM.YYYY")}</TableCell>
                                </TableRow>
                                <TableRow className={classes.noborderbottom}>
                                    <TableCell component="th" scope="row" className={classes.col1}>Weitere Sprachen</TableCell>
                                    <TableCell className={classes.col2}>{t("Language: ")} {response.cv.englishLanguage} | {t("Level: ")} {response.cv.englishLanguageLevel}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row" className={classes.col1}>&nbsp;</TableCell>
                                    <TableCell className={classes.col2}>{t("Language: ")} {response.cv.otherLanguages} | {t("Level: ")} {response.cv.otherLanguagesLevel}</TableCell>
                                </TableRow>
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
                    Applicant has not filled out his/her Language Skills form.
                </div>
            </Box>
        )
    }
}

export default LanguageSkillsView;