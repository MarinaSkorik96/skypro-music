import { Routes, Route } from "react-router-dom";
import { Category } from "./pages/category/Category.jsx";
import { Login } from "./pages/login/Login.jsx";
// import { Registration } from "./pages/registration/registration.jsx";
import { MyPlaylist } from "./pages/myplaylist/MyPlaylist.jsx";
import { Main } from "./pages/main/components/main.jsx";
import { Error } from "./pages/error/Error.jsx";
import { ProtectedRoute } from "./pages/ProtectedRoute.jsx";

export const AppRoutes = ({ user, onClick }) => {

  return (
    <Routes>
      <Route path="/login" element={<Login onClick={onClick} />} />
      <Route path="/" element={<Main />} />

      {/* <Route path="/registration" element={<Registration />} /> */}

      <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
        <Route path="/MyPlaylist" element={<MyPlaylist />} />
        <Route path="/category/:id" element={<Category />} />
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
};