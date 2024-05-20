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
//
//

//
// // Generate the array
// const rowsObject = generateJsonObject();


const Row = ({rowID, rowErrors}) => {
    const [open, setOpen] = React.useState(false);
    console.log(rowID)
    console.log(rowErrors)
    const fields = [...Object.keys(rowErrors[rowID]).filter(field => !['name', 'nit', 'address'].includes(field.toLowerCase()))];


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
                    {rowID}
                </TableCell>
                <TableCell align="right">
                    {rowErrors[rowID]['name']}
                </TableCell>

                <TableCell align="right">
                    {rowErrors[rowID]['nit']}
                </TableCell>

                <TableCell align="right">
                    <Chip label={fields.length} color="error"/>
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
                                        <TableRow key={rowID + field}>
                                            <TableCell component="th" scope="row"><ErrorIcon color='error'/></TableCell>
                                            <TableCell component="th" scope="row">{field}</TableCell>
                                            <TableCell align="right" sx={{color: 'red'}}>{rowErrors[rowID][field]}</TableCell>
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


const ValidationReport = ({errorsObject}) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    const rowErrorIds = [...Object.keys(errorsObject['errors'])]

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell>FilaID</TableCell>
                                <TableCell align="right">Nombres y apellidos Deudor</TableCell>
                                <TableCell align="right">NIT</TableCell>
                                <TableCell align="right">Número de errores</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowErrorIds
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((rowErrorId) => (
                                    <Row key={rowErrorId} rowID={rowErrorId} rowErrors={errorsObject['errors']}/>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rowErrorIds.length}
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