import { Box } from '@mui/material'

function Loader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <center>
        <img src='/Spinner-1.gif' width={'100%'} height={'auto'} />
      </center>
    </Box>
  )
}

export default Loader