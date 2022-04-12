import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { FaRegPaperPlane, FaUserCircle, FaListUl } from "react-icons/fa";

export default function Home() {
  const chatContainer = React.createRef();
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);
  const socketRef = useRef();

  const scrollToMyRef = () => {
    const scroll =
      chatContainer.current.scrollHeight - chatContainer.current.clientHeight;
    chatContainer.current.scrollTo(0, scroll);
  };

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:8000/');
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    scrollToMyRef()
  };

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
    e.preventDefault();
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          <span className="">{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <>
      <div>
        <div className="card" ref={chatContainer}>
          <form onSubmit={onMessageSubmit}>
            <div className="users">
              <div className="user">
                <FaUserCircle className="icon" />
                <span>User Chat</span>
              </div>
              <FaListUl />
            </div>
            <div className="render-chat">{renderChat()}</div>
            <div className="mess">
              <input
                name="message"
                onChange={(e) => onTextChange(e)}
                value={state.message}
                id="outlined-multiline-static"
                placeholder="Aa"
              />
              <button>
                <FaRegPaperPlane />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
