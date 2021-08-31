import React, { useState } from "react";
import * as Yup from "yup";
import {
    Grid, 
    Card, 
    CardContent,
    Box,
    Typography,
    Step,
    StepLabel,
    Stepper,
    Button,
    CircularProgress,
    Paper,
    FormHelperText,
    Divider
} from '@material-ui/core';
import { Formik, Field, Form, FieldArray } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
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

function PracticalKnowledge ({ setPracticalKnowledgeState }) {
    const classes = useStyles();
    const [dialog, setDialog] = useState({ state:false, header: null, text: null });

    return (
        <>
        <Alert 
            dialog={dialog}
            handleClick={() => { 
                setPracticalKnowledgeState(false);
                setDialog(false);
                // window.location.reload(); /** => RESEARCH FOR AN ALTERNATIVE */
            }} 
        /> 
        <Box mb={4}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Practical Knowledge
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        Appendix to the CV of:
                    </Typography>
                    <Typography variant="body2" component="p">
                        In addition to the CV, these information is intended to provide an overview of which practical skills have already been carried out independently. It is a self-assessment of the participant for a basic orientation, <strong>but does not represent a qualitative statement about this individual abilities.</strong>
                    </Typography>
                </CardContent>
            </Card>
        </Box>

        <FormikStepper
            initialValues = {{
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
                departments: [''],

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
                breathings: [''],

                // VITAL SIGN CONTROL MONITORING
                rrmeasurement: false,
                measuringtemperature: false,
                measuringblood: false,
                monitor: false,
                pulsoxymeter: false,
                ecg: false,
                readassess: false,
                vitalsigns: [''],

                // DEVICES
                bloodglucose: false,
                devicesmonitor: false,
                devicespulsoxymeter: false,
                schmerzpumpe: false,
                infusomat: false,
                perfusor: false,
                vacuumpump: false,
                devices: [''],

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
            }}

            onSubmit={async (values) => {
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
                    'departments': values.departments.join(", "),

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
                    'breathings': values.departments.join(", "),

                    // VITAL SIGN CONTROL MONITORING
                    'rrmeasurement': values.rrmeasurement,
                    'measuringtemperature': values.measuringtemperature,
                    'measuringblood': values.measuringblood,
                    'monitor': values.monitor,
                    'pulsoxymeter': values.pulsoxymeter,
                    'ecg': values.ecg,
                    'readassess': values.readassess,
                    'vitalsigns': values.vitalsigns.join(", "),

                    // DEVICES
                    'bloodglucose': values.bloodglucose,
                    'devicesmonitor': values.devicesmonitor,
                    'devicespulsoxymeter': values.devicespulsoxymeter,
                    'schmerzpumpe': values.schmerzpumpe,
                    'infusomat': values.infusomat,
                    'perfusor': values.perfusor,
                    'vacuumpump': values.vacuumpump,
                    'devices': values.devices.join(", "),

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
                    method: 'POST',
                    url: 'https://dekra-form-api-m8bsw.ondigitalocean.app/practical-knowledges',
                    data,
                    withCredentials: true
                })
                    .then(() => {
                        setDialog({ state: true, header: "Status: Successful", text: "Practical Knowledge Successfully CREATED!" });
                    })
                    .catch(error => {
                        setDialog({ state: true, header: "An Error Occurred!", text: "Oh snap! Something went wrong. Please change a few things up and try submitting again. Thank you!" });
                    });

            }}
        >
            {/**
             * FORMIK STEP:
             * DEPARTMENT
             * 
             */}
            <FormikStep 
                label="Department"
                validationSchema={Yup.object({
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
                })}
            >
                <Box px={4}>
                    <Typography variant="overline" display="block" gutterBottom>
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
                                Label={{ label: 'Intensive care unit' }}
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
                                Label={{ label: 'General surgery & traumatology' }}
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
                                Label={{ label: 'Emergency room' }}
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
                                                        <Field component={TextField} name={`departments[${index}]`} />
                                                        {index > 0 && (
                                                            <button className={classes.dynamicfieldminus} type='button' onClick={() => remove(index)}> - </button>
                                                        )}
                                                        {index < 5 && (
                                                            <button type='button' onClick={() => index < 5 ? push('') : null }> + </button>
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
            </FormikStep>

            {/**
             * FORMIK STEP:
             * BASIC CARE & BREATHING
             * 
             */}
            <FormikStep 
                label="Basic Care &amp; Breathing"
                validationSchema={Yup.object({
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
                })}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Box px={4}>
                            <Typography variant="overline" display="block" gutterBottom>
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
                                Label={{ label: 'Positioning patient' }}
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
                                Label={{ label: 'Feeding' }}
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
                        <Box px={4}>
                            <Typography variant="overline" display="block" gutterBottom>
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
                            <FieldArray name="breathings">
                                {
                                    (fieldArrayProps) => {
                                        const { push, remove, form } = fieldArrayProps
                                        const { values } = form
                                        const { breathings } = values
                                        return (
                                            <div>
                                                {breathings.map((breathing, index) => (
                                                    <div key={index} className={classes.dynamicfield}>
                                                        <Field component={TextField} name={`breathings[${index}]`} />
                                                        {index > 0 && (
                                                            <button className={classes.dynamicfieldminus} type='button' onClick={() => remove(index)}> - </button>
                                                        )}
                                                        {index < 5 && (
                                                            <button type='button' onClick={() => index < 5 ? push('') : null }> + </button>
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
            </FormikStep>

            {/**
             * FORMIK STEP:
             * VITAL SIGN CONTROL / MONITORING & DEVICES
             * 
            */}
            <FormikStep 
                label="Vital Sign Control, Monitoring &amp; Devices"
                validationSchema={Yup.object({
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
                })}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Box px={4}>
                            <Typography variant="overline" display="block" gutterBottom>
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
                            <FieldArray name="vitalsigns">
                                {
                                    (fieldArrayProps) => {
                                        const { push, remove, form } = fieldArrayProps
                                        const { values } = form
                                        const { vitalsigns } = values
                                        return (
                                            <div>
                                                {vitalsigns.map((vitalsign, index) => (
                                                    <div key={index} className={classes.dynamicfield}>
                                                        <Field component={TextField} name={`vitalsigns[${index}]`} />
                                                        {index > 0 && (
                                                            <button className={classes.dynamicfieldminus} type='button' onClick={() => remove(index)}> - </button>
                                                        )}
                                                        {index < 5 && (
                                                            <button type='button' onClick={() => index < 5 ? push('') : null }> + </button>
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
                    
                    { /* DEVICES COLUMN */ }
                    <Grid item xs={12} sm={6}>
                        <Box px={4}>
                            <Typography variant="overline" display="block" gutterBottom>
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
                            <FieldArray name="devices">
                                {
                                    (fieldArrayProps) => {
                                        const { push, remove, form } = fieldArrayProps
                                        const { values } = form
                                        const { devices } = values
                                        return (
                                            <div>
                                                {devices.map((device, index) => (
                                                    <div key={index} className={classes.dynamicfield}>
                                                        <Field component={TextField} name={`devices[${index}]`} />
                                                        {index > 0 && (
                                                            <button className={classes.dynamicfieldminus} type='button' onClick={() => remove(index)}> - </button>
                                                        )}
                                                        {index < 5 && (
                                                            <button type='button' onClick={() => index < 5 ? push('') : null }> + </button>
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
            </FormikStep>

            {/**
             * FORMIK STEP:
             * MEDICATIONS & EXCRETION
             * 
            */}
            <FormikStep 
                label="Medications &amp; Excretions"
                validationSchema={Yup.object({
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
                })}
            >
                <Grid container spacing={2}>
                    {/* MEDICATIONS */}
                    <Grid item xs={12} sm={6}>
                        <Box px={4}>
                            <Typography variant="overline" display="block" gutterBottom>
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
                        <Box px={4}>
                            <Typography variant="overline" display="block" gutterBottom>
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
            </FormikStep>

            {/**
             * FORMIK STEP:
             * NEUROLOGY & WOUND TREATMENT
             * 
            */}
            <FormikStep 
                label="Neurology &amp; Wound Treatment"
                validationSchema={Yup.object({
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
                })}
            >
                {/* NEUROLOGY */}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Box px={4}>
                            <Typography variant="overline" display="block" gutterBottom>
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
                        <Box px={4}>
                            <Typography variant="overline" display="block" gutterBottom>
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
            </FormikStep>
        </FormikStepper>
        </>
    )
}

/** 
 * FORMIKSTEPPER 
 * 
 */
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
            {({ isSubmitting }) => (
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
                                            size="large"
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
            )}
        </Formik>
    )
}

export default PracticalKnowledge;