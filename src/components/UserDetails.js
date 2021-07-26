import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { TranslatorProvider } from "react-translate"
import { useParams } from "react-router";
import { UserContext } from "../containers/GetUsers";
import { useHistory } from "react-router-dom";

import { PDFExport } from '@progress/kendo-react-pdf';

import GetUsers from "../containers/GetUsers";
import ProfileView from "./ProfileView";
import WorkExperienceView from "./WorkExperienceView";
import EducationView from "./EducationView";
import TrainingView from "./TrainingView";
import LanguageSkillsView from "./LanguageSkillsView";
import OtherSkillsView from "./OtherSkillsView";
import {
    Container, 
    Backdrop,
    CircularProgress,
    Box,
    Fab,
    Typography
} from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { makeStyles } from '@material-ui/core/styles';

let translations = {
    locale: "en",
    Profile: {
        "First Name:": "Vorname:",
        "Last Name:": "Nachname:",
        "At a glance": "Auf einen Blick",
        "Conclusion": "Abschluss",
        "Language skills": "Sprachkenntnisse",
        "Experience": "Berufserfahrung",
        "Priorities": "Schwerpunkte",
        "Detailed overview of activities in the 'Professional Skills' facility": "Detaillierte Übersicht über Tätigkeiten in der Anlage 'Professional Skills'",
        "Private Background": "Privater Hintergrund",
        "Address": "Adresse",
        "E-mail Address": "E-Mail-Adresse",
        "Nationality": "Nationalität",
        "Sex": "Geschlecht",
        "Date of birth": "Geburtsdatum",
        "Place of birth": "Geburtsort",
        "Marital status": "Familienstand"
    },
    Experience: {
        "Work Experience": "Berufserfahrung",
        "Period": "Zeitraum",
        "From: ": "von: ",
        " To: ": " bis: ",
        "Job title/function": "Stellentitel/Funktion",
        "Employers name & address": "Name und Adresse des Arbeitgebers",
    },
    Education: {
        "Education & Training": "Schul- und Berufsbildung",
        "Period": "Zeitraum",
        "From: ": "von: ",
        " To: ": " bis: ",
        "Conclusion": "Abschluss",
        "Name & address of the school/university": "Name und Adresse der Schule/Universität"
    },
    Training: {
        "Training and further education": "Schul- und Berufsbildung",
        "Period": "Zeitraum",
        "From: ": "von: ",
        " To: ": " bis: ",
        "Name of training provider": "Name der Schulung, Anbieter",
        "Skills acquired": "Erworbene Fähigkeiten"
    },
    Language: {
        "Language Skills": "Sprachkenntnisse",
        "Native language": "Muttersprache",
        "German language skills up-to-date": "Deutschkenntnisse aktuell",
        "German B1-B2 Care": "Deutsch B1-B2 Pflege",
        "Other languages": "Weitere Sprachen",
        "Language: ": "Sprache auswählen: ",
        "Level: ": "Niveaus auswählen: "
    },
    OtherSkills: {
        "Further Knowledge": "Weitere Kenntnisse",
        "Computer skills": "EDV-Kenntnisse",
        "Other Computer skills": "andere EDV-Kenntnisse",
        "Personal skills": "Persönliche Kompetenzen",
        "Driving license": "Führerschein"
    }
};

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
`;

const HeaderTitle = styled.div`
    color: #008B4F;
    font-size: 1em;
    font-weight: 700;
`;

const HeaderText = styled.div`
    color: #008B4F;
    font-size: 1em;
    font-weight: 500;
`;

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    container: {
        marginTop: '3rem',
        marginBottom: '3rem'
    }
}));

function ActiveUserInfo ({id}) {
    const classes = useStyles();
    const { loading, response, error, setUserID } = useContext(UserContext);

    setUserID(id);

    if (response !== null) {
        return (
            <Container maxWidth="lg" className={classes.container}>
                <Header>
                    <HeaderTitle>DEKRA Expert Migration</HeaderTitle>
                    <HeaderText>Curriculum Vitae</HeaderText>
                </Header>

                <TranslatorProvider translations={translations}>
                    <ProfileView response={response} />
                    <WorkExperienceView response={response} />
                    <EducationView response={response} />
                    <TrainingView response={response} />
                    <LanguageSkillsView response={response} />
                    <OtherSkillsView response={response} />
                </TranslatorProvider>
            </Container>
        )
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

function UserDetails () {
    const history = useHistory();
    let { id } = useParams();
    const componentRef = useRef();
    const pdfExportComponent = useRef(null);
    const handlePrint = (event) => {
        pdfExportComponent.current.save();
    }

    const handleDashboard = () => {
        history.push("/dashboard");
    }

    return (
        <>
            <div ref={componentRef}>
                <GetUsers>
                    <PDFExport 
                        ref={pdfExportComponent} 
                        paperSize="A4" 
                        scale={0.6} 
                        forcePageBreak=".page-break"
                        margin={{ top: 20, left: 20, right: 20, bottom: 40 }}
                    >
                        <ActiveUserInfo id={ id } />
                    </PDFExport>
                </GetUsers>
            </div>

            {/* PRINT FAB ICON */}
            <Box my={4} position="fixed" right="1rem" bottom="4rem">
                <Fab color="secondary" aria-label="add" onClick={handlePrint}>
                    <PrintIcon />
                </Fab>
            </Box>

            {/* BACK TO DASHBOARD FAB ICON */}
            <Box my={4} position="fixed" right="1rem" bottom="0rem">
                <Fab color="primary" aria-label="add" onClick={handleDashboard}>
                    <DashboardIcon />
                </Fab>
            </Box>
        </>
    );
}

export default UserDetails;