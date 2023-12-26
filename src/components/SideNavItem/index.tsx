import PropTypes from "prop-types";
import { Button } from "@mui/material";

export const SideNavItem = (props: any) => {
  const { icon, title } = props;

  return (
    <li>
      <Button
        sx={{
          background: "#004B40",
          color: "white",
          boxShadow: "0px 5px 25px #00000040",
          borderRadius: "10px",
          width: "260px",
          height: "69px",
          display: "flex",
          justifyContent: "space-evenly",
          fontSize: "24px",
          ":hover": { backgroundColor: "#004B40" },
        }}
        variant="contained"
        startIcon={icon}
      >
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
  title: PropTypes.string.isRequired,
};
