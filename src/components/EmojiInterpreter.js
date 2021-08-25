import emojiData from "/assets/emojiData";
import { useRef, useState } from "react";

export default function EmojiInterpreter() {
  //state variable to store emoji and it's meaning
  const [emoji, setEmoji] = useState("");
  const [meaning, setMeaning] = useState();

  //variable to toggle emoji section
  const [viewSection, setViewSection] = useState(false);

  //variable to hide default meaning if no input present
  const userInput = useRef("");

  //function to match user input with our emoji database
  const userInputChangeHandler = (e) => {
    const InputLength = userInput.current.value.length;
    const InpuEmoji = e.target.value;
    setEmoji(InpuEmoji);
    const foundData = emojiData.find((e) => e.emoji === InpuEmoji);

    if (foundData) {
      setMeaning(foundData.description);
    } else {
      if (InputLength > 0) {
        setMeaning("This emoji is not availabe in our database");
      } else {
        setMeaning("");
      }
    }
  };

  // function to show the meaning based on the user selection from emoji section
  function emojiClickHandler(emo) {
    setMeaning(emo.description);
  }

  return (
    <div className="container">
      <h1 className="heading">Emoticon Interpreter</h1>
      <div className="center-container">
        <input
          className="input"
          ref={userInput}
          onChange={userInputChangeHandler}
          placeholder="Enter a Emoji"
          value={emoji}
        />
        <h3 className="meaning">{meaning}</h3>
      </div>
      <button
        className="show-button"
        onClick={() => setViewSection(!viewSection)}
      >
        {viewSection === true ? "Hide Emojis" : "Show Emojis"}
      </button>
      {viewSection === true ? (
        <div className="emojis-container">
          {emojiData.map((emo) => (
            <span
              style={{ fontSize: "2rem", cursor: "pointer" }}
              className="emoji"
              key={emo.emoji}
              onClick={() => emojiClickHandler(emo)}
            >
              {emo.emoji}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
