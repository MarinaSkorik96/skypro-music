import { Routes, Route } from "react-router-dom";
import { Category } from "./pages/category/Category.jsx";
import { Login } from "./pages/login/login.jsx";
import { Registration } from "./pages/registration/registration.jsx";
import { MyPlaylist } from "./pages/myplaylist/MyPlaylist.jsx";
import { Main } from "./pages/main/components/main.jsx";
import { Error } from "./pages/error/Error.jsx";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/category/:id" element={<Category />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/MyPlaylist" element={<MyPlaylist />} />
      <Route path="/" element={<Main />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};