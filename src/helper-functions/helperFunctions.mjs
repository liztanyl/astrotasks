import axios from 'axios';

const getDocumentCookie = (cookieName) => {
  const valueIndex = 1;
  const cookie = document.cookie
    .split('; ')
    .find((c) => c.startsWith(cookieName))
    ?.split('=')[valueIndex];
  if (cookieName === 'userName'
  || cookieName === 'login') {
    return cookie;
  }
  if (cookieName === 'bootcamp') {
    if (cookie === 'false') return false;
    return cookie;
  }
  return Number(cookie);
};

const getTasks = async () => {
  const userId = getDocumentCookie('userId');
  const { data } = await axios.post('/tasks', { userId });
  return data;
};

export {
  getTasks,
  getDocumentCookie,
};
