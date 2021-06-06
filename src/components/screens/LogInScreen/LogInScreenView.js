import React from "react";

import {CubeLoader, DefaultButton, Input} from "../../utils";
import {palletMainIcon} from "../../../icons";
import styles from "./LogInScreen.module.css";
import styled from "styled-components";
import {ConfirmModalWindow} from "../../modals";

const LogInContainer = styled.form`
    background-color: #fff;
    padding: 10rem;
    border-radius: 10px;
    box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15) !important;
    display: flex;
    flex-direction: column;
`;

const Title = styled.p`
    font-size: 1.5em;
    text-align: center;
    font-weight: normal;
    color: #413b3b;
`;

const Container = styled.div`
  padding: .5em;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 10rem;
  height: 10rem;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogInScreenView = (props) => {
    const {
        email,
        emailHandler,
        loading,
        passwordHandler,
        onSubmitHandler,
        password
    } = props;

    let inputContainer = (
        <>
            <Input
                placeholder='Введите email'
                className={styles.inputElement}
                type='email'
                value={email}
                onChange={e => emailHandler(e.target.value)}
            />
            <Input
                placeholder='Введите пароль'
                className={styles.inputElement}
                type='password'
                value={password}
                onChange={e => passwordHandler(e.target.value)}
            />
            <DefaultButton onClick={onSubmitHandler}>
                Войти
            </DefaultButton>
        </>
    )

    if (loading) {
        inputContainer = <CubeLoader/>
    }
    return (
        <div className={styles.screen}>
            <LogInContainer>
                <TitleContainer>
                    <Image src={palletMainIcon} />
                    <Title>
                        АВТОРИЗАЦИЯ
                    </Title>
                </TitleContainer>
                <Container>
                    {inputContainer}
                </Container>
            </LogInContainer>
        </div>
    )
}

export default LogInScreenView;