import React from "react";
import Dialog from "@material-ui/core/Dialog";
interface ImageModalProps {
  index: string;
  open: boolean;
  handleClose: () => void;
}

export const ImageModal = ({
  index,
  open,
  handleClose,
}: ImageModalProps): React.ReactElement => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="image-display"
      aria-describedby="section for displaying higher resolution images"
    >
      <img onClick={handleClose} src={`https://picsum.photos/id/${index}/650`} alt={"Picsum"} />
    </Dialog>
  );
};

export default ImageModal;
