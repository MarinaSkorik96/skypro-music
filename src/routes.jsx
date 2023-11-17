import { Routes, Route } from "react-router-dom";
import { Category } from "./pages/category/Category.jsx";
import { Login } from "./pages/login/Login.jsx";
// import { Registration } from "./pages/registration/registration.jsx";
import { MyPlaylist } from "./pages/myplaylist/MyPlaylist.jsx";
import { Main } from "./pages/main/main.jsx";
import { Error } from "./pages/error/Error.jsx";
import { ProtectedRoute } from "./pages/ProtectedRoute.jsx";
import { useState } from 'react';
import { useContext, useEffect } from 'react';
import Context from "./contexts.jsx";

export const AppRoutes = () => {

    const { handleLogin, user, setUser, addLogin } = useContext(Context)

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* <Route path="/registration" element={<Registration />} /> */}

      <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
        <Route path="/MyPlaylist" element={<MyPlaylist />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/" element={<Main />} />

      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
};