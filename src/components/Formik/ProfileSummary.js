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
    Fade,
    Link,
    Modal
} from '@material-ui/core';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DatePicker } from 'formik-material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
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
    modallink: {
        cursor: 'pointer'
    }
}));

function ProfileSummary () {
    const classes = useStyles();

    const currentUser = useCurrentUser();
    const cvID = currentUser.cv;                             
    const { loading, response, error, setCvID } = useContext(ProfileContext);
    setCvID(cvID); 
    const [dialog, setDialog] = useState({ state:false, header: null, text: null });
    const [formValues, setFormValues] = useState(null);

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
        { label: 'Category 3', value: '3 - High Potential' },
        { label: 'Category 4', value: '4' },
    ];
    
    const conclusionOptions = [
        { label: 'Select Degree', value: '' },
        { label: 'Bachelor', value: 'Bachelor' },
        { label: 'Masters', value: 'Masters' },
        { label: 'Doctorate', value: 'Dóktortitel' }
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
        { label: 'B1 Pflege', value: 'B1 Pflege' },
        { label: 'B1-B2 Pflege', value: 'B1-B2 Pflege' },
        { label: 'B2', value: 'B2' },
        { label: 'C1', value: 'C1' },
        { label: 'C2', value: 'C2' },
        { label: 'Native Speaker', value: 'Muttersprachler/-in' },
    ];

    const prioritiesOptions = [
        { label: 'Select Focus of Experience', value:'' },
        { label: 'General health and nursing care', value: 'Allgemeine Gesundheits- und Krankenpflege' },
        { label: 'Elderly care', value: 'Altenpflege' },
        { label: 'Ambulant care', value: 'Ambulante Pflege' },
        { label: 'Anesthesia', value: 'Anästhesie' },
        { label: 'Ophthalmology', value: 'Augenheilkunde' },
        { label: 'Biochemistry', value: 'Biochemie' },
        { label: 'Surgery', value: 'Chirurgie' },
        { label: 'Dermatology', value: 'Dermatologie' },
        { label: 'Dialysis', value: 'Dialyse' },
        { label: 'Geriatrics', value: 'Geriatrie' },
        { label: 'Health and pediatric nursing', value: 'Gesundheits- und Kinderkrankenpflege' },
        { label: 'Gynecology', value: 'Gynäkologie' },
        { label: 'Midwife', value: 'Hebamme' },
        { label: 'Curative education care', value: 'Heilerziehungspflege' },
        { label: 'Ear, nose and throat medicine', value: 'Hals-Nasen-Ohrenheilkunde' },
        { label: 'Curative education', value: 'Heilpädagogik' },
        { label: 'Hygiene', value: 'Hygiene' },
        { label: 'Internal medicine', value: 'Inner Medizin' },
        { label: 'Intensive care unit', value: 'Intensivstation' },
        { label: 'Child and adolescent psychiatry and psychotherapy', value: 'Kinder- und Jugendpsychiatrie und -psychotherapie' },
        { label: 'Laboratory medicine', value: 'Laboratoriumsmedizin' },
        { label: 'Microbiology, virology and infection epidemiology', value: 'Mikrobiologie, Virologie und Infektionsepidemiologie' },
        { label: 'Oral and maxillofacial surgery', value: 'Mund-Kiefer-Gesichtschirurgie' },
        { label: 'Nephrology', value: 'Nephrologie' },
        { label: 'Neurology', value: 'Neurologie' },
        { label: 'Emergency care', value: 'Notfallpflege' },
        { label: 'Nuclear medicine', value: 'Nuklearmedizin' },
        { label: 'Public healthcare system', value: 'Öffentliches Gesundheitswesen' },
        { label: 'Oncology', value: 'Onkologie' },
        { label: 'OP', value: 'OP' },
        { label: 'Orthopedics', value: 'Orthopädie' },
        { label: 'Pathology', value: 'Pathologie' },
        { label: 'Nursing science', value: 'Pflegewissenschaft' },
        { label: 'Pharmacology', value: 'Pharmakologie' },
        { label: 'Phoniatrics and Pediatric Audiology', value: 'Phoniatrie und Pädaudiologie' },
        { label: 'Physical therapy', value: 'Physiotherapie' },
        { label: 'Psychiatry and psychotherapy', value: 'Psychiatrie und Psychotherapie' },
        { label: 'Radiology', value: 'Radiologie' },
        { label: 'Forensic medicine', value: 'Rechtsmedizin' },
        { label: 'Rehab', value: 'Reha' },
        { label: 'Radiotherapy', value: 'Strahlentherapie' },
        { label: 'Transfusion medicine', value: 'Transfusionsmedizin' },
        { label: 'Urology', value: 'Urologie' }
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
        { label: 'Single', value: 'Ledig' },
        { label: 'Married', value: 'Verheiratet' },
        { label: 'Widowed', value: 'Verwitwet' },
        { label: 'Divorced', value: 'Geschieden' }
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

    const yearOptions = [
        { label: 'Select Year', value: ' ' },
        { label: '1990', value: '1990' },
        { label: '1991', value: '1991' },
        { label: '1992', value: '1992' },
        { label: '1993', value: '1993' },
        { label: '1994', value: '1994' },
        { label: '1995', value: '1995' },
        { label: '1996', value: '1996' },
        { label: '1997', value: '1997' },
        { label: '1998', value: '1998' },
        { label: '1999', value: '1999' },
        { label: '2000', value: '2000' },
        { label: '2001', value: '2001' },
        { label: '2002', value: '2002' },
        { label: '2003', value: '2003' },
        { label: '2004', value: '2004' },
        { label: '2005', value: '2005' },
        { label: '2006', value: '2006' },
        { label: '2007', value: '2007' },
        { label: '2008', value: '2008' },
        { label: '2009', value: '2009' },
        { label: '2010', value: '2010' },
        { label: '2011', value: '2011' },
        { label: '2012', value: '2012' },
        { label: '2013', value: '2013' },
        { label: '2014', value: '2014' },
        { label: '2015', value: '2015' },
        { label: '2016', value: '2016' },
        { label: '2017', value: '2017' },
        { label: '2018', value: '2018' },
        { label: '2019', value: '2019' },
        { label: '2020', value: '2020' },
        { label: '2021', value: '2021' },
    ];

    /**
     * = PRE-FILL FORM WITH VALUES FROM THE API
     * ------------------------------------------------------------------------- */
    useEffect(() => {
        if (response !== null) {
            const savedData = {
                // KEY-FIGURES
                kfParticipantId: response.kfParticipantId,
                kfCategory: response.kfCategory,
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
                children: response.children,
                child1: response.child1,
                child2: response.child2,
                child3: response.child3,
                child4: response.child4,
                child5: response.child5,
                child6: response.child6,
                // LANGUAGE-SKILLS
                nativeLanguage: response.nativeLanguage,
                uptodateskills: response.uptodateskills,
                germanLanguageLevel: response.germanLanguageLevel,
                germanLanguageDate: response.germanLanguageDate,
                germanCare: response.germanCare,
                englishLanguage: response.englishLanguage,
                englishLanguageLevel: response.englishLanguageLevel,
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
        kfParticipantId: '',
        kfCategory: '',
        kfDegree: '',
        kfLanguage: [],
        kfExperienceYear: 0,
        kfExperienceMonth: 0,
        kfPriorities: [],
        // PERSONAL-BACKGROUND
        address: '',
        email: '',
        nationality: 'Philipinisch',
        sex: '',
        dateOfBirth: new Date(),
        placeOfBirth: '',
        maritalStatus: '',
        children: 0,
        child1: ' ',
        child2: ' ',
        child3: ' ',
        child4: ' ',
        child5: ' ',
        child6: ' ',
        // LANGUAGE SKILLS
        nativeLanguage: 'Filipino (Tagalog)',
        uptodateskills: '',
        germanLanguageLevel: '',
        germanLanguageDate: new Date(),
        germanCare: new Date(),
        englishLanguage: 'English',
        englishLanguageLevel: '',
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
        kfParticipantId: Yup.string().required('This field is required'),
        kfCategory: Yup.string().required('This field is required'),
        kfDegree: Yup.string().required('This field is required'),
        kfLanguage: Yup.array().required('This field is required'),
        kfExperienceYear: Yup.number().required('This field is required'),
        kfExperienceMonth: Yup.number().required('This field is required'),
        kfPriorities: Yup.array().required('This field is required').min(1, 'Select Atleast 1 Professional Skill').max(3, 'You are only allowed to select a maximum of 3 Professional skills'),
        // PERSONAL-BACKGROUND
        address: Yup.string().required('This field is required'),
        email: Yup.string().email().required('This field is required'),
        nationality: Yup.string().required('This field is required'),
        sex: Yup.string().required('This field is required'),
        dateOfBirth: Yup.date().required('This field is required').nullable(),
        placeOfBirth: Yup.string().required('This field is required'),
        children: Yup.number().required('This field is required'),
        child1: Yup.string().required('This field is required'),
        child2: Yup.string().required('This field is required'),
        child3: Yup.string().required('This field is required'),
        child4: Yup.string().required('This field is required'),
        child5: Yup.string().required('This field is required'),
        child6: Yup.string().required('This field is required'),
        maritalStatus: Yup.string().required('This field is required'),
        // LANGUAGE-SKILLS
        nativeLanguage: Yup.string().required('This field is required'),
        uptodateskills: Yup.string(),
        germanLanguageLevel: Yup.string().required('This field is required'),
        germanLanguageDate: Yup.date().required('This field is required'),
        germanCare: Yup.date().required('This field is required'),
        englishLanguage: Yup.string().required('This field is required'),
        englishLanguageLevel: Yup.string().required('This field is required'),
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
            'kfParticipantId': values.kfParticipantId,
            'kfCategory' : values.kfCategory,
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
            'children': values.children,
            'child1': values.child1,
            'child2': values.child2,
            'child3': values.child3,
            'child4': values.child4,
            'child5': values.child5,
            'child6': values.child6,
            // LANGUAGE-SKILLS
            'nativeLanguage': values.nativeLanguage,
            'uptodateskills': values.uptodateskills,
            'germanLanguageLevel': values.germanLanguageLevel,
            'germanLanguageDate': values.germanLanguageDate,
            'germanCare': values.germanCare,
            'englishLanguage': values.englishLanguage,
            'englishLanguageLevel': values.englishLanguageLevel,
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
                                <FormHelperText>
                                    <Link onClick={handleOpen} className={classes.modallink}>Click here to learn more about the Category options.</Link>
                                </FormHelperText>
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
                                <InputLabel shrink={true} htmlFor="kfpriorities">Specializations</InputLabel>
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
                                        value="Männlich"
                                        control={<Radio />}
                                        label="Male"
                                    />
                                    <FormControlLabel
                                        value="Weiblich"
                                        control={<Radio />}
                                        label="Female"
                                    />
                                </Field>
                                <Typography variant="caption" display="block" gutterBottom color="secondary">
                                    <ErrorMessage name="sex" component="span" />
                                </Typography>
                            </Box>
                            <Box px={4} py={2}>
                                <Field
                                    component={TextField}
                                    type="number"
                                    name="children"
                                    multiple={true}
                                    label="Number of children"
                                    fullWidth
                                    variant="outlined"
                                    autoWidth="true"
                                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                                />
                            </Box>
                            <Box px={4} py={2}>
                                <InputLabel shrink={true} htmlFor="child1">Children</InputLabel>
                                <Grid container spacing={0}>
                                    <Grid item xs={4} sm={2}>
                                        <Box pl={0} pr={2} py={0}>
                                            <Field
                                                component={Select}
                                                fullWidth
                                                autoWidth={true}
                                                name="child1"
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                {yearOptions.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Field>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} sm={2}>
                                        <Box px={2} py={0}>
                                            <Field
                                                component={Select}
                                                fullWidth
                                                autoWidth={true}
                                                name="child2"
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                {yearOptions.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Field>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} sm={2}>
                                        <Box px={2} py={0}>
                                            <Field
                                                component={Select}
                                                fullWidth
                                                autoWidth={true}
                                                name="child3"
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                {yearOptions.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Field>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} sm={2}>
                                        <Box px={2} py={0}>
                                            <Field
                                                component={Select}
                                                fullWidth
                                                autoWidth={true}
                                                name="child4"
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                {yearOptions.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Field>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} sm={2}>
                                        <Box px={2} py={0}>
                                            <Field
                                                component={Select}
                                                fullWidth
                                                autoWidth={true}
                                                name="child5"
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                {yearOptions.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Field>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} sm={2}>
                                        <Box pl={2} pr={0} py={0}>
                                            <Field
                                                component={Select}
                                                fullWidth
                                                autoWidth={true}
                                                name="child6"
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                {yearOptions.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Field>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

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
                                                component={Select}
                                                name="uptodateskills"
                                                multiple={false}
                                                fullWidth
                                                variant="outlined"
                                                autoWidth="true"
                                            >
                                                {languageSkillsLevelOptions.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Field>

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
                                            <InputLabel shrink="true" htmlFor="otherLanguages">Other Languages</InputLabel>
                                        </Grid>
                                        <Grid item lg={6} xs={12}>
                                            <Field
                                                component={TextField}
                                                type="text"
                                                // value="English"
                                                name="englishLanguage"
                                                fullWidth
                                            />
                                            <FormHelperText>Language</FormHelperText>
                                        </Grid>
                                        <Grid item lg={6} xs={12}>
                                            <Field
                                                component={Select}
                                                label="English Languages Level"
                                                type="text"
                                                name="englishLanguageLevel"
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
                                            <FormHelperText>English Language Level</FormHelperText>
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