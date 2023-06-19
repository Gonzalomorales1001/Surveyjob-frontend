import React, { useContext } from "react";
import "../css/Footer.css";
import { DarkModeContext } from "../App";
import { Link } from "react-router-dom";

const Footer = ({ToggleDarkMode}) => {

  const {dark}=useContext(DarkModeContext)

  return (
    <>      
      <footer className={`site-footer  ${
          dark ? "footer-dark" : "footer-light"
        }` }>
        <div className="container">
          <div className="">
            <div className="col-sm-12 col-md-12">
              <div className="d-flex align-items-center gap-3">
                <h6>SurveyJob</h6>
                <div className="darkmode-toggler">
                  <input
                    type="checkbox"
                    id="toggle"
                    className="toggle--checkbox"
                    onChange={ToggleDarkMode}
                    checked={dark}
                  />
                  <label htmlFor="toggle" className="toggle--label">
                    <span className="toggle--label-background"></span>
                  </label>
                </div>
              </div>
              <p className="text-justify">
                Es una empresa con fines de prestar servicios a partir
                de encuesta, para mejorar el rendimiento de distintos ámbitos.
                Estamos comprometidos en brindarte una plataforma confiable y
                fácil de usar para que puedas crear, compartir y analizar
                encuestas de manera efectiva. Valoramos la privacidad y
                seguridad de tus datos. Nos aseguramos de que tus encuestas y la
                información recopilada se mantengan confidenciales y se utilicen
                de acuerdo con las regulaciones de protección de datos.
              </p>
            </div>
            <div className="col-xs-6 col-md-3 ">
              <h6>Compañía</h6>
              <ul className="footer-links">
                <li>
                  <a href="http://scanfcode.com/about/">Sobre nosotros</a>
                </li>
                <li>
                  <a href="http://scanfcode.com/contact/">Contacto</a>
                </li>
                <li>
                  <a href="http://scanfcode.com/contribute-at-scanfcode/">
                    Contribuciones
                  </a>
                </li>
                <li>
                  <a href="http://scanfcode.com/privacy-policy/">
                    Politica de privacidad
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Copyright &copy; 2023 Todos los derechos reservados por
                <Link to='/'> SurveyJob</Link>.
              </p>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                {/* Agregar pagina de error */}
                <li>
                  <a className="facebook" href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a className="twitter" href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a className="dribbble" href="#">
                    <i className="fa fa-dribbble"></i>
                  </a>
                </li>
                <li>
                  <a className="linkedin" href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
