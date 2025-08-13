import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  useCommentStore,
  useLikeStore,
  useModalStore,
  usePostStore,
} from "../store";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextareaAutosize,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 768,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const CUSTOMER_ID = 1;
const CUSTOMER_FULL_NAME = "Mary Smith";
export default function FilmPostModal() {
  const { currentPost, empty } = usePostStore();
  const { isOpen, closeModal } = useModalStore();
  const { count, isLiked, like, unlike, getIsLiked, getCount } = useLikeStore();
  const { comments, getComments, createComment } = useCommentStore();
  const { post_id } = currentPost;
  const [comment, setComment] = useState("");

  const handleClose = () => {
    empty();
    closeModal();
  };
  const handleLike = () => {
    isLiked ? unlike(post_id, CUSTOMER_ID) : like(post_id, CUSTOMER_ID);
  };

  //   const handleSubmitComment = (comment) => {
  //     createComment(post_id, CUSTOMER_ID, comment);
  //     getComments(post_id, 10, 1);
  //   };
  const handleSubmitComment = async (comment) => {
    if (!comment.trim()) return; // 빈 댓글 예외처ㅣㄹ

    try {
      await createComment(post_id, CUSTOMER_ID, comment);
      await getComments(post_id, 10, 1);
      setComment("");
      toast.success("댓글 등록이 완료되었습니다.");
    } catch (err) {
      console.error(err);
      toast.success("댓글 등록을 실패했습니다.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axios.delete(
        `http://localhost:8090/film/post/comment/${commentId}`
      );
      await getComments(post_id, 10, 1);
      toast.success("댓글 삭제가 완료되었습니다.");
    } catch (err) {
      console.error(err);
      toast.success("댓글 삭제를 실패했습니다.");
    }
  };

  const handleUpdateComment = async (commentId, newContent) => {
    if (!newContent.trim()) return;
    try {
      await axios.put(`http://localhost:8090/film/post/comment/${commentId}`, {
        content: newContent,
      });
      await getComments(post_id, 10, 1);
      toast.success("댓글 수정이 완료되었습니다");
    } catch (err) {
      console.error(err);
      toast.error("댓글 수정을 실패했습니다.");
    }
  };

  useEffect(() => {
    if (post_id !== 0) {
      getComments(post_id, 10, 1);
      getIsLiked(post_id, CUSTOMER_ID);
      getCount(post_id);
    }
  }, [post_id, getIsLiked, getCount, getComments]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Card sx={style}>
            <CardMedia
              component="img"
              height="500"
              image={`/posters/${currentPost?.post_id}.jpg`}
              alt={currentPost.content}
            />
            <CardContent
              sx={{
                mt: 2,
              }}
            >
              <Box display={"flex"} alignItems={"center"}>
                <Typography variant="h4" component="h2">
                  {currentPost?.film.title}
                </Typography>
                <IconButton aria-label="like your post" onClick={handleLike}>
                  <FavoriteIcon
                    htmlColor={isLiked ? "red" : "grey"}
                  ></FavoriteIcon>
                </IconButton>
                <Typography>{count}</Typography>
              </Box>
              <Typography sx={{ mt: 2 }}>{currentPost?.content}</Typography>
            </CardContent>

            <CardContent
              style={{
                mt: 4,
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  justifyContent: "center",
                  px: 2,
                }}
              >
                <label htmlFor="">{CUSTOMER_FULL_NAME}</label>
              </Box>
              <TextareaAutosize
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                minRows={3}
                style={{
                  flex: "1 0 0",
                  width: "100%",
                }}
              ></TextareaAutosize>
              <Button onClick={() => handleSubmitComment(comment)}>Send</Button>
            </CardContent>
            {/* TODO: Show more than 10 comments */}
            <CardContent
              sx={{
                overflow: "scroll",
                height: "20rem",
              }}
            >
              {comments.map((e) => (
                <Comment
                  key={e.comment_id}
                  comment={e}
                  onDelete={handleDeleteComment} // 삭제
                  onUpdate={handleUpdateComment} // 수정
                ></Comment>
              ))}
            </CardContent>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
}
