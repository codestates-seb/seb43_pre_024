import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

function App() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const [homeActive, setHomeActive] = useState(true);
  const [questionsActive, setQuestionsActive] = useState(false);
  const [usersActive, setUsersActive] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function changeLoginStatus() {
    if (login === true) {
      setLogin(false);
      navigate("/"); // go to home when sign outed
    } else {
      setLogin(true);
      navigate("/login"); // go to all questions page when sign in
    }
  }

  useEffect(() => {
    if (window.location.href.includes("Authorization=Bearer%")) {
      const redirectedUrl = window.location.href;

      const searchString = "Authorization=Bearer%";
      const startIndex = redirectedUrl.indexOf(searchString);

      if (startIndex !== -1) {
        const textAfterSearchString = redirectedUrl.substring(
          startIndex + searchString.length
        );
        localStorage.setItem("Authorization", textAfterSearchString);
      } else {
        console.log("Search string not found");
      }
    }
    const token = localStorage.getItem("Authorization");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <div className="App">
      <Header
        isLogin={login}
        setLogin={setLogin}
        changeLoginStatus={() => {
          changeLoginStatus();
        }}
        homeActive={homeActive}
        questionsActive={questionsActive}
        usersActive={usersActive}
        setHomeActive={setHomeActive}
        setQuestionsActive={setQuestionsActive}
        setUsersActive={setUsersActive}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Navbar
          login={login}
          setLogin={setLogin}
          homeActive={homeActive}
          questionsActive={questionsActive}
          usersActive={usersActive}
          setHomeActive={setHomeActive}
          setQuestionsActive={setQuestionsActive}
          setUsersActive={setUsersActive}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
