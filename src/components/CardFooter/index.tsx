import { Box, Container, styled } from "@mui/material"

const FooterWrapper = styled(Container)({})

function CustomCardFooter({ children }:any) {
  return (
    <FooterWrapper className="footer-wrapper">
      <Box >
        {children}
      </Box>
    </FooterWrapper>
  )
}

export default CustomCardFooter
