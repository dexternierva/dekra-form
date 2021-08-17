import React from "react";
import styled from "styled-components";

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

const SectionTitle = styled.div`
    margin-left: 1rem;
    color: #008B4F;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 700;
`;

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
    }
}));

function  PracticalKnowledgeView({ response }) {
    const classes = useStyles();

    return (
        <>
        <div className={classes.intro}>
            <Paper elevation={0} className={classes.paper}>
                <Typography variant="h5" component="h2">
                    Praktische Kenntnisse
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Anlage zum Lebenslauf von: {response.lastname + ', ' + response.lastname}
                </Typography>
                <Typography variant="body2" component="p">
                    Diese Angaben sollen zusätzlich zum Lebenslauf eine Übersicht darüber vermitteln, welche praktischen Fähigkeiten bereits selbständig ausgeführt wurden. Es handelt sich um eine Selbsteinschätzung des Teilnehmers zur allgemeinen Orientierung, stellt aber keine qualitative Aussage über diese individuelle Fähigkeiten dar.
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
                <Box px={2}>
                    <TextField id="standard-basic" label="" value={response.practical_knowledge.additionaldepartment1}/>
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
                <Box px={2}>
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
                <Box px={2}>
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
                    <TextField id="standard-basic" label="" fullWidth value={response.practical_knowledge.additionalneurology}/>
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
        </>
    )
}

export default PracticalKnowledgeView;