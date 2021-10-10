import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem.js";
import styles from "./imageGallery.module.css";

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={styles.ImageGallery}>
      {images.map((image) => (
        <ImageGalleryItem openModal={openModal} key={image.id} image={image} />
      ))}
    </ul>
  );
};

export default ImageGallery;
