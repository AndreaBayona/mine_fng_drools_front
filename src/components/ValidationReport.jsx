import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Alert, Chip, TablePagination} from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';

function generateRandomFields(numFields) {
    const fields = {};
    for (let i = 1; i <= numFields; i++) {
        fields[`Field${i}`] = `Value${i}`;
    }
    return fields;
}

function generateJsonArray(numObjects) {
    const jsonArray = [];
    for (let i = 1; i <= numObjects; i++) {
        const numFields = Math.floor(Math.random() * 16) + 10; // Generates a random number between 10 and 25
        const jsonObject = {
            ReferenciaDeArchivo: `REF${String(i).padStart(3, '0')}`,
            NombresApellidosDeudor: 'Andres Felipe Bayona',
            NúmeroDocumentoDeudor: '1234567890',
            ...generateRandomFields(numFields)
        };
        jsonArray.push(jsonObject);
    }
    console.log(jsonArray);
    return jsonArray;
}

// Generate the array
const rows = generateJsonArray(9);



const Row = ({row}) => {
    const [open, setOpen] = React.useState(false);

    const fields = [...Object.keys(row)].filter(field => !['ReferenciaDeArchivo', 'NombresApellidosDeudor', 'NúmeroDocumentoDeudor'].includes(field));
    console.log(fields)


    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row['ReferenciaDeArchivo']}
                </TableCell>

                <TableCell align="right">
                    {row['NombresApellidosDeudor']}
                </TableCell>
                <TableCell align="right">
                    {row['NúmeroDocumentoDeudor']}
                </TableCell>

                <TableCell align="right">
                    <Chip label=  {fields.length} color="error" />
                   </TableCell>


            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Reporte de errores
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell component="th" scope="row"></TableCell>
                                        <TableCell component="th" scope="row">Campo</TableCell>
                                        <TableCell align="right">Descripción del error</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {fields.map((field) => (
                                        <TableRow key={row['ReferenciaDeArchivo'] + field}>
                                            <TableCell component="th" scope="row"><ErrorIcon color='error'/></TableCell>
                                            <TableCell component="th" scope="row">{field}</TableCell>
                                            <TableCell align="right" sx={{color: 'red'}}>{row[field]}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}



const ValidationReport = () => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };


    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell>Referencia</TableCell>
                                <TableCell align="right">Nombres y apellidos Deudor</TableCell>
                                <TableCell align="right">Número documento Deudor</TableCell>
                                <TableCell align="right">Número de errores</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                <Row key={row['ReferenciaDeArchivo']} row={row}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
export default ValidationReport;