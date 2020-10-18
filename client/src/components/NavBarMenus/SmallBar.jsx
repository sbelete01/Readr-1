import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  logout: {
    color: 'black',
    textDecoration: 'none',
  },
  icon: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function SmallBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        className={classes.icon}
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleClose}
          component={Link}
          to="/suggestion"
        >
          Explore Books
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={Link}
          to="/booklist"
        >
          Reading List
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={Link}
          to="/addFriend"
        >
          Add Friends!
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={Link}
          to="/profile"
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={Link}
          to="/bookclubinvite"
        >
          Book Club
        </MenuItem>

        <MenuItem
          onClick={handleClose}
        >
          <a
            href="/auth/logout"
            className={classes.logout}
          >
            Logout
          </a>
        </MenuItem>
      </Menu>
    </div>
  );
}
