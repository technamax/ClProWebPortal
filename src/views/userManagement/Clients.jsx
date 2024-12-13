import { useState, useEffect } from 'react';
// import axios from 'axios';
import { Box, Tab, Card, Grid, Typography, TextField, Button, CircularProgress } from '@mui/material';
// import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
// import {} from '@mui/material';
// import '../../assets/scss/style.scss';
// import DyeingReceiving from 'components/Production/Receiving/Dyeing/DyeingReceiving';
// import EmbroideryReceiving from 'components/Production/Receiving/Embroidery/EmbroideryReceiving';
import * as React from 'react';
import ReuseableDataGrid from 'components/ReuseableDataGrid';

import { useGetAllClientsQuery } from 'redux/apis/userApi';

const Clients = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    clientContactNumber: '',
    clientAddress: '',
    cityID: '',
    branchName: '',
    branchContactNumber: '',
    branchAddress: '',
    username: '',
    password: '',
    name: '',
    stateID: '',
    isMainUser: '',
    customerType: '',
    role: '',

    createdOn: new Date().toISOString()
    // createdBy: user.empId,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // if (name === 'categoryID') {
    //   setRows([]);
    //   setBarCodes(null);
    //   setStock(null);
    // }
  };
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [rows, setRows] = useState([]);

  const { data: clients, refetch: refetchClients } = useGetAllClientsQuery();
  useEffect(() => {
    if (clients) {
      setRows(
        clients.result.map((row, index) => ({
          id: index,
          ...row
        }))
      );
    }
  }, [clients, refetchClients]);
  // const rows = [
  //   { id: 1, role: 'Admin', isActive: 'Yes', isMainRole: 'Yes', createdOn: '12/09/2022' },
  //   { id: 2, role: 'Manager', isActive: 'No', isMainRole: 'No', createdOn: '12/09/2022' },
  //   { id: 3, role: 'User', isActive: 'Yes', isMainRole: 'Yes', createdOn: '12/09/2022' },
  //   { id: 4, role: 'Admin', isActive: 'Yes', isMainRole: 'Yes', createdOn: '12/09/2022' },
  //   { id: 5, role: 'Manager', isActive: 'No', isMainRole: 'No', createdOn: '12/09/2022' },
  //   { id: 6, role: 'User', isActive: 'Yes', isMainRole: 'Yes', createdOn: '12/09/2022' },
  //   { id: 7, role: 'Admin', isActive: 'Yes', isMainRole: 'Yes', createdOn: '12/09/2022' }
  // ];
  const columns = [
    { field: 'id', headerName: 'Sr.', flex: 0.1 },
    { field: 'clientID', headerName: 'ID', flex: 1 },
    { field: 'businessName', headerName: 'Business Name', flex: 1 },
    { field: 'ownerName', headerName: 'Owner', flex: 1 },
    { field: 'clientContactNumber', headerName: 'Contact', flex: 1 },
    { field: 'clientAddress', headerName: 'Address', flex: 1 },
    {
      field: 'isActive',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => <div>{params.row.isActive ? 'Active' : 'Inactive'}</div>
    },
    {
      field: 'createdAt',
      headerName: 'Created On',
      align: 'center',
      flex: 2
    }
  ];

  const handleSave = async () => {
    console.log('formdata', formData);
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <SubCard title="ADD CLIENT">
          <Grid container spacing={2} width="Inherit" sx={{ paddingY: 2, paddingX: 0 }}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                // select
                label="Business Name"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                // size="small"
                // error={!!formErrors.brandId}
                // helperText={formErrors.brandId}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                // select
                label="Branch Name"
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
                // required
                // size="small"
                // error={!!formErrors.brandId}
                // helperText={formErrors.brandId}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                // select
                label="Owner Name"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
                // size="small"
                // error={!!formErrors.brandId}
                // helperText={formErrors.brandId}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Branch Address"
                name="branchAddress"
                value={formData.branchAddress}
                onChange={handleChange}
                required
                // size="small"
                // error={!!formErrors.brandId}
                // helperText={formErrors.brandId}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Sates"
                name="stateID"
                value={formData.stateID}
                onChange={handleChange}
                // size="small"
                // error={!!formErrors.brandId}
                // helperText={formErrors.brandId}
              >
                {states.map((option) => (
                  <MenuItem key={option.states} value={option.states}>
                    {option.categoryName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="City Name"
                name="cityID"
                value={formData.cityID}
                onChange={handleChange}
                // size="small"
                // error={!!formErrors.brandId}
                // helperText={formErrors.brandId}
              >
                {states.map((option) => (
                  <MenuItem key={option.cityID} value={option.cityID}>
                    {option.categoryName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Customer"
                name="customerType"
                value={formData.customerType}
                onChange={handleChange}
                // size="small"
                // error={!!formErrors.brandId}
                // helperText={formErrors.brandId}
              >
                {states.map((option) => (
                  <MenuItem key={option.categoryID} value={option.categoryID}>
                    {option.categoryName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                // size="small"
                // error={!!formErrors.brandId}
                // helperText={formErrors.brandId}
              >
                {states.map((option) => (
                  <MenuItem key={option.role} value={option.role}>
                    {option.categoryName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Contact Number"
                name="branchContactNumber"
                value={formData.branchContactNumber}
                onChange={handleChange}
                required
                // size="small"
                // error={!!formErrors.brandId}
                // helperText={formErrors.brandId}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="User Name"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                // size="small"
                // error={!!formErrors.brandId}
                // helperText={formErrors.brandId}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                // size="small"
                // error={!!formErrors.brandId}
                // helperText={formErrors.brandId}
              />
            </Grid>
            <Grid item xs={12} md={3} textAlign="right" sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handleSave} disabled={loading}>
                {loading ? <CircularProgress sx={{ color: '#ffffff' }} size={24} /> : 'Save'}
              </Button>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
      <Grid item xs={12}>
        <SubCard title="View Users">
          <ReuseableDataGrid iColumns={columns} initialRows={rows} />
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default Clients;