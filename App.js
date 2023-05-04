import { useEffect, useState } from "react";
import "./App.css";
import "./components/screen.css";
import Buttons from "./components/Buttons";
import zingtouch from "zingtouch";

// global variables
let index = 0,
  range = 0,
  visibility = true,
  selectItem;

function App() {
  // state hooks
  const [list, setList] = useState([
    { listItem: "Songs", state: true, id: 0 },
    { listItem: "Workout", state: false, id: 1 },
    { listItem: "Playlist", state: false, id: 2 },
    { listItem: "Games", state: false, id: 3 },
    { listItem: "Spiritual", state: false, id: 4 },
  ]);

  const [activeItem, setActiveItem] = useState([]);

  useEffect(() => {
    let buttonWheel = document.getElementById("button-wheel");
    let activeRegion = zingtouch.Region(buttonWheel);
    activeRegion.bind(buttonWheel, "rotate", function (event) {
      range += Math.floor(event.detail.distanceFromLast);

      if (range > 70) {
        setList((prevList) => {
          return prevList.map((item) => {
            if (item.id === index) {
              return { ...item, state: true };
            } else {
              return { ...item, state: false };
            }
          });
        });
        index++;
        range = 0;

        if (index === 5) {
          index = 0;
        }
      } else if (range < -100) {
        index--;

        if (index < 0) {
          index = 4;
        }
        setList((prevList) => {
          return prevList.map((item) => {
            if (item.id === index) {
              return { ...item, state: true };
            } else {
              return { ...item, state: false };
            }
          });
        });
        range = 0;
      }
    });
  }, []);

  // select button position at middle
  const handleSelect = () => {
    selectItem = list.filter((item) => item.state === true);
    const title = selectItem[0].listItem;

    if (title === "Songs") {
      setActiveItem({
        ...selectItem,
        src: "https://cdn-icons-png.flaticon.com/512/3844/3844724.png",
      });
    } else if (title === "Spiritual") {
      setActiveItem({
        ...selectItem,
        src: "https://static.thenounproject.com/png/4592913-200.png",
      });
    } else if (title === "Workout") {
      setActiveItem({
        ...selectItem,
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLMsZY8fu9F1iaGeKoX8vdfNcScf0m6uDeXw&usqp=CAU",
      });
    } else if (title === "Games") {
      setActiveItem({
        ...selectItem,
        src: "https://img.favpng.com/25/3/4/game-controllers-video-games-computer-icons-vector-graphics-png-favpng-jhTxBr0W68mwN70upENfiuWeX.jpg",
      });
    } else if (title === "Playlist") {
      setActiveItem({
        ...selectItem,
        src: "https://www.shutterstock.com/image-illustration/jazz-trio-musicians-silhouette-isolated-260nw-385800046.jpg",
      });
    }

    visibility = false;
  };

  const handleMenu = () => {
    visibility = true;
    setActiveItem([]);
  };

  // render function
  return (
    <div className="App">
      <div className="screen">
        {/* side-menu section */}
        <div
          style={!visibility ? { display: "none" } : {}}
          className="side-menu"
        >
          {list.map((item) => (
            <li key={item.id} className={item.state ? "active" : ""}>
              {item.listItem}
            </li>
          ))}
        </div>

        {/* display section */}
        <div className="display">
          <h2>{visibility ? "" : activeItem[0].listItem}</h2>
          {activeItem.src && <img src={visibility ? "" : activeItem.src} />}
        </div>
      </div>

      {/* Button Component */}
      <Buttons handleSelect={handleSelect} handleMenu={handleMenu} />
    </div>
  );
}

export default App;
