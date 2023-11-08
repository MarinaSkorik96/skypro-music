
import { Link } from "react-router-dom";
import * as S from "./LoginStyles.jsx"
import { useEffect, useState, useContext } from "react";
import { getAuthorization, getLogin, getToken } from "../../api.js";
import Context from "../../contexts.jsx";


export function Login({ onClick }) {
  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(false);

  const { addLogin } = useContext(Context)

  console.log(addLogin)

  const handleLogin = async () => {
    setLoading(true)

    if (email === "") {
      setError("Не заполнен Email");
      return
    }
    if (password === "") {
      setError("Не введен пароль");
      return
    }
    getLogin({ email, password })
      .then((user) => {
        if (user.detail == "Пользователь с таким email или паролем не найден") {
          setError(user.detail);
          setLoading(false)
          return
        }
        getToken({ email, password })
          .then((token) => {
            console.log(token)
            addLogin(email)
            window.location.href = '/'
            // localStorage.setItem('login', user.email);
          })
      })
  };

  const handleRegister = async () => {
    setLoading(true)
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
        if (user.email !== email && user.email !== undefined) {
          setError(user.email);
          setLoading(false)

          return
        }
        if (user.password !== password && user.password !== undefined) {
          setError(user.password[0]);
          setLoading(false)
          return
        }
        setLoading(false)
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
              <Link >
                <S.PrimaryButton disabled={loading} onClick={handleLogin}>
                  Войти
                </S.PrimaryButton>
              </Link>
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
              <S.PrimaryButton disabled={loading} onClick={handleRegister}>
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




