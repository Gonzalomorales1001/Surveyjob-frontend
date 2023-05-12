import React from "react";
import "../css/Footer.css";
import DarkModeSurveyJobLogo from "../assets/LightLetterLogo.png";
import LightModeSurveyJobLogo from "../assets/DarkLetterLogo.png";

const Footer = ({ dark, ToggleDarkMode }) => {
  return (
    <>
      {/* <!-- Site footer --> */}
      <footer class={`site-footer ${
          dark ? "footer-dark" : "footer-light"
        }` }>
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-7 me-5">
              <h6>SurveyJob </h6>
              <p class="text-justify">
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
            <div class="col-xs-6 col-md-4 ms-5">
              <h6>Compañía</h6>
              <ul class="footer-links">
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
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-sm-6 col-xs-12">
              <p class="copyright-text">
                Copyright &copy; 2023 Todos los derechos reservados por
                <a href="#"> SurveyJob</a>.
              </p>
            </div>

            <div class="col-md-4 col-sm-6 col-xs-12">
              <ul class="social-icons">
                {/* Agregar pagina de error */}
                <li>
                  <a class="facebook" href="#">
                    <i class="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a class="twitter" href="#">
                    <i class="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a class="dribbble" href="#">
                    <i class="fa fa-dribbble"></i>
                  </a>
                </li>
                <li>
                  <a class="linkedin" href="#">
                    <i class="fa fa-linkedin"></i>
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
