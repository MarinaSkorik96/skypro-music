
export async function getTodos() {
  const response = await fetch('https://skypro-music-api.skyeng.tech/catalog/track/all/');


  if (!response.ok) {
    throw new Error("Ошибка сервера")
  }

  const tracks = await response.json();
  return tracks
}

export async function getAuthorization({ email, password }) {
  const response = await fetch("https://skypro-music-api.skyeng.tech/user/signup/", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      username: email,
    }),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      "content-type": "application/json",
    },
  })
  if (response.status === 500) {
    throw new Error("Сервер не отвечает")
  }
  const user = await response.json();
  return user
}

export async function getLogin({ email, password }) {
  const response = await fetch("https://skypro-music-api.skyeng.tech/user/login/", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      "content-type": "application/json",
    },
  })
  if (response.status === 500) {
    throw new Error("Сервер не отвечает")
  }
  const user = await response.json();
  return user
}

export async function getToken({ email, password }) {
  const response = await fetch("https://skypro-music-api.skyeng.tech/user/token/", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      "content-type": "application/json",
    },
  })

  const token = await response.json();
  return token
}

// export async function getFreshToken(refreshToken) {
//   const response = await fetch("https://skypro-music-api.skyeng.tech/user/token/", {
//     method: "POST",
//     body: JSON.stringify({
//       refresh: `${refreshToken}`,
//     }),
//     headers: {
//       // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
//       "content-type": "application/json",
//     },
//   })

//   const accessToken = await response.json();
//   return accessToken
// }


export async function getFT() {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNTA4NDk1LCJpYXQiOjE3MDA1MDc5MDYsImp0aSI6ImVmZmZkZWI1NWFkYTQxMjU4MDcxY2YxNGI4ZmUwNDM2IiwidXNlcl9pZCI6MjUxN30.wnNvabNAySHX_bWJ34RP0MHQYyuLT9h-3H6GjSFvNZw";

  const response = await fetch("https://skypro-music-api.skyeng.tech/catalog/track/favorite/all/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const allFT = await response.json();
  console.log(allFT)
  return allFT
}
