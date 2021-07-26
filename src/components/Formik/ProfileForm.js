import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { TextField, Select, RadioGroup } from "formik-material-ui";
import Alert from "../Alert";

import { 
    Box, 
    Button,
    Divider,
    Grid, 
    MenuItem,
    FormHelperText,
    FormControlLabel, 
    Radio,
    InputLabel,
    Typography,
    Step,
    StepLabel,
    Stepper,
    CircularProgress,
    Paper,
    Link,
    Modal,
    Backdrop,
    Fade,
} from '@material-ui/core';

import { DatePicker } from 'formik-material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
  
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        margin: '0 auto',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #008A4C',
        boxShadow: theme.shadows[5],
        [theme.breakpoints.down('sm')]: {
            height: '90%',
            overflow: 'scroll'
        },
        padding: theme.spacing(2, 4, 3),
    },
}));

function ProfileForm ({ setProfileFormState }) {
    const classes = useStyles();

    const [dialog, setDialog] = useState({ state:false, header: null, text: null });
    const [open, setOpen] = useState(false);
    const handleOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };
    const body = (
        <Fade in={open}>
            <div className={classes.paper}>
                <p><strong>Category 1:</strong> Nurse with little or no professional experience. Low professional experience means that someone in their home country has worked for less than three years in the function of a nurse on the patient in the recent past.</p>
                <p><strong>Category 2:</strong> Nurse with in-depth professional experience, inpatient or in a special department. In-depth professional experience means that someone in their home country has recently worked for at least three years in the function of a nurse on the patient, regardless of whether this was done on the ward or in a special department (intensive, surgical, neurology, anesthesia, etc.).</p>
                <p><strong>Category 3:</strong> <em>High Potential</em> - Nurse with in-depth professional experience of at least five years and special linguistic and personal aptitude, inpatient ot in a special department. In-depth professional experience means that someone in their home country has recently worked for at least five years in the function of a nurse (health and nurse as well as health and pediatric nurse) on the patient, regardless of whether this is done on the ward or in a special department (intensive, surgical, surgery, neurology, anesthesia, etc.).</p>
                <p><strong>Category 4:</strong> <em>Pediatric nurses</em> - with or without work experience. Pediatric nurse means that someone has already obtained the degree of a pediatric nurse in his home country and, thanks to a specific professional preparation and knowledge test, the German vocational qualification of a recognized nurse for general nursing pediatric nursing.</p>
            </div>
        </Fade>
    )

    const categoryOptions = [
        { label: 'Select Category', value: '' },
        { label: 'Category 1', value: '1' },
        { label: 'Category 2', value: '2' },
        { label: 'Category 3', value: '3' },
        { label: 'Category 4', value: '4' },
    ];

    const conclusionOptions = [
        { label: 'Select Degree', value: '' },
        { label: 'Diploma', value: 'Diploma' },
        { label: 'Bachelor', value: 'Bachelor' },
        { label: 'Masters', value: 'Masters' },
        { label: 'High school', value: 'High school' },
        { label: 'Matura', value: 'Matura' }
    ];

    const languageSkillsOptions = [
        { label: 'Select an option', value: 'none' },
        { label: 'Afrikaans', value: 'Afrikaans' },
        { label: 'Albanian', value: 'Albanian' },
        { label: 'Amharic', value: 'Amharic' },
        { label: 'Arabic', value: 'Arabic' },
        { label: 'Armenian', value: 'Armenian' },
        { label: 'Azerbaijani', value: 'Azerbaijani' },
        { label: 'Bengali', value: 'Bengali' },
        { label: 'Bhutanese', value: 'Bhutanese' },
        { label: 'Burmese', value: 'Burmese' },
        { label: 'Bislama', value: 'Bislama' },
        { label: 'Bosnian', value: 'Bosnian' },
        { label: 'Bulgarian', value: 'Bulgarian' },
        { label: 'Chichewa', value: 'Chichewa' },
        { label: 'Chinese', value: 'Chinese' },
        { label: 'Danish', value: 'Danish' },
        { label: 'Dari', value: 'Dari' },
        { label: 'German', value: 'German' },
        { label: 'English', value: 'English' },
        { label: 'Estonian', value: 'Estonian' },
        { label: 'Fijian', value: 'Fijian' },
        { label: 'Filipino (Tagalog)', value: 'Filipino (Tagalog)' },
        { label: 'Finnish', value: 'Finnish' },
        { label: 'French', value: 'French' },
        { label: 'Georgian', value: 'Georgian' },
        { label: 'Greek', value: 'Greek' },
        { label: 'Guaraní', value: 'Guaraní' },
        { label: 'Haitian', value: 'Haitian' },
        { label: 'Hebrew', value: 'Hebrew' },
        { label: 'Hindi', value: 'Hindi' },
        { label: 'Irish', value: 'Irish' },
        { label: 'Icelandic', value: 'Icelandic' },
        { label: 'Italian', value: 'Italian' },
        { label: 'Japanese', value: 'Japanese' },
        { label: 'Cambodian', value: 'Cambodian' },
        { label: 'Kazakh', value: 'Kazakh' },
        { label: 'Catalan', value: 'Catalan' },
        { label: 'Kyrgyz', value: 'Kyrgyz' },
        { label: 'Kirundi', value: 'Kirundi' },
        { label: 'Korean', value: 'Korean' },
        { label: 'Croatian', value: 'Croatian' },
        { label: 'Kurdish', value: 'Kurdish' },
        { label: 'Laotian', value: 'Laotian' },
        { label: 'Latin', value: 'Latin' },
        { label: 'Latvian', value: 'Latvian' },
        { label: 'Lithuanian', value: 'Lithuanian' },
        { label: 'Malagasy', value: 'Malagasy' },
        { label: 'Malay', value: 'Malay' },
        { label: 'Maldivian', value: 'Maldivian' },
        { label: 'Maltese', value: 'Maltese' },
        { label: 'Maori', value: 'Maori' },
        { label: 'Marshallese', value: 'Marshallese' },
        { label: 'Macedonian', value: 'Macedonian' },
        { label: 'Mongolian', value: 'Mongolian' },
        { label: 'Montenegrin', value: 'Montenegrin' },
        { label: 'Nauruan', value: 'Nauruan' },
        { label: 'Ndebele', value: 'Ndebele' },
        { label: 'Nepalese', value: 'Nepalese' },
        { label: 'Dutch', value: 'Dutch' },
        { label: 'North Sotho', value: 'North Sotho' },
        { label: 'Northern Ireland', value: 'Northern Ireland' },
        { label: 'Norwegian', value: 'Norwegian' },
        { label: 'Palaui', value: 'Palaui' },
        { label: 'Pashto', value: 'Pashto' },
        { label: 'Persian', value: 'Persian' },
        { label: 'Polish', value: 'Polish' },
        { label: 'Portuguese', value: 'Portuguese' },
        { label: 'Romansh', value: 'Romansh' },
        { label: 'Republic of Serbia', value: 'Republic of Serbia' },
        { label: 'Romanian', value: 'Romanian' },
        { label: 'Russian', value: 'Russian' },
        { label: 'Samoan', value: 'Samoan' },
        { label: 'Sango', value: 'Sango' },
        { label: 'Swedish', value: 'Swedish' },
        { label: 'Serbian', value: 'Serbian' },
        { label: 'Sinhala', value: 'Sinhala' },
        { label: 'Slovak', value: 'Slovak' },
        { label: 'Slovenian', value: 'Slovenian' },
        { label: 'Sotho', value: 'Sotho' },
        { label: 'Spanish', value: 'Spanish' },
        { label: 'Swahili', value: 'Swahili' },
        { label: 'South Sotho', value: 'South Sotho' },
        { label: 'Swazi', value: 'Swazi' },
        { label: 'Tajik', value: 'Tajik' },
        { label: 'Tamil', value: 'Tamil' },
        { label: 'Tetum', value: 'Tetum' },
        { label: 'Thai', value: 'Thai' },
        { label: 'Tigrinya', value: 'Tigrinya' },
        { label: 'Tok Pisin (Neo-Melanesian)', value: 'Tok Pisin (Neo-Melanesian)' },
        { label: 'Tongan', value: 'Tongan' },
        { label: 'Czech', value: 'Czech' },
        { label: 'Tsonga', value: 'Tsonga' },
        { label: 'Tsuana', value: 'Tsuana' },
        { label: 'Turkish', value: 'Turkish' },
        { label: 'Turkmen', value: 'Turkmen' },
        { label: 'Tuvalu (ish)', value: 'Tuvalu (ish)' },
        { label: 'Ukrainian', value: 'Ukrainian' },
        { label: 'Hungarian', value: 'Hungarian' },
        { label: 'Urdu', value: 'Urdu' },
        { label: 'Uzbek', value: 'Uzbek' },
        { label: 'Venda', value: 'Venda' },
        { label: 'Vietnamese', value: 'Vietnamese' },
        { label: 'Belarusian', value: 'Belarusian' },
        { label: 'Xhosa', value: 'Xhosa' },
        { label: 'Zulu', value: 'Zulu' }
    ];

    const languageSkillsLevelOptions = [
        { label: 'Select level', value: ''},
        { label: 'A1', value: 'A1' },
        { label: 'A2', value: 'A2' },
        { label: 'B1', value: 'B1' },
        { label: 'B2', value: 'B2' },
        { label: 'C1', value: 'C1' },
        { label: 'C2', value: 'C2' },
    ];

    const prioritiesOptions = [
        { label: 'Select Focus of Experience', value:'' },
        { label: 'General health and nursing care', value: 'general health and nursing care' },
        { label: 'Elderly care', value: 'elderly care' },
        { label: 'Ambulant care', value: 'ambulant care' },
        { label: 'Anesthesia', value: 'anesthesia' },
        { label: 'Ophthalmology', value: 'ophthalmology' },
        { label: 'Biochemistry', value: 'biochemistry' },
        { label: 'Surgery', value: 'surgery' },
        { label: 'Dermatology', value: 'dermatology' },
        { label: 'Dialysis', value: 'dialysis' },
        { label: 'Geriatrics', value: 'geriatrics' },
        { label: 'Health and pediatric nursing', value: 'health and pediatric nursing' },
        { label: 'Gynecology', value: 'gynecology' },
        { label: 'Midwife', value: 'midwife' },
        { label: 'Curative education care', value: 'curative education care' },
        { label: 'Ear, nose and throat medicine', value: 'ear, nose and throat medicine' },
        { label: 'Curative education', value: 'curative education' },
        { label: 'Hygiene', value: 'hygiene' },
        { label: 'Internal medicine', value: 'internal medicine' },
        { label: 'Intensive care unit', value: 'Intensive care unit' },
        { label: 'Child and adolescent psychiatry and psychotherapy', value: 'child and adolescent psychiatry and psychotherapy' },
        { label: 'Laboratory medicine', value: 'laboratory medicine' },
        { label: 'Microbiology, virology and infection epidemiology', value: 'microbiology, virology and infection epidemiology' },
        { label: 'Oral and maxillofacial surgery', value: 'oral and maxillofacial surgery' },
        { label: 'Nephrology', value: 'nephrology' },
        { label: 'Neurology', value: 'neurology' },
        { label: 'Emergency care', value: 'emergency care' },
        { label: 'Nuclear medicine', value: 'nuclear medicine' },
        { label: 'Public healthcare system', value: 'public healthcare system' },
        { label: 'Oncology', value: 'oncology' },
        { label: 'OP', value: 'op' },
        { label: 'Orthopedics', value: 'orthopedics' },
        { label: 'Pathology', value: 'pathology' },
        { label: 'Nursing science', value: 'nursing science' },
        { label: 'Pharmacology', value: 'pharmacology' },
        { label: 'Phoniatrics and Pediatric Audiology', value: 'phoniatrics and pediatric audiology' },
        { label: 'Physical therapy', value: 'physical therapy' },
        { label: 'Psychiatry and psychotherapy', value: 'psychiatry and psychotherapy' },
        { label: 'Radiology', value: 'radiology' },
        { label: 'Forensic medicine', value: 'forensic medicine' },
        { label: 'Rehab', value: 'rehab' },
        { label: 'Radiotherapy', value: 'radiotherapy' },
        { label: 'Transfusion medicine', value: 'transfusion medicine' },
        { label: 'Urology', value: 'urology' }
    ];

    const experienceYearsOptions = [
        { label: '0 Year(s)', value: '0' },
        { label: '1 Year(s)', value: '1' },
        { label: '2 Year(s)', value: '2' },
        { label: '3 Year(s)', value: '3' },
        { label: '4 Year(s)', value: '4' },
        { label: '5 Year(s)', value: '5' },
        { label: '6 Year(s)', value: '6' },
        { label: '7 Year(s)', value: '7' },
        { label: '8 Year(s)', value: '8' },
        { label: '9 Year(s)', value: '9' },
        { label: '10 Year(s)', value: '10' },
        { label: '11 Year(s)', value: '11' },
        { label: '12 Year(s)', value: '12' },
        { label: '13 Year(s)', value: '13' },
        { label: '14 Year(s)', value: '14' },
        { label: '15 Year(s)', value: '15' },
        { label: 'Over 15 Year(s)', value: '15 Above' },
    ];

    const experienceMonthsOptions = [
        { label: '0 Month(s)', value: '0' },
        { label: '1 Month(s)', value: '1' },
        { label: '2 Month(s)', value: '2' },
        { label: '3 Month(s)', value: '3' },
        { label: '4 Month(s)', value: '4' },
        { label: '5 Month(s)', value: '5' },
        { label: '6 Month(s)', value: '6' },
        { label: '7 Month(s)', value: '7' },
        { label: '8 Month(s)', value: '8' },
        { label: '9 Month(s)', value: '9' },
        { label: '10 Month(s)', value: '10' },
        { label: '11 Month(s)', value: '11' }
    ];

    const maritalStatusOptions = [
        { label: 'Select Marital Status', value: '' },
        { label: 'Single', value: 'single' },
        { label: 'Married', value: 'married' },
        { label: 'Widowed', value: 'widowed' },
        { label: 'Divorced', value: 'divorced' },
        { label: 'Separated', value: 'separated' }
    ];

    const computerSkillsOptions = [
        { label: 'Select computer skills', value: 'none' },
        { label: 'Access', value: 'access' },
        { label: 'Excel', value: 'excel' },
        { label: 'Powerpoint', value: 'powerpoint' },
        { label: 'Word', value: 'word' }
    ];

    const drivingLicenseOptions = [
        { label: 'Select D', value: 'none' },
        { label: 'AM', value: 'am' },
        { label: 'A1', value: 'a1' },
        { label: 'A2', value: 'a2' },
        { label: 'A', value: 'a' },
        { label: 'B1', value: 'b1' },
        { label: 'B', value: 'b' },
        { label: 'BE', value: 'be' },
        { label: 'C1', value: 'c1' },
        { label: 'C1E', value: 'c1e' },
        { label: 'C', value: 'c' },
        { label: 'CE', value: 'ce' },
        { label: 'D1', value: 'd1' },
        { label: 'D1E', value: 'd1e' },
        { label: 'D', value: 'd' },
        { label: 'DE', value: 'de' },
        { label: 'F', value: 'f' },
        { label: 'M', value: 'm' }
    ];

    return(
        <>
            <Alert 
                dialog={dialog}
                handleClick={() => { 
                    setProfileFormState(false);
                    setDialog(false);
                    window.location.reload(); /** => RESEARCH FOR AN ALTERNATIVE */
                }}
            />

            <FormikStepper
                setProfileFormState={setProfileFormState}

                initialValues={{
                    // INITIAL VALUES: KEY-FIGURES
                    kfParticipantId: '',
                    kfCategory: '',
                    kfDegree: '',
                    kfLanguage: ["Filipino (Tagalog)"],
                    kfExperienceYear: 0,
                    kfExperienceMonth: 0,
                    kfPriorities: [],
                    // INITIAL VALUES: PERSONAL-BACKGROUND
                    address: '',
                    email: '',
                    nationality: 'Filipino',
                    sex: '',
                    dateOfBirth: new Date(),
                    placeOfBirth: '',
                    maritalStatus: '',
                    // INITIAL VALUES: TRAINING
                    trainingFrom: new Date(),
                    trainingTo: new Date(),
                    provider: '',
                    skills: '',
                    // INITIAL VALUES: LANGUAGE SKILLS
                    nativeLanguage: 'Filipino (Tagalog)',
                    germanLanguageLevel: '',
                    germanLanguageDate: new Date(),
                    germanCare: new Date(),
                    otherLanguages: '',
                    otherLanguagesLevel: '',
                    // INITIAL VALUES: OTHER SKILLS
                    computerSkills: [],
                    otherComputerSkills: '',
                    personalSkills: '',
                    drivingLicense: []
                }}

                onSubmit={ async function (values, actions) {
                    const data = new FormData();
                
                    const info = {
                        // VALUES: KEY-FIGURES
                        'kfParticipantId': values.kfParticipantId,
                        'kfCategory' : values.Category,
                        'kfDegree': values.kfDegree,
                        'kfLanguage': values.kfLanguage.join(", "),
                        'kfExperienceYear': values.kfExperienceYear,
                        'kfExperienceMonth': values.kfExperienceMonth,
                        'kfPriorities': values.kfPriorities.join(", "),
                        // VALUES: PERSONAL-BACKGROUND
                        'address': values.address,
                        'email': values.email,
                        'nationality': values.nationality,
                        'sex': values.sex,
                        'dateOfBirth': values.dateOfBirth,
                        'placeOfBirth': values.placeOfBirth,
                        'maritalStatus': values.maritalStatus,
                        // VALUES: TRAINING
                        'trainingFrom': values.trainingFrom,
                        'trainingTo': values.trainingTo,
                        'provider': values.provider,
                        'skills': values.skills,
                        // VALUES: LANGUAGE SKILLS
                        'nativeLanguage': values.nativeLanguage,
                        'germanLanguageLevel': values.germanLanguageLevel,
                        'germanLanguageDate': values.germanLanguageDate,
                        'germanCare': values.germanCare,
                        'otherLanguages': values.otherLanguages,
                        'otherLanguagesLevel': values.otherLanguagesLevel,
                        // VALUES:  OTHER SKILLS
                        'computerSkills': values.computerSkills.join(', '),
                        'otherComputerSkills': values.otherComputerSkills,
                        'personalSkills': values.personalSkills,
                        'drivingLicense': values.drivingLicense.join(', '),
                    }
            
                    data.append('data', JSON.stringify(info));
            
                    await axios({
                        method: 'POST',
                        url: 'http://localhost:1337/cvs',
                        data,
                        withCredentials: true
                    })
                        .then((res) => {
                            setDialog({ state: true, header: "Status: Successful", text: "Key Figures Successfully CREATED!" });
                        })
                        .catch(error => {
                            setDialog({ state: true, header: "An Error Occurred!", text: "Oh snap! Something went wrong. Please change a few things up and try submitting again. Thank you!" });
                        });
                }}
            >
                {
                    /**
                     * FORMIK STEP:
                     * KEY-FIGURES
                     * 
                     */
                 }
                <FormikStep 
                    label="Key Figures"
                    validationSchema={Yup.object({
                        kfParticipantId: Yup.string().required('This field is required'),
                        kfCategory: Yup.string().required('This field is required'),
                        kfDegree: Yup.string().required('This field is required'),
                        kfLanguage: Yup.array().required('This field is required'),
                        kfExperienceYear: Yup.number().required('This field is required'),
                        kfExperienceMonth: Yup.number().required('This field is required'),
                        kfPriorities: Yup.array().min(1, 'Select Atleast 1 Professional Skill').required('This field is required'),
                    })}
                >
                    <Box px={4} py={2}>
                        <InputLabel shrink={true} htmlFor="kfCategory">Participant ID</InputLabel>
                        <Field
                            component={TextField}
                            type="text"
                            placeholder="Please enter your participant ID"
                            name="kfParticipantId"
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                    <Box px={4} py={2}>
                        <InputLabel shrink={true} htmlFor="kfCategory">Category</InputLabel>
                        <Field
                            component={Select}
                            name="kfCategory"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            autoWidth={true}
                            multiple={false}
                            InputLabelProps={{ shrink: true }}
                        >
                            {categoryOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Field>
                        <Typography variant="caption" display="block" gutterBottom color="secondary"><ErrorMessage name="kfDegree" component="span" /></Typography>
                        <FormHelperText><Link onClick={handleOpen}>Click here to learn more about the Category options.</Link></FormHelperText>
                        { /* MODAL FOR THE CATEGORIES */ }
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            {body}
                        </Modal>
                    </Box>
                    <Box px={4} py={2}>
                        <InputLabel shrink={true} htmlFor="kfLanguage">Degree</InputLabel>
                        <Field
                            component={Select}
                            name="kfDegree"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            autoWidth={true}
                            multiple={false}
                            InputLabelProps={{ shrink: true }}
                        >
                            {conclusionOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Field>
                        <Typography variant="caption" display="block" gutterBottom color="secondary"><ErrorMessage name="kfDegree" component="span" /></Typography>
                    </Box>
                    <Box px={4} py={2}>
                        <InputLabel shrink={true} htmlFor="kfLanguage">Language Skills</InputLabel>
                        <Field
                            component={Select}
                            name="kfLanguage"
                            multiple={true}
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ name: 'kfLanguage', id: 'kfLanguage' }}
                            autoWidth="true"
                        >
                            {languageSkillsOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Field>
                    </Box>
                    <Box px={4} py={2}>
                        <InputLabel shrink={true} htmlFor="kfpriorities">Priorities</InputLabel>
                        <Field
                            component={Select}
                            type="text"
                            name="kfPriorities"
                            multiple={true}
                            InputLabelProps={{name: 'kfpriorities', id: 'kfpriorities'}}
                            fullWidth
                            variant="outlined"
                            autoWidth="true"
                        >
                            {prioritiesOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}  
                        </Field>
                        <FormHelperText>Detailed overview of activities in the 'Professional Skills' facility</FormHelperText>
                        <Typography variant="caption" display="block" gutterBottom color="secondary"><ErrorMessage name="kfPriorities" component="span" /></Typography>
                    </Box>
                    <Box px={4} py={2}>
                        <InputLabel shrink={true} htmlFor="grouped-native-select">Experience</InputLabel>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Field
                                    component={TextField}
                                    type="text"
                                    name="kfExperienceYear"
                                    select
                                    variant="outlined"
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                >
                                    {experienceYearsOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                            <Grid item>
                                <Field
                                    component={TextField}
                                    type="text"
                                    name="kfExperienceMonth"
                                    select
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                >
                                    {experienceMonthsOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                        </Grid>
                    </Box>
                </FormikStep>
                
                {
                    /**
                     * FORMIK STEP:
                     * PERSONAL-BACKGROUND
                     * 
                     */
                }
                <FormikStep 
                    label="Personal Background"
                    validationSchema={Yup.object({
                        address: Yup.string().required('This field is required'),
                        email: Yup.string().email().required('This field is required'),
                        nationality: Yup.string().required('This field is required'),
                        sex: Yup.string().required('This field is required'),
                        dateOfBirth: Yup.date().required('This field is required').nullable(),
                        placeOfBirth: Yup.string().required('This field is required'),
                        maritalStatus: Yup.string().required('This field is required'),
                    })}
                >
                    <Box px={4} py={2}>
                        <Field
                            component={TextField}
                            type="text"
                            label="Address"
                            name="address"
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                    <Box px={4} py={2}>
                        <Field
                            component={TextField}
                            name="email"
                            type="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                    <Box px={4} py={2}>
                        <Field
                            component={TextField}
                            type="text"
                            label="Nationality"
                            value="Filipino"
                            name="nationality"
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                    <Box px={4} py={2}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Field
                                component={DatePicker}
                                label="Date Of Birth"
                                name="dateOfBirth"
                                inputVariant="outlined"
                                variant="dialog"
                                views={[ "date", "year", "month" ]}
                                fullWidth
                                format="MM/dd/yyyy"
                            />
                        </MuiPickersUtilsProvider>
                    </Box>
                    <Box px={4} py={2}>
                        <Field
                            component={TextField}
                            type="text"
                            label="Place Of Birth"
                            name="placeOfBirth"
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                    <Box px={4} py={2}>
                        <InputLabel shrink={true} htmlFor="maritalStatus">Marital Status</InputLabel>
                        <Field
                            component={Select}
                            name="maritalStatus"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            autoWidth={true}
                            multiple={false}
                            InputLabelProps={{ shrink: true }}
                        >
                            {maritalStatusOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Field>
                        <Typography variant="caption" display="block" gutterBottom color="secondary">
                            <ErrorMessage name="maritalStatus" component="span" />
                        </Typography>
                    </Box>
                    <Box px={4} py={2}>
                        <Field component={RadioGroup} name="sex" row>
                            <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label="Male"
                            />
                            <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Female"
                            />
                        </Field>
                        <Typography variant="caption" display="block" gutterBottom color="secondary">
                            <ErrorMessage name="sex" component="span" />
                        </Typography>
                    </Box>
                </FormikStep>

                {
                    /**
                     * FORMIK STEP:
                     * TRAINING
                     * 
                     */
                }
                <FormikStep
                    label="Training"
                    validationSchema={Yup.object({
                        trainingFrom: Yup.date().required('This field is required'),
                        trainingTo: Yup.date().required('This field is required'),
                        provider: Yup.string().required('This field is required'),
                        skills: Yup.string().required('This field is required')
                    })}
                >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Box px={4} py={2}>
                            <Grid container spacing={2}>
                                <Grid item lg={6} xs={12}>
                                    <Field
                                        component={DatePicker}
                                        label="From:"
                                        name="trainingFrom"
                                        inputVariant="outlined"
                                        variant="dialog"
                                        views={["date", "year", "month"]}
                                        fullWidth
                                        format="MM/dd/yyyy"
                                    />
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <Field
                                        component={DatePicker}
                                        label="To:"
                                        name="trainingTo"
                                        inputVariant="outlined"
                                        variant="dialog"
                                        views={["date", "year", "month"]}
                                        fullWidth
                                        format="MM/dd/yyyy"
                                    />
                                </Grid>
                                <Grid item lg={12} xs={12}>
                                    <Field
                                        component={TextField}
                                        type="text"
                                        label="Provider"
                                        name="provider"
                                        variant="outlined"
                                        fullWidth
                                        format="MM/dd/yyyy"
                                    />
                                </Grid>
                                <Grid item lg={12} xs={12}>
                                    <Field
                                        component={TextField}
                                        type="text"
                                        label="Skills Acquired"
                                        name="skills"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </MuiPickersUtilsProvider>
                </FormikStep>

                {
                    /**
                     * FORMIK STEP:
                     * LANGUAGE SKILL
                     * 
                     */
                }
                <FormikStep
                    label="Language Skill"
                    validationSchema={Yup.object({
                        nativeLanguage: Yup.string().required('This field is required'),
                        germanLanguageLevel: Yup.string().required('This field is required'),
                        germanLanguageDate: Yup.date().required('This field is required'),
                        germanCare: Yup.date().required('This field is required'),
                        otherLanguages: Yup.string().required('This field is required'),
                        otherLanguagesLevel: Yup.string().required('This field is required')
                    })}
                >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Box px={4} py={2}>
                            <Grid container spacing={2}>
                                <Grid item lg={6} xs={12}>
                                    <Field
                                        component={TextField}
                                        type="text"
                                        label="Native Language"
                                        value="Filipino (Tagalog)"
                                        name="nativeLanguage"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <Field
                                        component={DatePicker}
                                        label="German B1-B2 Care"
                                        name="germanCare"
                                        inputVariant="outlined"
                                        variant="dialog"
                                        views={["date", "year", "month"]}
                                        fullWidth
                                        format="MM/dd/yyyy"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box px={4} py={2}>
                            <Grid container spacing={2}>
                                <Grid item lg={12} xs={12}>
                                    <InputLabel htmlFor="kfLanguage">German Language Skills Up-to-date</InputLabel>
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <Field
                                        component={Select}
                                        name="germanLanguageLevel"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        autoWidth={true}
                                        multiple={false}
                                        InputLabelProps={{ shrink: true }}
                                    >   
                                        {languageSkillsLevelOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                    <FormHelperText>Select Level</FormHelperText>
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <Field
                                        component={DatePicker}
                                        name="germanLanguageDate"
                                        inputVariant="outlined"
                                        variant="dialog"
                                        views={["date", "year", "month"]}
                                        fullWidth
                                        format="MM/dd/yyyy"
                                    />
                                    <FormHelperText>Select Date</FormHelperText>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box px={4} py={2}>
                            <Grid container spacing={2}>
                                <Grid item lg={12} xs={12}>
                                    <InputLabel htmlFor="kfLanguage">Other Languages</InputLabel>
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <Field
                                        component={Select}
                                        label="Other Languages"
                                        type="text"
                                        name="otherLanguages"
                                        multiple={false}
                                        InputLabelProps={{name: 'kfpriorities', id: 'kfpriorities'}}
                                        fullWidth
                                        variant="outlined"
                                        autoWidth="true"
                                    >
                                        {languageSkillsOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}  
                                    </Field>
                                    <FormHelperText>Select Language</FormHelperText>
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <Field
                                        component={Select}
                                        label="Other Languages Level"
                                        type="text"
                                        name="otherLanguagesLevel"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        autoWidth={true}
                                        multiple={false}
                                        InputLabelProps={{ shrink: true }}
                                    >
                                        {languageSkillsLevelOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                    <FormHelperText>Select Language Level</FormHelperText>
                                </Grid>
                            </Grid>
                        </Box>
                    </MuiPickersUtilsProvider>
                </FormikStep>

                {
                    /**
                     * FORMIK STEP:
                     * OTHER SKILL
                     * 
                     */
                }
                <FormikStep
                    label="Other Skill"
                    validationSchema={Yup.object({
                        computerSkills: Yup.array().required('This field is required'),
                        otherComputerSkills: Yup.string().required('This field is required'),
                        personalSkills: Yup.string().required('This field is required'),
                        drivingLicense: Yup.array().required('This field is required')
                    })}
                >
                    <Box px={4} py={2}>
                        <Grid container spacing={2}>
                            <Grid item lg={12} xs={12}>
                                <InputLabel htmlFor="kfLanguage">Computer Skills</InputLabel>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <Field
                                    component={Select}
                                    name="computerSkills"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    autoWidth={true}
                                    multiple={true}
                                    InputLabelProps={{ shrink: true }}
                                >   
                                    {computerSkillsOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <Field
                                    component={TextField}
                                    name="otherComputerSkills"
                                    type="text"
                                    label="Other Computer Skills"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box px={4} py={2}>
                        <Grid container spacing={2}>
                            <Grid item lg={6} xs={12}>
                                <Field
                                    component={TextField}
                                    name="personalSkills"
                                    type="text"
                                    label="Personal Skills"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <Field
                                    component={Select}
                                    name="drivingLicense"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    autoWidth={true}
                                    multiple={true}
                                    InputLabelProps={{ shrink: true }}
                                >   
                                    {drivingLicenseOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Field>
                                <FormHelperText>Select Driving License</FormHelperText>
                            </Grid>
                        </Grid>
                    </Box>
                </FormikStep>
            </FormikStepper>
        </>
    );
}


/* ==========================================================================
   FORMIK STEPPER
   ========================================================================== */

export function FormikStep({ children }) {
    return <>{children}</>;
}

export function FormikStepper ({ children, ...props }) {
    const childrenArray = React.Children.toArray(children);
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];
    const [completed, setCompleted] = useState(false);

    const isLastStep = () => {
        return step === childrenArray.length - 1;
    }

    return (
        <Formik
            {...props}
            validationSchema={ currentChild.props.validationSchema }
            onSubmit={
                async (values, helpers) => {
                    if (isLastStep()) {
                        await props.onSubmit(values, helpers);
                        setCompleted(true);
                    } else {
                        setStep((s) => s + 1);
                        helpers.setTouched({});
                    }
                }
            }
        >
            {({ isSubmitting, values }) => (
                <>
                <Form autoComplete="off">
                    <Paper>
                        <Box pt={2} pb={2}>
                            <Stepper alternativeLabel activeStep={step}>
                                {childrenArray.map((child, index) => (
                                    <Step key={child.props.label} completed={step > index || completed}>
                                        <StepLabel>{child.props.label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            <Divider />

                            <Box mt={6} mb={3}>{currentChild}</Box>

                            <Box px={4} py={4}>
                                <Grid container spacing={2} justify="center">
                                    {step > 0 ? (
                                    <Grid item>
                                        <Button
                                            disabled={isSubmitting}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => setStep((s) => s - 1)}
                                        >
                                            Back
                                        </Button>
                                    </Grid>
                                    ) : null}
                                    <Grid item>
                                        <Button
                                            startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                                            disabled={isSubmitting}
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            size="large"
                                        >
                                            {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Paper>
                </Form>
                </>
            )}
        </Formik>
    )
}

export default ProfileForm;