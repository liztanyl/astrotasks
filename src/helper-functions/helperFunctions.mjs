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

const sendAlert = (setTimerActive, sessionType) => {
  const title = sessionType === 'work' || sessionType === 'work demo'
    ? "🔔🔔 Break's over. Let's get back to work! 🔔🔔\nFocus for the next 25 minutes."
    : '🌴🌴 Time to take a break! 🌴🌴\nTake a short walk and get some water. ';
  const options = {
    body: '⌛ Click me to start the timer.',
  };
  const alert = new Notification(title, options);
  alert.onclick = () => {
    window.focus();
    setTimerActive(true);
  };
};

export {
  getTasks,
  getDocumentCookie,
  sendAlert,
};
