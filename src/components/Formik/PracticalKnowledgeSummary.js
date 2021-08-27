import React, { useState, useEffect, useContext } from "react";
import * as Yup from "yup";
import {
    Grid,
    Box,
    Typography,
    CircularProgress,
    FormHelperText,
    Backdrop,
    Button
} from '@material-ui/core';
import { Formik, Field, Form, FieldArray } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";

import { useCurrentUser } from "../../containers/CurrentUser";
import { PracticalKnowledgeContext } from "../../containers/GetPracticalKnowledge";

import axios from "axios";
import Alert from "../Alert";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    dynamicfield: {
        display: 'flex',
        alignItems: 'center',
    },
    dynamicfieldminus: {
        marginRight: '.25rem'
    }
}));

function PracticalKnowledgeSummary () {
    const classes = useStyles();
    const currentUser = useCurrentUser();
    const practicalKnowledgeID = currentUser.practical_knowledge;                             
    const { loading, response, error, setPracticalKnowledgeID } = useContext(PracticalKnowledgeContext);
    setPracticalKnowledgeID(practicalKnowledgeID); 
    const [dialog, setDialog] = useState({ state:false, header: null, text: null });
    const [formValues, setFormValues] = useState(null);

    /**
     * = PRE-FILL FORM WITH VALUES FROM THE API
     * ------------------------------------------------------------------------- */
    useEffect(() => {
        if (response !== null) {
            const savedData = {
                // DEPARTMENT
                care: response.care,
                internalmedicine: response.internalmedicine,
                pediatrics: response.pediatrics,
                generalaccidentsurgery: response.generalaccidentsurgery,
                anesthesia: response.anesthesia,
                orthopedics: response.orthopedics,
                emergency: response.emergency,
                op: response.op,
                neurology: response.neurology,
                geriatrics: response.geriatrics,
                departments: response.departments.split(", "),

                // BASIC CARE
                patientwashing: response.patientwashing,
                patientstorage: response.patientstorage,
                mobilization: response.mobilization,
                helpwithfood: response.helpwithfood,
                prophylaxis: response.prophylaxis,
                additionalbasiccare1: response.additionalbasiccare1,
                additionalbasiccare2: response.additionalbasiccare2,
                additionalbasiccare3: response.additionalbasiccare3,
                additionalbasiccare4: response.additionalbasiccare4,
                additionalbasiccare5: response.additionalbasiccare5,

                // BREATHING
                oxygentherapy: response.oxygentherapy,
                assessingbreathing: response.assessingbreathing,
                inhalation: response.inhalation,
                thoraxdrainage: response.thoraxdrainage,
                tracheostoma: response.tracheostoma,
                suction: response.suction,
                ventilators: response.ventilators,
                settingventilators: response.settingventilators,
                beatmungsformen: response.beatmungsformen,
                additionalbreathing: response.additionalbreathing,

                // VITAL SIGN CONTROL MONITORING
                rrmeasurement: response.rrmeasurement,
                measuringtemperature: response.measuringtemperature,
                measuringblood: response.measuringblood,
                monitor: response.monitor,
                pulsoxymeter: response.pulsoxymeter,
                ecg: response.ecg,
                readassess: response.readassess,
                additionalvitalsign: response.additionalvitalsign,

                // DEVICES
                bloodglucose: response.bloodglucose,
                devicesmonitor: response.devicesmonitor,
                devicespulsoxymeter: response.devicespulsoxymeter,
                schmerzpumpe: response.schmerzpumpe,
                infusomat: response.infusomat,
                perfusor: response.perfusor,
                vacuumpump: response.vacuumpump,
                additionaldevices: response.additionaldevices,

                // MEDICATION
                pharmacology: response.pharmacology,
                oraladministration: response.oraladministration,
                rektalegabe: response.rektalegabe,
                subcutaneous: response.subcutaneous,
                intramuscular: response.intramuscular,
                intravenously: response.intravenously,
                infusion: response.infusion,
                centralvenous: response.centralvenous,
                feedingtube: response.feedingtube,
                notfallmedikamente: response.notfallmedikamente,
                additionalmedication1: response.additionalmedication1,
                additionalmedication2: response.additionalmedication2,
                additionalmedication3: response.additionalmedication3,

                // EXCRETION
                urogenitalbereich: response.urogenitalbereich,
                onetimecatheter: response.onetimecatheter,
                permanentcatheter: response.permanentcatheter,
                suprapubiccatheter: response.suprapubiccatheter,
                hurine: response.hurine,
                excretioninfusion: response.excretioninfusion,
                condomurinal: response.condomurinal,
                magendarmtrakt: response.magendarmtrakt,
                caregastricprobe: response.caregastricprobe,
                transnasalgastric: response.transnasalgastric,
                careofpeg: response.careofpeg,
                careofstoma: response.careofstoma,
                intestinalrinsing: response.intestinalrinsing,

                // NEUROLOGY
                stateofconsciousness: response.stateofconsciousness,
                carestroke: response.carestroke,
                cerebralhemorrhage: response.cerebralhemorrhage,
                caringparkinson: response.caringparkinson,
                carebraintumor: response.carebraintumor,
                additionalneurology: response.additionalneurology,

                // WOUND TREATMENT
                asepticdressing: response.asepticdressing,
                septicdressing: response.septicdressing,
                pullingthreads: response.pullingthreads,
                removebrackets: response.removebrackets,
                woundassessment: response.woundassessment,
                additionalwoundtreatment: response.additionalwoundtreatment,
            }

            setFormValues(savedData);
        }

    }, [response])

    /**
     * = INITIAL VALUES
     * ------------------------------------------------------------------------- */
    const initialValues = {
        // DEPARTMENT
        care: false,
        internalmedicine: false,
        pediatrics: false,
        generalaccidentsurgery: false,
        anesthesia: false,
        orthopedics: false,
        emergency: false,
        op: false,
        neurology: false,
        geriatrics: false,
        departments: response.departments.split(", "),

        // BASIC CARE
        patientwashing: false,
        patientstorage: false,
        mobilization: false,
        helpwithfood: false,
        prophylaxis: false,
        additionalbasiccare1: '',
        additionalbasiccare2: '',
        additionalbasiccare3: '',
        additionalbasiccare4: '',
        additionalbasiccare5: '',

        // BREATHING
        oxygentherapy: false,
        assessingbreathing: false,
        inhalation: false,
        thoraxdrainage: false,
        tracheostoma: false,
        suction: false,
        ventilators: false,
        settingventilators: false,
        beatmungsformen: false,
        additionalbreathing: '',

        // VITAL SIGN CONTROL MONITORING
        rrmeasurement: false,
        measuringtemperature: false,
        measuringblood: false,
        monitor: false,
        pulsoxymeter: false,
        ecg: false,
        readassess: false,
        additionalvitalsign: '',

        // DEVICES
        bloodglucose: false,
        devicesmonitor: false,
        devicespulsoxymeter: false,
        schmerzpumpe: false,
        infusomat: false,
        perfusor: false,
        vacuumpump: false,
        additionaldevices: '',

        // MEDICATION
        pharmacology: false,
        oraladministration: false,
        rektalegabe: false,
        subcutaneous: false,
        intramuscular: false,
        intravenously: false,
        infusion: false,
        centralvenous: false,
        feedingtube: false,
        notfallmedikamente: false,
        additionalmedication1: '',
        additionalmedication2: '',
        additionalmedication3: '',

        // EXCRETION
        urogenitalbereich: false,
        onetimecatheter: false,
        permanentcatheter: false,
        suprapubiccatheter: false,
        hurine: false,
        excretioninfusion: false,
        condomurinal: false,
        magendarmtrakt: false,
        caregastricprobe: false,
        transnasalgastric: false,
        careofpeg: false,
        careofstoma: false,
        intestinalrinsing: false,

        // NEUROLOGY
        stateofconsciousness: false,
        carestroke: false,
        cerebralhemorrhage: false,
        caringparkinson: false,
        carebraintumor: false,
        additionalneurology: '',

        // WOUND TREATMENT
        asepticdressing: false,
        septicdressing: false,
        pullingthreads: false,
        removebrackets: false,
        woundassessment: false,
        additionalwoundtreatment: ''
    }

    /**
     * = VALIDATION SCHEMA
     * ------------------------------------------------------------------------- */
    const validationSchema = Yup.object({
        care: Yup.boolean(),
        internalmedicine: Yup.boolean(),
        pediatrics: Yup.boolean(),
        generalaccidentsurgery: Yup.boolean(),
        anesthesia: Yup.boolean(),
        orthopedics: Yup.boolean(),
        emergency: Yup.boolean(),
        op: Yup.boolean(),
        neurology: Yup.boolean(),
        geriatrics: Yup.boolean(),
        additionaldepartment1: Yup.string(),
        additionaldepartment2: Yup.string(),
        patientwashing: Yup.boolean(),
        patientstorage: Yup.boolean(),
        mobilization: Yup.boolean(),
        helpwithfood: Yup.boolean(),
        prophylaxis: Yup.boolean(),
        additionalbasiccare1: Yup.string(),
        additionalbasiccare2: Yup.string(),
        additionalbasiccare3: Yup.string(),
        additionalbasiccare4: Yup.string(),
        additionalbasiccare5: Yup.string(),
        oxygentherapy: Yup.boolean(),
        assessingbreathing: Yup.boolean(),
        inhalation: Yup.boolean(),
        thoraxdrainage: Yup.boolean(),
        tracheostoma: Yup.boolean(),
        suction: Yup.boolean(),
        ventilators: Yup.boolean(),
        settingventilators: Yup.boolean(),
        beatmungsformen: Yup.boolean(),
        additionalbreathing: Yup.string(),
        rrmeasurement: Yup.boolean(),
        measuringtemperature: Yup.boolean(),
        measuringblood: Yup.boolean(),
        monitor: Yup.boolean(),
        pulsoxymeter: Yup.boolean(),
        ecg: Yup.boolean(),
        readassess: Yup.boolean(),
        additionalvitalsign: Yup.string(),
        bloodglucose: Yup.boolean(),
        devicesmonitor: Yup.boolean(),
        devicespulsoxymeter: Yup.boolean(),
        schmerzpumpe: Yup.boolean(),
        infusomat: Yup.boolean(),
        perfusor: Yup.boolean(),
        vacuumpump: Yup.boolean(),
        additionaldevices: Yup.string(),
        pharmacology: Yup.boolean(),
        oraladministration: Yup.boolean(),
        rektalegabe: Yup.boolean(),
        subcutaneous: Yup.boolean(),
        intramuscular: Yup.boolean(),
        intravenously: Yup.boolean(),
        infusion: Yup.boolean(),
        centralvenous: Yup.boolean(),
        feedingtube: Yup.boolean(),
        notfallmedikamente: Yup.boolean(),
        additionalmedication1: Yup.string(),
        additionalmedication2: Yup.string(),
        additionalmedication3: Yup.string(),
        // EXCRETION
        urogenitalbereich: Yup.boolean(),
        onetimecatheter: Yup.boolean(),
        permanentcatheter: Yup.boolean(),
        suprapubiccatheter: Yup.boolean(),
        hurine: Yup.boolean(),
        excretioninfusion: Yup.boolean(),
        condomurinal: Yup.boolean(),
        magendarmtrakt: Yup.boolean(),
        caregastricprobe: Yup.boolean(),
        transnasalgastric: Yup.boolean(),
        careofpeg: Yup.boolean(),
        careofstoma: Yup.boolean(),
        intestinalrinsing: Yup.boolean(),
        stateofconsciousness: Yup.boolean(),
        carestroke: Yup.boolean(),
        cerebralhemorrhage: Yup.boolean(),
        caringparkinson: Yup.boolean(),
        carebraintumor: Yup.boolean(),
        additionalneurology: Yup.string(),
        // WOUND TREATMENT
        asepticdressing: Yup.boolean(),
        septicdressing: Yup.boolean(),
        pullingthreads: Yup.boolean(),
        removebrackets: Yup.boolean(),
        woundassessment: Yup.boolean(),
        additionalwoundtreatment: Yup.string()
    });

    /**
     * = ONSUBMIT
     * ------------------------------------------------------------------------- */
    const onSubmit=async (values) => {
        const data = new FormData();

        const info = {
            // DEPARTMENT
            'care': values.care,
            'internalmedicine': values.internalmedicine,
            'pediatrics': values.pediatrics,
            'generalaccidentsurgery': values.generalaccidentsurgery,
            'anesthesia': values.anesthesia,
            'orthopedics': values.orthopedics,
            'emergency': values.emergency,
            'op': values.op,
            'neurology': values.neurology,
            'geriatrics': values.geriatrics,
            'additionaldepartment1': values.additionaldepartment1,
            'additionaldepartment2': values.additionaldepartment2,

            // BASIC CARE
            'patientwashing': values.patientwashing,
            'patientstorage': values.patientstorage,
            'mobilization': values.mobilization,
            'helpwithfood': values.helpwithfood,
            'prophylaxis': values.prophylaxis,
            'additionalbasiccare1': values.additionalbasiccare1,
            'additionalbasiccare2': values.additionalbasiccare2,
            'additionalbasiccare3': values.additionalbasiccare3,
            'additionalbasiccare4': values.additionalbasiccare4,
            'additionalbasiccare5': values.additionalbasiccare5,

            // BREATHING
            'oxygentherapy': values.oxygentherapy,
            'assessingbreathing': values.assessingbreathing,
            'inhalation': values.inhalation,
            'thoraxdrainage': values.thoraxdrainage,
            'tracheostoma': values.tracheostoma,
            'suction': values.suction,
            'ventilators': values.ventilators,
            'settingventilators': values.settingventilators,
            'beatmungsformen': values.beatmungsformen,
            'additionalbreathing': values.additionalbreathing,

            // VITAL SIGN CONTROL MONITORING
            'rrmeasurement': values.rrmeasurement,
            'measuringtemperature': values.measuringtemperature,
            'measuringblood': values.measuringblood,
            'monitor': values.monitor,
            'pulsoxymeter': values.pulsoxymeter,
            'ecg': values.ecg,
            'readassess': values.readassess,
            'additionalvitalsign': values.additionalvitalsign,

            // DEVICES
            'bloodglucose': values.bloodglucose,
            'devicesmonitor': values.devicesmonitor,
            'devicespulsoxymeter': values.devicespulsoxymeter,
            'schmerzpumpe': values.schmerzpumpe,
            'infusomat': values.infusomat,
            'perfusor': values.perfusor,
            'vacuumpump': values.vacuumpump,
            'additionaldevices': values.additionaldevices,

            // MEDICATION
            'pharmacology': values.pharmacology,
            'oraladministration': values.oraladministration,
            'rektalegabe': values.rektalegabe,
            'subcutaneous': values.subcutaneous,
            'intramuscular': values.intramuscular,
            'intravenously': values.intravenously,
            'infusion': values.infusion,
            'centralvenous': values.centralvenous,
            'feedingtube': values.feedingtube,
            'notfallmedikamente': values.notfallmedikamente,
            'additionalmedication1': values.additionalmedication1,
            'additionalmedication2': values.additionalmedication2,
            'additionalmedication3': values.additionalmedication3,

            // EXCRETION
            'urogenitalbereich': values.urogenitalbereich,
            'onetimecatheter': values.onetimecatheter,
            'permanentcatheter': values.permanentcatheter,
            'suprapubiccatheter': values.suprapubiccatheter,
            'hurine': values.hurine,
            'excretioninfusion': values.excretioninfusion,
            'condomurinal': values.condomurinal,
            'magendarmtrakt': values.magendarmtrakt,
            'caregastricprobe': values.caregastricprobe,
            'transnasalgastric': values.transnasalgastric,
            'careofpeg': values.careofpeg,
            'careofstoma': values.careofstoma,
            'intestinalrinsing': values.intestinalrinsing,

            // NEUROLOGY
            'stateofconsciousness': values.stateofconsciousness,
            'carestroke': values.carestroke,
            'cerebralhemorrhage': values.cerebralhemorrhage,
            'caringparkinson': values.caringparkinson,
            'carebraintumor': values.carebraintumor,
            'additionalneurology': values.additionalneurology,

            // WOUND TREATMENT
            'asepticdressing': values.asepticdressing,
            'septicdressing': values.septicdressing,
            'pullingthreads': values.pullingthreads,
            'removebrackets': values.removebrackets,
            'woundassessment': values.woundassessment,
            'additionalwoundtreatment': values.additionalwoundtreatment 
        }

        data.append('data', JSON.stringify(info));

        await axios({
            method: 'PUT',
            url: `https://dekra-form-api-m8bsw.ondigitalocean.app/practical-knowledges/${practicalKnowledgeID}`,
            data,
            withCredentials: true
        })
            .then((res) => {
                setDialog({ state: true, header: "Status: Successful", text:"Practical Knowledge Successfully UPDATED!" });
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
            { error && <Typography variant="overline" color="secondary" display="block" align="center">Kindly Refresh Browser!</Typography> }

            <Alert 
                dialog={dialog}
                handleClick={ () => {setDialog(false)} }
            />
            <Typography variant="h4" gutterBottom align="center">Practical Knowledge Summary</Typography>
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
                                 * = DEPARTMENT
                                 * ------------------------------------------------------------------------- */
                            }
                            <Box px={4} pt={4}>
                                <Typography variant="h5" gutterBottom>
                                    Department
                                </Typography>
                            </Box>
                            <Grid container spacing={2}>
                                {/** FIRST COLUMN */}
                                <Grid item xs={12} sm={4}>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="care"
                                            Label={{ label: 'Care' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="internalmedicine"
                                            Label={{ label: 'Internal medicine' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="pediatrics"
                                            Label={{ label: 'Pediatrics' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="generalaccidentsurgery"
                                            Label={{ label: 'General accident surgery' }}
                                            color="primary"
                                        />
                                    </Box>
                                </Grid>
                                
                                {/** SECOND COLUMN */}
                                <Grid item xs={12} sm={4}>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="anesthesia"
                                            Label={{ label: 'Anesthesia' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="orthopedics"
                                            Label={{ label: 'Orthopedics' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="emergency"
                                            Label={{ label: 'Emergency' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="op"
                                            Label={{ label: 'Op' }}
                                            color="primary"
                                        />
                                    </Box>
                                </Grid>
                                
                                {/** THIRD COLUMN */}
                                <Grid item xs={12} sm={4}>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="neurology"
                                            Label={{ label: 'Neurology' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="geriatrics"
                                            Label={{ label: 'Geriatrics' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <FieldArray name="departments">
                                            {
                                                (fieldArrayProps) => {
                                                    const { push, remove, form } = fieldArrayProps
                                                    const { values } = form
                                                    const { departments } = values
                                                    return (
                                                        <div>
                                                            {departments.map((department, index) => (
                                                                <div key={index} className={classes.dynamicfield}>
                                                                    <Field component={TextField} value={department} name={`departments[${index}]`} />
                                                                    {index > 0 && (
                                                                        <button className={classes.dynamicfieldminus} type='button' onClick={() => remove(index)}> - </button>
                                                                    )}
                                                                    {index < 4 && (
                                                                        <button type='button' onClick={() => index < 4 ? push('') : null }> + </button>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )
                                                }
                                            }
                                        </FieldArray>
                                    </Box>
                                </Grid>
                            </Grid>

                            {
                                /**
                                 * = BASIC CARE & BREATHING
                                 * ------------------------------------------------------------------------- */
                            }
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Box px={4} pt={8}>
                                        <Typography variant="h5" gutterBottom>
                                            Basic Care
                                        </Typography>
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="patientwashing"
                                            Label={{ label: 'Patient washing' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="patientstorage"
                                            Label={{ label: 'Patient storage' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="mobilization"
                                            Label={{ label: 'Mobilization' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="helpwithfood"
                                            Label={{ label: 'Help with food' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="prophylaxis"
                                            Label={{ label: 'Prophylaxis' }}
                                            color="primary"
                                        />
                                        <FormHelperText>(Pneumonia, decubitus, contracture...)</FormHelperText>
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={TextField}
                                            label="Others..."
                                            name="additionalbasiccare1"
                                            InputProps={{ notched: false }}
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={TextField}
                                            label="Others..."
                                            name="additionalbasiccare2"
                                            InputProps={{ notched: false }}
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={TextField}
                                            label="Others..."
                                            name="additionalbasiccare3"
                                            InputProps={{ notched: false }}
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={TextField}
                                            label="Others..."
                                            name="additionalbasiccare4"
                                            InputProps={{ notched: false }}
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={TextField}
                                            label="Others..."
                                            name="additionalbasiccare5"
                                            InputProps={{ notched: false }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box px={4} pt={8}>
                                        <Typography variant="h5" gutterBottom>
                                            Breathing
                                        </Typography>
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="oxygentherapy"
                                            Label={{ label: '02-Gabe / Oxygen Therapy' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="assessingbreathing"
                                            Label={{ label: 'Assessing breathing' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="inhalation"
                                            Label={{ label: 'Inhalation' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="thoraxdrainage"
                                            Label={{ label: 'Thoraxdrainage' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="thoraxdrainage"
                                            Label={{ label: 'Thoraxdrainage' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="tracheostoma"
                                            Label={{ label: 'Tracheostoma / Care Tracheal Cannula' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="suction"
                                            Label={{ label: 'Suction mouth/throat' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="ventilators"
                                            Label={{ label: 'Ventilators operate on instruction' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="settingventilators"
                                            Label={{ label: 'Setting ventilators independently' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="beatmungsformen"
                                            Label={{ label: 'Beatmungsformen (CPAP, BIPAP, SIMV)' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={TextField}
                                            label="Others..."
                                            name="additionalbreathing"
                                            InputProps={{ notched: false }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>

                            {
                                /**
                                 * = VITAL SIGN CONTROL / MONITORING & DEVICES
                                 * ------------------------------------------------------------------------- */
                            }
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Box px={4} pt={8}>
                                        <Typography variant="h5" gutterBottom>
                                            Vital sign control / monitoring
                                        </Typography>
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="rrmeasurement"
                                            Label={{ label: 'RR measurement (measure blood pressure)' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="measuringtemperature"
                                            Label={{ label: 'Measuring temperature' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="measuringblood"
                                            Label={{ label: 'Measuring blood sugar (devices)' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="monitor"
                                            Label={{ label: 'Monitor' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="pulsoxymeter"
                                            Label={{ label: 'Pulsoxymeter' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="ecg"
                                            Label={{ label: 'ECG writing' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="readassess"
                                            Label={{ label: 'Read/assess ECG' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={TextField}
                                            label="Others..."
                                            name="additionalvitalsign"
                                            InputProps={{ notched: false }}
                                        />
                                    </Box>
                                </Grid>
                                
                                { /* DEVICES COLUMN */ }
                                <Grid item xs={12} sm={6}>
                                    <Box px={4} pt={8}>
                                        <Typography variant="h5" gutterBottom>
                                            Devices
                                        </Typography>
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="bloodglucose"
                                            Label={{ label: 'Blood glucose' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="devicesmonitor"
                                            Label={{ label: 'Monitor' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="devicespulsoxymeter"
                                            Label={{ label: 'Pulsoxymeter' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="schmerzpumpe"
                                            Label={{ label: 'Schmerzpumpe / PCA-Pumpe' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="infusomat"
                                            Label={{ label: 'Infusomat / Infusionspumpe' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="perfusor"
                                            Label={{ label: 'Perfusor / Spritzenpumpe' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="vacuumpump"
                                            Label={{ label: 'Vacuum pump wound' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={TextField}
                                            label="Others..."
                                            name="additionaldevices"
                                            InputProps={{ notched: false }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>

                            {
                                /**
                                 * = MEDICATIONS & EXCRETION
                                 * ------------------------------------------------------------------------- */
                            }
                            <Grid container spacing={2}>
                                {/* MEDICATIONS */}
                                <Grid item xs={12} sm={6}>
                                    <Box px={4} pt={8}>
                                        <Typography variant="h5" gutterBottom>
                                            Medications
                                        </Typography>
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="pharmacology"
                                            Label={{ label: 'Pharmacology, Mode of action of drugs' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="oraladministration"
                                            Label={{ label: 'Oral administration' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="rektalegabe"
                                            Label={{ label: 'Rektale Gabe' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="subcutaneous"
                                            Label={{ label: 'Subcutaneous' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="intramuscular"
                                            Label={{ label: 'Intramuscular' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="intravenously"
                                            Label={{ label: 'Intravenously' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="infusion"
                                            Label={{ label: 'Infusion' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="centralvenous"
                                            Label={{ label: 'ZVK - Central Venous Catheter' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="feedingtube"
                                            Label={{ label: 'Feeding tube' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="notfallmedikamente"
                                            Label={{ label: 'Notfallmedikamente' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={TextField}
                                            label="Others..."
                                            name="additionalmedication1"
                                            InputProps={{ notched: true }}
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={TextField}
                                            label="Others..."
                                            name="additionalmedication2"
                                            InputProps={{ notched: true }}
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={TextField}
                                            label="Others..."
                                            name="additionalmedication3"
                                            InputProps={{ notched: true }}
                                        />
                                    </Box>
                                </Grid>

                                {/* EXCRETION */}
                                <Grid item xs={12} sm={6}>
                                    <Box px={4} pt={8}>
                                        <Typography variant="h5" gutterBottom>
                                            Excretion
                                        </Typography>
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="urogenitalbereich"
                                            Label={{ label: 'Urogenitalbereich' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="onetimecatheter"
                                            Label={{ label: 'Lay one-time catheter' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="permanentcatheter"
                                            Label={{ label: 'Lay permanent catheters' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="suprapubiccatheter"
                                            Label={{ label: 'Suprapubic catheter' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="hurine"
                                            Label={{ label: '24h - Urine' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="infusion"
                                            Label={{ label: 'Infusion' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="condomurinal"
                                            Label={{ label: 'Condom - urinal' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="magendarmtrakt"
                                            Label={{ label: 'Condom - urinal' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="caregastricprobe"
                                            Label={{ label: 'Care of gastric probe' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="transnasalgastric"
                                            Label={{ label: 'Transnasal gastric probe' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="careofpeg"
                                            Label={{ label: 'Care of PEG' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="careofstoma"
                                            Label={{ label: 'Care of stoma / Enterostoma' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="intestinalrinsing"
                                            Label={{ label: 'Intestinal rinsing' }}
                                            color="primary"
                                        />
                                    </Box>
                                </Grid>
                            </Grid>

                            {
                                /**
                                 * = NEUROLOGY & WOUND TREATMENT
                                 * ------------------------------------------------------------------------- */
                            }
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Box px={4} pt={8}>
                                        <Typography variant="h5" gutterBottom>
                                            Neurology
                                        </Typography>
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="stateofconsciousness"
                                            Label={{ label: 'Checking the state of consciousness' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="carestroke"
                                            Label={{ label: 'Care Stroke' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="cerebralhemorrhage"
                                            Label={{ label: 'Care of cerebral hemorrhage' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="caringparkinson"
                                            Label={{ label: 'Caring Parkinson' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="carebraintumor"
                                            Label={{ label: 'Care of brain tumor' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={TextField}
                                            label="Others..."
                                            name="additionalneurology"
                                            InputProps={{ notched: true }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box px={4} pt={8}>
                                        <Typography variant="h5" gutterBottom>
                                            Wound Treatment
                                        </Typography>
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="asepticdressing"
                                            Label={{ label: 'Sterile bandage change of aseptic dressing' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="septicdressing"
                                            Label={{ label: 'Steriler bandage change of septic dressing' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="pullingthreads"
                                            Label={{ label: 'Pulling threads' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="removebrackets"
                                            Label={{ label: 'Remove brackets' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="woundassessment"
                                            Label={{ label: 'Wound assessment' }}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box px={4}>
                                        <Field
                                            component={TextField}
                                            label="Others..."
                                            name="additionalwoundtreatment"
                                            InputProps={{ notched: true }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box px={4} py={2} mt={6} display="flex" justifyContent="flex-end">
                                <Button variant="contained" color="primary" type="submit" size="large">Update</Button>
                            </Box>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}

export default PracticalKnowledgeSummary;