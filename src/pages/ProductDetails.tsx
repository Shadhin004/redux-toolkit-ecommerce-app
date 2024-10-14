import { useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '../features/productApi'
import { Chip, Container, Grid, Stack, Typography } from '@mui/material'

const ProductDetails = () => {
    const { id } = useParams()
    const { data, isLoading, error } = useGetProductByIdQuery(Number(id))
    console.log('product data: ', data)
    return (
        <Container>
            <Grid container spacing={3}>
                {/* <ProductCard product={data} /> */}
                <Grid item xs={6}>
                    <img src={data?.images[0]} height={340} />
                    <Stack direction={'row'} spacing={2}>
                        {
                            data && data.images?.length > 1 && data?.images.map(img => {
                                return (
                                    <img src={img} height={70} />
                                )
                            })
                        }
                    </Stack>
                </Grid>
                <Grid item xs={6} display={'flex'}>
                    <Stack justifyContent={'space-evenly'}>
                        <Typography variant='h4'>{data?.title}</Typography>
                        <Typography component={'p'}>{data?.description}</Typography>
                        <Typography component={'p'}>SKU : {data?.sku}</Typography>
                        <Typography component={'p'}>Price : {data?.price}</Typography>
                        <Typography component={'p'}> Rating : {data?.description}</Typography>
                        <Typography component={'p'}>Return policy : {data?.returnPolicy}</Typography>
                        <Typography component={'p'}>Minimum order : {data?.minimumOrderQuantity}</Typography>
                        <Typography component={'p'}>Estimated shipment : {data?.shippingInformation}</Typography>
                        <Stack direction={'row'}>
                            {
                                data?.tags && data.tags.map(item => {
                                    return (
                                        <Chip label={item} sx={{ marginRight: '10px' }} />
                                    )
                                })
                            }
                        </Stack>
                        <Stack direction={'row'}>
                            <span style={{ marginRight: '10px' }}>Category : <b>{data?.category} </b> </span>
                            <span>Brand : <b>{data?.brand} </b> </span>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ProductDetails