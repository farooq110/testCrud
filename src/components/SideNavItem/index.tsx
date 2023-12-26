import PropTypes from 'prop-types';
import { Box, Button, ButtonBase } from '@mui/material';

export const SideNavItem = (props:any) => {
  const { active = false, disabled, external, icon, path, title } = props;

  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank'
      }
      : {
        component: "a",
        href: path
      }
    : {};

  return (
    <li>
     <Button
        sx={{
          background: '#004B40',
          color:"white",
          boxShadow: "0px 5px 25px #00000040",
          borderRadius: "10px",
          width: "260px",
          height: "69px",
          display:"flex",
          justifyContent:"space-evenly",
          fontSize:"24px",
          ":hover":{backgroundColor:"#004B40"}
        }}
        variant="contained" startIcon={icon}>
        {title}
      </Button>
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};