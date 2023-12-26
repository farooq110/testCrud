import PropTypes from 'prop-types';

import {
  Box,
  Drawer,
  Stack,
  useMediaQuery
} from '@mui/material';
import { Scrollbar } from '../ScrollBar';
import { items } from './config';
import { SideNavItem } from '../SideNavItem';
import { useLocation } from 'react-router-dom';
import logo from "../../assets/images.png";
export const SideNav = (props:any) => {
  const location = useLocation();
  const { open, onClose } = props;
  const lgUp = useMediaQuery("(min-width:1200px)");

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        display:"flex",
        justifyContent:"center",
        rowGap:"4rem"
        // '& .simplebar-content': {
        //   height: '100%'
        // },
        // '& .simplebar-scrollbar:before': {
        //   background: 'neutral.400'
        // }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width:"100%",
         alignItems:"center",
         gap:"4rem"
        }}
      >
        <Box
        sx={{px: 2,
          marginTop:3,
          py: 3,}}>
          <img
            src={logo}
            alt={`Image`}
            loading="lazy"
            style={{borderRadius: "8px",
              width: "14.3rem",
              height: "3.6rem"}}
          />
          </Box>
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items.map((item:any) => {
              const active = item.path ? (location.pathname === item.path) : false;
              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: '#015249',
            width: "305px",
            borderTopRightRadius:"20px",
            borderBottomRightRadius:"20px"
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#015249',
          width: "305px",
          borderTopRightRadius:"20px",
          borderBottomRightRadius:"20px"
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};