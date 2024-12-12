// import { useState } from 'react';
// import { Box, Typography, Card, CardHeader } from '@mui/material';

// import MainCard from 'ui-component/cards/MainCard';
// import { useGetCategoryQuery, useGetSbuCategoryQuery, useGetProductsBySubCategoryQuery } from 'redux/apis/specificationApi';

// const InventoryItems = () => {
//   const [formData, setFormData] = useState({
//     startDate: new Date(),
//     endDate: new Date(),
//     categoryID: 1,
//     subCategoryId: 1,
//     product: '',
//     quantity: '',
//     price: ''
//   });
//   const { data: Category, error, isLoading } = useGetCategoryQuery();
//   const { data: subCategory } = useGetSbuCategoryQuery(formData.categoryID);
//   const { data: product } = useGetProductsBySubCategoryQuery(formData.subCategoryId);
//   console.log('Category', Category);
//   console.log('subCategory', subCategory);
//   console.log('product', product);

//   return (
//     // <Box sx={{ width: '100%', typography: 'body1' }}>
//     //   <Card variant="outlined">
//     //     <CardHeader
//     //       className="css-4rfrnx-MuiCardHeader-root"
//     //       // avatar={
//     //       // <Avatar src={schiffli} sx={{ background: 'transparent' }} />
//     //       // }
//     //       title="GRN"
//     //       titleTypographyProps={{ style: { color: 'white' } }}
//     //     ></CardHeader>
//     //     <Typography variant="body2">
//     //       Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
//     //       minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
//     //       reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
//     //       qui officiate descent molls anim id est labours.
//     //     </Typography>
//     //   </Card>
//     // </Box>
//     <MainCard title="Products" style={{ background }}>
//       <Typography variant="body2">
//         Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
//         minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
//         reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui
//         officiate descent molls anim id est labours.
//       </Typography>
//     </MainCard>
//   );
// };

// export default InventoryItems;
import { useState, useEffect } from 'react';
// import axios from 'axios';
import { Box, Tab, Card, Grid, Typography } from '@mui/material';
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
// import { useLocation } from 'react-router-dom';
// import { useUser } from 'context/User';
// import DyeingGRN from 'components/Production/GRN/Dyeing/DyeingGRN';
// import StatusChip from '../../components/StatusChip';
const UsersManagement = () => {
  // const location = useLocation();
  // const rowData = location.state?.data;
  // const tab = location.state?.tab?.toString(); // Convert tab to string
  // const { user } = useUser();
  // console.log('user', user);
  // console.log('rowData', rowData);
  // console.log('tab', tab);

  const [value, setValue] = useState('1');

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
    console.log('value', value);
  };
  const rows = [
    { id: 1, role: 'Admin', isActive: 'Yes', isMainRole: 'Yes', createdOn: '12/09/2022' },
    { id: 2, role: 'Manager', isActive: 'No', isMainRole: 'No', createdOn: '12/09/2022' },
    { id: 3, role: 'User', isActive: 'Yes', isMainRole: 'Yes', createdOn: '12/09/2022' },
    { id: 4, role: 'Admin', isActive: 'Yes', isMainRole: 'Yes', createdOn: '12/09/2022' },
    { id: 5, role: 'Manager', isActive: 'No', isMainRole: 'No', createdOn: '12/09/2022' },
    { id: 6, role: 'User', isActive: 'Yes', isMainRole: 'Yes', createdOn: '12/09/2022' },
    { id: 7, role: 'Admin', isActive: 'Yes', isMainRole: 'Yes', createdOn: '12/09/2022' }
  ];
  const columns = [
    { field: 'id', headerName: 'Sr.', width: 80, flex: 1 },
    { field: 'role', headerName: 'Role Name', width: 150, flex: 1 },
    { field: 'isActive', headerName: 'Is Active', width: 150, flex: 1 },
    { field: 'isMainRole', headerName: 'Is Main Role', width: 150, flex: 1 },
    {
      field: 'createdOn',
      headerName: 'Created On',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      flex: 1
    }
  ];
  // useEffect(() => {
  //   if (tab) {
  //     setValue(tab);
  //   }
  // }, [tab]);
  return (
    <MainCard
    // style={{
    //   borderWidth: 1,
    //   borderStyle: 'dotted',
    //   borderColor: '#a11f23',
    //   // backgroundColor: '#eef2f6',
    //   width: 'auto',
    //   maxHeight: { xs: '80vh', md: 'auto' },
    //   overflow: 'auto'
    // }}
    >
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
              {/* <Tab
                icon={<AssignmentOutlinedIcon />}
                label=""
                value="5"
                sx={(theme) => ({
                  '& .MuiTouchRipple-child': {
                    backgroundColor: `${theme.palette.primary.main} !important`
                  }
                })}
              /> */}
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid container spacing={gridSpacing}>
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
                  {/* <Typography variant="body2">
                    Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa.
                    Ut enif ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube
                    grue dolor in reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non
                    president, sunk in culpa qui officiate descent molls anim id est labours.
                  </Typography> */}
                </SubCard>
              </Grid>
            </Grid>
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

export default UsersManagement;
