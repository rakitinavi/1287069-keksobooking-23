const API_ADDRESS = 'https://23.javascript.pages.academy/keksobooking';

const getData = () => (
  fetch(`${API_ADDRESS}/data`)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(response.status);
    })
    .then((response) => response.json())
);

const sendData = (form) => (
  fetch(`${API_ADDRESS}`,
    {
      method: 'POST',
      body: new FormData(form),
    },
  ).then((response) => {
    if (response.ok) {
      return response;
    }
    throw new Error(response.status);
  })
);

export {getData, sendData};
