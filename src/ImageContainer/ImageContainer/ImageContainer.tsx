import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { ImageModal } from "../ImageModal";
import "./ImageContainer.css";
import { IPhoto } from "../../types/IPhoto";

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    border: "24px solid azure",
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "#fff",
  },
  dialog: {
    width: "100%",
    height: "auto",
  },
}));

export const ImageContainer = (): React.ReactElement => {
  const [images, setImages] = React.useState<IPhoto[]>([]);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [imageIndex, setImageIndex] = React.useState("");
  const [isBottom, setBottom] = React.useState(false);
  const [params, setParams] = React.useState({ page: 1, limit: 30 });

  const classes = useStyles();

  React.useEffect(() => {
    if (isBottom) {
      loadMoreImages();
    }
  }, [isBottom]);
  
  React.useEffect(() => {
    axios
      .get(
        `https://picsum.photos/v2/list?page=${params.page}&limit=${params.limit}`
      )
      .then(({ data }) => {
        setImages(data);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }, [params.page, params.limit]);

  const loadMoreImages = () => {
    setParams((prevState) => {
      return {
        page: prevState.page + 1,
        limit: prevState.limit + 30,
      };
    });
    setBottom(false);
  };

  const handleScroll = (e: React.SyntheticEvent<HTMLDivElement>): void => {
    const scrollTop = e.currentTarget?.scrollTop;
    const scrollHeight = e.currentTarget?.scrollHeight;
    const clientHeight = e.currentTarget?.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setBottom(true);
    }
  };

  const handleOpen = (e: React.MouseEvent<HTMLImageElement>): void => {
    if (e.currentTarget.dataset) {
      const index = e.currentTarget.dataset.imageId;
      if (index) setImageIndex(index);
    }
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Container
      onScroll={handleScroll}
      className={`container ${classes.root}`}
      maxWidth="md"
    >
      <GridList cellHeight={160} cols={5}>
        {images.map((image) => {
          return (
            <GridListTile key={image.id}>
              <img
                data-image-id={image.id}
                onClick={handleOpen}
                src={`https://picsum.photos/id/${image.id}/250`}
                alt={image.author}
              />
              <GridListTileBar
                title="Picsum Photos"
                subtitle={<span>by: {image.author}</span>}
              />
            </GridListTile>
          );
        })}
        <ImageModal handleClose={handleClose} open={open} index={imageIndex} />
      </GridList>
    </Container>
  );
};

export default ImageContainer;
