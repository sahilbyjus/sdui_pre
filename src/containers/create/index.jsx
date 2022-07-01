import React, { useState, useEffect } from 'react';
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
import Grid from '@mui/material/Grid';
import { Checkbox } from '@mui/material';
import { FormLabel } from '@mui/material';
import { RadioGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Radio } from '@mui/material';
import { Slider } from '@mui/material';
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

const defaultValues = {
  type: '',
  schema_version: '',
  cohort_id: 0,
  device_orientation: '',
  device_os: '',
  theme_name: '',
};
const Create = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const [checked, setChecked] = React.useState([true, false]);
  const [checkedn, setCheckedn] = React.useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const handleChange4 = (event) => {
    setCheckedn([event.target.checked, event.target.checked]);
  };

  const handleChange5 = (event) => {
    setCheckedn([event.target.checked, checkedn[1]]);
  };

  const handleChange6 = (event) => {
    setCheckedn([checkedn[0], event.target.checked]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        //rowSpacing={1}
        //columnSpacing={{ xs: 1, sm: 2, md: 3 }}

        direction="column"
        spacing={5}
      >
        <Grid item xs="auto">
          <FormControl sx={{ m: 2, width: '50%' }} size="small">
            <Select
              id="type-input"
              name="type"
              label="Type"
              value={formValues.type}
              size="large"
              onChange={handleInputChange}
            >
              <MenuItem key="bottombar" value="bottombar">
                Bottom Bar
              </MenuItem>
              <MenuItem key="actionbar" value="actionbar">
                Action Bar
              </MenuItem>
              <MenuItem key="themelayout" value="themelayout">
                Theme Layout
              </MenuItem>
              <MenuItem key="homelayout" value="homelayout">
                Home Layout
              </MenuItem>
              <MenuItem key="selfstudylayout" value="selfstudylayout">
                Self Study Layout
              </MenuItem>
              <MenuItem key="btclayout" value="btclayout">
                BTC Layout
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="schemaversion-input"
            name="schema_version"
            label="Schema Version"
            type="number"
            value={formValues.schema_version}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="cohortid-input"
            name="cohort_id"
            label="Cohort Id"
            type="string"
            value={formValues.cohort_id}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <div>
              <FormControlLabel
                label="Device orientation"
                font-size="18"
                control={
                  <Checkbox
                    checked={checked[0] && checked[1]}
                    indeterminate={checked[0] !== checked[1]}
                    onChange={handleChange1}
                  />
                }
              />
            </div>
            <FormControlLabel
              label="Landscape"
              control={
                <Checkbox checked={checked[0]} onChange={handleChange2} />
              }
            />
            <FormControlLabel
              label="Portrait"
              control={
                <Checkbox checked={checked[1]} onChange={handleChange3} />
              }
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <div>
              <FormControlLabel
                label="Device os"
                control={
                  <Checkbox
                    checked={checkedn[0] && checkedn[1]}
                    indeterminate={checkedn[0] !== checkedn[1]}
                    onChange={handleChange4}
                  />
                }
              />
            </div>
            <FormControlLabel
              label="Android"
              control={
                <Checkbox checked={checkedn[0]} onChange={handleChange5} />
              }
            />
            <FormControlLabel
              label="Ios"
              control={
                <Checkbox checked={checkedn[1]} onChange={handleChange6} />
              }
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl>
            <Select
              name="theme_name"
              value={formValues.theme_name}
              onChange={handleInputChange}
            >
              <MenuItem key="higher" value="higher">
                Higher
              </MenuItem>
              <MenuItem key="lower" value="lower">
                Lower
              </MenuItem>
              <MenuItem key="middle" value="middle">
                Middle
              </MenuItem>
              <MenuItem key="lower_kg" value="lower_kg">
                Lower kg
              </MenuItem>
              <MenuItem key="higher_plus" value="higher_plus">
                Higher Plus
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Button variant="contained" color="primary" type="submit" align="right">
          Submit
        </Button>
      </Grid>
    </form>
  );
};
export default Create;

//function Create() {
//return <div>Create</div>;
//}

//export default Create;
