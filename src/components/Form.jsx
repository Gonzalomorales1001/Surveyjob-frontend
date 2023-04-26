import React, { useState } from 'react';
import styled from 'styled-components';
import imagen from '../../images/imagen.jpg'
import {authLogin} from "../helpers/Api";
import { useNavigate, Link } from 'react-router-dom';
// Estilos del contenedor de la página
const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

// Estilos de la columna de la izquierda
const LeftColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #f2f2f2;
`;

// Estilos de la columna de la derecha
const RightColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  padding: 2rem;
  padding-top: 16rem;
  background-color: rgb(51, 71, 86)
`;

// Estilos del formulario
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Estilos del campo de entrada de texto
const Input = styled.input`
  border-radius:8px;
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #dadada;
  :focus-visible {
    outline: none;
 }
`;

// Estilos del botón
const Button = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  height: 40px;
  border-radius:4px;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    
`;

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
`;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    margin-top:40px;
`;

const Formulario = ({loginUser}) => {
  const navigate = useNavigate();
  // Estado local para el usuario y la contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Manejador del envío del formulario
  const handleSubmit = async(event) => {
    event.preventDefault();
    const respuesta={email:email , password:password};

    const resp = await authLogin(respuesta)
    if (resp?.token) {
      localStorage.setItem("token", JSON.stringify(resp.token));
      loginUser();

    }
    navigate("/");
  };

  return (
    <Container>
      <LeftColumn className='d-none d-lg-block'>
        <Img src={imagen} alt="Placeholder" />
      </LeftColumn>
      <RightColumn className="vw-100">
        <Form onSubmit={handleSubmit}>
            <Title>Empieza tu encuesta aquí </Title>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <FlexContainer>
          <Button type="submit">Iniciar sesion</Button>
          <Button type="submit">Registrarse</Button>
          </FlexContainer>
        </Form>
      </RightColumn>
    </Container>
  );
};

export default Formulario;