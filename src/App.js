import React from "react";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fab);

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  let randomQuote = Math.floor(Math.random() * 1642);

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((json) => {
        setQuotes(json);
        setIsLoaded(true);
      });

    if (isLoaded === true) {
      setText(quotes[randomQuote].text);
      setAuthor(quotes[randomQuote].author);
    }
  }, [isLoaded]);

  const getNewQuote = () => {
    setText(quotes[randomQuote].text);
    setAuthor(quotes[randomQuote].author);
  };

  return (
    <div className="app">
      <div className="app__quote" id="quote-box">
        <h3 className="quote__text" id="text">
          {isLoaded === false ? null : `"${text}"`}
          <span className="quote__author" id="author">
            {author !== null ? ` ${author}` : ""}
          </span>
        </h3>

        <div className="quote__controls">
          <button className="btn" id="new-quote" onClick={getNewQuote}>
            New quote
          </button>
          <button className="btn">
            <a
              id="tweet-quote"
              href={`https://twitter.com/intent/tweet?text=${text} ${author}`}
              target="_blank"
            >
              <FontAwesomeIcon
                icon={["fab", "twitter"]}
                size="lg"
                style={{ marginRight: 5 }}
              ></FontAwesomeIcon>
              {`Tweet `}
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
