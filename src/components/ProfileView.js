import React from "react";
import styled from "styled-components";
import moment from 'moment';

import { useTranslate } from "react-translate";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import PersonIcon from '@material-ui/icons/Person';

const SectionTitle = styled.div`
    margin-left: 1rem;
    color: #008B4F;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 700;
`;

const Header = styled.h4`
    color: #008B4F;
    margin: 0;
    font-weight: 400;
    font-size: 1.5rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

const Name = styled.div`
    font-size: 2rem;
    color: #008B4F;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

const useStyles = makeStyles((theme) => ({
    grid: {
        margin: '0 0 4rem 0',
        borderLeft: '4px solid #008B4F',
    },
    gridItemNoPadding: {
        padding: '0 12px !important',
    },
    table: {
        margin: '-.75rem 0 0 0',
    },
    ftable: {
        maxWidth: '98%',
        border: '4px solid #008B4F',
        margin: '0 0 2rem 0'
    },
    tcell: {
        borderRight: '4px solid #008B4F',
    },
    intro: {
        padding: '1rem',
        margin: '0 0 4rem 0',
        borderLeft: '4px solid #008B4F',
    },
    paper: {
        background: 'transparent'
    },
    typo: {
        margin: '0 0 0 1rem'
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
    avatar: {
        height: '100%',
        margin: '0 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'borderBox'
    },
    pWrap: {
        whiteSpace: 'pre-line',
        margin: '0'
    },
    defaultText: {
        display: 'block',
        marginTop: '.25rem'
    },
    specializationList: {
        padding: '0',
        margin: '0',
        listStylePosition: 'inside'
    },
    inlineList: {
        margin: '0',
        padding: '0',
        listStyleType: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        textDecoration: 'underline'
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

function  ProfileView({ response }) {
    let t = useTranslate("Profile");
    const classes = useStyles();

    if (response.cv !== null) {
        function createKeyFiguresData(name, value) {
            return { name, value };
        }
        
        const keyfigurerows = [
            //createKeyFiguresData(t('Conclusion'), response.cv.kfDegree),
            createKeyFiguresData(t('Language skills'), response.cv.kfLanguage),
            createKeyFiguresData(t('Experience'), response.cv.kfExperienceYear + " Jahr(e) und " + response.cv.kfExperienceMonth + " Monat(e)"),
            // createKeyFiguresData(t('Priorities'), response.cv.kfPriorities),
        ];

        function personalBackgroundData(name, value) {
            return { name, value };
        }
        
        const personalbackgroundrows = [
            personalBackgroundData(t('Address'), response.cv.address),
            personalBackgroundData(t('E-mail Address'), response.cv.email),
            personalBackgroundData(t('Nationality'), response.cv.nationality),
            personalBackgroundData(t('Sex'), response.cv.sex),
            personalBackgroundData(t('Date of birth'), moment(response.cv.dateOfBirth).format("DD.MM.YYYY")),
            personalBackgroundData(t('Place of birth'), response.cv.placeOfBirth),
            personalBackgroundData(t('Marital status'), response.cv.maritalStatus),
            // personalBackgroundData(t('Number of children'), response.cv.children),
        ];

        return (
            <>
            <Grid container spacing={3} className={classes.grid}>
                <Grid item xs={12} sm={3} className={classes.gridItemNoPadding}>
                    <Paper variant="outlined" square className={classes.avatar}>
                        <PersonIcon color="disabled" fontSize="large" />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={9} className={classes.gridItemNoPadding}>
                    <TableContainer className={classes.ftable}>
                        <Table aria-label="simple table">
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row" align="center" className={classes.tcell}><Header>Teilnehmer - ID</Header></TableCell>
                                    <TableCell component="th" scope="row" align="center"><Header>Kategorie</Header></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" className={classes.tcell}>{response.cv.kfParticipantId}</TableCell>
                                    <TableCell align="center">{response.cv.kfCategory}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Name>
                        <Typography className={classes.typo} variant="h4" component="h2">{response.firstname} {response.lastname}</Typography>
                        <Typography className={classes.typo} variant="h4" component="h2">Gesundheits - und Krankenpfleger</Typography>
                    </Name>
                </Grid>
            </Grid>

            <Grid container spacing={0} className={classes.grid}>
                <Grid item xs={12} sm={3}>
                    <SectionTitle>{t("At a glance")}</SectionTitle>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TableContainer className={classes.table}>
                        <Table aria-label="simple table"> 
                            <TableBody>
                                <TableRow>
                                    <TableCell className={classes.col1} component="th" scope="row">Abschluss</TableCell>
                                    <TableCell className={classes.col2}>
                                        {response.cv.kfDegree}
                                        <span className={classes.defaultText}>Allgemeine Gesundheits - und Krankenpflege</span>
                                    </TableCell>
                                </TableRow>

                                {keyfigurerows.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell className={classes.col1} component="th" scope="row">{row.name}</TableCell>
                                        <TableCell className={classes.col2}>{row.value}</TableCell>
                                    </TableRow>
                                ))}

                                <TableRow>
                                    <TableCell className={classes.col1} component="th" scope="row">Schwerpunkte</TableCell>
                                    <TableCell className={classes.col2}>
                                        <ol className={classes.specializationList}>
                                            {response.cv.kfPriorities.split(', ').map((step) => <li>{step}</li>)}
                                        </ol>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            <caption>{t("Detailed overview of activities in the 'Professional Skills' facility")}</caption>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Grid container spacing={0} className={classes.grid}>
                <Grid item xs={12} sm={3}>
                    <SectionTitle>{t("Private Background")}</SectionTitle>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TableContainer className={classes.table}>
                        <Table aria-label="simple table">
                            <TableBody>
                            {personalbackgroundrows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell className={classes.col1} component="th" scope="row">{row.name}</TableCell>
                                    <TableCell className={classes.col2}>{row.value}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow className={classes.noborderbottom}>
                                <TableCell className={classes.col1} component="th" scope="row">Kinder</TableCell>
                                <TableCell className={classes.col2}>{response.cv.children}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.col1}></TableCell>
                                <TableCell className={classes.col2}>
                                    <ul className={classes.inlineList}>
                                        <li>{response.cv.child1}</li>
                                        <li>{response.cv.child2}</li>
                                        <li>{response.cv.child3}</li>
                                        <li>{response.cv.child4}</li>
                                        <li>{response.cv.child5}</li>
                                        <li>{response.cv.child6}</li>
                                    </ul>
                                </TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            </>
        )
    } else {
        return (
            <Box py={4}>
                <div className={classes.notification} color="secondary">
                    <ErrorOutlineIcon color="secondary" />&nbsp;
                    Applicant has not filled out his/her Profile form.
                </div>
            </Box>
        )
    }
}

export default ProfileView;