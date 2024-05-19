import Box from '@mui/material/Box';
import {Paper, Stack, ListItem, Typography, Chip, Input, Alert, CircularProgress} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, {Fragment, useEffect, useState} from "react";
import InputFileUpload from "../components/FileUpload";
import {Alarm, Verified} from "@mui/icons-material";
import useFetch from "../utils/useFetch";
import {ADMIN_ROLE_ID, METADATA_VALIDATION} from "../utils/serverConfig";
import ValidationReport from "../components/ValidationReport";
import {getPermissionsValidation} from "../services/getPermissionsValidation";


const instrctionsTitle = ' Leer Instructivo de creación de préstamo';
const instrctionsDesc = [' Este módulo del portal transaccional del Fondo Nacional de Garantías (FNG) te permite la apertura de cupos globales de garantias a través de una plantilla (Anexo 5).', 'Descarga un archivo de referencia del Anexo 5 usado para el registro de garantias de cupos rotativos y su instructivo',];

const uploadTitle = 'Subir archivo de creación de préstamo';
const uploadDesc = 'Agrega el archivo soporte para la transacción únicamente en formato CSV';

const validateTitle = 'Validar archivo y finalizar proceso';
const validateDesc = 'El archivo debe ser validado y procesado según las reglas de negocios, para cada registro se le indicará las respectivas validaciones. Posteriormente se podrá finalizar el proceso de creación de préstamo.';

const acceptTermsLabel = 'Acepto los términos y condiciones de tratamiento de datos personales';


const Step = ({step, title, disabled, children}) => {
    const Item = styled(Paper)(({theme, disabled}) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: 'white',
        backgroundColor: disabled ? theme.palette.primary.disabled : theme.palette.secondary.main,
    }));

    return (<Fragment>
        <Item
            sx={{
                my: 1, mx: 'auto', p: 2,
            }}
            disabled={disabled}
        >
            <Stack spacing={2} direction="row" alignItems="center">
                <Avatar sx={{bgcolor: 'white'}}>
                    <Typography variant="h6" color='text.secondary'>{step}</Typography>
                </Avatar>
                <Typography variant="h6">{title}</Typography>
            </Stack>

        </Item>
        {children}
    </Fragment>);
};


export const LoanCreation = () => {
    const Item = styled(Paper)(({theme, disabled}) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: 'white',
        backgroundColor: disabled ? theme.palette.primary.disabled : theme.palette.secondary.main,
    }));

    const [termsAccepted, setTermsAccepted] = React.useState(false);
    const [csvData, setCsvData] = useState(null);
    const [request, setRequest] = useState(null);
    const [validationResponse, setValidationResponse] = useState(null);
    const [permissions, setPermissions] = useState(true);

    let validationView = null;

    if (request && request.url && !validationResponse) {
        validationView = <CircularProgress/>
    }
    else if (validationResponse  && validationResponse.status === 200) {
        validationView = <ValidationReport/>
    }
    else if (validationResponse && validationResponse.status !== 200) {
        validationView = <Alert severity="success">Validaciones efectuadas</Alert>
    }

    let validateOrEndButton =  <Button
        disabled={!termsAccepted || !csvData}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<Verified/>}
        onClick={validateParsedFile}
    >
        Validar
    </Button>;

    if (validationResponse && validationResponse.status === 200) {
        validateOrEndButton = <Button
            disabled={!termsAccepted || !csvData}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<Verified/>}
            onClick={endProcess}
        >
            Finalizar proceso de creación
        </Button>
    }

    useEffect(() => {

        async function startFetching() {
            console.log("fetching", request);
            setValidationResponse(null);
            const result = await fetch(request.url, {
                method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(request.body)
            });
            if (!ignore) {
                setValidationResponse(result);
                console.log(result);
            }

        }

        let ignore = false;

        if (request && request.url) {
            startFetching();
        }

        return () => {
            ignore = true;
        }

    }, [request]);

    useEffect(() => {
        const requestPerm = async  () => {
            const res = await getPermissionsValidation(ADMIN_ROLE_ID);
            setPermissions(res?.hasPermissionForAction);
            console.log(res?.hasPermissionForAction);
        }

        requestPerm();

    }, [])



function handleAcceptTerms() {
    setTermsAccepted(!termsAccepted);
}

function validateParsedFile() {
    console.log(request)
    console.log("request")
    setRequest({
        url: METADATA_VALIDATION,
        method: 'POST',
        body: {
            username: 'kminchelle',
            password: '0lelplR',
            expiresInMins: 30,

        }
    })

}

        function endProcess() {
            console.log("end process")
        }

        return (<Box
    my={4}
    gap={4}
    p={2}
    sx={{height: '100%', width: '100%'}}
    display="flex"
    justifyContent="center"
    alignItems="center"
>
    <Box
        display="flex"
        sx={{height: '100%', width: '80%'}}
    >
        <Stack spacing={1} sx={{width: '100%'}}>

            <Step disabled={false}
                  step={1}
                  title={instrctionsTitle}
            >
                <Typography>{instrctionsDesc[0]}</Typography>
                <Typography>{instrctionsDesc[1]}</Typography>
                <Stack spacing={2} direction="row" alignItems="center">
                    <Button variant="contained" href="#contained-buttons">
                        Instructivo
                    </Button>
                    <Button variant="contained" href="#contained-buttons">
                        Anexo
                    </Button>

                    <Chip
                        variant="outlined"
                        label={<FormControlLabel control={<Checkbox
                            checked={termsAccepted}
                            onChange={handleAcceptTerms}
                        />} label={acceptTermsLabel}/>}

                    />
                </Stack>
            </Step>


            <Step disabled={!termsAccepted}
                  step={2}
                  title={uploadTitle}
            >
                <Typography>{uploadDesc}</Typography>
                <InputFileUpload disabled={!termsAccepted && !permissions} setCsvData={setCsvData} csvData={csvData} setValidationResponse = {setValidationResponse}/>
                {!permissions && <Alert severity="error">No tiene permisos para realizar esta accion. Contacte a su administrador</Alert>}
            </Step>
            <Step disabled={!termsAccepted || !csvData}
                  step={3}
                  title={validateTitle}
            >
                <Typography>{validateDesc}</Typography>
                {validateOrEndButton}
                {validationView}

            </Step>
        </Stack>

    </Box>
</Box>);
}
;
