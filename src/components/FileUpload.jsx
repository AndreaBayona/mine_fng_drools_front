import * as React from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useEffect, useState} from "react";
import {Alert, CircularProgress, Input, Stack} from "@mui/material";
import Papa from 'papaparse';
import {getFileFormatValidation} from "../services/getFileFormatValidation";


export default function InputFileUpload({disabled, csvData, setCsvData, setValidationResponse}) {


    // It state will contain the error when
    // correct file extension is not used
    const [loadError, setLoadError] = useState("");
    // It will store the file uploaded by the user
    const [file, setFile] = useState(null);
    const [metaObjRequest, setMetaObjRequest] = useState(null);
    const [errors, setErrors] = useState([]);


    useEffect(() => {

        async function startFetching() {
            console.log({file});
            setCsvData(null);
            if (errors.length === 0 && file) {
                Papa.parse(file, {
                    complete: (result) => {
                        console.log('Parsed CSV result:', result);
                        setCsvData(result.data);
                        //setData(csvData);
                    },
                    header: true,
                });
            }
        }

        startFetching();
    }, [file]);


    const handleOnChange = async (e) => {
        setValidationResponse(null);
        console.log(e);
        try {
            setLoadError("");
            let myFile = e.target.files[0];
            setFile(myFile);


            const fileName = myFile.name;
            // Get file size
            const fileSize = myFile.size; // in bytes
            // Get file extension
            const fileExtension = fileName.split('.').pop();

            const res = await getFileFormatValidation({
                fileType: fileExtension,
                fileSize: fileSize,
            })

            console.log(res);
            setErrors(res.messages);

        } catch (error) {
            console.log('Error:', error);
            setLoadError("Error al cargar el archivo" + error);
        }
    };

    let fileLoadFlag = <Alert severity="info">No se ha cargado ningun archivo</Alert>
    if (loadError !== "") {
        fileLoadFlag = <Alert severity="error">Error al cargar el archivo</Alert>;
    } else if (file && !csvData) {
        fileLoadFlag = <CircularProgress/>;
    } else if (csvData) {
        fileLoadFlag = <Alert severity="info">{"Archivo cargado: " + file.name}</Alert>
        console.log(csvData);
    }


    return (
        <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2}>
                <Button
                    disabled={disabled}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon/>}
                >

                    {file === null ? "Cargar archivo" : "Volver a cargar"}
                    <Input onChange={handleOnChange} type="file"
                           sx={{
                               display: 'none',
                           }}
                    ></Input>
                </Button>
                {fileLoadFlag}
            </Stack>
            {
                errors.map((error, index) => (
                    <Alert key={index} severity="error">{error}</Alert>
                ))
            }
        </Stack>
    );
}
