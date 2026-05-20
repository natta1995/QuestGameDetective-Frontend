// import { butlerMessages } from "../../data/ButlerMessages";
// import bgImg from "../../Img/StudyImgButler.png";
// import { useNavigate } from "react-router-dom";

// import { useEffect, useState } from "react";

// const ButlerStudyPage = () => {
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const randomIndex = Math.floor(Math.random() * butlerMessages.length);
//     setMessage(butlerMessages[randomIndex]);

//     const timer = setTimeout(() => {
//       navigate("/study");
//     }, 10000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div
//       className="butler-view"
//       style={{ backgroundImage: `url(${bgImg})` }}
//     >
//       <div className="butler-message">{message}</div>
//     </div>
//   );
// };

// export default ButlerStudyPage;
