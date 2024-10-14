import { Box, Grid, TextField, Stack, Typography, FormControl, InputLabel, Select, MenuItem, Snackbar, Pagination } from '@mui/material';
import { Product } from '../types';
import ProductCard from '../features/components/ProductCard';
import Loader from '../features/components/Loader';
import { useEffect, useState } from 'react';
import { useSearchProductsQuery } from '../features/productApi';

const HomePage = () => {
  const [params, setParams] = useState({
    name: '',
    sortBy: '',
    limit: 10,
    skip: '' 
  })

  const { data, isLoading, isError, error } = useSearchProductsQuery(params)

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const [errMessage, setErrMessage] = useState('')

  if (error) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
      setErrMessage(errMsg)
    }
  }

  useEffect(()=>{
    if(data && data.total){
      const {total} = data

      let totalPage = Math.ceil(total / params.limit)
      let skipNumber = (page-1) * params.limit;

      setTotalPage(totalPage)
      setParams({...params, skip : String(skipNumber)})
    }
  },[data, page])

    return (
      <Box sx={{ padding: '20px' }}>
        <Stack direction={'row'} spacing={2}>
          <TextField
            sx={{ width: '70%' }}
            variant="outlined"
            placeholder='Search...'
            onChange={(e) => setParams({ ...params, name: e.target.value })}
            fullWidth
          />
          <FormControl sx={{ width: '30%' }}>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={params.sortBy}
              label="Sort Products"
              onChange={(e) => setParams({ ...params, sortBy: e.target.value })}
            >
              <MenuItem value={'price'}>Price</MenuItem>
              <MenuItem value={'rating'}>Rating</MenuItem>
              <MenuItem value={'title'}>Title</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Typography variant='h2' sx={{ textAlign: 'center' }}>Products</Typography>
        <Grid container spacing={2}>
          {
            isLoading ?
              <Loader />
              :
              data && data.products.map((item: Product) => {
                return (
                  <Grid xs={3} key={item.id} item>
                    <ProductCard product={item} key={item.id} />
                  </Grid>
                )
              })
          }
        </Grid>
        <Snackbar
          open={isError}
          autoHideDuration={6000}
          message={errMessage}
        />
        <Pagination
        count={totalPage}
        page={page}
        onChange={handleChange}
        />
      </Box>
    )
  }

  export default HomePage
