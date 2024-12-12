// import React, { useEffect, useCallback, useRef, useState } from 'react';
// import {
//   DataGrid,
//   GridToolbarContainer,
//   useGridApiRef
// } from '@mui/x-data-grid';
// import {
//   ButtonGroup,
//   IconButton,
//   Box,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Button
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/DeleteOutlined';
// // import ReactToPrint from 'react-to-print'
// // import PrintIcon from '@mui/icons-material/Print'
// // import { useSnackbar } from 'notistack'
// import axios from 'axios';

// const ReuseableDataGrid = ({
//   iColumns,
//   initialRows,
//   deleteApi,
//   deleteBy,
//   setInitialData,
//   refetch,
//   setIsEdit,
//   fileName,
//   isLoading,
//   checkboxSelection,
//   height,
//   hideAction,
//   disableEdit,
//   disableDelete,
//   onRowSelectionModelChange,
//   onRowDoubleClick,
//   autoSizeColumns
// }) => {
//   const apiRef = useGridApiRef();
//   const componentRef = useRef();
//   //   const { enqueueSnackbar } = useSnackbar()

//   const [open, setOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   const handleClickOpen = (id) => {
//     setDeleteId(id);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setDeleteId(null);
//   };

//   const handleDelete = async () => {
//     try {
//       const response = await axios.delete(`${deleteApi}${deleteId}`);
//       if (!response.data.success) {
//         enqueueSnackbar(`${response.data.message}!`, { variant: 'error' });
//       } else {
//         enqueueSnackbar(`${response.data.message}!`, { variant: 'success' });
//         refetch();
//       }
//     } catch (error) {
//       console.error('Error deleting data:', error);
//     }
//     handleClose();
//   };

//   const handleEdit = (row) => {
//     window.scrollTo({ top: 100, behavior: 'smooth' });
//     if (setIsEdit) setIsEdit(true);
//     setInitialData(row);
//   };

//   //   const EditToolbar = () => (
//   //     <GridToolbarContainer sx={{ justifyContent: 'end' }}>
//   //       <ReactToPrint
//   //         trigger={() => (
//   //           <IconButton aria-label='print'>
//   //             <PrintIcon />
//   //           </IconButton>
//   //         )}
//   //         content={() => componentRef.current}
//   //         pageStyle='@page { margin-top: 1in; margin-bottom: 1in; }'
//   //       />
//   //     </GridToolbarContainer>
//   //   )

//   const columnsWithActions = [
//     ...iColumns,
//     !hideAction
//       ? {
//           field: 'Action',
//           headerName: 'Actions',
//           renderCell: (params) => (
//             <ButtonGroup size="small" variant="text">
//               {!disableEdit && (
//                 <IconButton
//                   aria-label="Edit"
//                   color="#8E48BB"
//                   onClick={() => handleEdit(params.row)}
//                 >
//                   <EditIcon />
//                 </IconButton>
//               )}
//               {!disableDelete && (
//                 <IconButton
//                   aria-label="delete"
//                   color="#8E48BB"
//                   onClick={() => handleClickOpen(params.row[deleteBy])}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               )}
//             </ButtonGroup>
//           )
//         }
//       : null
//   ].filter(Boolean);

//   const handleStateChange = useCallback(() => {
//     if (apiRef.current?.autosizeColumns) {
//       apiRef.current.autosizeColumns({
//         includeOutliers: true,
//         includeHeaders: true
//       });
//     }
//   }, [apiRef]);

//   useEffect(() => {
//     handleStateChange();
//   }, [handleStateChange, initialRows]);

//   const [paginationModel, setPaginationModel] = useState({
//     pageSize: 10,
//     page: 0
//   });

//   return (
//     <Box
//       sx={{
//         height: height || 'auto',
//         width: '100%',
//         '& .actions': {
//           color: 'text.secondary'
//         },
//         '& .textPrimary': {
//           color: 'text.primary'
//         },
//         '& .bold': {
//           fontWeight: 600
//         }
//       }}
//     >
//       <DataGrid
//         rows={initialRows}
//         columns={columnsWithActions}
//         apiRef={apiRef}
//         ref={componentRef}
//         autoHeight
//         checkboxSelection={checkboxSelection}
//         onRowSelectionModelChange={onRowSelectionModelChange}
//         onRowDoubleClick={onRowDoubleClick}
//         paginationModel={paginationModel}
//         onPaginationModelChange={setPaginationModel}
//         // slots={{ toolbar: EditToolbar }}
//         getRowClassName={(params) =>
//           params.id === 'TOTAL_SUMMARY' ? 'total-summary-row' : ''
//         }
//         sx={{
//           maxHeight: 720,
//           '& .MuiDataGrid-root': {
//             overflow: 'auto'
//           },
//           '--DataGrid-rowBorderColor': 'rgb(255 255 255)',
//           '& .css-1kyxv1r-MuiDataGrid-root': {
//             color: 'white',
//             backgroundColor: '#323232'
//           },
//           '& .MuiDataGrid-container--top [role=row]': {
//             color: 'white',
//             backgroundColor: '#8E48BB'
//           },
//           '& .MuiDataGrid-columnSeparator': {
//             color: 'white'
//           },
//           '& .MuiDataGrid-iconButtonContainer': {
//             color: 'white'
//           },
//           '& .MuiDataGrid-sortIcon': {
//             color: 'white'
//           },
//           '& .css-ptiqhd-MuiSvgIcon-root': { color: 'white' }
//         }}
//       />
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this item?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Disagree</Button>
//           <Button onClick={handleDelete} autoFocus>
//             Agree
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default ReuseableDataGrid;

import * as React from 'react';
import { useCallback, useEffect, useState, useRef } from 'react';

// import ReactToPrint from 'react-to-print';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ButtonGroup, Box, IconButton, Typography } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarQuickFilter,
  GridToolbarExport,
  useGridApiRef
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
// import PrintIcon from '@mui/icons-material/Print';
// import ExcelExport from './ExcelExport';
// import loadingGif from '../assets/images/loading1.svg';
import PerfectScrollbar from 'react-perfect-scrollbar';

// import { useSnackbar } from 'notistack';

import axios from 'axios';
export function EditToolbar() {
  return (
    <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
      <div>
        {' '}
        <GridToolbarColumnsButton />
        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      </div>
      <GridToolbarQuickFilter />

      {/* <ExcelExport data={initialRows} fileName={fileName} /> */}
      {/* <ReactToPrint
        trigger={() => (
          <IconButton aria-label="print">
            <PrintIcon />
          </IconButton>
        )}
        content={() => componentRef.current}
        pageStyle="@page { margin-top: 1in; margin-bottom: 1in; }"
      /> */}
    </GridToolbarContainer>
  );
}
const ReuseableDataGrid = ({
  iColumns,
  initialRows,
  setInitialData,
  deleteApi,
  deleteBy,
  refetch,
  setAccordionExpanded,
  getCellClassName,
  fileName,
  disableEdit,
  disableDelete,
  setIsEdit,
  autoSizeColumns,
  isLoading,
  height,
  checkboxSelection,
  onRowSelectionModelChange,
  hideAction,
  onRowDoubleClick
  // Make sure to pass checkboxSelection
}) => {
  const apiRef = useGridApiRef();
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  // const { enqueueSnackbar } = useSnackbar();
  const componentRef = React.useRef();

  // function EditToolbar() {
  //   return (
  //     <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
  //       <div>
  //         {' '}
  //         <GridToolbarColumnsButton />
  //         <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
  //       </div>
  //       <GridToolbarQuickFilter />

  //       {/* <ExcelExport data={initialRows} fileName={fileName} /> */}
  //       {/* <ReactToPrint
  //         trigger={() => (
  //           <IconButton aria-label="print">
  //             <PrintIcon />
  //           </IconButton>
  //         )}
  //         content={() => componentRef.current}
  //         pageStyle="@page { margin-top: 1in; margin-bottom: 1in; }"
  //       /> */}
  //     </GridToolbarContainer>
  //   );
  // }

  const handleClickOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const handleEdit = (row) => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
    if (row.embroideryIdDet) {
      const additionalArray = row.additional ? row.additional.split(',').map((item) => item.trim()) : [];

      setInitialData({
        ...row,
        additional: additionalArray
      });
    } else {
      if (setAccordionExpanded) {
        setAccordionExpanded(true);
      }
      if (setIsEdit) {
        setIsEdit(true);
      }
      setInitialData(row);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${deleteApi}${deleteId}`);
      // if (!response.data.success) {
      //   enqueueSnackbar(
      //     `${response.data.message} !`,

      //     {
      //       variant: 'error',
      //       autoHideDuration: 5000
      //     }
      //   );
      // }
      // if (response.data.success) {
      //   enqueueSnackbar(
      //     `${response.data.message} !`,

      //     {
      //       variant: 'success',
      //       autoHideDuration: 5000
      //     }
      //   );
      // }
      refetch();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
    handleClose();
  };

  const columns = [
    ...iColumns,
    !hideAction
      ? {
          field: 'Action',
          headerName: 'Actions',
          renderCell: (params) => (
            <div style={{ display: 'flex' }}>
              <ButtonGroup size="small" variant="text">
                {/* {!disableEdit && ( */}
                <IconButton aria-label="Edit" onClick={() => handleEdit(params.row)} disabled={disableEdit}>
                  <EditIcon />
                </IconButton>
                {/* )} */}
                {/* {!disableDelete && ( */}
                <IconButton
                  aria-label="delete"
                  // color="#8E48BB"
                  onClick={() => handleClickOpen(params.row[deleteBy])}
                  disabled={disableDelete}
                >
                  <DeleteIcon />
                </IconButton>
                {/* )} */}
              </ButtonGroup>
            </div>
          )
        }
      : null
  ].filter(Boolean);

  // const handleStateChange = (params) => {
  //   if (apiRef.current && apiRef.current.autosizeColumns) {
  //     apiRef.current.autosizeColumns({
  //       // columns: autoSizeColumns,
  //       includeOutliers: true,
  //       includeHeaders: true
  //     });
  //   }
  // };

  // const handleStateChange = useCallback(() => {
  //   if (apiRef.current && apiRef.current.autosizeColumns) {
  //     apiRef.current.autosizeColumns({
  //       includeOutliers: true,
  //       includeHeaders: true
  //     });
  //   }
  // }, [apiRef]);

  // useEffect(() => {
  //   handleStateChange();
  // }, [handleStateChange, initialRows]);

  const getRowStyle = (params) => {
    if (params.id === 'TOTAL_SUMMARY') {
      return {
        backgroundColor: 'darkgray'
      };
    }
    return {};
  };
  // const [paginationModel, setPaginationModel] = React.useState({
  //   pageSize: 10,
  //   page: 0
  // });
  return (
    // <Box
    //   sx={{
    //     height: height ? height : 'auto',
    //     // maxHeight: 500,
    //     // overflow: 'auto',
    //     width: 'inherit',
    //     '& .actions': {
    //       color: 'text.secondary'
    //     },
    //     '& .textPrimary': {
    //       color: 'text.primary'
    //     },
    //     '& .bold': {
    //       fontWeight: 600
    //     }
    //   }}
    // >
    // <PerfectScrollbar
    //   options={{ wheelPropagation: false }}
    //   style={{ maxHeight: 700, overflowY: 'auto' }} // Set a fixed height and enable vertical scroll
    // >
    <div style={{ width: '100%' }}>
      <div style={{ height: 700, width: '100%' }}>
        {/* <DataGrid {...data} /> */}
        <DataGrid
          rows={initialRows}
          columns={columns}
          // rowLength={10}
          apiRef={apiRef}
          ref={componentRef}
          autosizeOnMount
          checkboxSelection={checkboxSelection}
          getCellClassName={getCellClassName}
          onRowSelectionModelChange={onRowSelectionModelChange}
          // onStateChange={handleStateChange}
          // autoHeight
          // paginationModel={paginationModel}
          // onPaginationModelChange={setPaginationModel}
          slots={{ toolbar: EditToolbar }}
          sx={{
            // maxHeight: 720,
            // height: 720,
            // // overflow: 'auto', // Ensure scrolling is not affected by styles
            // '& .MuiDataGrid-root': {
            //   overflow: 'auto'
            // },

            /////////////////
            '--DataGrid-rowBorderColor': 'rgb(255 255 255)',
            '& .css-1kyxv1r-MuiDataGrid-root': {
              color: 'white',
              backgroundColor: '#323232'
            },
            '& .MuiDataGrid-container--top [role=row]': {
              color: 'white',
              // backgroundColor: '#8E48BB'
              backgroundColor: (theme) => theme.palette.primary.dark
            },
            '& .MuiDataGrid-columnSeparator': {
              color: 'white'
            },
            '& .MuiDataGrid-iconButtonContainer': {
              color: 'white'
            },
            '& .MuiDataGrid-sortIcon': {
              color: 'white'
            },
            '& .css-ptiqhd-MuiSvgIcon-root ': { color: 'white' },
            '& .MuiDataGrid-row': {
              '&.total-summary-row': {
                backgroundColor: 'darkgray'
              }
            }
          }}
          getRowClassName={(params) => (params.id === 'TOTAL_SUMMARY' ? 'total-summary-row' : '')}
        />
        {/* </div> */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{'Confirm Delete'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Are you sure you want to delete this item?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleDelete} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
    // </PerfectScrollbar>
    // </Box>
  );
};

export default ReuseableDataGrid;
