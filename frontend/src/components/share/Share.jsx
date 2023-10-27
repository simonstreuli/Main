import { AddPhotoAlternateOutlined } from "@material-ui/icons";
import "./share.css";
import { useContext } from "react";
import { useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Share() {
  const desc = useRef();
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <Link to={`/profile/${user.username}`}>
            <img
              className="shareProfileImg"
              src={
                user.profilePicture
                  ? publicFolder + user.profilePicture
                  : publicFolder + "person/noAvatar.png"
              }
              alt=""
            />
          </Link>
          <input
            type="text"
            placeholder="What's going on right now"
            name=""
            id=""
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <label htmlFor="file" className="shareOptions">
            <div className="shareOption">
              <AddPhotoAlternateOutlined className="shareIcon" />
              <span className="sharedOptionText">Photo/Video</span>
              <input
                type="file"
                accept=".jpg, .png, jpeg"
                id="file"
                onChange={(event) => setFile(event.target.files[0])}
              />
            </div>
          </label>
          <button className="shareButton" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
