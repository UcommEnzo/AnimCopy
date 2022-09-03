import React from "react"
import { Link } from "react-router-dom";
import alice from "../../assets/images/alice2k.png"
import animespirit from "../../assets/images/animespirit.jpg"
import github from "../../assets/images/github.png"
import footer from "../../assets/images/footer.png"

const Footer = ({}) => {

  return (
    <div className="footerContainer">
      <div className="footerLeft">
        <a href="https://animespirit.ru/" target="_blank">
          <img src={animespirit}/>
        </a>
        <a href="https://github.com/anilibria" target="_blank">
          <img src={github}/>
        </a>
        <a href="https://alice2k.work/" target="_blank">
          <img src={alice}/>
        </a>
      </div>
      <div className="footerCenter">
        <img src={footer}/>
      </div>
      <div className="footerRight">
        <Link to="/login" >Правила</Link>
        <a href="tg://resolve?domain=Libria911Bot">Вопрос</a>
        <Link to="/login">Личный Кабинет</Link>
        <Link to="/login">Регистрация</Link>
        <Link to="/login">Вход</Link>
      </div>
    </div>
  )
}

export default Footer