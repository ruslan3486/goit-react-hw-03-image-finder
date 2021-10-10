export const fetchImages = (query = "", pageNumber = 1) => {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${pageNumber}&key=22968189-f518494d66d88c5d71c698a06&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then((res) => res.json())
    .then((data) => data.hits);
};

export { fetchImages as default };
