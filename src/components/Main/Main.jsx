import React, { useContext, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { PiSunLight } from "react-icons/pi";
import { MdNightlight } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDropdown } from "react-icons/io";
import Button from "@mui/material/Button";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  const [darkMode, setDarkMode] = useState(false);

  const keywordLinks = {
    web: [
      {
        text: "Reddit : r/webdev",
        url: "https://www.reddit.com/r/webdev/?rdt=62227",
      },
      {
        text: "Reddit : r/Web Development",
        url: "https://www.reddit.com/r/webdevelopment/",
      },
      {
        text: "DEV community",
        url: "https://twitter.com/thepracticaldev?lang=en",
      },
      {
        text: "Six Revisions by WebFX",
        url: "https://twitter.com/sixrevisions",
      },
      {
        text: "Full Stack Developers Community",
        url: "https://twitter.com/fullcommunity?lang=en",
      },
    ],
    app: [
      {
        text: "Reddit r/developer",
        url: "https://www.reddit.com/r/developer/",
      },
      {
        text: "Reddit r/appdev",
        url: "https://www.reddit.com/r/appdev/",
      },
    ],
    machine: [
      {
        text: "r/Machine Learning",
        url: "https://www.reddit.com/r/MachineLearning/?rdt=44338",
      },
      {
        text: "r/learnmachinelearning",
        url: "https://www.reddit.com/r/learnmachinelearning/",
      },
      {
        text: "r/MLQuestions",
        url: "https://www.reddit.com/r/MLQuestions/",
      },
      {
        text: "r/deeplearning",
        url: "https://www.reddit.com/r/deeplearning/",
      },
      {
        text: "r/machinelearningnews",
        url: "https://www.reddit.com/r/machinelearningnews/",
      },
      {
        text: "For Datasets",
        url: "https://www.reddit.com/r/datasets/",
      },
    ],
    science: [
      {
        text: "For Datasets",
        url: "https://www.reddit.com/r/datasets/",
      },
      {
        text: "r/datascience",
        url: "https://www.reddit.com/r/datascience/",
      },
      {
        text: "r/learndatascience",
        url: "https://www.reddit.com/r/learndatascience/",
      },
      {
        text: "r/visualization",
        url: "https://www.reddit.com/r/visualization/",
      },
      {
        text: "r/dataanalysis",
        url: "https://www.reddit.com/r/dataanalysis/",
      },
    ],
    devops: [
      {
        text: "r/hashicorp",
        url: "https://www.reddit.com/r/hashicorp/",
      },
      {
        text: "r/ansible",
        url: "https://www.reddit.com/r/ansible/",
      },
      {
        text: "r/docker",
        url: "https://www.reddit.com/r/docker/",
      },
      {
        text: "r/kubernetes",
        url: "https://www.reddit.com/r/kubernetes/",
      },
    ],
    cyber: [
      {
        text: "r/cybersecurity",
        url: "https://www.reddit.com/r/cybersecurity/",
      },
      {
        text: "r/netsec",
        url: "https://www.reddit.com/r/netsec/",
      },
      {
        text: "r/hacking",
        url: "https://www.reddit.com/r/hacking/",
      },
      {
        text: "r/AskNetsec",
        url: "https://www.reddit.com/r/AskNetsec/",
      },
      {
        text: "r/Information_Security",
        url: "https://www.reddit.com/r/Information_Security/",
      },
      {
        text: "r/ReverseEngineering",
        url: "https://www.reddit.com/r/ReverseEngineering/",
      },
    ],
  };

  const checkForKeywords = (prompt) => {
    for (const keyword in keywordLinks) {
      if (prompt.toLowerCase().includes(keyword)) {
        return { keyword, link: keywordLinks[keyword] };
      }
    }
    return null;
  };

  const renderNotifications = () => {
    const notification = checkForKeywords(recentPrompt);
    if (notification) {
      return (
        <div className="notification">
          <Accordion>
            <AccordionSummary
              expandIcon={<IoIosArrowDropdown />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              For more updates regarding the community also checkout....
            </AccordionSummary>
            <AccordionDetails>
              <ul style={{ listStyle: "none" }}>
                {notification.link.map((link, index) => (
                  <li key={index}>
                    <a
                      style={{
                        textDecoration: "none",
                        fontFamily: "Open Sans",
                      }}
                      href={link.url}
                      target="_blank"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`main ${darkMode ? "dark-mode" : ""}`}>
      <div className="nav">
        <p>KARP</p>
        <div className="noti">
          {renderNotifications()} {/* Render notifications here */}
          {darkMode ? (
            <PiSunLight
              onClick={() => {
                setDarkMode(!darkMode);
              }}
            />
          ) : (
            <MdNightlight
              onClick={() => {
                setDarkMode(!darkMode);
              }}
            />
          )}
          <img src={assets.user_icon} alt="" />
          <IoIosNotifications />
        </div>
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here (refrain from using shortforms such as DS,ML,etc.)"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
