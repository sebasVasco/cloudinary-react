import { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Upload = () => {
  const [fileInputState, setfileInputState] = useState("");
  const [selectedFile, setselectedFile] = useState("");
  const [previewSource, setpreviewSource] = useState();
  const [uploaded, setUploaded] = useState(false);

  const classes = useStyles();

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setpreviewSource(reader.result);
    };
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setselectedFile();
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);

    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "content-type": "application/json" },
      });
      setUploaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) {
      return;
    }
    uploadImage(previewSource);
  };
  return (
    <div>
      <Typography variant="h4" align="center">
        Upload
      </Typography>
      <form className={classes.main} onSubmit={handleSubmitFile}>
        <div>
          <input accept="image/*" style={{ display: "none" }} id="raised-button-file" name="image" type="file" onChange={handleFileInputChange} value={fileInputState} />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
        </div>

        <Button variant="contained" color="primary" type="submit">
          submit
        </Button>
      </form>
      <div className={classes.main}>{previewSource && <img src={previewSource} alt="chosen" style={{ height: "300px" }} />}</div>
      <div>{uploaded && <Typography variant="h5">Uploaded check gallery</Typography>}</div>
    </div>
  );
};

export default Upload;
