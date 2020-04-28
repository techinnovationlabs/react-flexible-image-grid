import React from 'react';
import './App.css';

function App() {
  const [pictures, setPictures] = React.useState([
    "https://s3-ap-southeast-2.amazonaws.com/images.getjarvis.com.au/9068b2bd089c037a144fc847b9967ee83dce0fe5299261a884adc3241a33604b.jpeg",
    "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
    "https://homepages.cae.wisc.edu/~ece533/images/arctichare.png",
    "https://homepages.cae.wisc.edu/~ece533/images/baboon.png",
    "https://homepages.cae.wisc.edu/~ece533/images/fruits.png"
  ]);

  const [isOpen, setIsOpen] = React.useState(false);
  const [swappedPictures, setSwappedPictures] = React.useState([]);

  const onDragStart = (event, index) => {
    event.dataTransfer.setData("selectedIndex", index);
  }

  const onDragOver = (event) => {
    event.preventDefault();
  }

  const onDrop = (event, droppedIndex) => {
    let selectedIndex = event.dataTransfer.getData("selectedIndex");
    if (droppedIndex != selectedIndex) {
      const pics = [...pictures];
      pics[droppedIndex] = pictures[selectedIndex];
      pics[selectedIndex] = pictures[droppedIndex];
      setSwappedPictures([...pics]);
      popupOpen();
    }
  }

  const popupClose = (value) => {
    if (value) {
      setPictures([...swappedPictures])
    }
    setIsOpen(false);
  };

  const popupOpen = () => {
    setIsOpen(true);
  }

  const popup = () => {
    return (
      <div>
        <div className="overlay" id="overlay" style={isOpen ? { display: "block" } : { display: "none" }}></div>
        <div className="popup" id="popup" style={isOpen ? { display: "block" } : { display: "none" }}>
          <div className="popup-inner">
            <p>
              <i className="fa fa-info-circle" style={{ fontSize: 30, justifyContent: "center" }} aria-hidden="true"></i>
              <span> Are you sure want to replace the image</span>
            </p>
            <button className="btn" onClick={() => popupClose(true)} >Yes</button>
            <button className="btn" onClick={() => popupClose(false)} >No</button>
          </div>
        </div>
      </div>);
  }

  return (
    <div>
      {popup()}
      <div className="topContainer">
        {pictures.map((pic, index) =>
          <div key={index} className="imgContainer"
            draggable onDragStart={(event) => onDragStart(event, index)}
            onDragOver={(event) => onDragOver(event)}
            onDrop={(event) => onDrop(event, index)} >
            <img className="img" src={pic} />
          </div>)
        }
      </div>
    </div>
  );
}

export default App;
