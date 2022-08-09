import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
// import InfoIcon from "@material-ui/icons/Info";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {RiCloseLine} from 'react-icons/ri'

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);
  const user = JSON.parse(localStorage.getItem("profile"));

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = likes?.find((like) => like === userId);

  const handleLikesBtn = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };
  const handleDeletePostPopup = (post) => {
    <Popup trigger={<button> Trigger</button>} position="right center">
    <div>Popup content here !!</div>
  </Popup>
  }

  const Likes = () => {
    if (likes?.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes?.length > 2
            ? `You and ${likes?.length - 1}+`
            : `${likes?.length} like${likes?.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpOutlinedIcon fontSize="small" />
          &nbsp;{likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpOutlinedIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => navigate(`/posts/${post._id}`);
  return (
    <Card className={classes.card} raised elevation={6}>
      <div className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
          component="div"
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
      </div>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
        )}
      <div onClick={openPost} style={{cursor: "pointer"}} className={classes.titTags}>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" wrap="true">
            {post.tags[0].split(',').map((tag) => `#${tag}, `)}
          </Typography>
        </div>
        <div>
          <Typography className={classes.title} variant="h5" gutterBottom>
            {post.title}
          </Typography>
        </div>
        {/* <CardContent className={classes.cardContent}>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent> */}
      </div>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLikesBtn}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Popup modal className={classes.popupMainCon} trigger={
                  <Button
                    size="small"
                    color="secondary"
                  >
                    <DeleteIcon fontSize="small" />
                    &nbsp;Delete
                  </Button>
                }
              >
                {close => (
              <div className={classes.modal_content}>
                <span className={classes.closeBtnCon}>
                      <button
                        type="button"
                        className={classes.trigger_button}
                        onClick={() => close()}
                      >
                        <RiCloseLine />
                      </button>
                    </span>
                    <h3 className={classes.popupTxt}>
                      Are you sure you want to delete the post!
                    </h3>
                   <div className={classes.popupBtnCon}>
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={() => close()}
                      >
                        &nbsp;Cancel
                      </Button>
                    &nbsp; &nbsp; 
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => dispatch(deletePost(post._id))}
                      >
                        &nbsp;Yes
                      </Button>
                    </div>
                  </div>
                )}
          </Popup>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
