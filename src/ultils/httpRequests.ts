const rootPath = 'http://localhost:3000'

export async function postRequest(path = "", data: any = JSON.stringify({}), headers: any = {}) {
  const response = await fetch(rootPath + path, {
    method: "POST",
    credentials: "include",
    body: data,
    headers: {...headers,
      "Content-Type": "application/json"
    },
  });

  if (response?.ok) {
    return response.json();
  } else {
    return Promise.reject("Invalid response");
  }
}


export async function getRequest(path = "", headers: any = {}) {
  const response = await fetch(rootPath + path, {
    method: "GET",
    credentials: "include",
    headers: {...headers,
      "Content-Type": "application/json"
    },
  });

  if (response?.ok) {
    return response.json();
  } else {
    return Promise.reject("Invalid response");
  }
}

export async function putRequest(path = "", data: any, headers: any = {}) {
  const response = await fetch(rootPath + path, {
    method: "PUT",
    credentials: "include",
    body: data,
    headers: {...headers
    },
  });

  if (response?.ok) {
    return response.json();
  } else {
    return Promise.reject("Invalid response");
  }
}
