import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { getAuthToken } from "../../util/auth";

const NewComment = ({ product }) => {
  const [comment, setComment] = useState("");
  const token = getAuthToken();
  const navigate = useNavigate();

  const onChangeCommentHandler = (event) => {
    setComment(event.target.value);
  };

  const newComment = {
    email: localStorage.getItem("email"),
    text: comment,
  };

  const submitComment = () => {
    fetch("http://localhost:8080/products/" + product.id + "/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newComment),
    }).then((response) => {
      if (response.status === 422) {
        return response;
      }
      if (!response.ok) {
        throw json({ message: "Could not save comment." }, { status: 500 });
      }
      setComment("");
      navigate();
    });
  };

  return (
    <Box sx={{padding: "2rem"}}>
      <Typography variant="h6">Leave a comment:</Typography>
      <TextField
        id="comment"
        name="comment"
        multiline
        rows={2}
        required
        type="text"
        variant="outlined"
        fullWidth
        value={comment}
        onChange={onChangeCommentHandler}
      />
      <Button sx={{marginTop: "0.5rem"}} onClick={submitComment} variant="contained">
        Comment
      </Button>
    </Box>
  );
};

export default NewComment;
