import React, { useState } from 'react';
import styled from 'styled-components';
import imagen from '../../images/imagen.jpg'
import {authLogin} from "../helpers/Api";
import { useNavigate } from 'react-router';
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

const Formulario = () => {
  const navigate = useNavigate();
  // Estado local para el usuario y la contraseña
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Manejador del envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    // Aquí podríamos enviar la información del usuario y la contraseña a un servidor para verificarla
  };

  return (
    <Container>
      <LeftColumn>
        <Img src={imagen} alt="Placeholder" />
      </LeftColumn>
      <RightColumn>
        <Form onSubmit={handleSubmit}>
            <Title>Empieza tu encuesta aquí </Title>
          <Input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
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