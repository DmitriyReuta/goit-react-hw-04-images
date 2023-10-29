import React, { useState, useEffect } from "react";
import axios from "axios";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { ModalComponent } from "./Modal/Modal";
import { Searchbar } from "./Searchbar/Searchbar";
import { MagnifyingGlass } from 'react-loader-spinner';

export function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [ , setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [hasMoreImages, setHasMoreImages] = useState(true);
  useEffect(() => {
    if (query !== "") {
      setPage(1);
      setImages([]);
      setHasMoreImages(true);
      // eslint-disable-next-line
      fetchImages(); 

    }
  }, [query]);

  const fetchImages = () => {
    setIsLoading(true);
    const apiKey = "39227373-dd01e2c6342e880b425481406";
    const perPage = 12;
    const apiUrl = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setImages((prevImages) => [...prevImages, ...response.data.hits]);
        setPage((prevPage) => prevPage + 1);
        setHasMoreImages(response.data.hits.length === perPage);
      })
      .catch((error) => console.error("Error fetching images: ", error))
      .finally(() => {
        setIsLoading(false);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  };

  const handleQuerySubmit = (query) => {
    setQuery(query);
  };

  const handleImageClick = (largeImageURL) => {
    setShowModal(true);
    setSelectedImage(largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage("");
  };

  return (
    <div>
      <Searchbar onSubmit={handleQuerySubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && (
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      )}
      {!images.length ? null : hasMoreImages && !isLoading && (
        <Button onClick={fetchImages} hasMoreImages={hasMoreImages} />
      )}
      <ModalComponent
        largeImageURL={selectedImage}
        onRequestClose={handleCloseModal}
      />
    </div>
  );
}