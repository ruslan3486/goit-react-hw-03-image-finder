import styles from "./imageGalleryItem.module.css";

export default function ImageGalleryItem({ image, openModal }) {
  return (
    <li id={image.id} onClick={openModal} className={styles.ImageGalleryItem}>
      <img
        src={image.webformatURL}
        alt=""
        className={styles.ImageGalleryItemImage}
      />
    </li>
  );
}
