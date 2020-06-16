import React, { useState, useEffect } from "react";
import "./HomePage.css";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import Button from "react-bootstrap/Button";


const icona = require("tui-image-editor/dist/svg/icon-a.svg");
const iconb = require("tui-image-editor/dist/svg/icon-b.svg");
const iconc = require("tui-image-editor/dist/svg/icon-c.svg");
const icond = require("tui-image-editor/dist/svg/icon-d.svg");
const download = require("downloadjs");


const myTheme = {
  "menu.backgroundColor": "white",
  "common.backgroundColor": "#151515",
  "downloadButton.backgroundColor": "white",
  "downloadButton.borderColor": "white",
  "downloadButton.color": "black",
  "menu.normalIcon.path": icond,
  "menu.activeIcon.path": iconb,
  "menu.disabledIcon.path": icona,
  "menu.hoverIcon.path": iconc,
};



function HomePage() {
  const [imageSrc, setImageSrc] = useState("");
  const imageEditor = React.createRef();
  const saveImageToDisk = () => {
    const imageEditorInst = imageEditor.current.imageEditorInst;
    const data = imageEditorInst.toDataURL();
    if (data) {
      const mimeType = data.split(";")[0];
      const extension = data.split(";")[0].split("/")[1];
      download(data, `image.${extension}`, mimeType);
    }
  };
  return (

    <div className="home-page">
      <div className="center">
        <h1>CMP Editor</h1>
        <Button className='button' onClick={saveImageToDisk}>Save Image to Disk</Button>
      </div>
      <ImageEditor
        includeUI={{
          loadImage: {
            path: imageSrc,
            name: "image",
          },
          dimension: {
            Height : 400,
            Width: 1200, 
          },
          theme: myTheme,
          menu: ["crop", "flip", "rotate", "draw", "shape", "text", "filter"],
          initMenu: "",
          imageSize: {oldWidth: 100, oldHeight: 100, newWidth: 700, newHeight: 700},
          uiSize: {
              
            height: `calc(100vh - 160px)`,
          },
          menuBarPosition: "bottom",
        }}
        cssMaxHeight={400}
        cssMaxWidth={1200}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={true}
        ref={imageEditor}
      />
    </div>
  );
}
export default HomePage;