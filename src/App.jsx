import { createGlobalStyle } from 'styled-components';
import * as S from "./pages/main/components/mainStyles"
import { AppRoutes } from "./routes";
import { useState } from "react";
import Context from './context';



const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  a,
  a:visited {
    text-decoration: none;
    font-family: "StratosSkyeng", sans-serif;
    cursor: pointer;
  }

  button {
    cursor: pointer;
  }

  ul li {
    list-style: none;
  }

  @font-face {
    font-family: "StratosSkyeng";
    src: local("StratosSkyeng"), local("StratosSkyeng"),
      url("../public/fonts/StratosSkyeng.woff2") format("woff2"),
      url("../public/fonts/StratosSkyeng.woff") format("woff");
    font-weight: 400;
    font-style: normal;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: "StratosSkyeng", sans-serif;
    color: #ffffff;
  }
`
function App() {


  const [user, setUser] = useState(null);
  const getuser = localStorage.getItem('login');
  console.log(getuser)

  const handleLogin = () => {
    // const getuser = localStorage.getItem('login');
    // console.log(getuser)
// return getuser
    // setUser(getuser);
    // console.log(user)
  }

  return (
    <>
      <Context.Provider
        value={getuser }>
        <GlobalStyle />
        <S.Wrapper>
          <S.Container>
            <AppRoutes user={user} onClick={handleLogin} />
          </S.Container>
        </S.Wrapper>
      </Context.Provider>
    </>
  );
}

export default App;
