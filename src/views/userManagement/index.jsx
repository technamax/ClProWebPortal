import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Tab, Card, Grid, Typography } from '@mui/material';
import Clients from './Clients';
// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
// ===============================|| COLOR BOX ||=============================== //
const UserManagement = () => {
  const [value, setValue] = useState('1');

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
    console.log('value', value);
  };

  return (
    <MainCard>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTabs}>
              <Tab
                icon={<CategoryOutlinedIcon />}
                label="Users"
                value="1"
                sx={(theme) => ({
                  '& .MuiTouchRipple-child': {
                    backgroundColor: `${theme.palette.primary.main} !important`
                  }
                })}
              />
              <Tab
                icon={<AssignmentOutlinedIcon />}
                label="Menus"
                value="2"
                sx={(theme) => ({
                  '& .MuiTouchRipple-child': {
                    backgroundColor: `${theme.palette.primary.main} !important`
                  }
                })}
              />
              <Tab
                icon={<AssignmentOutlinedIcon />}
                label="Roles"
                value="3"
                sx={(theme) => ({
                  '& .MuiTouchRipple-child': {
                    backgroundColor: `${theme.palette.primary.main} !important`
                  }
                })}
              />
              <Tab
                icon={<AssignmentOutlinedIcon />}
                label="Assign Roles"
                value="4"
                sx={(theme) => ({
                  '& .MuiTouchRipple-child': {
                    backgroundColor: `${theme.palette.primary.main} !important`
                  }
                })}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Clients />
            {/* <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <SubCard title="Create Users">
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa.
                    Ut enif ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube
                    grue dolor in reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non
                    president, sunk in culpa qui officiate descent molls anim id est labours.
                  </Typography>
                </SubCard>
              </Grid>
              <Grid item xs={12}>
                <SubCard title="View Users">
                  <ReuseableDataGrid iColumns={columns} initialRows={rows} />
                </SubCard>
              </Grid>
            </Grid> */}
          </TabPanel>
          <TabPanel value="2">{/* <EmbroideryReceiving /> */}</TabPanel>
          <TabPanel value="3">{/* <AssignTermsAndConditions /> */}</TabPanel>
          <TabPanel value="4">{/* <AssignTermsAndConditions /> */}</TabPanel>
          <TabPanel value="5">{/* <AssignTermsAndConditions /> */}</TabPanel>
          <TabPanel value="6">{/* <AssignTermsAndConditions /> */}</TabPanel>
        </TabContext>
      </Box>
    </MainCard>
  );
};

export default UserManagement;
