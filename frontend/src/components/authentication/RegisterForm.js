import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Form, useNavigation } from "react-router-dom";


const RegisterForm = () => {
  const navigationData = useNavigation();
  const isSubmitting = navigationData.state === "submitting";

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Typography gutterBottom variant="h4" align="center">
        Sign up
      </Typography>
      <Card
        sx={{ maxWidth: 450, margin: "0 auto" }}
        component={Form}
        method="post"
      >
        <CardContent>
          <Grid container rowGap={3} spacing={1}>
            <Grid xs={12} item>
              <TextField
                type="email"
                label="Email"
                name="email"
                variant="outlined"
                placeholder="Enter email"
                fullWidth
                required
              />
            </Grid>
            <Grid xs={12} item>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  placeholder="Enter password"
                  name="password"
                  required
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
            <Grid xs={12} item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth
              >
                Sign up
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
export default RegisterForm;
