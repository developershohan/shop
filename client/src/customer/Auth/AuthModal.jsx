import { Modal, Box, Typography } from "@mui/material"
import RegisterForm from "./RegisterForm";

import { useLocation } from 'react-router-dom';
import LoginForm from "./LoginForm";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


const AuthModal = ({ handleClose, open }) => {
  const location = useLocation()

  return (
    <div>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" sx={{ fontWeight: "bold" }} variant="h6" component="h2" mb={2}>
            {location.pathname === "/login" ? "Sign In" :
              "Sign Up"}
          </Typography>
          {location.pathname === "/login" ? <LoginForm /> :
            <RegisterForm />}
        </Box>
      </Modal>
    </div>
  )
}

export default AuthModal