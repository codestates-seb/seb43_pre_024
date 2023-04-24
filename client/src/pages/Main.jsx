import styled, { keyframes } from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import mainImg from '../images/main_img2.png';
import kirbi from '../images/mainKirbi.png';

const jump = keyframes`
  from {
    transform: translateY(0px) scaleX(1) rotate(0deg) translateX(0);
  }
  40%{
    transform: translateY(0px) scaleX(1) rotate(0deg) translateX(0);
  }
  65% {
    transform: translateY(-50px) scaleX(1.1) rotate(-5deg) translateX(-5px);
  }
  to {
    transform: translateY(0px) scaleX(1) rotate(0deg) translateX(0);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }
  25%{
    transform: rotate(-5deg)
  }

  75%{
    transform: rotate(5deg)
  }
  to {
    transform: rotate(0deg)
  }
`;

const bounce = keyframes`
from{
  transform: scale(1)
}
50%{
  transform: scale(1.03)
  }
to%{
  transform: scale(1)
}
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
  }
`;

const MainVisual = styled.div`
  width: 100%;
  height: 95vh;
  margin-bottom: 10vh;

  .container {
    padding-top: 70px;
    margin-top: 8vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .visualArea {
    position: relative;
    width: 860px;
    height: 320px;
    background-image: url(${mainImg});
  }

  .visualText {
    font-size: 60px;
    color: #6c6c6c;
    font-weight: bold;
    margin: 40px 0 50px 0;
  }
  .visualBtn {
    background: transparent;
    border: 1px solid #282828;
    font-size: 16px;
    padding: 12px 50px;
    border-radius: 50px;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
  }
  .visualBtn:first-child {
    margin-right: 30px;
  }
  .visualBtn:hover {
    color: #fff;
    background: #000;
  }
`;

const MainKirbi = styled.i`
  position: absolute;
  top: 133px;
  left: 384px;
  height: 100px;
  display: inline-block;
  width: 160px;
  height: 160px;
  background-image: url(${kirbi});
  background-size: contain;
  z-index: -1;

  &.hovered {
    animation: ${jump} 3s;
    animation-iteration-count: infinite;
  }
`;

const Introduce = styled.div`
  width: 100%;
  height: 100vh;
  margin-bottom: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #282828;

  .introText {
    color: #fff;
    font-size: 85px;
    font-weight: 500;
    letter-spacing: -1px;
    opacity: 0;
    transition: opacity 1s ease-in;
    transition-defaly: 5s;
  }

  .introText.introTitle {
    font-size: 135px;
    font-weight: 700;
    transition-defaly: 5s;
  }

  .introText.fadeIn {
    opacity: 1;
    transition-defaly: 5s;
  }
`;

const TeamLeader = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  margin-bottom: 35vh;

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .teamLeaderArea {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 1s ease-in;
    transition-delay: 0.2s;
  }
  .teamLeaderArea.fadeIn {
    opacity: 1;
  }

  .teamLeaderArea:first-child {
    margin-right: 100px;
  }

  .teamLeaderTopText {
    font-size: 40px;
    font-weight: 600;
    letter-spacing: -0.8px;
  }
  .teamLeaderImage:hover {
    animation: ${rotate} 1s linear;
    animation-iteration-count: infinite;
  }
  .teamLeaderImage.frontTeamLeader {
    width: 160px;
    height: 200px;
    background-image: url(${mainImg});
    background-position: 0px 580px;
  }
  .teamLeaderImage.backTeamLeader {
    width: 160px;
    height: 200px;
    background-image: url(${mainImg});
    background-position: 0px 380px;
  }
  .teamLeaderName {
    margin-top: 20px;
    padding: 12px 35px;
    color: #fff;
    background: #000;
    font-size: 45px;
    font-weight: 500;
    letter-spacing: -1px;
    transition: all 0.5s ease-in-out;
  }
`;

const TeamMember = styled.div`
  width: 100%;
  height: 380px;
  margin-bottom: 40vh;
  display: flex;
  justify-content: center;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0;
    transition: opacity 1s ease-in;
    transition-delay: 0.2s;
  }

  .container.fadeIn {
    opacity: 1;
  }
  .teamMemberArea {
    display: flex;
    justify-content: center;
  }

  .members {
    width: 190px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .memberTitle {
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  .memberName {
    font-size: 20px;
    font-weight: 700;
  }
  .memberId {
    font-size: 14px;
  }

  .memberImg {
    width: 160px;
    height: 200px;
    background-image: url(${mainImg});
  }
  .memberImg:hover {
    animation: ${rotate} 0.8s linear;
    animation-iteration-count: infinite;
  }
  .memberImg.jin {
    background-position: 0px 580px;
  }
  .memberImg.dada {
    width: 149px;
    background-position: -160px 571px;
  }
  .memberImg.miri {
    width: 170px;
    background-position: -305px 571px;
  }
  .memberImg.dodo {
    background-position: 0px 380px;
  }
  .memberImg.ye {
    background-position: -160px 372px;
  }
  .memberImg.tae {
    background-position: -310px 372px;
  }
`;

const Skill = styled.div`
  width: 100%;
  height: 600px
  display: flex;
  justify-content: center;
  padding-top: 20vh;
  margin-bottom: 40vh;

  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 1s ease-in;
    transition-delay: 0.2s;
  }
  .container.fadeIn {
    opacity: 1;
  }

  .backSkillsArea .skillTitle {
    margin-top: 80px;
  }

  .skillTitle {
    margin-bottom: 30px;
    font-size: 40px;
    font-weight: 600;
    letter-spacing: -0.8px;
    text-align: center;
  }
  .backSkillsArea .skillTitle {
    margin-bottom: 40px;
  }
  .skillList {
    display: flex;
  }

  .skills {
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .skills .skillName {
    text-align: center;
  }
  .skills .skillImg {
    width: 110px;
    height: 150px;
    background-image: url(${mainImg});
  }
  .skills .skillImg:hover {
    animation: ${bounce} 0.7s cubic-bezier(0.9, -0.06, 0.54, 1.24);
    animation-iteration-count: infinite;
  }
  .skillImg.html {
    background-position: 0px 159px;
  }
  .skillImg.css {
    background-position: -110px 159px;
  }
  .skillImg.js {
    background-position: -220px 159px;
  }
  .skillImg.react {
    width: 120px;
    background-position: -347px 159px;
  }
  .skillImg.sc {
    background-position: -470px 159px;
  }
  .skillImg.java {
    width: 100px;
    height: 100px;
    background-position: -474px 488px;
  }
  .skillImg.maria {
    width: 100px;
    height: 100px;
    background-position: -583px 488px;
  }
  .skillImg.docker {
    width: 100px;
    height: 100px;
    background-position: -690px 488px;
  }
  .skillImg.aws {
    width: 110px;
    height: 110px;
    background-position: -790px 488px;
  }
  .skillImg.spring {
    width: 110px;
    height: 110px;
    background-position: -471px 358px;
  }
  .skillImg.springboot {
    width: 115px;
    height: 110px;
    background-position: -577px 358px;
  }
  .skillImg.springsc {
    width: 93px;
    height: 115px;
    background-position: -694px 358px;
  }
  .skillImg.jwt {
    width: 110px;
    height: 110px;
    background-position: -792px 358px;
  }
`;

function Main() {
  // 버튼 클릭 시 스크롤
  const scrollIntroduce = useRef(null);
  const scrollSkills = useRef(null);

  const handleClickIntroduce = () => {
    if (scrollIntroduce.current !== null) {
      scrollIntroduce.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleClickSkills = () => {
    if (scrollSkills.current !== null) {
      scrollSkills.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 콘텐츠 스크롤 애니메이션
  const [isFade, setIsFade] = useState(false);
  const [isFadeTeamLeader, setIsFadeTeamLeader] = useState(false);
  const [isFadeTeamMember, setIsFadeTeamMember] = useState(false);
  const [isFadeSkill, setIsFadeSkill] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset + window.innerHeight;

      const targetPosition = document.querySelector('.introduce').offsetTop;
      const teamLeaderPosition =
        document.querySelector('.teamLeader').offsetTop;
      const memberPosition = document.querySelector('.teamMember').offsetTop;
      const skillsPosition =
        document.querySelector('.frontSkillsArea').offsetTop;

      if (scrollPosition > targetPosition) {
        setIsFade(true);
      } else {
        setIsFade(false);
      }
      if (scrollPosition > teamLeaderPosition) {
        setIsFadeTeamLeader(true);
      } else {
        setIsFadeTeamLeader(false);
      }
      if (scrollPosition > memberPosition) {
        setIsFadeTeamMember(true);
      } else {
        setIsFadeTeamMember(false);
      }
      if (scrollPosition > skillsPosition) {
        setIsFadeSkill(true);
      } else {
        setIsFadeSkill(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  // const [isHoveredBtn2, setIsHoveredBtn2] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <MainBox>
      <MainVisual>
        <div className="container firstContainer">
          <div className="visualArea">
            <MainKirbi className={`mainKirbi ${isHovered ? 'hovered' : ''}`} />
          </div>
          <p className="visualText">Oops.. They are Team Not Found 404</p>
          <div className="visualBtnArea">
            <button
              onClick={handleClickIntroduce}
              type="button"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="visualBtn"
            >
              팀원 소개
            </button>
            <button
              onClick={handleClickSkills}
              type="button"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="visualBtn"
            >
              기술 스택
            </button>
          </div>
        </div>
      </MainVisual>
      <Introduce className="introduce" ref={scrollIntroduce}>
        <p
          className={
            isFade ? 'fadeIn introText introTitle' : 'introText introTitle'
          }
          id="introducePage"
        >
          안녕하세요
        </p>
        <p className={isFade ? 'fadeIn introText' : 'introText'}>
          우리는 NotFound404입니다
        </p>
      </Introduce>
      <TeamLeader className="teamLeader">
        <div className="container">
          <div
            className={
              isFadeTeamLeader ? 'fadeIn teamLeaderArea' : 'teamLeaderArea'
            }
          >
            <p className="teamLeaderTopText">Front-End</p>
            <div className="teamLeaderImage frontTeamLeader" />
            <span className="teamLeaderName ">팀장 김지은</span>
          </div>
          <div
            className={
              isFadeTeamLeader ? 'fadeIn teamLeaderArea' : 'teamLeaderArea'
            }
          >
            <p className="teamLeaderTopText">Back-End</p>
            <div className="teamLeaderImage backTeamLeader" />
            <span className="teamLeaderName yangdo">팀장 양도열</span>
          </div>
        </div>
      </TeamLeader>
      <TeamMember className="teamMember">
        <div className={isFadeTeamMember ? 'container fadeIn' : 'container'}>
          <p className="memberTitle">코드스테이츠 43기 프리프로젝트 24조</p>
          <ul className="teamMemberArea">
            <li className="members">
              <div className="memberImg jin" />
              <p className="memberName">FE 김지은</p>
              <p className="memberId">jieuny0314</p>
            </li>
            <li className="members">
              <div className="memberImg dada" />
              <p className="memberName">FE 오다경</p>
              <p className="memberId">dakyungoh</p>
            </li>
            <li className="members">
              <div className="memberImg miri" />
              <p className="memberName">FE 김미리</p>
              <p className="memberId">cheesepizza453</p>
            </li>
            <li className="members">
              <div className="memberImg dodo" />
              <p className="memberName">BE 양도열</p>
              <p className="memberId">yeori316</p>
            </li>
            <li className="members">
              <div className="memberImg ye" />
              <p className="memberName">BE 김예진</p>
              <p className="memberId">yejinee</p>
            </li>
            <li className="members">
              <div className="memberImg tae" />
              <p className="memberName">BE 김태진</p>
              <p className="memberId">mogu616</p>
            </li>
          </ul>
        </div>
      </TeamMember>
      <Skill ref={scrollSkills} className="skills">
        <div className={isFadeSkill ? 'container fadeIn' : 'container'}>
          <div className="frontSkillsArea">
            <p className="skillTitle">Front-End 기술 스택</p>
            <ul className="skillList fe">
              <li className="skills">
                <div className="skillImg html" />
                <p className="skillName">HTML</p>
              </li>
              <li className="skills">
                <div className="skillImg css" />
                <p className="skillName">CSS</p>
              </li>
              <li className="skills">
                <div className="skillImg js" />
                <p className="skillName">js</p>
              </li>
              <li className="skills">
                <div className="skillImg react" />
                <p className="skillName">React</p>
              </li>
              <li className="skills">
                <div className="skillImg sc" />
                <p className="skillName">
                  Styled
                  <br />
                  Components
                </p>
              </li>
            </ul>
          </div>
          <div className="backSkillsArea">
            <p className="skillTitle">Back-End 기술 스택</p>
            <ul className="skillList be">
              <li className="skills">
                <div className="skillImg java" />
                <p className="skillName">Java</p>
              </li>
              <li className="skills">
                <div className="skillImg maria" />
                <p className="skillName">MariaDB</p>
              </li>
              <li className="skills">
                <div className="skillImg docker" />
                <p className="skillName">Docker</p>
              </li>
              <li className="skills">
                <div className="skillImg aws" />
                <p className="skillName">AWS</p>
              </li>
              <li className="skills">
                <div className="skillImg spring" />
                <p className="skillName">Spring</p>
              </li>
              <li className="skills">
                <div className="skillImg springboot" />
                <p className="skillName">
                  Spring
                  <br />
                  Boot
                </p>
              </li>
              <li className="skills">
                <div className="skillImg springsc" />
                <p className="skillName">
                  Spring
                  <br />
                  Security
                </p>
              </li>
              <li className="skills">
                <div className="skillImg jwt" />
                <p className="skillName">JWT</p>
              </li>
            </ul>
          </div>
        </div>
      </Skill>
    </MainBox>
  );
}

export default Main;
