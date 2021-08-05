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

const useStyles = makeStyles((theme) => ({
    grid: {
        margin: '0 0 4rem 0',
        borderLeft: '4px solid #008B4F',
    },
    table: {
        margin: '-.75rem 0 0 0'
    }
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
        function languageSkillsData(name, value) {
            return { name, value };
        }
        
        const languageskillsrows = [
            languageSkillsData(t('Native language'), response.cv.nativeLanguage),
            languageSkillsData(t('German language skills up-to-date'), response.cv.germanLanguageDate),
            languageSkillsData(t('German B1-B2 Care'), response.cv.germanCare),
            languageSkillsData(t('Other languages'), t("Language: ") + response.cv.otherLanguages + " | " +  t("Level: ") + response.cv.otherLanguagesLevel),
        ];

        return (
            <Grid container spacing={0} className={classes.grid}>
                <Grid item xs={12} sm={3}>
                    <SectionTitle>{t("Language Skills")}</SectionTitle>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TableContainer className={classes.table}>
                        <Table aria-label="simple table">
                            <TableBody>
                            {languageskillsrows.map((row) => (
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
            <Box p={4}>
                <div className={classes.notification} color="secondary">Applicant has not filled out his/her Training(s) form.</div>
            </Box>
        )
    }
}

export default LanguageSkillsView;