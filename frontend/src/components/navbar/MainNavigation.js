import { useContext } from "react";
import { NavLink, Form, useLoaderData } from "react-router-dom";
import CartContext from "../../context/cart-context";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import StoreIcon from "@mui/icons-material/Store";
import CartModal from "./CartModal";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@emotion/react";
import ColorModeContext from "../../context/color-theme-context";

const settings = ["Profile", "Account", "Dashboard"];

function MainNavigation() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const token = useLoaderData();
  const cartContext = useContext(CartContext);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const colorModeIcon = (
    <IconButton
      sx={{ ml: 1 }}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StoreIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            component={NavLink}
            to={"/"}
            variant="h6"
            noWrap
            sx={{
              mr: 5,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MyStore
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                marginTop: 1
              }}
            >
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{
                  my: { xs: 0, md: 2 },
                  display: "block",
                }}
                component={NavLink}
                to={"/"}
              >
                Home
              </MenuItem>

              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{
                  my: { xs: 0, md: 2 },
                  display: "block",
                }}
                component={NavLink}
                to={"/products"}
              >
                Products
              </MenuItem>

              {!token && (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: { xs: 0, md: 2 },
                    display: "block",
                  }}
                  component={NavLink}
                  to={"/login"}
                >
                  Login
                </MenuItem>
              )}

              {!token && (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: { xs: 0, md: 2 },
                    display: "block",
                  }}
                  component={NavLink}
                  to={"/register"}
                >
                  Register
                </MenuItem>
              )}
              {!token && colorModeIcon}
            </Menu>
          </Box>
          <StoreIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            component={NavLink}
            to={"/"}
            variant="h5"
            noWrap
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MyStore
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "#FFF", display: "block" }}
              component={NavLink}
              to={"/"}
            >
              Home
            </Button>

            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "#FFF", display: "block" }}
              component={NavLink}
              to={"/products"}
            >
              Products
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {token && <CartModal />}

            {token && (
              <Tooltip title="User settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="U" />
                </IconButton>
              </Tooltip>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}

              <Typography
                component={Form}
                method={"post"}
                action={"/logout"}
                textAlign="center"
                onClick={() => {
                  handleCloseUserMenu();
                  cartContext.clearCart();
                }}
              >
                <MenuItem
                  type="submit"
                  component={Button}
                  sx={{ mr: 0, textTransform: "none", width: "100%" }}
                >
                  Logout
                </MenuItem>
              </Typography>

              {colorModeIcon}
            </Menu>
          </Box>

          {!token && (
            <>
              <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  component={NavLink}
                  to={"/login"}
                >
                  Login
                </Button>

                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  component={NavLink}
                  to={"/register"}
                >
                  Register
                </Button>
              </Box>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {colorModeIcon}
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MainNavigation;
