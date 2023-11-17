import { Routes, Route } from "react-router-dom";
import { Category } from "./pages/category/Category.jsx";
import { Login } from "./pages/login/Login.jsx";
import { MyPlaylist } from "./pages/myplaylist/MyPlaylist.jsx";
import { Main } from "./pages/main/main.jsx";
import { Error } from "./pages/error/Error.jsx";
import { ProtectedRoute } from "./pages/ProtectedRoute.jsx";
import { useContext } from 'react';
import Context from "./contexts.jsx";
import MainTrackList from "./components/TrackList/MainTrackList.jsx";

export const AppRoutes = () => {

  const {  user } = useContext(Context)

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* <Route path="/registration" element={<Registration />} /> */}

      <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
        <Route path="/" element={<Main />}>
          <Route path="/MyPlaylist" element={<MyPlaylist />} />
          <Route path="/category/:id" element={<Category />} />
          <Route index element={<MainTrackList />} />
        </Route>
        {/* <Route path="/MyPlaylist" element={<MyPlaylist />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/" element={<Main />} /> */}

      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
};