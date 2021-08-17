import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
    Box,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    grid: {
        margin: '0 0 4rem 0',
        borderLeft: '4px solid #008B4F',
    },
    table: {
        margin: '-.75rem 0 0 0'
    },
}));

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

function  PracticalActivitiesView({ response }) {
    const classes = useStyles();

    if (response.practical_activity !== null) {
        return (
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
                        <Typography variant="body2" gutterBottom>2. Körperlichen (physisch, neurologisch) und kognitiven Zustand von PatientInnen ermitteln</Typography>
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
                        <Typography variant="body2" gutterBottom>3. Skalen und Indikatoren auszufüllen</Typography>
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
                        <Typography variant="body2" gutterBottom>4. Skalen und Indikatoren auszufüllen</Typography>
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
                            Pflegeprobleme und Pflegediagnose
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>5. Versorgungsdefizite erkennen, adäquate Unterstützung bereitstellen</Typography>
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
                        <Typography variant="body2" gutterBottom>6. Pflegediagnosen festlegen</Typography>
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
                        <Typography variant="body2" gutterBottom>7. Pflegestandards anwenden</Typography>
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
                            Pflegeplanung
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>8. Pflegeziele festlegen und Pflegepläne aktualisieren</Typography>
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
                        <Typography variant="body2" gutterBottom>9. Pflegemaßnahmen planen und durchführen</Typography>
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
                        <Typography variant="body2" gutterBottom>10. Spezielle Pflegepläne (krankheitsbildbezogen) anwenden</Typography>
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
                        <Typography variant="body2" gutterBottom>2. Anlegen von Kompressionsverbänden und Kompressionsstrümpfen</Typography>
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
                            Ernährung
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>3. Speisen und Getränke zubereiten, verteilen, anreichen (füttern)</Typography>
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
                        <Typography variant="body2" gutterBottom>4. Ernährungspläne erstellen, dokumentieren</Typography>
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
                        <Typography variant="body2" gutterBottom>5. Ernährungssonden (inklusive PEG) benutzen</Typography>
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
                            Mobilität
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>6. Mobilität unterstützen, aufrechterhalten, wiederherstellen</Typography>
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
                        <Typography variant="body2" gutterBottom>7. Prophylaktische Maßnahmen (Dekubitus-, Kontraktur-, Thromboseprophylaxe) durchführen</Typography>
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
                        <Typography variant="body2" gutterBottom>8. Mobilisationspläne erstellen und führen</Typography>
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
                            Ausscheiden
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>9. Bei der Ausscheidung unterstützen</Typography>
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
                        <Typography variant="body2" gutterBottom>10. Umgang mit Inkontinenz, Kontinenztraining</Typography>
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
                        <Typography variant="body2" gutterBottom>11. Ableitungssysteme (z.B. Harnblasenkatheterismus, Stuhlableitungssysteme) anwenden</Typography>
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
                        <Typography variant="body2" gutterBottom>12. Einläufe verabreichen</Typography>
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
                            Teilnahme an medizinischen und diagnostischen Prozeduren und Verfahren
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>1. Blutentnahme, körperliche Untersuchung</Typography>
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
                        <Typography variant="body2" gutterBottom>2. Assistenz bei ärztlichen Maßnahmen (z.B. Endoskopie, Aufnahmeuntersuchung im Krankenhaus)</Typography>
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
                            Medikamente
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>3. Verwalten, vorbereiten, verabreichen (z.B. oral, intravenös)</Typography>
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
                        <Typography variant="body2" gutterBottom>4. Blut und Blutprodukte (Transfusion)</Typography>
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
                        <Typography variant="body2" gutterBottom>5. Umgang mit Betäubungsmitteln</Typography>
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
                            Wundmanagement
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>6. Wundvermeidung, Prophylaxen</Typography>
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
                        <Typography variant="body2" gutterBottom>7. Wundassessment</Typography>
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
                        <Typography variant="body2" gutterBottom>8. Wundbehandlung (z.B. Verbände anlegen und wechseln)</Typography>
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
                            Stomaversorgung
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>9. Pflege unterschiedlicher Stomata (z.B. Tracheostoma, Ileostoma, Urostoma)</Typography>
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
                            Medizinische Geräte anwenden
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>10. Pflegehilfsmittel, Mobilisationsmittel, Transferhilfen, Rollstühle</Typography>
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
                        <Typography variant="body2" gutterBottom>11. Geräte zur Messung von Vitalparametern (z.B. Blutdruck, Blutzucker, Monitoring)</Typography>
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
                        <Typography variant="body2" gutterBottom>12. Spezielle Geräte (z.B. Absauggeräte, EKG, Defibrillatoren, Beatmungsmaschinen)</Typography>
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
                            Lebensrettende Maßnahmen
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
                            Hygienemaßnahmen anwenden
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>1. Verschiedene Desinfektionsmaßnahmen (z.B. Hände-, Haut-, Flächendesinfektion)</Typography>
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
                        <Typography variant="body2" gutterBottom>2. Maßnahmen der Infektionskontrolle durchführen (z.B. Isolierung von Patienten)</Typography>
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
                        <Typography variant="body2" gutterBottom>3. Sterile Verfahren anwenden (z.B. Legen von Dauerkathetern)</Typography>
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
                            Sterilisation
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>4. Medizinprodukte aufbereiten, angemessen verpacken und lagern</Typography>
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
                        <Typography variant="body2" gutterBottom>5. Sterilisatoren bedienen</Typography>
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
                            Arbeits- und Gesundheitsschutz
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>6. Transporte von PatientInnen</Typography>
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
                        <Typography variant="body2" gutterBottom>7. Unfallgefahr reduzieren (z.B. Unfallverhütungsvorschriften)</Typography>
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
                        <Typography variant="body2" gutterBottom>8. Fremdschutz und Selbstschutz</Typography>
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
                            Umgang mit Katastrophen
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>9. Feuer, Notfälle, Massenanfall an PatientInnen</Typography>
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
                            E - Kommunikation mit KollegInnen, PatientInnen und Anderen
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>1. Team- und Fallbesprechungen führen</Typography>
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
                        <Typography variant="body2" gutterBottom>2. MitarbeiterInnen einführen, anleiten</Typography>
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
                        <Typography variant="body2" gutterBottom>3. Schichtleitung- Stationsleitung</Typography>
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
                        <Typography variant="body2" gutterBottom>4. Dienstpläne schreiben</Typography>
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
                        <Typography variant="body2" gutterBottom>5. Patienten aufklären und beraten</Typography>
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
                        <Typography variant="body2" gutterBottom>6. Angehörige aufklären und beraten</Typography>
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
                            F - Dokumentation und Qualität
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={4}>
                        <Typography variant="body2" gutterBottom>1. Grundpflegerische und behandlungspflegerische Maßnahmen dokumentieren (Pflegebericht)</Typography>
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
                        <Typography variant="body2" gutterBottom>2. Bestellungen durchführen</Typography>
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
                        <Typography variant="body2" gutterBottom>3. Visiten dokumentieren und auswerten</Typography>
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
                        <Typography variant="body2" gutterBottom>4. Briefe verfassen (z.B. Pflegeüberleitung)</Typography>
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
                        <Typography variant="body2" gutterBottom>5. Sauberkeit und Ordnung am Arbeitsplatz (Stationszimmer, Patientenzimmer) sicherstellen</Typography>
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
                        <Typography variant="body2" gutterBottom>6. Maßnahmen der Qualitätssicherung und –kontrolle anwenden (z.B. Medikamentencheck)</Typography>
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
                        <Typography variant="body2" gutterBottom>7. Ressourcenschonende Arbeitsweise</Typography>
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

export default PracticalActivitiesView;