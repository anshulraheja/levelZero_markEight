import emojiData from "/assets/emojiData";
import { useRef, useState } from "react";
import "./EmojiInterpreter.css";

export default function EmojiInterpreter() {
  //state variable to store emoji and it's meaning
  const [emoji, setEmoji] = useState();
  const [meaning, setMeaning] = useState();

  //variable to toggle emoji section
  const [viewSection, setViewSection] = useState(false);

  //variable to hide default meaning if no input present
  const userInput = useRef();

  //function to match user input with our emoji database
  const userInputChangeHandler = (e) => {
    const InpuEmoji = e.target.value;
    setEmoji(InpuEmoji);

    const foundData = emojiData.find((e) => e.emoji === InpuEmoji);

    if (foundData) {
      setMeaning(foundData.description);
    } else {
      if (userInput.length > 0)
        setMeaning("This emoji is not availabe in our Database");
      else setMeaning();
    }
  };

  // function to show the meaning based on the user selection from emoji section
  function emojiClickHandler(emo) {
    setMeaning(emo.description);
  }
  return (
    <div>
      <h1>Welcome to Emoji Interpreter</h1>
      <input
        ref={userInput}
        onChange={userInputChangeHandler}
        placeholder="Enter a Emoji"
        value={emoji}
      />
      <h3>{meaning}</h3>
      <button onClick={() => setViewSection(!viewSection)}>
        {viewSection === true ? "Hide Emojis Section" : "Show Emojis Section"}
      </button>
      {viewSection === true ? (
        <div>
          {emojiData.map((emo) => (
            <span
              key={emo.emoji}
              onClick={() => emojiClickHandler(emo)}
              style={{ fontSize: "2rem", padding: "0.5rem", cursor: "pointer" }}
            >
              {emo.emoji}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
