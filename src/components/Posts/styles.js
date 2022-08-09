import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    alignItems: "center",
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
  notFoundContainer: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    color: "red",
    fontFamily: "Helvetica Ne serif",
  },
  img :{
  width: "65%",
  height: "50%",
  }
}));
