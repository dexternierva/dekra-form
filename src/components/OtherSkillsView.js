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

function OtherSkillsView({ response }) {
    let t = useTranslate("OtherSkills");
    const classes = useStyles();

    function furtherKnowledgeData(name, value) {
        return { name, value };
    }
    
    const furtherknowledgerows = [
        furtherKnowledgeData(t('Computer skills'), response.cv.computerSkills),
        furtherKnowledgeData(t('Other Computer skills'), response.cv.otherComputerSkills),
        furtherKnowledgeData(t('Personal skills'), response.cv.personalSkills),
        furtherKnowledgeData(t('Driving license'), response.cv.drivingLicense),
    ];

    return (
        <Grid container spacing={0} className={classes.grid}>
            <Grid item xs={12} sm={3}>
                <SectionTitle>{t("Further Knowledge")}</SectionTitle>
            </Grid>
            <Grid item xs={12} sm={9}>
                <TableContainer className={classes.table}>
                    <Table aria-label="simple table">
                        <TableBody>
                        {furtherknowledgerows.map((row) => (
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
}

export default OtherSkillsView;