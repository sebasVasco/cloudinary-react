import { useState, useEffect } from "react";
import { Typography, Grid } from "@material-ui/core";
import { Image } from "cloudinary-react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 300,
  },
}));

const Home = () => {
  const [imageIds, setimageIds] = useState();

  const classes = useStyles();

  useEffect(() => {
    const loadImages = async () => {
      try {
        const res = await fetch("/api/images");
        const data = await res.json();
        console.log(data);
        setimageIds(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadImages();
  }, []);
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Home
      </Typography>

      {imageIds && imageIds.map((imageId, index) => <Image key={index} cloudName="dmv4ug7sg" publicId={imageId} width="300" crop="scale" />)}
    </div>
  );
};

export default Home;
