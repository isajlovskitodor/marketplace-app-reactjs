import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Button,
  CardActions,
} from "@mui/material";
import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import NewComment from "./NewComment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CommentIcon from "@mui/icons-material/Comment";
import { Stack } from "@mui/system";

const ProductItemDetails = ({ product }) => {
  const submit = useSubmit();
  const reverseComments = product.comments.length > 0 && [...product.comments].reverse();
  const userEmail = localStorage.getItem("email");
  const token = useRouteLoaderData("root");

  const startDeleteHandler = () => {
    const proceed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (proceed) {
      submit(null, { method: "delete" });
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: "500px", marginLeft: "2rem" }}>
        <CardMedia
          component="img"
          height="250"
          image={product.image}
          alt={product.title}
        />
        <CardContent>
          <Typography
            fontWeight={"bold"}
            textAlign={"center"}
            marginY={1}
            variant="h5"
            component="div"
          >
            {product.title}
          </Typography>
          <Typography marginY={1} variant="body1" component="div">
            <Typography variant="span" fontWeight={"bold"} display={"inline"}>
              Date:
            </Typography>{" "}
            {product.date}
          </Typography>
          <Box marginY={1} sx={{ display: "inline-flex", columnGap: "2rem" }}>
            <Typography variant="body1">
              <Typography variant="span" fontWeight={"bold"} display={"inline"}>
                Price:
              </Typography>{" "}
              {product.cost}$
            </Typography>
            <Box sx={{ display: "inline-flex" }}>
              <Typography fontWeight={"bold"} component="legend">
                Rating:
              </Typography>
              <Rating
                name="read-only"
                value={parseInt(product.rating)}
                readOnly
              />
            </Box>
          </Box>
          <Typography marginY={1} variant="body1" component="div">
            <Typography variant="span" fontWeight={"bold"} display={"inline"}>
              Description:
            </Typography>{" "}
            {product.description}
          </Typography>
        </CardContent>
        {token && <CardActions>
          <Button component={Link} to={"edit"} size="small">
            Edit
          </Button>
          <Button onClick={startDeleteHandler} color="error" size="small">
            Delete
          </Button>
        </CardActions>}
      </Card>

      {token && <NewComment product={product} />}

      <Box sx={{ padding: "2rem" }}>
        <Typography variant="h6">{reverseComments ? "Comments:" : "No comments"}</Typography>
        <Stack gap={"1rem"}> 
          {reverseComments && (
            reverseComments.map((comment, index) => {
              return (
                <Card variant="outlined" key={index}>
                  <CardContent>
                    <Box
                      marginBottom={"1rem"}
                      display={"flex"}
                    >
                      <AccountCircleIcon
                        color="primary"
                        sx={{ marginRight: "0.5rem" }}
                      />{" "}
                      <Typography>{comment.email}</Typography>
                    </Box>
                    <Box display={"flex"}>
                      <CommentIcon
                        color="primary"
                        sx={{ marginRight: "0.5rem" }}
                      />
                      <Typography sx={{width:"100%", overflowWrap: "break-word", overflow:"hidden"}}>{comment.text}</Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{display:"flex", justifyContent: "end"}}>
                    {comment.email === userEmail && <Button color="error" size="small" variant="outlined">Delete comment</Button>}
                  </CardActions>
                </Card>
              );
            })
          )}
        </Stack>
      </Box>
    </>
  );
};

export default ProductItemDetails;
