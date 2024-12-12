import { useState } from 'react';
import { Box, Typography, Card, CardHeader } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import { useGetCategoryQuery, useGetSbuCategoryQuery, useGetProductsBySubCategoryQuery } from 'redux/apis/specificationApi';

const InventoryItems = () => {
  const [formData, setFormData] = useState({
    startDate: new Date(),
    endDate: new Date(),
    categoryID: 1,
    subCategoryId: 1,
    product: '',
    quantity: '',
    price: ''
  });
  const { data: Category, error, isLoading } = useGetCategoryQuery();
  const { data: subCategory } = useGetSbuCategoryQuery(formData.categoryID);
  const { data: product } = useGetProductsBySubCategoryQuery(formData.subCategoryId);
  console.log('Category', Category);
  console.log('subCategory', subCategory);
  console.log('product', product);

  return (
    <MainCard title="Products">
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
        minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
        reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui
        officiate descent molls anim id est labours.
      </Typography>
    </MainCard>
  );
};

export default InventoryItems;
