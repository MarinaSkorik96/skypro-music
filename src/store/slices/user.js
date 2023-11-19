import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getFreshToken = createAsyncThunk(
  'user/getFreshToken',
  async function (refresh) {
    const response = await fetch('https://skypro-music-api.skyeng.tech/user/token/refresh/', {
      method: "POST",
      body: JSON.stringify({
        refresh: refresh,
      }),
      headers: {
        // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
        "content-type": "application/json",
      },
      
    });
    const accessToken = await response.json();
    return accessToken
  }
)

const initialState = {
  id: null,
  userName: "",
  email: "",
  refresh: "",
  access: "",
};

const getUserSlace = createSlice({
  name: 'user',
  initialState,
  reducers: {
    currentUserToken(state, action) {
      const { access, refresh } = action.payload
      state.refresh = refresh;
      state.access = access;
    },
    currentUser(state, action) {
      state.userName = action.payload.user.username;
      state.email = action.payload.user.email;
      state.id = action.payload.user.id;
    }
  },
  extraReducers: {
    [getFreshToken.fulfilled]: (state, action) => {
      state.access = action.payload.access;
    },
    // [fetchTodos.rejected]: setError,
  }
});


export const { currentUserToken, currentUser } = getUserSlace.actions;

export default getUserSlace.reducer;