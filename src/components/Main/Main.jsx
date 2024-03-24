import React, { useContext, useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import { PiSunLight } from "react-icons/pi";
import { MdNightlight } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io"

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    const [darkMode, setDarkMode] = useState(false);

    
    const keywordLinks = {
        "road trip": "https://example.com/road-trip-info",
        "urban planning": "https://example.com/urban-planning-info",
       
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
                    <p>Check out more info about <a href={notification.link}>{notification.keyword}</a></p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={`main ${darkMode ? "dark-mode" : ""}`}>
            <div className="nav">
                <p>Gemini</p>
                <div className='noti'>
                    {darkMode ? <PiSunLight onClick={() => { setDarkMode(!darkMode) }} /> :
                        <MdNightlight onClick={() => { setDarkMode(!darkMode) }} />}
                    <img src={assets.user_icon} alt="" />
                    <IoIosNotifications />
                </div>
            </div>
            <div className="main-container">
                {!showResult
                    ? <>
                        <div className="greet">
                            <p><span>Hello, Dev.</span></p>
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
                    :
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading
                                ?
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                :
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }
                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Gemini may display inaccurate info, including about people, so double-check its responses.
                    </p>
                </div>
            </div>
            {renderNotifications()}
        </div>
    )
}

export default Main;
