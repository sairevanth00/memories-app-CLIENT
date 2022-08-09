import React from "react";
import { Grid, CircularProgress, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();
  console.log("filtered Posts", posts)
  
  const notFoundContainer = () => (
    <div className={classes.notFoundContainer}>
    <img src="https://res.cloudinary.com/saivarma/image/upload/v1659985797/nojobsfound-removebg-preview_ajbmlt.png" className={ classes.img} />
  </div>
  )
  
  if (!posts?.length && !isLoading) {
    setTimeout(notFoundContainer(), 2000)
  }

  return isLoading ? (
    <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size="7em" />
    </Paper>
    // <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
