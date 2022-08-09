import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
  },
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "350px",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: 'wrap',
    marginBottom: '8px',
    // padding: "0px 12px 0px 12px",
  },
  title: {
    // padding: "12px",
    position: "absolute",
    flexWrap: "wrap",
  },
  cardActions: {
    cursor: "pointer",
    // padding: "12px",
    display: "flex",
    justifyContent: "space-between",
    position: "",
  },
  titTags: {
    display: "flex",
    flexDirection: "column",
    padding: "5px 12px 12px 12px",
  },
  modal_content: {
    // height: "40%",
    // width: "40%",
  },
  closeBtnCon: {
    display: 'flex',
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  trigger_button: {
    padding: "2px",
    paddingBottom:" 0px",
    marginBottom: "4px",
    border:" 0px",
    backgroundColor: "#eeeaead2",
    cursor: "pointer",
  },
  popupBtnCon: {
    display: 'flex', 
    justifyContent: "end",
  },
  popupTxt: {
    fontFamily: "Roboto",
    textAlign: "center",
  },
  popupMainCon: {
    height: "100%",
    width: "40%",
  }
});
