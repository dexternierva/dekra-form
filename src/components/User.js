import React, { useContext, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useCurrentUser, useDispatchCurrentUser } from "../containers/CurrentUser";
import GetUsers from "../containers/GetUsers";
import { UserContext } from "../containers/GetUsers";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import styled from "styled-components";
import {
    Avatar,
    Box,
    AppBar,
    CssBaseline,
    Divider,
    Drawer,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Backdrop,
    CircularProgress,
    Fab,
    Checkbox,
    FormControlLabel,
    TextField,
} from '@material-ui/core';

import Rating from '@material-ui/lab/Rating';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import PrintIcon from '@material-ui/icons/Print';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { green, pink } from '@material-ui/core/colors';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { makeStyles, useTheme } from '@material-ui/core/styles';

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

const drawerWidth = 240;

const SectionTitle = styled.div`
    margin-left: 1rem;
    color: #008B4F;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 700;
`;

const Name = styled.div`
    font-size: 1.5rem;
    color: #008B4F;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

const Header = styled.h4`
    color: #008B4F;
    margin: 0;
    font-weight: 400;
    font-size: 1.5rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
        display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    pink: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[500],
    },
    green: {
        color: '#fff',
        backgroundColor: green[500],
    },
    grid: {
        margin: '0 0 4rem 0',
        borderLeft: '4px solid #008B4F',
    },
    ftable: {
        maxWidth: '98%',
        border: '4px solid #008B4F',
        margin: '0 0 2rem 0'
    },
    table: {
        margin: '-.75rem 0 0 0'
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
        display: 'flex',
        aligItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
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
    col1: { width: '30%' },
    col2: { width: '70%' },
}));

/* 
 * PROFILE VIEW
 * ------------------------------------------------------------------------------------------------ */
function  ProfileView({ response }) {
    const classes = useStyles();

    if (response.cv !== null) {
        function createKeyFiguresData(name, value) {
            return { name, value };
        }
        
        const keyfigurerows = [
            //createKeyFiguresData(t('Conclusion'), response.cv.kfDegree),
            createKeyFiguresData('Language skills', response.cv.kfLanguage),
            createKeyFiguresData('Experience', response.cv.kfExperienceYear + " Year(s) and " + response.cv.kfExperienceMonth + " Month(s)"),
            // createKeyFiguresData(t('Priorities'), response.cv.kfPriorities),
        ];

        function personalBackgroundData(name, value) {
            return { name, value };
        }
        
        const personalbackgroundrows = [
            personalBackgroundData('Address', response.cv.address),
            personalBackgroundData('E-mail Address', response.cv.email),
            personalBackgroundData('Nationality', response.cv.nationality),
            personalBackgroundData('Sex', response.cv.sex),
            personalBackgroundData('Date of birth', moment(response.cv.dateOfBirth).format("DD.MM.YYYY")),
            personalBackgroundData('Place of birth', response.cv.placeOfBirth),
            personalBackgroundData('Marital status', response.cv.maritalStatus),
            personalBackgroundData('Number of children', response.cv.children),
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
                        <Typography className={classes.typo} variant="h4" component="h2">Gesundheits - Und Krankenpfleger</Typography>
                    </Name>
                </Grid>
            </Grid>

            <Grid container spacing={0} className={classes.grid}>
                <Grid item xs={12} sm={3}>
                    <SectionTitle>At a glance</SectionTitle>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TableContainer className={classes.table}>
                        <Table aria-label="simple table"> 
                            <TableBody>
                                <TableRow>
                                    <TableCell className={classes.col1} component="th" scope="row">Degree</TableCell>
                                    <TableCell className={classes.col2}>
                                        {response.cv.kfDegree}
                                        Allgemeine Gesundheits- und Krankenpflege
                                    </TableCell>
                                </TableRow>

                                {keyfigurerows.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell className={classes.col1} component="th" scope="row">{row.name}</TableCell>
                                        <TableCell className={classes.col2}>{row.value}</TableCell>
                                    </TableRow>
                                ))}

                                <TableRow>
                                    <TableCell className={classes.col1} component="th" scope="row">Specializations</TableCell>
                                    <TableCell className={classes.col2}>
                                        <ol className={classes.specializationList}>
                                            {response.cv.kfPriorities.split(', ').map((step) => <li>{step}</li>)}
                                        </ol>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            <caption>Detailed overview of activities in the 'Professional Skills' facility</caption>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Grid container spacing={0} className={classes.grid}>
                <Grid item xs={12} sm={3}>
                    <SectionTitle>Private Background</SectionTitle>
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
                            <TableRow>
                                <TableCell className={classes.col1}>Children</TableCell>
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


/* 
 * WORK EXPERIENCE VIEW
 * ------------------------------------------------------------------------------------------------ */
function WorkExprienceTemplate({ exp, idx }) {
    const classes = useStyles();
    
    function createKeyFiguresData(name, value) {
        return { name, value };
    }
    
    const keyfigurerows = [
        createKeyFiguresData('Period', "From: " + moment(exp.from).locale('de').format('MMMM YYYY') + " | To: " + moment(exp.to).locale('de').format('MMMM YYYY')),
        createKeyFiguresData('Job title/function', exp.job),
        createKeyFiguresData('Employers name & address', exp.employer),
    ];

    return (
        <Grid container spacing={0} className={classes.grid}>
            <Grid item xs={12} sm={3}>
                <SectionTitle>{"Work Experience"} {idx + 1}</SectionTitle>
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
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

function WorkExperienceView ({ response }) {
    const classes = useStyles();

    if (response.work_experiences.length !== 0) {
        const experiences = response.work_experiences.map((experience, idx) => {
            return <WorkExprienceTemplate exp={experience} idx={idx} key={idx} />
        })

        return  <>{experiences}</>
    } else {
        return (
            <Box py={4}>
                <div className={classes.notification} color="secondary">
                    <ErrorOutlineIcon color="secondary" />&nbsp; 
                    Applicant has not filled out his/her Work Experience(s) form.
                </div>
            </Box>
        )
    } 
}

/* 
 * EDUCATION VIEW
 * ------------------------------------------------------------------------------------------------ */
function EducationTemplate({ edu, idx }) {
    const classes = useStyles();

    function createKeyFiguresData(name, value) {
        return { name, value };
    }
    
    const keyfigurerows = [
        createKeyFiguresData('Period', "From: " + moment(edu.from).locale('de').format('MMMM YYYY') + " | To: " + moment(edu.to).locale('de').format('MMMM YYYY')),
        createKeyFiguresData('Conclusion', edu.course),
        createKeyFiguresData('Name & address of the school/university', edu.university),
    ];

    return (
        <Grid container spacing={0} className={classes.grid}>
            <Grid item xs={12} sm={3}>
                <SectionTitle>{"Education & Training"} {idx + 1}</SectionTitle>
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
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

function EducationView ({ response }) {
    const classes = useStyles();
    if (response.educations.length !== 0) {
        const educations = response.educations.map(function (edu, idx) {
            return (
                <EducationTemplate edu={edu} idx={idx} key={idx} />
            )
        })

        return <> {educations} </>
    } else {
        return (
            <Box py={4}>
                <div className={classes.notification} color="secondary">
                    <ErrorOutlineIcon color="secondary" />&nbsp; 
                    Applicant has not filled out his/her Education(s) form.
                </div>
            </Box>
        )
    }
}

/* 
 * TRAINING VIEW
 * ------------------------------------------------------------------------------------------------ */
function TrainingTemplate({ training, idx }) {
    const classes = useStyles();
    
    function createKeyFiguresData(name, value) {
        return { name, value };
    }
    
    const keyfigurerows = [
        createKeyFiguresData('Period', "From: " + moment(training.from).locale('de').format('MMMM YYYY') + " | To: " + moment(training.to).locale('de').format('MMMM YYYY')),
        createKeyFiguresData('Name of training provider', training.provider),
        // createKeyFiguresData(t('Skills acquired'), training.skills),
    ];

    return (
        <Grid container spacing={0} className={classes.grid}>
            <Grid item xs={12} sm={3}>
                <SectionTitle>{"Training and further education"} {idx + 1}</SectionTitle>
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
                                <TableCell component="th" scope="row" className={classes.col1}>Skills acquired</TableCell>
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
    const classes = useStyles();

    if (response.trainings.length !== 0) {
        const trainings = response.trainings.map(function (training, idx) {
            return (
                <TrainingTemplate training={training} idx={idx} key={idx} />
            )
        })

        return <> {trainings} </>
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

/* 
 * LANGUAGE SKILLS VIEW
 * ------------------------------------------------------------------------------------------------ */
function LanguageSkillsView({ response }) {
    const classes = useStyles();
    if (response.cv !== null) {
        function languageSkillsData(name, value) {
            return { name, value };
        }
        
        const languageskillsrows = [
            languageSkillsData('Native language', response.cv.nativeLanguage),
            languageSkillsData('German language skills up-to-date', moment(response.cv.germanLanguageDate).format("DD.MM.YYYY")),
            languageSkillsData('German B1-B2 Care', 'voraussichtlich ' + moment(response.cv.germanCare).format("DD.MM.YYYY")),
            languageSkillsData('Other languages', 'Language: ' + response.cv.otherLanguages + ' | Level: ' + response.cv.otherLanguagesLevel),
        ];

        return (
            <Grid container spacing={0} className={classes.grid}>
                <Grid item xs={12} sm={3}>
                    <SectionTitle>Language Skills</SectionTitle>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TableContainer className={classes.table}>
                        <Table aria-label="simple table">
                            <TableBody>
                            {languageskillsrows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row" className={classes.col1}>{row.name}</TableCell>
                                    <TableCell className={classes.col2}>{row.value}</TableCell>
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
                    Applicant has not filled out his/her Language Skills form.
                </div>
            </Box>
        )
    }
}

/* 
 * OTHER SKILLS VIEW
 * ------------------------------------------------------------------------------------------------ */
function OtherSkillsView({ response }) {
    const classes = useStyles();

    if (response.cv !== null) {
        function furtherKnowledgeData(name, value) {
            return { name, value };
        }
        
        const furtherknowledgerows = [
            furtherKnowledgeData('Computer skills', response.cv.computerSkills),
            furtherKnowledgeData('Other Computer skills', response.cv.otherComputerSkills),
            furtherKnowledgeData('Personal skills', response.cv.personalSkills),
            furtherKnowledgeData('Driving license', response.cv.drivingLicense),
        ];

        return (
            <Grid container spacing={0} className={classes.grid}>
                <Grid item xs={12} sm={2}>
                    <SectionTitle>Further Knowledge</SectionTitle>
                </Grid>
                <Grid item xs={12} sm={10}>
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
    } else {
        return (
            <Box py={4}>
                <div className={classes.notification} color="secondary">
                    <ErrorOutlineIcon color="secondary" />&nbsp; 
                    Applicant has not filled out his/her Other Skills form.
                </div>
            </Box>
        )
    } 
}


/* 
 * PRACTICAL SKILLS VIEW
 * ------------------------------------------------------------------------------------------------ */
function  PracticalSkillsView({ response }) {
    const classes = useStyles();

    if (response.practical_knowledge && response.practical_activity !== null) {
        const departments = response.practical_knowledge.departments.split(", ");
        const breathings = response.practical_knowledge.breathings.split(", ");
        const vitalsigns = response.practical_knowledge.vitalsigns.split(", ");

        return (
            <>
            <div className={classes.intro}>
                <Paper elevation={0} className={classes.paper}>
                    <Typography variant="h5" component="h2" className={classes.titles}>
                        Praktische Kenntnisse
                    </Typography>
                    <Typography color="h5" gutterBottom className={classes.titles}>
                        Anlage zum Lebenslauf von: {response.lastname + ', ' + response.lastname}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Diese Angaben sollen zusätzlich zum Lebenslauf eine Übersicht darüber vermitteln, welche praktischen Fähigkeiten bereits selbständig ausgeführt wurden. Es handelt sich um eine Selbsteinschätzung des Teilnehmers zur allgemeinen Orientierung, stellt aber keine qualitative Aussage über diese individuelle Fähigkeiten dar.
                    </Typography>
                </Paper>
            </div>

            {
                /**
                 * PRACTICAL KNOWLEDGE
                 * =====================================================================
                 */
            }
            <section>
                {
                    /**
                     * DEPARTMENT
                     * =====================================================================
                     */
                }
                <Grid container spacing={0} className={classes.grid}>
                    <Grid item xs={12} sm={12}>
                        <SectionTitle>Fachbereich</SectionTitle>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.care}  color="primary" />}
                                label="Intensivmedizin"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.internalmedicine}  color="primary" />}
                                label="Innere Medizin"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.pediatrics}  color="primary" />}
                                label="Pädiatrie"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.generalaccidentsurgery}  color="primary" />}
                                label="Allgemeine Unfallchirurgie"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.anesthesia}  color="primary" />}
                                label="Anästhesie"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.orthopedics}  color="primary" />}
                                label="Orthopädie"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.emergency}  color="primary" />}
                                label="Notaufnahme"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.op}  color="primary" />}
                                label="OP"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.neurology}  color="primary" />}
                                label="Neurologie"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.geriatrics}  color="primary" />}
                                label="Geriatrie"
                            />
                        </Box>
                    </Grid>
                    {
                        departments.map((department, index) => (
                            <Grid item xs={12} sm={4}>
                                <Box px={2}>
                                    <TextField id="standard-basic" label="" value={department} />
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>
            </section>
            
            <section>
                <Grid container spacing={0}>
                    {
                        /**
                         * BASIC CARE
                         * =====================================================================
                         */
                    }
                    <Grid item xs={12} sm={6} className={classes.grid}>
                        <SectionTitle>Grundpflege</SectionTitle>

                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.patientwashing}  color="primary" />}
                                label="Patient waschen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.patientstorage}  color="primary" />}
                                label="Patient lagern"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.mobilization}  color="primary" />}
                                label="Mobilisation"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.helpwithfood}  color="primary" />}
                                label="Hilfe beim Essen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.prophylaxis}  color="primary" />}
                                label="Prophylaxen (Pneumonie, Dekubitus, Kontraktur...)"
                            />
                        </Box>
                        <Box px={2}>
                            <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalbasiccare1}/>
                        </Box>
                        <Box px={2}>
                            <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalbasiccare2}/>
                        </Box>
                        <Box px={2}>
                            <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalbasiccare3}/>
                        </Box>
                        <Box px={2}>
                            <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalbasiccare4}/>
                        </Box>
                        <Box px={2}>
                            <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalbasiccare5}/>
                        </Box>
                    </Grid>

                    {
                        /**
                         * BREATHING
                         * =====================================================================
                         */
                    }
                    <Grid item xs={12} sm={6} className={classes.grid}>
                        <SectionTitle>Atmung</SectionTitle>

                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.oxygentherapy}  color="primary" />}
                                label="O²-Gabe / Sauerstofftherapie"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.assessingbreathing}  color="primary" />}
                                label="Atmung beurteilen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.inhalation}  color="primary" />}
                                label="Inhalation"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.thoraxdrainage}  color="primary" />}
                                label="Thoraxdrainage"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.tracheostoma}  color="primary" />}
                                label="Tracheostoma / Pflege Trachealkanüle"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.suction}  color="primary" />}
                                label="Absaugen Mund/Rachen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.ventilators}  color="primary" />}
                                label="Beatmungsgeräte bedienen auf Anweisung"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.settingventilators}  color="primary" />}
                                label="Beatmungsgeräte selbständig einstellen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.beatmungsformen}  color="primary" />}
                                label="Beatmungsformen (CPAP, BIPAP, SIMV)"
                            />
                        </Box>
                        {
                            breathings.map((breathing, index) => (
                                <Grid item xs={12} sm={4}>
                                    <Box px={2}>
                                        <TextField id="standard-basic" label="" value={breathing} />
                                    </Box>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </section>
            
            <section>
                <Grid container spacing={0}>
                    {
                        /**
                         * Vital sign control / monitoring
                         * =====================================================================
                         */
                    }
                    <Grid item xs={12} sm={6} className={classes.grid}>
                        <SectionTitle>Vitalzeichenkontrolle / Überwachung</SectionTitle>

                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.rrmeasurement}  color="primary" />}
                                label="RR-Messung (Blutdruck messen)"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.measuringtemperature}  color="primary" />}
                                label="Temperatur messen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.measuringblood}  color="primary" />}
                                label="Blutzucker messen (Geräte)"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.monitor}  color="primary" />}
                                label="Monitor"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.pulsoxymeter}  color="primary" />}
                                label="Pulsoxymeter"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.ecg}  color="primary" />}
                                label="EKG schreiben"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.readassess}  color="primary" />}
                                label="EKG lesen / beurteilen"
                            />
                        </Box>
                        {
                            vitalsigns.map((vitalsign, index) => (
                                <Box px={2}>
                                    <TextField id="standard-basic" label="" value={vitalsign} />
                                </Box>
                            ))
                        }
                    </Grid>

                    {
                        /**
                         * DEVICES
                         * =====================================================================
                         */
                    }
                    <Grid item xs={12} sm={6} className={classes.grid}>
                        <SectionTitle>Geräte</SectionTitle>

                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.bloodglucose}  color="primary" />}
                                label="Blutzuckermessgerät"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.devicesmonitor}  color="primary" />}
                                label="Monitor"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.devicespulsoxymeter}  color="primary" />}
                                label="Pulsoxymeter"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.schmerzpumpe}  color="primary" />}
                                label="Schmerzpumpe / PCA-Pumpe"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.infusomat}  color="primary" />}
                                label="Infusomat / Infusionspumpe"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.perfusor}  color="primary" />}
                                label="Perfusor / Sprizenpumpe"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.vacuumpump}  color="primary" />}
                                label="Vakuumpumpe Wunde"
                            />
                        </Box>
                        <Box px={2}>
                            <TextField id="standard-basic" label="" value={response.practical_knowledge.additionaldevices}/>
                        </Box>
                    </Grid>
                </Grid>
            </section>

            <section>
                <Grid container spacing={0}>
                    {
                        /**
                         * MEDICATIONS
                         * =====================================================================
                         */
                    }
                    <Grid item xs={12} sm={6} className={classes.grid}>
                        <SectionTitle>Medikamente</SectionTitle>

                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.pharmacology}  color="primary" />}
                                label="Pharmakologie, Wirkungsweise von Medikamenten"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.oraladministration}  color="primary" />}
                                label="Oral gabe"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.rektalegabe}  color="primary" />}
                                label="Rektale gabe"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.subcutaneous}  color="primary" />}
                                label="Subkutan"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.intramuscular}  color="primary" />}
                                label="intramuskulär"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.intravenously}  color="primary" />}
                                label="Intravenös"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.infusion}  color="primary" />}
                                label="Infusion"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.centralvenous}  color="primary" />}
                                label="ZVK – Zentraler Venenkatheter"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.feedingtube}  color="primary" />}
                                label="Magensonde"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.notfallmedikamente}  color="primary" />}
                                label="Notfallmedikamente"
                            />
                        </Box>
                        <Box px={2}>
                            <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalmedication1}/>
                        </Box>
                        <Box px={2}>
                            <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalmedication2}/>
                        </Box>
                        <Box px={2}>
                            <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalmedication3}/>
                        </Box>
                    </Grid>

                    {
                        /**
                         * EXCRETION
                         * =====================================================================
                         */
                    }
                    <Grid item xs={12} sm={6} className={classes.grid}>
                        <SectionTitle>Ausscheidung</SectionTitle>

                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.urogenitalbereich}  color="primary" />}
                                label="Urogenitalbereich"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.onetimecatheter}  color="primary" />}
                                label="Einmalkatheter legen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.permanentcatheter}  color="primary" />}
                                label="Dauerkatheter legen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.suprapubiccatheter}  color="primary" />}
                                label="Suprapubischer Katheter Assist. Anlage/Pflege"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.hurine}  color="primary" />}
                                label="24h - Urin"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.excretioninfusion}  color="primary" />}
                                label="Infusion"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.condomurinal}  color="primary" />}
                                label="Kondom – Urinal"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.magendarmtrakt}  color="primary" />}
                                label="Magendarmtrakt"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.caregastricprobe}  color="primary" />}
                                label="Pflege von Magensonde "
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.transnasalgastric}  color="primary" />}
                                label="Transnasale Magensonde legen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.careofpeg}  color="primary" />}
                                label="Pflege von PEG"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.careofstoma}  color="primary" />}
                                label="Pflege von Stoma / Enterostoma"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.intestinalrinsing}  color="primary" />}
                                label="Darmspülung (Hebe-Senk-Einlauf, Klistier)"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </section>

            <section>
                <Grid container spacing={0}>
                    {
                        /**
                         * NEUROLOGY
                         * =====================================================================
                         */
                    }
                    <Grid item xs={12} sm={6} className={classes.grid}>
                        <SectionTitle>Neurologie</SectionTitle>

                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.stateofconsciousness}  color="primary" />}
                                label="Bewusstseinslage prüfen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.carestroke}  color="primary" />}
                                label="Pflege schlaganfall / stroke"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.cerebralhemorrhage}  color="primary" />}
                                label="Pflege hirnblutung"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.caringparkinson}  color="primary" />}
                                label="Pflege Parkinson"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.carebraintumor}  color="primary" />}
                                label="Pflege Gehirntumor"
                            />
                        </Box>
                        <Box px={2}>
                            <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalneurology}/>
                        </Box>
                    </Grid>

                    {
                        /**
                         * WOUND TREATMENT
                         * =====================================================================
                         */
                    }
                    <Grid item xs={12} sm={6} className={classes.grid}>
                        <SectionTitle>Wundbehandlung</SectionTitle>

                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.asepticdressing}  color="primary" />}
                                label="Steriler verbandswechsel aseptischer verband"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.septicdressing}  color="primary" />}
                                label="Steriler verbandswechsel septischer verband"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.pullingthreads}  color="primary" />}
                                label="Fäden ziehen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.removebrackets}  color="primary" />}
                                label="Klammern entfernen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.woundassessment}  color="primary" />}
                                label="Wundbeurteilung"
                            />
                        </Box>
                        <Box px={2}>
                            <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalwoundtreatment}/>
                        </Box>
                    </Grid>
                </Grid>
            </section>
            
            {
                /**
                 * PRACTICAL ACTIVITIES
                 * =====================================================================
                 */
            }
            <Grid container spacing={3} alignItems="center" className={classes.grid}>
                <Grid item xs={12} sm={12}>
                    <Box py={0} px={4}>
                        <Typography variant="h5" component="h2">
                            Praktische Tätigkeiten
                        </Typography>
                        <Typography variant="body2" component="p">
                            Selbsteinschätzung des Teilnehmers <br />
                            0 (nicht bekannt), 1 (in Theorie bekannt), 2 (praktische Durchführung beobachtet), 3 (unter Aufsicht selbst durchgeführt), 4 (selbständige Durchführung), 5 (Experte, Anleitung anderer Kollegen).
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                            A - Beurteilung von PatientInnen, Pflegediagnose, Pflegeplanung
                        </Typography>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Informationen über PatientInnen erlangen
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>1. Grundsätzliche Parameter (bspw. Größe, Gewicht) und Vitalparameter erheben (mittels manueller Messung, mittels Monitoring)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.a1}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>2. Körperlichen (physisch, neurologisch) und kognitiven Zustand von PatientInnen ermitteln</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.a2}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>3. Skalen und Indikatoren auszufüllen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.a3}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>4. Skalen und Indikatoren auszufüllen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.a4}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Pflegeprobleme und Pflegediagnose
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>5. Versorgungsdefizite erkennen, adäquate Unterstützung bereitstellen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.a5}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>6. Pflegediagnosen festlegen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.a6}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>7. Pflegestandards anwenden</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.a7}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Pflegeplanung
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>8. Pflegeziele festlegen und Pflegepläne aktualisieren</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.a8}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>9. Pflegemaßnahmen planen und durchführen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.a9}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>10. Spezielle Pflegepläne (krankheitsbildbezogen) anwenden</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.a10}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                { /*** PROFESSIONAL CARE */ }
                <Grid item xs={12} sm={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                            B - Professionelle Pflege
                        </Typography>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Grundpflege und Körperpflege
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>1. Teil- und Ganzkörperpflege unterstützen und übernehmen (inklusive Hautpflege, Waschen und Kleiden, Pflegeprodukte anwenden, spezielle Methoden anwenden [z.B. Basale Stimulation, Bobath], am Waschbecken, im Bett)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.b1}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>2. Anlegen von Kompressionsverbänden und Kompressionsstrümpfen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.b2}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Ernährung
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>3. Speisen und Getränke zubereiten, verteilen, anreichen (füttern)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.b3}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>4. Ernährungspläne erstellen, dokumentieren</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.b4}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>5. Ernährungssonden (inklusive PEG) benutzen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.b5}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Mobilität
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>6. Mobilität unterstützen, aufrechterhalten, wiederherstellen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.b6}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>7. Prophylaktische Maßnahmen (Dekubitus-, Kontraktur-, Thromboseprophylaxe) durchführen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.b7}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>8. Mobilisationspläne erstellen und führen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.b8}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Ausscheiden
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>9. Bei der Ausscheidung unterstützen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.b9}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>10. Umgang mit Inkontinenz, Kontinenztraining</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.b10}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>11. Ableitungssysteme (z.B. Harnblasenkatheterismus, Stuhlableitungssysteme) anwenden</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.b11}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>12. Einläufe verabreichen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.b12}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                { /*** PROFESSIONAL CARE */ }
                <Grid item xs={12} sm={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                            Pflegeintervention
                        </Typography>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Teilnahme an medizinischen und diagnostischen Prozeduren und Verfahren
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>1. Blutentnahme, körperliche Untersuchung</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.c1}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>2. Assistenz bei ärztlichen Maßnahmen (z.B. Endoskopie, Aufnahmeuntersuchung im Krankenhaus)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.c2}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Medikamente
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>3. Verwalten, vorbereiten, verabreichen (z.B. oral, intravenös)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.c3}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>4. Blut und Blutprodukte (Transfusion)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.c4}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>5. Umgang mit Betäubungsmitteln</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.c5}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Wundmanagement
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>6. Wundvermeidung, Prophylaxen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.c6}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>7. Wundassessment</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.c7}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>8. Wundbehandlung (z.B. Verbände anlegen und wechseln)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.c8}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Stomaversorgung
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>9. Pflege unterschiedlicher Stomata (z.B. Tracheostoma, Ileostoma, Urostoma)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.c9}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Medizinische Geräte anwenden
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>10. Pflegehilfsmittel, Mobilisationsmittel, Transferhilfen, Rollstühle</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.c10}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>11. Geräte zur Messung von Vitalparametern (z.B. Blutdruck, Blutzucker, Monitoring)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.c11}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>12. Spezielle Geräte (z.B. Absauggeräte, EKG, Defibrillatoren, Beatmungsmaschinen)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.c12}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Lebensrettende Maßnahmen
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Basic life support</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.c13}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Advanced life support</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.c14}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                            D - Hygiene
                        </Typography>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Hygienemaßnahmen anwenden
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>1. Verschiedene Desinfektionsmaßnahmen (z.B. Hände-, Haut-, Flächendesinfektion)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.d1}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>2. Maßnahmen der Infektionskontrolle durchführen (z.B. Isolierung von Patienten)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.d2}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>3. Sterile Verfahren anwenden (z.B. Legen von Dauerkathetern)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.d3}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Sterilisation
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>4. Medizinprodukte aufbereiten, angemessen verpacken und lagern</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.d4}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>5. Sterilisatoren bedienen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.d5}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Arbeits- und Gesundheitsschutz
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>6. Transporte von PatientInnen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.d6}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>7. Unfallgefahr reduzieren (z.B. Unfallverhütungsvorschriften)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.d7}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>8. Fremdschutz und Selbstschutz</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.d8}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Umgang mit Katastrophen
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>9. Feuer, Notfälle, Massenanfall an PatientInnen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.d9}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                            E - Kommunikation mit KollegInnen, PatientInnen und Anderen
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>1. Team- und Fallbesprechungen führen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.e1}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>2. MitarbeiterInnen einführen, anleiten</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.e2}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>3. Schichtleitung- Stationsleitung</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.e3}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>4. Dienstpläne schreiben</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.e4}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>5. Patienten aufklären und beraten</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.e5}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>6. Angehörige aufklären und beraten</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.e6}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box py={2} px={4}>
                        <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                            F - Dokumentation und Qualität
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>1. Grundpflegerische und behandlungspflegerische Maßnahmen dokumentieren (Pflegebericht)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.f1}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>2. Bestellungen durchführen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.f2}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>3. Visiten dokumentieren und auswerten</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.f3}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>4. Briefe verfassen (z.B. Pflegeüberleitung)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.f4}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>5. Sauberkeit und Ordnung am Arbeitsplatz (Stationszimmer, Patientenzimmer) sicherstellen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.f5}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>6. Maßnahmen der Qualitätssicherung und –kontrolle anwenden (z.B. Medikamentencheck)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.f6}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>7. Ressourcenschonende Arbeitsweise</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.ratingGrid}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        value={response.practical_activity.f7}
                        icon={<CheckBoxIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>
            </Grid>
            </>
        )
    } else {
        return (
            <Box py={4}>
                <div className={classes.notification} color="secondary">
                    <ErrorOutlineIcon color="secondary" />&nbsp; 
                    Applicant has not filled out his/her Practical Skills form.
                </div>
            </Box>
        )
    }
}


/* 
 * USER SUMMARY
 * ------------------------------------------------------------------------------------------------ */
function UserSummary ({id, displayComponent}) {
    const classes = useStyles();
    const { loading, response, error, setUserID } = useContext(UserContext);
    setUserID(id);

    if (response !== null) {
        if (displayComponent === 'cv') {
            return (
                <>
                    <ProfileView response={ response } />
                    <WorkExperienceView response={ response } />
                    <EducationView response={ response } />
                    <TrainingView response={ response } />
                    <LanguageSkillsView response={ response } />
                    <OtherSkillsView response={ response } />

                    <Box my={4} position="fixed" right="2rem" bottom="0rem">
                        <Link to={`/userdetails/${id}`}>
                            <Fab color="primary" aria-label="add"><PrintIcon /></Fab>
                        </Link>
                    </Box>
                </>
            )
        } else if (displayComponent === 'ps') {
            return (
                <>
                    <PracticalSkillsView response={response} />
                    <Box my={4} position="fixed" right="2rem" bottom="0rem">
                        <Link to={`/userpracticalskills/${id}`}>
                        <Fab color="primary" aria-label="add"><PrintIcon /></Fab>
                        </Link>
                    </Box>
                </>
            )
        }
    }

    return (
        <>
            { loading && 
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop> 
            }
            { error && <p>Something went wrong, please try again later.</p> }
        </>
    )
}

/**
 * START OF USER COMPONENT
 * ================================================================================================ */
function User (props) {
    let { id } = useParams();
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [displayComponent, setDisplayComponent] = useState('cv');
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const currentUser = useCurrentUser();
    const dispatch = useDispatchCurrentUser();
    const history = useHistory();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = async () => {
        try {
            await axios.post("https://dekra-form-api-m8bsw.ondigitalocean.app/logout")
        } catch (error) {
            console.error("Error in logging out", error);
        }

        dispatch({ type: "LOGOUT" });
        history.push("/");
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Box
                display="flex" 
                flexDirection="column"
                justifyContent="center" 
                alignItems="center"
                marginBottom="2rem"
            >
                <Avatar
                    component="div"
                    src=''
                    className={classes.large}
                />
                <Typography color="textPrimary" variant="h6">{currentUser.firstname} {currentUser.lastname}</Typography>
            </Box>

            <Divider />

            <List dense={true}>
                <ListItem>
                    <ListItemIcon><PermIdentityIcon /></ListItemIcon>
                    <ListItemText
                        primary="dekraformadmin"
                        secondary="username"
                    />
                </ListItem>
                <ListItem href="#simple-list">
                <ListItemIcon><MailOutlineIcon /></ListItemIcon>
                    <ListItemText
                        primary="d.nierva@educar-consultancy.com"
                        secondary="email"
                    />
                </ListItem>
            </List>

            <Divider />

            <List>
                <ListItem button onClick={ () => setDisplayComponent("cv") }>
                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                    <ListItemText>Curriculum Vitae</ListItemText>
                </ListItem>
                <ListItem button onClick={ () => setDisplayComponent("ps") }>
                    <ListItemIcon><ListAltIcon /></ListItemIcon>
                    <ListItemText>Practical Skills</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><ArrowBackIosIcon /></ListItemIcon>
                    <ListItemText><Link to={'/dashboard'}>Back to Users List</Link></ListItemText>
                </ListItem>
            </List>

            <Divider />

            <List>
                <ListItem button onClick={ handleLogout }>
                    <ListItemIcon><PowerSettingsNewIcon /></ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>User Details</Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{ paper: classes.drawerPaper, }}
                            ModalProps={{ keepMounted: true, /* Better open performance on mobile.*/ }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{ paper: classes.drawerPaper, }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <GetUsers>
                        <UserSummary id={ id } displayComponent={displayComponent} />
                    </GetUsers>
                </main>
            </div>
        </>
    );
}

User.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default User;