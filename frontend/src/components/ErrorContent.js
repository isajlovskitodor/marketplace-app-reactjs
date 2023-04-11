import { Box, Typography } from "@mui/material";

const ErrorContent = ({ title, children }) => {
  return (
    <Box textAlign={"center"}>
      <Typography sx={{marginTop: "150px"}} variant={"h4"}>{title}</Typography>
      {children}
    </Box>
  );
};

export default ErrorContent;
