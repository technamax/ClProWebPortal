import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardHeader, Grid, TextField, MenuItem, Divider, Chip } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { useGetCategoryQuery, useGetSbuCategoryQuery, useGetProductsBySubCategoryQuery } from 'redux/apis/specificationApi';
import ReuseableDataGrid from 'components/ReuseableDataGrid';
import { margin } from '@mui/system';
import axios from 'axios';

const InventoryItems = () => {
  const [formData, setFormData] = useState({
    startDate: new Date(),
    endDate: new Date(),
    categoryID: '',
    subCategoryId: '',
    product: '',
    quantity: '',
    price: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'categoryID') {
      setRows([]);
      setBarCodes(null);
      setStock(null);
    }
  };
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [rows, setRows] = useState([]);
  const [barCodes, setBarCodes] = useState(null);
  const [stock, setStock] = useState(null);
  const [products, setProducts] = useState(null);
  const initialRows = rows.map((itemB) => {
    // Find the matching item in stock by itemCode
    const matchingItem = stock?.find((itemA) => itemA.ItemCode === itemB.itemCode.toString());

    return {
      ...itemB, // Include all fields from rows
      CurrentStock: matchingItem ? matchingItem.CurrentStock : 0 // Add CurrentStock, default to 0 if not found
    };
  });

  console.log('initialRows', initialRows);
  const { data: category, error, isLoading } = useGetCategoryQuery();
  const { data: subCategory, refetch: refetchSubCategory } = useGetSbuCategoryQuery(formData.categoryID, {
    skip: !formData.categoryID
  });
  const { data: product, refetch: refetchProduct } = useGetProductsBySubCategoryQuery(formData.subCategoryId, {
    skip: !formData.subCategoryId
  });
  console.log('category', category);
  console.log('subCategory', subCategory);
  console.log('product', product);
  console.log('barCodes', barCodes);
  console.log('stock', stock);
  // console.log('barCodes', typeof barCodes);

  useEffect(() => {
    if (category) {
      setCategories(
        category.result.map((row, index) => ({
          id: index,
          ...row
        }))
      );
    }
  }, [category]);
  useEffect(() => {
    if (subCategory) {
      setSubCategories(
        subCategory.result.map((row, index) => ({
          id: index,
          ...row
        }))
      );
    }
  }, [subCategory, refetchSubCategory]);
  useEffect(() => {
    if (product) {
      setRows(
        product.result.map((row, index) => ({
          id: index + 1,
          ...row,
          minStockQty: row.minStockQty + 50 // for testing purposes
        }))
      );
      setBarCodes(product.result.map((row) => row.itemCode).toString());
    }
  }, [product, refetchProduct]);
  useEffect(() => {
    if (barCodes) {
      const fetchInventoryData = async () => {
        try {
          const response = await axios.post('https://as.hsad.com.pk/api/AmeerSons/InventoryData', {
            jwtToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBcGlVc2VyIiwianRpIjoiNDg5NGM3NzAtOGFjNi00Nzc2LWJjZTUtMjk4ZmM4MWYyNzkzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJBcGlVc2VyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlN1cGVyQWRtaW4iLCJBZG1pbiJdLCJleHAiOjE3MzQ3MTc2NjAsImlzcyI6Imh0dHA6Ly9hcy5oc2FkLmNvbS5wayIsImF1ZCI6IlNlY3VyZUFwaVVzZXIifQ.z5SHG_83X2Y_kSRkKubjVQILlKiAjRMNJ7IvUwvHQnM',
            ItemCode: barCodes // Convert barCodes array to a comma-separated string
          });

          console.log('API Response:', response.data);
          setStock(response.data);
        } catch (error) {
          console.error('API Error:', error);
        }
      };

      fetchInventoryData();
    }
  }, [barCodes]);
  const uniqueColors = [...new Set(initialRows?.map((item) => item.color))];
  const colorMapping = {
    'BRILLIANT BROWN': '#A52A2A',
    'GROOVY GREEN': '#32CD32',
    'BABY AQUA': '#00FFFF',
    'MISTY GREY': '#D3D3D3',
    'WARM HAZEL': '#8B4513',
    'PERKY BROWN': '#654321',
    'GLITTERING BLUE': '#1E90FF',
    'SHIMMERING GREY': '#778899',
    'SHIMMERING GREY ': '#778899',
    None: '#BEBEBE' // Neutral color for "None"
  };
  console.log('uniqueColors', uniqueColors);
  const columns = [
    { field: 'id', headerName: 'Sr.', flex: 0.1 },
    { field: 'itemCode', headerName: 'Barcode', flex: 0.4 },
    { field: 'productName', headerName: 'Product', flex: 1.3 },
    { field: 'category', headerName: 'Category', flex: 1 },
    {
      field: 'color',
      headerName: 'Color',
      // align: 'center',
      flex: 0.8,
      renderCell: (params) => (
        <Chip
          label={params.value}
          style={{
            backgroundColor: colorMapping[params.value] || '#000',
            color: '#fff'
          }}
        />
      )
    },
    // { field: 'color', headerName: 'Color', align: 'center', flex: 1 },
    {
      field: 'CurrentStock',
      headerName: 'Stock Remaining',
      flex: 0.4,
      renderCell: (params) => {
        const currentStock = params.value;
        const minStockQty = params.row.minStockQty;

        return (
          <span
            style={{
              color: currentStock === 0 ? 'red' : currentStock < minStockQty ? '#ed790d' : '#32CD32', // Red if less, Green if greater
              fontWeight: 'bold'
            }}
          >
            {currentStock}
          </span>
        );
      }
    },
    { field: 'minStockQty', headerName: 'Stock Limit', flex: 0.4 },
    { field: 'salePrice', headerName: 'Price', flex: 0.4 }
  ];

  return (
    <>
      <MainCard title="Products">
        <Grid container spacing={1} width="Inherit" sx={{ paddingY: 2, paddingX: 0 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              select
              label="Category"
              name="categoryID"
              value={formData.categoryID}
              onChange={handleChange}
              // size="small"
              // error={!!formErrors.brandId}
              // helperText={formErrors.brandId}
            >
              {categories.map((option) => (
                <MenuItem key={option.categoryID} value={option.categoryID}>
                  {option.categoryName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              select
              label="SubCategory"
              name="subCategoryId"
              value={formData.subCategoryId}
              onChange={handleChange}
              // size="small"
              // error={!!formErrors.brandId}
              // helperText={formErrors.brandId}
            >
              {subCategories.map((option) => (
                <MenuItem key={option.subcategoryID} value={option.subcategoryID}>
                  {option.subcategoryName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={12}>
            <Divider color="#137a91" sx={{ height: 2, width: '100%', marginY: 2 }} />
          </Grid>
          <Grid item xs={12}>
            {/* <SubCard title="View Users"> */}
            <ReuseableDataGrid iColumns={columns} initialRows={initialRows} hideAction />
            {/* </SubCard> */}
          </Grid>
        </Grid>

        {/* <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
        minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
        reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui
        officiate descent molls anim id est labours.
      </Typography> */}
      </MainCard>
      {/* <MainCard
        title="Products"
        sx={{
          marginTop: '10px'
        }}
      >
        <Grid
          container
          spacing={2}
          width="Inherit"
          // sx={{ paddingY: 2, paddingX: 2 }}
        >
          <Grid item xs={12}>
            <ReuseableDataGrid initialRows={rows} iColumns={columns} hideAction />
          </Grid>
        </Grid>
      </MainCard> */}
    </>
  );
};

export default InventoryItems;
