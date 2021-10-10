import { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as imagesApi from "./services/image-api";
import Searchbar from "./components/Searchbar/Searchbar";
// import SearchInfo from './components/SearchInfo/SearchInfo'
import ImageGallery from "./components/ImageGallery/ImageGallery.js";
import Button from "./components/Button/Button.js";
import Modal from "./components/Modal/Modal.js";
import styles from "./App.module.css";
import Loader from "./components/Loader/Loader";

class App extends Component {
  state = {
    images: [],
    SearchName: "",
    pageNumber: 1,
    isLoading: false,
    error: "",
    isModalOpen: false,
    largeImageId: null,
    largeImage: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.SearchName !== this.state.SearchName) {
      this.fetchImages(false);
    }
  }

  //  componentDidUpdate(prevProps, prevState){
  //       const nextName = this.props.SearchName
  //       const prevName = prevProps.SearchName
  //       if (prevName !== nextName) {

  //           console.log('Изменилось Имя')
  //           console.log('prevProps.SearchName', prevProps.SearchName)
  //           console.log('this.props.SearchName', this.props.SearchName)
  //           this.setState({ loading: true })
  //            imagesApi
  //         .fetchImages(nextName)
  //           // fetch(`https://pixabay.com/api/?q=${nextName }&page=1&key=22968189-f518494d66d88c5d71c698a06&image_type=photo&orientation=horizontal&per_page=12`).then(res=> res.json()).then(names => this.setState({names})).finally(() => this.setState({loading: false}))
  //       }
  //   }
  handleSearchSubmit = (SearchName) => {
    this.setState({ SearchName, images: [], pageNumber: 1 });
  };

  fetchImagesWithScroll = () => {
    this.fetchImages(true);
  };

  fetchImages = (scroll) => {
    this.setState({ isLoading: true });
    const { SearchName, pageNumber } = this.state;
    imagesApi
      .fetchImages(SearchName, pageNumber)
      .then((images) => {
        this.setState((state) => ({
          images: [...state.images, ...images],
          pageNumber: state.pageNumber + 1,
        }));
        return images[0];
      })
      .catch((error) => {
        this.setState({ error });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  imagePhoto = () => {
    const largeImg = this.state.images.find((image) => {
      return image.id === this.state.largeImageId;
    });
    return largeImg;
  };

  openModal = (e) => {
    this.setState({
      isModalOpen: true,
      largeImageId: Number(e.currentTarget.id),
    });
  };
  closeModal = () => this.setState({ isModalOpen: false });
  render() {
    const { isLoading, images, isModalOpen, largeImageId } = this.state;
    return (
      <div className={styles.App}>
        <ImageGallery openModal={this.openModal} images={images} />
        {isLoading && <Loader />}
        <Searchbar onSubmit={this.handleSearchSubmit} />

        <Button fetchImages={this.fetchImagesWithScroll} />
        {isModalOpen && (
          <Modal largeImageId={largeImageId} onClose={this.closeModal}>
            <img
              src={this.imagePhoto().largeImageURL}
              alt={this.imagePhoto().tags}
            />
          </Modal>
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
