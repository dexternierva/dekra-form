import React, { useContext, useRef } from "react";
import { useParams } from "react-router";
import { UserContext } from "../containers/GetUsers";
import { useHistory } from "react-router-dom";

import { PDFExport } from '@progress/kendo-react-pdf';
import PageTemplate from "./PageTemplate";

import GetUsers from "../containers/GetUsers";
import PracticalKnowledgeView from "./PracticalKnowledgeView";
import {
    Container, 
    Backdrop,
    CircularProgress,
    Box,
    Fab,
} from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { makeStyles } from '@material-ui/core/styles';

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
                <PracticalKnowledgeView response={response} />
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

function PracticalKnowledgeDetails () {
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
                        pageTemplate={PageTemplate}
                        ref={pdfExportComponent} 
                        paperSize="A4"
                        keepTogether="section" 
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

export default PracticalKnowledgeDetails;