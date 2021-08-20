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
    display: flex;
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
            languageSkillsData('German language skills up-to-date', response.cv.germanLanguageDate),
            languageSkillsData('German B1-B2 Care', response.cv.germanCare),
            languageSkillsData('Other languages', "Language: " + response.cv.otherLanguages + " | Level: " + response.cv.otherLanguagesLevel),
        ];

        return (
            <Grid container spacing={0} className={classes.grid}>
                <Grid item xs={12} sm={2}>
                    <SectionTitle>Language Skills</SectionTitle>
                </Grid>
                <Grid item xs={12} sm={10}>
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
 * PRACTICAL KNOWLEDGE VIEW
 * ------------------------------------------------------------------------------------------------ */
function  PracticalKnowledgeView({ response }) {
    const classes = useStyles();
    if ( response.practical_knowledge !== null) {
        return (
            <>
            <div className={classes.intro}>
                <Paper elevation={0} className={classes.paper}>
                    <Typography variant="h5" component="h2">
                        Practical Knowledge
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        Appendix to the CV of:
                    </Typography>
                    <Typography variant="body2" component="p">
                        In addition to the CV, these information is intended to provide an overview of which practical skills have already been carried out independently. It is a self-assessment of the participant for a basic orientation, <strong>but does not represent a qualitative statement about this individual abilities.</strong>
                    </Typography>
                </Paper>
            </div>

            {
                /**
                 * DEPARTMENT
                 * =====================================================================
                 */
            }
            <Grid container spacing={0} className={classes.grid}>
                <Grid item xs={12} sm={12}>
                    <SectionTitle>Department</SectionTitle>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.care}  color="primary" />}
                            label="Care"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.internalmedicine}  color="primary" />}
                            label="Internal medicine"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.pediatrics}  color="primary" />}
                            label="Pediatrics"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.generalaccidentsurgery}  color="primary" />}
                            label="General accident surgery"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.anesthesia}  color="primary" />}
                            label="Anesthesia"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.orthopedics}  color="primary" />}
                            label="Orthopedics"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.emergency}  color="primary" />}
                            label="Emergency"
                        />
                    </Box>
                    <Box px={4}>
                        <TextField id="standard-basic" label="" value={response.practical_knowledge.additionaldepartment1}/>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.op}  color="primary" />}
                            label="Op"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.neurology}  color="primary" />}
                            label="Neurology"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.geriatrics}  color="primary" />}
                            label="Geriatrics"
                        />
                    </Box>
                    <Box px={4}>
                        <TextField id="standard-basic" label="" value={response.practical_knowledge.additionaldepartment2}/>
                    </Box>
                </Grid>
            </Grid>

            
            <Grid container spacing={0}>
                {
                    /**
                     * BASIC CARE
                     * =====================================================================
                     */
                }
                <Grid item xs={12} sm={6} className={classes.grid}>
                    <SectionTitle>Basic care</SectionTitle>

                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.patientwashing}  color="primary" />}
                            label="Patient washing"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.patientstorage}  color="primary" />}
                            label="Patient storage"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.mobilization}  color="primary" />}
                            label="Mobilization"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.helpwithfood}  color="primary" />}
                            label="Help with food"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.prophylaxis}  color="primary" />}
                            label="Prophylaxis (pneumonia, decubitus, contracture...)"
                        />
                    </Box>
                    <Box px={4}>
                        <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalbasiccare1}/>
                    </Box>
                    <Box px={4}>
                        <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalbasiccare2}/>
                    </Box>
                    <Box px={4}>
                        <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalbasiccare3}/>
                    </Box>
                    <Box px={4}>
                        <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalbasiccare4}/>
                    </Box>
                    <Box px={4}>
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
                    <SectionTitle>Breathing</SectionTitle>

                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.oxygentherapy}  color="primary" />}
                            label="02-Gabe / Oxygen Therapy"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.assessingbreathing}  color="primary" />}
                            label="Assessing breathing"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.inhalation}  color="primary" />}
                            label="Inhalation"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.thoraxdrainage}  color="primary" />}
                            label="Thoraxdrainage"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.tracheostoma}  color="primary" />}
                            label="Tracheostoma / Care Tracheal Cannula"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.suction}  color="primary" />}
                            label="Suction mouth/throat"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.ventilators}  color="primary" />}
                            label="Ventilators operate on instruction"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.settingventilators}  color="primary" />}
                            label="Setting ventilators independently"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.beatmungsformen}  color="primary" />}
                            label="Beatmungsformen (CPAP, BIPAP, SIMV)"
                        />
                    </Box>
                    <Box px={4}>
                        <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalbreathing}/>
                    </Box>
                </Grid>
            </Grid>


            <Grid container spacing={0}>
                {
                    /**
                     * Vital sign control / monitoring
                     * =====================================================================
                     */
                }
                <Grid item xs={12} sm={6} className={classes.grid}>
                    <SectionTitle>Vital sign control / monitoring</SectionTitle>

                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.rrmeasurement}  color="primary" />}
                            label="RR measurement (measure blood pressure)"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.measuringtemperature}  color="primary" />}
                            label="Measuring temperature"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.measuringblood}  color="primary" />}
                            label="Measuring blood sugar (devices)"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.monitor}  color="primary" />}
                            label="Monitor"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.pulsoxymeter}  color="primary" />}
                            label="Pulsoxymeter"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.ecg}  color="primary" />}
                            label="ECG writing"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.readassess}  color="primary" />}
                            label="Read/assess ECG"
                        />
                    </Box>
                    <Box px={4}>
                        <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalvitalsign}/>
                    </Box>
                </Grid>

                {
                    /**
                     * DEVICES
                     * =====================================================================
                     */
                }
                <Grid item xs={12} sm={6} className={classes.grid}>
                    <SectionTitle>Devices</SectionTitle>

                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.bloodglucose}  color="primary" />}
                            label="Blood glucose"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.devicesmonitor}  color="primary" />}
                            label="Monitor"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.devicespulsoxymeter}  color="primary" />}
                            label="Pulsoxymeter"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.schmerzpumpe}  color="primary" />}
                            label="Schmerzpumpe / PCA-Pumpe"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.infusomat}  color="primary" />}
                            label="Infusomat / Infusionspumpe"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.perfusor}  color="primary" />}
                            label="Perfusor / Sprizenpumpe"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.ventilators}  color="primary" />}
                            label="Ventilators operate on instruction"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.vacuumpump}  color="primary" />}
                            label="Vacuum pump wound"
                        />
                    </Box>
                    <Box px={4}>
                        <TextField id="standard-basic" label="" value={response.practical_knowledge.additionaldevices}/>
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={0}>
                {
                    /**
                     * MEDICATIONS
                     * =====================================================================
                     */
                }
                <Grid item xs={12} sm={6} className={classes.grid}>
                    <SectionTitle>Medications</SectionTitle>

                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.pharmacology}  color="primary" />}
                            label="Pharmacology, mode of action of drugs"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.oraladministration}  color="primary" />}
                            label="Oral administration"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.rektalegabe}  color="primary" />}
                            label="Rektale gabe"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.subcutaneous}  color="primary" />}
                            label="Subcutaneous"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.intramuscular}  color="primary" />}
                            label="Intramuscular"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.intravenously}  color="primary" />}
                            label="Intravenously"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.infusion}  color="primary" />}
                            label="Infusion"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.centralvenous}  color="primary" />}
                            label="ZVK - Central Venous Catheter"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.feedingtube}  color="primary" />}
                            label="Feeding tube"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.notfallmedikamente}  color="primary" />}
                            label="Emergency medication"
                        />
                    </Box>
                    <Box px={4}>
                        <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalmedication1}/>
                    </Box>
                    <Box px={4}>
                        <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalmedication2}/>
                    </Box>
                    <Box px={4}>
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
                    <SectionTitle>Excretion</SectionTitle>

                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.urogenitalbereich}  color="primary" />}
                            label="Urogenital area"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.onetimecatheter}  color="primary" />}
                            label="Lay one-time catheter"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.permanentcatheter}  color="primary" />}
                            label="Lay permanent catheter"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.suprapubiccatheter}  color="primary" />}
                            label="Subrapubic catheter assist. plant/care"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.hurine}  color="primary" />}
                            label="24h - Urine"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.excretioninfusion}  color="primary" />}
                            label="Infusion"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.condomurinal}  color="primary" />}
                            label="Condom - Urinal"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.magendarmtrakt}  color="primary" />}
                            label="Magendarmtrakt"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.caregastricprobe}  color="primary" />}
                            label="Care of gastric probe"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.transnasalgastric}  color="primary" />}
                            label="Transnasal gastric probe lay"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.careofpeg}  color="primary" />}
                            label="Care of PEG"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.careofstoma}  color="primary" />}
                            label="Care of stoma / Enterostoma"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.intestinalrinsing}  color="primary" />}
                            label="Intestinal rinsing (lift-sink encession, clitanimal)"
                        />
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={0}>
                {
                    /**
                     * NEUROLOGY
                     * =====================================================================
                     */
                }
                <Grid item xs={12} sm={6} className={classes.grid}>
                    <SectionTitle>Neurology</SectionTitle>

                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.stateofconsciousness}  color="primary" />}
                            label="Checking the state of consciousness"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.carestroke}  color="primary" />}
                            label="Care Stroke / Stroke"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.cerebralhemorrhage}  color="primary" />}
                            label="Care of cerebral hemorrhage"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.caringparkinson}  color="primary" />}
                            label="Caring parkinson"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.carebraintumor}  color="primary" />}
                            label="Care of  brain tumor"
                        />
                    </Box>
                    <Box px={4}>
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
                    <SectionTitle>Wound Treatment</SectionTitle>

                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.asepticdressing}  color="primary" />}
                            label="Sterile bandage change of aseptic dressing"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.septicdressing}  color="primary" />}
                            label="Steriler bandage change septic bandage"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.pullingthreads}  color="primary" />}
                            label="Pulling threads"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.removebrackets}  color="primary" />}
                            label="Remove brackets"
                        />
                    </Box>
                    <Box px={4}>
                        <FormControlLabel
                            control={<Checkbox checked={response.practical_knowledge.woundassessment}  color="primary" />}
                            label="Wound assessment"
                        />
                    </Box>
                    <Box px={4}>
                        <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalwoundtreatment}/>
                    </Box>
                </Grid>
            </Grid>
            </>
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

/* 
 * PRACTICAL ACTIVITIES
 * ------------------------------------------------------------------------------------------------ */
function  PracticalActivitiesView({ response }) {
    const classes = useStyles();
    if (response.practical_activity !== null) {
        return (
            <Grid container spacing={3} alignItems="center" className={classes.grid}>
                <Grid item xs={12} sm={12}>
                    <Box py={2} px={4}>
                        <Typography variant="h5" component="h2">
                            Practical Activities
                        </Typography>
                        <Typography variant="body2" component="p">
                            Self-assessment of the participant <br />
                            0 (not known), 1 (known in theory), 2 (practical implementation observed), 3 (carried out under supervision), 4 (independent implementation), 5 (expert, guidance of other collegues).
                        </Typography>
                    </Box>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Collect basic parameters (e.g. size, weight) and vital parameters (by manual measurement, by means of monitoring)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Identify physical (physical, neurological) and cognitive state of patients</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Fill in scales and indicators</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Evaluate the parameters collected in compliance with the clinical</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Identify supply deficits, provide adequate support</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Set care diagnosis</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Applying care standards</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Set care goals and update care plans</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Planning and carrying out care measures</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Apply special care plans (disease pictured-related)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Support and take over partial and whole body care (including skin care, washing and dressing, use care products, apply special methods [e.B. basal stimulation, bobath], at the sink, in bed)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Application of compression bandages and compression stockings</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Prepare, distribute, rich (feed) food and beverages</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Create, document nutrition plans</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Use food probes (including PEG)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Support, maintain, restore mobility</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Perform prophylactic measures (decubitus, contractur, thrombosis prophylaxis)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Create and maintain mobilization plans</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Assisting in the excretion</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Dealing with incontinence, continence training</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Discharge systems (e.g. urinary catheterism, stool dissipation systems)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Administer ingesudes</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Blood collection, physical examination</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Assistance with medical measures (e.g. endoscopy, admission examination in the hospital)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Manage, prepare, administer (e.g. oral, intravenous)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Blood and blood products (transfusion)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Dealing with narcotics</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Wound avoidance, Prophylaxen</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Wound assessment</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Wound treatment (e.g. dressings and change)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Care of different stomata (e.g. tracheostoma, ileostoma, urostoma)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Care aids, mobilization aids, transfer aids, wheelchairs</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Devices for measuring vital parameters (e.g. blood pressure, blood sugar, monitoring)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Special equipment (e.g. suction devices, ECG, defibrillators, ventilators)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Basic life support</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Advanced life support</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Various disinfection measures (e.g. hand, skin, surface disinfection)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Perform infection control measures (e.g. isolation of patients)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Use sterile procedures (e.g. laying permanent catheters)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Process, appropriately package and store medical devices</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Operating sterilizers</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Transports of patients</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Reduce the risk of accidents (e.g. accident prevention regulations)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>External protection and self-protection</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Fire, emergencies, mass attack on patients</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Lead team and case meetings</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Introducing, guiding and guilding employees</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Shift line station line</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Write rosters</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Educate and advice relatives</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Educate and advice relatives</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Document primary care and treatment care measures (care report)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Placing order</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Documenting and evaluating visits</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Write letters (e.g. care transition)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Ensure cleanliness and order at the workplace (station rooms, patient rooms)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Apply quality assurance and control measures (e.g. drug check)</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>Resource-saving working methods</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
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
        } else if (displayComponent === 'pk') {
            return (
                <>
                    <PracticalKnowledgeView response={response} />
                    <Box my={4} position="fixed" right="2rem" bottom="0rem">
                        <Link to={`/userpracticalknowledge/${id}`}>
                        <Fab color="primary" aria-label="add"><PrintIcon /></Fab>
                        </Link>
                    </Box>
                </>
            )
        } else if (displayComponent === 'pa') {
            return (
                <>
                    <PracticalActivitiesView response={response} />
                    <Box my={4} position="fixed" right="2rem" bottom="0rem">
                        <Link to={`/userpracticalactivities/${id}`}>
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
                <ListItem button onClick={ () => setDisplayComponent("pk") }>
                    <ListItemIcon><ListAltIcon /></ListItemIcon>
                    <ListItemText>Practical Knowledge</ListItemText>
                </ListItem>
                <ListItem button onClick={ () => setDisplayComponent("pa") }>
                    <ListItemIcon><ListAltIcon /></ListItemIcon>
                    <ListItemText>Practical Activities</ListItemText>
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