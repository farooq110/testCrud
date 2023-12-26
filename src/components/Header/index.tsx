import PropTypes from "prop-types";

import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props: any) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery("(min-width:1200px)");

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: "100%",
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                {/* <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon> */}
                open
              </IconButton>
            )}
            <Typography sx={{ fontSize: "40px" }}>CUSTOMERS</Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
