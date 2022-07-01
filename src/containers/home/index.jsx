import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableFooter from '@mui/material/TableFooter';
// import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { getAllData } from '../../service/api';
import './index.css';

function Home() {
  const [tableData, setTableData] = useState([]);
  const [type, setType] = useState('Bottom Bar');
  const [deviceOrientation, setDeviceOrientation] = useState(undefined);
  const [deviceOs, setDeviceOs] = useState(undefined);
  const [themeName, setThemeName] = useState(undefined);
  const [cohortID, setCohortID] = useState(undefined);

  const [schema, setSchema] = useState(1);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const refreshResult = async () => {
    let payload = {
      type: type,
      schema_version: schema,
      cohort_id: cohortID,
      device_orientation: deviceOrientation,
      device_os: deviceOs,
      theme_name: themeName,
    };
    try {
      let data = await getAllData(payload);

      if (data) {
        setTableData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getData() {
      await refreshResult();
    }
    getData();
    //eslint-disable-next-line
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  // TODO: PAGINATION
  // eslint-disable-next-line
  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

  // eslint-disable-next-line
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // eslint-disable-next-line
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSchemaChange = (event) => {
    setSchema(event.target.value);
  };

  const handleDeviceOrientationChange = (event) => {
    setDeviceOrientation(event.target.value);
  };

  const handleDeviceOsChange = (event) => {
    setDeviceOs(event.target.value);
  };

  const handleThemeNameChange = (event) => {
    setThemeName(event.target.value);
  };

  const handleCohortIDChange = (event) => {
    setCohortID(event.target.value);
  };

  const handleSubmit = (event) => {
    refreshResult();
  };

  return (
    <div className="home-container">
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Age"
            onChange={handleTypeChange}
          >
            <MenuItem value={'Bottom Bar'}>Bottom Bar</MenuItem>
            <MenuItem value={'Action Bar'}>Action Bar</MenuItem>
            <MenuItem value={'Theme Layout'}>Theme Layout</MenuItem>
            <MenuItem value={'Home Layout'}>Home Layout</MenuItem>
            <MenuItem value={'Self Study Layout'}>Self Study Layout</MenuItem>
            <MenuItem value={'BTC Layout'}>BTC Layout</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <TextField
            label="Schema Version"
            id="outlined-size-small"
            value={schema}
            onChange={handleSchemaChange}
            size="small"
          />
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <TextField
            label="Cohort ID"
            id="outlined-size-small"
            value={cohortID}
            onChange={handleCohortIDChange}
            size="small"
          />
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
          <InputLabel id="demo">Device orientation</InputLabel>
          <Select
            labelId="demo"
            id="demo"
            value={deviceOrientation}
            label="alignment"
            onChange={handleDeviceOrientationChange}
          >
            <MenuItem value={'portrait'}>Portrait</MenuItem>
            <MenuItem value={'landscape'}>Landscape</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo">Device Os</InputLabel>
          <Select
            labelId="demo"
            id="demo"
            value={deviceOs}
            label="alignment"
            onChange={handleDeviceOsChange}
          >
            <MenuItem value={'android'}>Android</MenuItem>
            <MenuItem value={'ios'}>Ios</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
          <InputLabel id="demo">Theme Name</InputLabel>
          <Select
            labelId="demo"
            id="demo"
            value={themeName}
            label="alignment"
            onChange={handleThemeNameChange}
          >
            <MenuItem value={'higher'}>Higher</MenuItem>
            <MenuItem value={'lower'}>Lower</MenuItem>
            <MenuItem value={'middle'}>Middle</MenuItem>
            <MenuItem value={'lower_kg'}>Lower kg</MenuItem>
            <MenuItem value={'higher_plus'}>Higher plus</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">Created At</StyledTableCell>
              <StyledTableCell align="right">Schema Version</StyledTableCell>
              <StyledTableCell align="right">
                Device Orientation
              </StyledTableCell>
              <StyledTableCell align="right">Type</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.length &&
              tableData.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.ID}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {moment(row.CreatedAt).format('MMM D, YYYY k:m')}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.schema_version}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.device_orientation
                      ? String(row.device_orientation)
                      : null}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.type}</StyledTableCell>
                </StyledTableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
              </TableFooter> */}
        </Table>
      </TableContainer>

      <div className="add-new-btn-wrapper">
        <Link to={'/addNew'} style={{ textDecoration: 'none' }}>
          <Fab variant="extended" color="primary">
            <AddIcon />
            Create New
          </Fab>
        </Link>
      </div>
    </div>
  );
}

export default Home;
