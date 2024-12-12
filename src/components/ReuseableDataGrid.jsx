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
import 'react-perfect-scrollbar/dist/css/styles.css';

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
  const minHeight = 200;
  const maxHeight = 600;
  // const [paginationModel, setPaginationModel] = React.useState({
  //   pageSize: 10,
  //   page: 0
  // });
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {/* <PerfectScrollbar style={{ maxHeight: maxHeight, minHeight: minHeight }}> */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', maxHeight, minHeight }}>
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
      {/* </PerfectScrollbar> */}
    </div>
  );
};

export default ReuseableDataGrid;
