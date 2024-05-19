import * as React from 'react';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useEffect, useState} from "react";
import {Alert, CircularProgress, Input, Stack, Typography} from "@mui/material";
import Papa from 'papaparse';
import useFetch from "../utils/useFetch";
import {METADATA_VALIDATION} from "../utils/serverConfig";


export default function InputFileUpload({disabled, csvData, setCsvData, setValidationResponse}) {


    // It state will contain the error when
    // correct file extension is not used
    const [loadError, setLoadError] = useState("");
    // It will store the file uploaded by the user
    const [file, setFile] = useState(null);
    const [metaObjRequest, setMetaObjRequest] = useState(null);



    useEffect(() => {

        async function startFetching() {
            setCsvData(null);
            const result = await fetch(metaObjRequest.url, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(metaObjRequest.body)
                }
            );
            if (!ignore) {
                console.log('Metadata validation result:', result);
                if (result.status === 200) {
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
        }

        let ignore = false;

        if (metaObjRequest && metaObjRequest.url) {
            startFetching();
        }
        return () => {
            ignore = true;
        }
    }, [metaObjRequest]);


    const handleOnChange = (e) => {
        setValidationResponse(null);
        try {
            setLoadError("");
            let myFile = e.target.files[0];
            setFile(myFile);

            const fileName = myFile.name;
            // Get file size
            const fileSize = myFile.size; // in bytes
            // Get file extension
            const fileExtension = fileName.split('.').pop();

            const metadataRequest = {
                url: METADATA_VALIDATION,
                body: {
                    // name: fileName,
                    // size: fileSize,
                    // extension: fileExtension
                    username: 'kminchelle',
                    password: '0lelplR',
                    expiresInMins: 30,
                }
            };

            console.log('Metadata request:', metadataRequest);

            setMetaObjRequest(metadataRequest);

        } catch (error) {
            console.log('Error:', error);
            setLoadError("Error al cargar el archivo" + error);
        }
    };

    let fileLoadFlag = <Alert severity="info">No se ha cargado ningun archivo</Alert>
    if (loadError !== "") {
        fileLoadFlag = <Alert severity="error">Error al cargar el archivo</Alert>;
    }
    else if (file && !csvData) {
        fileLoadFlag = <CircularProgress/>;
    } else if (csvData) {
        fileLoadFlag = <Alert severity="info">{"Archivo cargado: " + file.name}</Alert>
        console.log(csvData);
    }


        return (
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
        );
    }
