import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box, Stack } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// const [open, setOpen] = React.useState(false);
// const handleClickOpen = () => {
//   setOpen(true);
// };

// const handleClose = () => {
//   setOpen(false);
// };
export default function AlertDialogSlide({
  open,
  handleClose,
  title,
  text,
  dialogActions,
}: {
  open: boolean;
  title: string;
  dialogActions: {
    text: string;
    type: "primary" | "secondary";
    onClick: () => void;
  }[];
  text: string;
  handleClose(): void;
}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        margin: "10px",
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <Box marginBottom={2}>
        <Stack direction="row" justifyContent="center" spacing={1}>
          {dialogActions.map((action) => (
            <Button
              onClick={action.onClick}
              variant={action.type === "primary" ? "contained" : undefined}
              color={action.type === "primary" ? "success" : undefined}
            >
              {action.text}
            </Button>
          ))}
        </Stack>
      </Box>
    </Dialog>
  );
}
