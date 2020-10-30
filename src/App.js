import { Container, AppBar, Toolbar, Link, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Link as RouterLink, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Home from "./pages/Home";
import Upload from "./pages/Upload";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  links: {
    marginRight: theme.spacing(2),
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <div>
      <Router>
        <AppBar elevation={0} position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Cloudinary react
            </Typography>
            <Link component={RouterLink} to="/" underline="none" color="inherit" className={classes.links}>
              Gallery
            </Link>
            <Link component={RouterLink} to="/upload" underline="none" color="inherit">
              Upload
            </Link>
          </Toolbar>
        </AppBar>
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/upload" component={Upload} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
