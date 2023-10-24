import { Routes, Route } from "react-router-dom";
import { Category } from "./pages/category/Category";
import { Login } from "./pages/login/login";
import { Registration } from "./pages/registration/registration";
import { MyPlaylist } from "./pages/myplaylist/MyPlaylist";
import { Error } from "./pages/error/Error";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/category/:id" element={<Category />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/MyPlaylist" element={<MyPlaylist />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};