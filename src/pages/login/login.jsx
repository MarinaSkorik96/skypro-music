
import { Link } from "react-router-dom";
import * as S from "./LoginStyles.jsx"
import { useEffect, useState } from "react";
import { getAuthorization } from "../../api.js";

export function Login() {
  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);



  const handleLogin = async ({ email, password }) => {
    if (email === "") {
      setError("Не заполнен Email");
      return
    }
    if (password === "") {
      setError("Не введен пароль");
      return
    }
    alert(`Выполняется вход: ${email} ${password}`);
    setError("Неизвестная ошибка входа");
  };

  const handleRegister = async () => {
    console.log(email)
    console.log(password)

    if (email === "") {
      setError("Не заполнен Email");
      return
    }
    if (password === "") {
      setError("Не введен пароль");
      return
    }
    if (password !== repeatPassword) {
      setError("Пароли не совпадают");
      return
    }
    getAuthorization({ email, password })
      .then((user) => {

        console.log(user)
        console.log(user.email)

        // console.log(user)
        if (user.email !== email && user.email !== undefined) {
          setError(user.email);
          return
        }
        if (user.password !== password && user.password !== undefined) {
          setError(user.password[0]);
          return
        }
        console.log('q')
        setIsLoginMode(true)
        setEmail("")
        setPassword("")
        setRepeatPassword("")
      })
  };



  // Сбрасываем ошибку если пользователь меняет данные на форме или меняется режим формы
  useEffect(() => {
    setError(null);
  }, [isLoginMode, email, password, repeatPassword]);

  return (
    <S.PageContainer>
      <S.ModalForm>
        <Link to="/login">
          <S.ModalLogo>
            <S.ModalLogoImage src="/img/logo_modal.png" alt="logo" />
          </S.ModalLogo>
        </Link>
        {isLoginMode ? (
          <>
            <S.Inputs>
              <S.ModalInput
                type="text"
                name="login"
                placeholder="Почта"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <S.ModalInput
                type="password"
                name="password"
                placeholder="Пароль"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </S.Inputs>
            {error && <S.Error>{error}</S.Error>}
            <S.Buttons>
              <S.PrimaryButton onClick={() => handleLogin({ email, password })}>
                Войти
              </S.PrimaryButton>
              <Link>
                <S.SecondaryButton onClick={() => { setIsLoginMode(false) }}>Зарегистрироваться</S.SecondaryButton>
              </Link>
            </S.Buttons>
          </>
        ) : (
          <>
            <S.Inputs>
              <S.ModalInput
                type="text"
                name="login"
                placeholder="Почта"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <S.ModalInput
                type="password"
                name="password"
                placeholder="Пароль"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <S.ModalInput
                type="password"
                name="repeat-password"
                placeholder="Повторите пароль"
                value={repeatPassword}
                onChange={(event) => {
                  setRepeatPassword(event.target.value);
                }}
              />
            </S.Inputs>
            {error && <S.Error>{error}</S.Error>}
            <S.Buttons>
              <S.PrimaryButton onClick={handleRegister}>
                Зарегистрироваться
              </S.PrimaryButton>
              <S.SecondaryButton onClick={() => { setIsLoginMode(true) }}>
                Войти
              </S.SecondaryButton>
            </S.Buttons>
          </>
        )}
      </S.ModalForm>
    </S.PageContainer>
  );
}




