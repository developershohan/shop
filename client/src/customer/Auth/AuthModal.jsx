// AuthModal.js
import { Modal, Box, Typography } from "@mui/material";
import { Button } from "@mui/material"


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
        {mode === "login" ? <LoginFormComponent handleClose={handleClose} /> : <RegisterFormComponent handleClose={handleClose} />}
        <button onClick={toggleMode}>{mode === "login" ? <div className="form-footer flex gap-1 align-middle justify-center mt-3">
          <p>{`If you don't have account?`}</p>
          <Button variant="text" color="primary" className=" font-semibold" sx={{ p: 0 }}  >
            Register</Button>
        </div> : <div className="form-footer flex gap-1 align-middle justify-center mt-3">
          <p>Already have an account?</p>
          <Button variant="text" color="primary" className=" font-semibold" sx={{ p: 0 }}  >

            Login</Button>
        </div>}</button>
      </Box>
    </Modal>
  );
};

export default AuthModal;
