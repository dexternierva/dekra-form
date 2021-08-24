import React from "react";
import styled from "styled-components";
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
    Box,
    Checkbox,
    FormControlLabel,
    TextField,
    Paper,
    Typography
} from '@material-ui/core';

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

const SectionTitle = styled.div`
    margin-left: 1rem;
    color: #008B4F;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 700;
    font-size: 1.25em;
`;

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

const useStyles = makeStyles((theme) => ({
    grid: {
        margin: '0 0 4rem 0',
        borderLeft: '4px solid #008B4F',
    },
    table: {
        margin: '-.75rem 0 0 0'
    },
    intro: {
        padding: '0 1rem',
        margin: '0 0 2rem 0',
        borderLeft: '4px solid #008B4F',
    },
    paper: {
        background: 'transparent'
    },
    titles: {
        color: '#008B4F'
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
    ratingGrid: {
        borderLeft: '4px solid #008B4F'
    }
}));

function  PracticalSkillsView({ response }) {
    const classes = useStyles();

    if (response.practical_knowledge && response.practical_activity !== null) {

        return (
            <>
            <div className={classes.intro}>
                <Paper elevation={0} className={classes.paper}>
                    <Typography variant="h5" component="h2" className={classes.titles}>
                        Praktische Kenntnisse
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom className={classes.titles}>
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
                                control={
                                    <Checkbox 
                                        checked={response.practical_knowledge.care} 
                                        checkedIcon={<CheckBoxOutlinedIcon color="primary" htmlColor="#008B4F" />} 
                                        color="primary"
                                    />
                                }
                                label="Intensivmedizin"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.internalmedicine}  checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Innere Medizin"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.pediatrics}  checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Pädiatrie"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.generalaccidentsurgery}  checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Allgemeine Unfallchirurgie"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.anesthesia}  checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Anästhesie"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.orthopedics}  checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Orthopädie"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.emergency}  checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Notaufnahme"
                            />
                        </Box>
                        <Box px={2}>
                            <TextField id="standard-basic" label="" value={response.practical_knowledge.additionaldepartment1}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.op} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="OP"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.neurology} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Neurologie"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.geriatrics} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Geriatrie"
                            />
                        </Box>
                        <Box px={2}>
                            <TextField id="standard-basic" label="" value={response.practical_knowledge.additionaldepartment2}/>
                        </Box>
                    </Grid>
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
                                control={<Checkbox checked={response.practical_knowledge.patientwashing} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Patient waschen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.patientstorage} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Patient lagern"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.mobilization} checkedIcon={<CheckBoxOutlinedIcon />}  color="primary" />}
                                label="Mobilisation"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.helpwithfood} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Hilfe beim Essen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.prophylaxis} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
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
                                control={<Checkbox checked={response.practical_knowledge.oxygentherapy} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="O²-Gabe / Sauerstofftherapie"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.assessingbreathing} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Atmung beurteilen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.inhalation} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Inhalation"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.thoraxdrainage} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Thoraxdrainage"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.tracheostoma} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Tracheostoma / Pflege Trachealkanüle"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.suction} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Absaugen Mund/Rachen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.ventilators} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Beatmungsgeräte bedienen auf Anweisung"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.settingventilators} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Beatmungsgeräte selbständig einstellen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.beatmungsformen} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Beatmungsformen (CPAP, BIPAP, SIMV)"
                            />
                        </Box>
                        <Box px={2}>
                            <TextField id="standard-basic" label="" value={response.practical_knowledge.additionalbreathing}/>
                        </Box>
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
                                control={<Checkbox checked={response.practical_knowledge.rrmeasurement} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="RR-Messung (Blutdruck messen)"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.measuringtemperature} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Temperatur messen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.measuringblood} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Blutzucker messen (Geräte)"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.monitor} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Monitor"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.pulsoxymeter} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Pulsoxymeter"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.ecg} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="EKG schreiben"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.readassess} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="EKG lesen / beurteilen"
                            />
                        </Box>
                        <Box px={2}>
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
                        <SectionTitle>Geräte</SectionTitle>

                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.bloodglucose} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Blutzuckermessgerät"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.devicesmonitor} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Monitor"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.devicespulsoxymeter} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Pulsoxymeter"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.schmerzpumpe} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Schmerzpumpe / PCA-Pumpe"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.infusomat} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Infusomat / Infusionspumpe"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.perfusor} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Perfusor / Sprizenpumpe"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.vacuumpump} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
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
                                control={<Checkbox checked={response.practical_knowledge.pharmacology} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Pharmakologie, Wirkungsweise von Medikamenten"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.oraladministration} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Oral gabe"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.rektalegabe} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Rektale gabe"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.subcutaneous} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Subkutan"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.intramuscular} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="intramuskulär"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.intravenously} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Intravenös"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.infusion} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Infusion"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.centralvenous} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="ZVK – Zentraler Venenkatheter"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.feedingtube} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Magensonde"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.notfallmedikamente} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
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
                                control={<Checkbox checked={response.practical_knowledge.urogenitalbereich} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Urogenitalbereich"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.onetimecatheter} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Einmalkatheter legen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.permanentcatheter} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Dauerkatheter legen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.suprapubiccatheter} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Suprapubischer Katheter Assist. Anlage/Pflege"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.hurine} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="24h - Urin"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.excretioninfusion} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Infusion"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.condomurinal} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Kondom – Urinal"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.magendarmtrakt} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Magendarmtrakt"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.caregastricprobe} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Pflege von Magensonde "
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.transnasalgastric} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Transnasale Magensonde legen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.careofpeg} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Pflege von PEG"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.careofstoma} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Pflege von Stoma / Enterostoma"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.intestinalrinsing} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
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
                                control={<Checkbox checked={response.practical_knowledge.stateofconsciousness} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Bewusstseinslage prüfen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.carestroke} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Pflege schlaganfall / stroke"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.cerebralhemorrhage} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Pflege hirnblutung"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.caringparkinson} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Pflege Parkinson"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.carebraintumor} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
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
                                control={<Checkbox checked={response.practical_knowledge.asepticdressing} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Steriler verbandswechsel aseptischer verband"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.septicdressing} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Steriler verbandswechsel septischer verband"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.pullingthreads} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Fäden ziehen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.removebrackets} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
                                label="Klammern entfernen"
                            />
                        </Box>
                        <Box px={2}>
                            <FormControlLabel
                                control={<Checkbox checked={response.practical_knowledge.woundassessment} checkedIcon={<CheckBoxOutlinedIcon />} color="primary" />}
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
                    <Box py={0} px={2}>
                        <Typography variant="h5" component="h2" className={classes.titles}>
                            Praktische Tätigkeiten
                        </Typography>
                        <Typography variant="body2" component="p">
                            Selbsteinschätzung des Teilnehmers <br />
                            0 (nicht bekannt), 1 (in Theorie bekannt), 2 (praktische Durchführung beobachtet), 3 (unter Aufsicht selbst durchgeführt), 4 (selbständige Durchführung), 5 (Experte, Anleitung anderer Kollegen).
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box py={2} px={2}>
                        <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                            A - Beurteilung von PatientInnen, Pflegediagnose, Pflegeplanung
                        </Typography>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Informationen über PatientInnen erlangen
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
                        <Typography variant="body2" gutterBottom>1. Grundsätzliche Parameter (bspw. Größe, Gewicht) und Vitalparameter erheben (mittels manueller Messung, mittels Monitoring)</Typography>
                    </Box>
                </Grid>

                <section className={classes.ratingGrid}>
                    <Grid item xs={12} sm={3}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.a1}
                            icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Grid>

                    <Grid item xs={12} sm={9}>
                        <Box px={2}>
                            <Typography variant="body2" gutterBottom>2. Körperlichen (physisch, neurologisch) und kognitiven Zustand von PatientInnen ermitteln</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.a2}
                            icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Grid>

                    <Grid item xs={12} sm={9}>
                        <Box px={2}>
                            <Typography variant="body2" gutterBottom>3. Skalen und Indikatoren auszufüllen</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            value={response.practical_activity.a3}
                            icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Grid>

                    <Grid item xs={12} sm={9}>
                        <Box px={2}>
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
                            icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                            max={6}
                        />
                    </Grid>
                </section>

                <Grid item xs={12} sm={12}>
                    <Box px={2}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Pflegeprobleme und Pflegediagnose
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box px={2}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Pflegeplanung
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                { /*** PROFESSIONAL CARE */ }
                <Grid item xs={12} sm={12}>
                    <Box py={2} px={2}>
                        <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                            B - Professionelle Pflege
                        </Typography>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Grundpflege und Körperpflege
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box py={2} px={2}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Ernährung
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box py={2} px={2}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Mobilität
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box py={2} px={2}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Ausscheiden
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                { /*** PROFESSIONAL CARE */ }
                <Grid item xs={12} sm={12}>
                    <Box py={2} px={2}>
                        <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                            Pflegeintervention
                        </Typography>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Teilnahme an medizinischen und diagnostischen Prozeduren und Verfahren
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box py={2} px={2}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Medikamente
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box py={2} px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box py={2} px={2}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Stomaversorgung
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box py={2} px={2}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Medizinische Geräte anwenden
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box py={2} px={2}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Lebensrettende Maßnahmen
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box py={2} px={2}>
                        <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                            D - Hygiene
                        </Typography>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Hygienemaßnahmen anwenden
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box py={2} px={2}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Sterilisation
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box py={2} px={2}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Arbeits- und Gesundheitsschutz
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box py={2} px={2}>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            Umgang mit Katastrophen
                        </Typography>
                    </Box>  
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box py={2} px={2}>
                        <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                            E - Kommunikation mit KollegInnen, PatientInnen und Anderen
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Box py={2} px={2}>
                        <Typography variant="subtitle2" display="block" gutterBottom color="primary">
                            F - Dokumentation und Qualität
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
                        max={6}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Box px={2}>
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
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" />}
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

export default PracticalSkillsView;