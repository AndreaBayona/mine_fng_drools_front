import Box from '@mui/material/Box';
import {Paper, Stack, Typography, Chip, Alert, CircularProgress} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, {Fragment, useEffect, useState} from "react";
import InputFileUpload from "../components/FileUpload";
import {Alarm, Verified} from "@mui/icons-material";
import {ADMIN_ROLE_ID, METADATA_VALIDATION} from "../utils/serverConfig";
import ValidationReport from "../components/ValidationReport";
import {getPermissionsValidation} from "../services/getPermissionsValidation";
import {getCreditOpeningsValidation} from "../services/getCreditOpeningsValidation";


const instrctionsTitle = ' Leer Instructivo de creación de préstamo';
const instrctionsDesc = [' Este módulo del portal transaccional del Fondo Nacional de Garantías (FNG) te permite la apertura de cupos globales de garantias a través de una plantilla (Anexo 54).', 'Descarga un archivo de referencia del Anexo 5A usado para el registro de garantias de cupos rotativos y su instructivo',];

const uploadTitle = 'Subir archivo de creación de préstamo';
const uploadDesc = 'Agrega el archivo soporte para la transacción únicamente en formato CSV';

const validateTitle = 'Validar archivo y finalizar proceso';
const validateDesc = 'El archivo debe ser validado y procesado según las reglas de negocios, para cada registro se le indicará las respectivas validaciones. Posteriormente se podrá finalizar el proceso de creación de préstamo.';

const acceptTermsLabel = 'Acepto los términos y condiciones de tratamiento de datos personales';

function generateRandomFields(numFields, id) {
    const rowName = `row${id}`;
    const fields = {}

    fields[rowName] = {
        nit: "12312321",
        name: "Andres Felipe Bayona",
        address: "Calle 123"
    }

    for (let i = 1; i <= numFields; i++) {
        const fieldName = `field${i}`;
        fields[rowName][fieldName] = `error description for field ${i}`
    }
    return fields;
}

function generateJsonObject() {
    const jsonObject = {
        id: 'adminUserID',
        errors: {}
    }
    for (let i = 1; i <= 15; i++) {
        const numFields = Math.floor(Math.random() * 30) + 2; // Generates a random number between 10 and 25
        const rowFields = generateRandomFields(numFields, i);
        jsonObject.errors = {...jsonObject.errors, ...rowFields};
    }
    console.log(jsonObject);
    return jsonObject;
}


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

        if (request && request.url & !validationResponse) {
            validationView = <CircularProgress/>
        } else if (validationResponse && validationResponse.status !== 200) {
            validationView = <ValidationReport errorsObject={validationResponse}/>
        } else if (validationResponse && validationResponse.status === 200) {
            validationView = <Alert severity="success">Validaciones efectuadas</Alert>
        }

        let validateOrEndButton = <Button
            disabled={!termsAccepted || !csvData}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<Verified/>}
            onClick={validateCsvData}
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

        async function validateCsvData() {
            const result = await getCreditOpeningsValidation(csvData);
            console.log(result);
            setValidationResponse(generateJsonObject(result));
        }

        useEffect(() => {
            const requestPerm = async () => {
                const res = await getPermissionsValidation(ADMIN_ROLE_ID);
                setPermissions(res?.hasPermissionForAction);
                console.log(res?.hasPermissionForAction);
            }

            requestPerm();

        }, [])


        function handleAcceptTerms() {
            setTermsAccepted(!termsAccepted);
        }

        function endProcess() {
            console.log("end process")
            setTermsAccepted(false);
            setCsvData(null);
            setRequest(null);
            setValidationResponse(null);
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
                <Stack spacing={2} sx={{width: '100%', gap: "10px"}}>

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
                        <InputFileUpload disabled={!termsAccepted || !permissions} setCsvData={setCsvData} csvData={csvData}
                                         setValidationResponse={setValidationResponse}/>
                        {!permissions && <Alert severity="error">No tiene permisos para realizar esta accion. Contacte a su
                            administrador</Alert>}
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