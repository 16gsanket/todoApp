import { ImageList, ImageListItem, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { SxProps } from "@mui/system"

interface boxProps{
  sx:SxProps,
  image:string,
  title:string,
  subtitle:string
}

function VerticalBoxImage({sx , image, title , subtitle}  : boxProps):JSX.Element {
  return (
    <Box sx={{...sx ,height:"200px", width:"200px", bgcolor:"background.lavender", borderRadius:"10px", overflow:"hidden"}}>
      <ImageList sx={{height:"60%"}}>
        <ImageListItem>
          <img src={image} alt=""/>
        </ImageListItem>
      </ImageList>
<Box sx={{height:"40%"}}>

      <Typography variant="h5" color="initial" align="center">{title}</Typography>
      <Typography variant="h6" color="initial" align="center">{subtitle}</Typography>
</Box>

    </Box>
  )
}

export default VerticalBoxImage