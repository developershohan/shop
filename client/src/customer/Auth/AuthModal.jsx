import { Modal, Box, Typography, Button } from "@mui/material";

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

const AuthModal = ({ handleClose, open, mode, LoginFormComponent, RegisterFormComponent, toggleMode }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" sx={{ fontWeight: "bold" }} variant="h6" component="h2" mb={2}>
          {mode === "login" ? "Sign In" : "Sign Up"}
        </Typography>
        {mode === "login" ? (LoginFormComponent && <LoginFormComponent handleClose={handleClose} />) : (RegisterFormComponent && <RegisterFormComponent handleClose={handleClose} />)}
        <div className="form-footer flex gap-1 align-middle justify-center mt-3">
          <p>{mode === "login" ? `If you don't have an account?` : `Already have an account?`}</p>
          <Button variant="text" color="primary" className="font-semibold" sx={{ p: 0 }} onClick={toggleMode}>
            {mode === "login" ? "Register" : "Login"}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AuthModal;
