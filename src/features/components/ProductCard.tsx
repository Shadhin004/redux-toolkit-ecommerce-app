import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDeleteProductsMutation } from "../productApi"
import { Product } from "../../types"
import { Snackbar, Alert } from "@mui/material"
import { AlertPropsColorOverrides, AlertColor } from "@mui/material"

const ProductCard = ({ product }: { product: Product }): JSX.Element => {
  const [seeMore, setSeeMore] = useState(false)
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: '',
    type: 'success'
  })

  const navigate = useNavigate()

  const [deleteProduct] = useDeleteProductsMutation()

  const handleDelete = async () => {
    const res: any = await deleteProduct(product.id)
    if (res.data && res.data.isDeleted) {
      setAlertInfo({
        open: true,
        message: 'Product has been deleted successfully',
        type: 'success'
      })
    } else {
      setAlertInfo({
        open: true,
        message: 'Something went wrong!',
        type: 'success'
      })
    }
  }
  return (
    <Card>
      <CardMedia
        sx={{ height: 140 }}
        image={product?.images[0]}
        title={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component={"div"}>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {seeMore ? product.description : product.description.substring(0, 100)} <span onClick={() => setSeeMore(!seeMore)} style={{ color: 'blue', cursor: 'pointer' }}>...see {seeMore ? 'less' : 'more'}</span>
        </Typography>
        <p>Rating : {product.rating}</p>
        <p>Price : {product.price}</p>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={() => handleDelete()}>Delete</Button>
        <Button size="small" variant="outlined" onClick={() => navigate(`/products/${product.id}`)}>See details</Button>
      </CardActions>
      <Snackbar
        open={alertInfo.open}
        autoHideDuration={6000}
      >
        <Alert
          onClose={()=> setAlertInfo({...alertInfo, open : false})}
          severity={alertInfo.type as any}
          variant="filled"
          sx={{ width: '100%' }}
        >{alertInfo.message}</Alert>
      </Snackbar>
    </Card>
  )
}

export default ProductCard