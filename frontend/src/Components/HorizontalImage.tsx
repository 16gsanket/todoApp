import { ImageList, ImageListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SxProps } from "@mui/system";

interface boxProps {
 
  image: string;
  title: string;
  subtitle: string;
  bg_color:string
}

function HorizontalImage({
  bg_color,
  image,
  title,
  subtitle,
}: boxProps): JSX.Element {
  return (
    <Box
      sx={{

        height: "100px",
        width: "200px",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        bgcolor:bg_color
      }}
    >
      <ImageList sx={{ height: "full", width: "40%" }}>
        <ImageListItem>
          <img src={image} alt="" />
        </ImageListItem>
      </ImageList>
      <Box sx={{ height: "full", width: "65%" , display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
        <Typography variant="h5" color="initial" align="center">
          {title}
        </Typography>
        <Typography variant="h6" color="initial" align="center">
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

export default HorizontalImage;
