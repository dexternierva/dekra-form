import React, { useContext, useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Select, RadioGroup } from "formik-material-ui";
import { ProfileContext } from "../../containers/GetProfile";
import Alert from "../Alert";
import { useCurrentUser } from "../../containers/CurrentUser";

import { 
    Typography,
    Backdrop,
    CircularProgress,
    Box,
    InputLabel,
    Button,
    Grid, 
    Radio,
    MenuItem,
    FormHelperText,
    FormControlLabel,
} from '@material-ui/core';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DatePicker } from 'formik-material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

function ProfileSummary () {
    const currentUser = useCurrentUser();
    const cvID = currentUser.cv;                             
    const { loading, response, error, setCvID } = useContext(ProfileContext);
    setCvID(cvID); 
    const [dialog, setDialog] = useState({ state:false, header: null, text: null });
    const [formValues, setFormValues] = useState(null);

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
        { label: 'B1 Care', value: 'B1 Care' },
        { label: 'B1-B2 Care', value: 'B1-B2 Care' },
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

    /**
     * = PRE-FILL FORM WITH VALUES FROM THE API
     * ------------------------------------------------------------------------- */
    useEffect(() => {
        if (response !== null) {
            const savedData = {
                // KEY-FIGURES
                kfDegree: response.kfDegree,
                kfLanguage: response.kfLanguage.split(", "),
                kfExperienceYear: response.kfExperienceYear,
                kfExperienceMonth: response.kfExperienceMonth,
                kfPriorities: response.kfPriorities.split(", "),
                // PERSONAL-BACKGROUND
                address: response.address,
                email: response.email,
                nationality: response.nationality,
                sex: response.sex,
                dateOfBirth: response.dateOfBirth,
                placeOfBirth: response.placeOfBirth,
                maritalStatus: response.maritalStatus,
                // TRAINING
                trainingFrom: response.trainingFrom,
                trainingTo: response.trainingTo,
                provider: response.provider,
                skills: response.skills,
                // LANGUAGE-SKILLS
                nativeLanguage: response.nativeLanguage,
                germanLanguageLevel: response.germanLanguageLevel,
                germanLanguageDate: response.germanLanguageDate,
                germanCare: response.germanCare,
                otherLanguages: response.otherLanguages,
                otherLanguagesLevel: response.otherLanguagesLevel,
                // OTHER-SKILLS
                computerSkills: response.computerSkills.split(", "),
                otherComputerSkills: response.otherComputerSkills,
                personalSkills: response.personalSkills,
                drivingLicense: response.drivingLicense.split(", "),
            }

            setFormValues(savedData);
        }
    }, [response])

    /**
     * = INITIAL VALUES
     * ------------------------------------------------------------------------- */
    const initialValues={
        // KEY-FIGURES
        kfDegree: '',
        kfLanguage: ["Filipino (Tagalog)"],
        kfExperienceYear: 0,
        kfExperienceMonth: 0,
        kfPriorities: [],
        // PERSONAL-BACKGROUND
        address: '',
        email: '',
        nationality: 'Filipino',
        sex: '',
        dateOfBirth: new Date(),
        placeOfBirth: '',
        maritalStatus: '',
        // TRAINING
        trainingFrom: new Date(),
        trainingTo: new Date(),
        provider: '',
        skills: '',
        // LANGUAGE SKILLS
        nativeLanguage: 'Filipino (Tagalog)',
        germanLanguageLevel: '',
        germanLanguageDate: new Date(),
        germanCare: new Date(),
        otherLanguages: '',
        otherLanguagesLevel: '',
        // OTHER SKILLS
        computerSkills: [],
        otherComputerSkills: '',
        personalSkills: '',
        drivingLicense: []
    }

    /**
     * = VALIDATION SCHEMA
     * ------------------------------------------------------------------------- */
    const validationSchema = Yup.object({
        // KEY-FIGURES
        kfDegree: Yup.string().required('This field is required'),
        kfLanguage: Yup.array().required('This field is required'),
        kfExperienceYear: Yup.number().required('This field is required'),
        kfExperienceMonth: Yup.number().required('This field is required'),
        kfPriorities: Yup.array().min(1, 'Select Atleast 1 Professional Skill').required('This field is required'),
        // PERSONAL-BACKGROUND
        address: Yup.string().required('This field is required'),
        email: Yup.string().email().required('This field is required'),
        nationality: Yup.string().required('This field is required'),
        sex: Yup.string().required('This field is required'),
        dateOfBirth: Yup.date().required('This field is required').nullable(),
        placeOfBirth: Yup.string().required('This field is required'),
        maritalStatus: Yup.string().required('This field is required'),
        // TRAINING
        trainingFrom: Yup.date().required('This field is required'),
        trainingTo: Yup.date().required('This field is required'),
        provider: Yup.string().required('This field is required'),
        skills: Yup.string().required('This field is required'),
        // LANGUAGE-SKILLS
        nativeLanguage: Yup.string().required('This field is required'),
        germanLanguageLevel: Yup.string().required('This field is required'),
        germanLanguageDate: Yup.date().required('This field is required'),
        germanCare: Yup.date().required('This field is required'),
        otherLanguages: Yup.string().required('This field is required'),
        otherLanguagesLevel: Yup.string().required('This field is required'),
        // OTHER-SKILLS
        computerSkills: Yup.array().required('This field is required'),
        otherComputerSkills: Yup.string().required('This field is required'),
        personalSkills: Yup.string().required('This field is required'),
        drivingLicense: Yup.array().required('This field is required')
    });

    /**
     * = ONSUBMIT
     * ------------------------------------------------------------------------- */
    const onSubmit = async function (values, actions) {
        const data = new FormData();

        const info = {
            // KEY-FIGURES
            'kfDegree': values.kfDegree,
            'kfLanguage': values.kfLanguage.join(", "),
            'kfExperienceYear': values.kfExperienceYear,
            'kfExperienceMonth': values.kfExperienceMonth,
            'kfPriorities': values.kfPriorities.join(", "),
            // PERSONAL-BACKGROUND
            'address': values.address,
            'email': values.email,
            'nationality': values.nationality,
            'sex': values.sex,
            'dateOfBirth': values.dateOfBirth,
            'placeOfBirth': values.placeOfBirth,
            'maritalStatus': values.maritalStatus,
            // TRAINING
            'trainingFrom': values.trainingFrom,
            'trainingTo': values.trainingTo,
            'provider': values.provider,
            'skills': values.skills,
            // LANGUAGE-SKILLS
            'nativeLanguage': values.nativeLanguage,
            'germanLanguageLevel': values.germanLanguageLevel,
            'germanLanguageDate': values.germanLanguageDate,
            'germanCare': values.germanCare,
            'otherLanguages': values.otherLanguages,
            'otherLanguagesLevel': values.otherLanguagesLevel,
            // OTHER SKILLS
            'computerSkills': values.computerSkills.join(', '),
            'otherComputerSkills': values.otherComputerSkills,
            'personalSkills': values.personalSkills,
            'drivingLicense': values.drivingLicense.join(', '),
        }

        data.append('data', JSON.stringify(info));
 
        await axios({
            method: 'PUT',
            url: `https://dekra-form-api-m8bsw.ondigitalocean.app/cvs/${cvID}`,
            data,
            withCredentials: true
        })
            .then((res) => {
                setDialog({ state: true, header: "Status: Successful", text:"Profile Info Successfully UPDATED!" });
            })
            .catch(error => {
                setDialog({ state: true, header: "An Error Occurred!", text: "Oh snap! Something went wrong. Please change a few things up and try submitting again. Thank you!" });
            });
    }

    return (
        <>
            { loading && 
                <Backdrop open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop> 
            }
            { error && <Typography variant="overline" color="secondary" display="block" align="center">No previously saved data.</Typography> }

            <Alert 
                dialog={dialog}
                handleClick={ () => {setDialog(false)} }
            />
            <Typography variant="h4" gutterBottom align="center">Profile Summary</Typography>
            <Formik
                initialValues={ formValues || initialValues }
                validationSchema={ validationSchema }
                onSubmit={ onSubmit }
                enableReinitialize
            >
                {
                    ({submitForm, isSubmitting, touched, errors, values}) => (
                        <Form>
                            {
                                /**
                                 * = KEY-FIGURES
                                 * ------------------------------------------------------------------------- */
                            }
                            <Box px={4} py={2}>
                                <Typography variant="h5" gutterBottom>Key Figures</Typography>
                            </Box>
                            <Box px={4} py={2}>
                                <InputLabel shrink={true} htmlFor="kfLanguage">Degree</InputLabel>
                                <Field
                                    component={Select}
                                    name="kfDegree"
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

                            {
                                /**
                                 * = PERSONAL-BACKGROUND
                                 * ------------------------------------------------------------------------- */
                            }
                            <Box px={4} py={2}>
                                <Typography variant="h5" gutterBottom>Personal Background</Typography>
                            </Box>
                            <Box px={4} py={2}>
                                <Field
                                    component={TextField}
                                    type="text"
                                    label="Address"
                                    name="address"
                                    fullWidth
                                />
                            </Box>
                            <Box px={4} py={2}>
                                <Field
                                    component={TextField}
                                    name="email"
                                    type="email"
                                    label="Email"
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
                                    fullWidth
                                />
                            </Box>
                            <Box px={4} py={2}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Field
                                        component={DatePicker}
                                        label="Date Of Birth"
                                        name="dateOfBirth"
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
                                    fullWidth
                                />
                            </Box>
                            <Box px={4} py={2}>
                                <InputLabel shrink={true} htmlFor="maritalStatus">Marital Status</InputLabel>
                                <Field
                                    component={Select}
                                    name="maritalStatus"
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

                            {
                                /**
                                 * = TRAINING
                                 * ------------------------------------------------------------------------- */
                            }
                            <Box px={4} py={2}>
                                <Typography variant="h5" gutterBottom>Training</Typography>
                            </Box>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Box px={4} py={2}>
                                    <Grid container spacing={2}>
                                        <Grid item lg={6} xs={12}>
                                            <Field
                                                component={DatePicker}
                                                label="From:"
                                                name="trainingFrom"
                                                variant="dialog"
                                                views={["date", "year", "month"]}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={6} xs={12}>
                                            <Field
                                                component={DatePicker}
                                                label="To:"
                                                name="trainingTo"
                                                variant="dialog"
                                                views={["date", "year", "month"]}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={12} xs={12}>
                                            <Field
                                                component={TextField}
                                                type="text"
                                                label="Provider"
                                                name="provider"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={12} xs={12}>
                                            <Field
                                                component={TextField}
                                                type="text"
                                                label="Skills Acquired"
                                                name="skills"
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </MuiPickersUtilsProvider>

                            {
                                /**
                                 * = LANGUAGE-SKILLS
                                 * ------------------------------------------------------------------------- */
                            }
                            <Box px={4} py={2}>
                                <Typography variant="h5" gutterBottom>Language Skills</Typography>
                            </Box>
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
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={6} xs={12}>
                                            <Field
                                                component={DatePicker}
                                                label="German B1-B2 Care"
                                                name="germanCare"
                                                variant="dialog"
                                                views={["date", "year", "month"]}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box px={4} py={2}>
                                    <Grid container spacing={2}>
                                        <Grid item lg={12} xs={12}>
                                            <InputLabel shrink="true" htmlFor="germanLanguageLevel">German Language Skills Up-to-date</InputLabel>
                                        </Grid>
                                        <Grid item lg={6} xs={12}>
                                            <Field
                                                component={Select}
                                                name="germanLanguageLevel"
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
                                                variant="dialog"
                                                views={["date", "year", "month"]}
                                                fullWidth
                                            />
                                            <FormHelperText>Select Date</FormHelperText>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box px={4} py={2}>
                                    <Grid container spacing={2}>
                                        <Grid item lg={12} xs={12}>
                                            <InputLabel shrink="true" tmlFor="otherLanguages">Other Languages</InputLabel>
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

                            {
                                /**
                                 * = OTHER SKILLS
                                 * ------------------------------------------------------------------------- */
                            }
                            <Box px={4} py={2}>
                                <Typography variant="h5" gutterBottom>Other Skills</Typography>
                            </Box>
                            <Box px={4} py={2}>
                                <Grid container spacing={2}>
                                    <Grid item lg={12} xs={12}>
                                        <InputLabel shrink="true" htmlFor="computerSkills">Computer Skills</InputLabel>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={Select}
                                            name="computerSkills"
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
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            name="otherComputerSkills"
                                            type="text"
                                            label="Other Computer Skills"
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box px={4} py={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            name="personalSkills"
                                            type="text"
                                            label="Personal Skills"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={Select}
                                            name="drivingLicense"
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

                            <Box px={4} py={2} display="flex" justifyContent="flex-end">
                                <Button variant="contained" color="primary" type="submit" size="large">Update</Button>
                            </Box>
                        </Form>
                    )
                }
            </Formik>
        </>
    );
}

export default ProfileSummary;