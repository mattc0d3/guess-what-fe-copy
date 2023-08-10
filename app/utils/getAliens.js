import axios from 'axios';
const api = axios.create({
  baseURL: 'https://guess-what-api.onrender.com/api',
});

export const getAliens = () => {
  return api.get('/aliens').then(({ data }) => data.aliens);
};

export const getQuestions = () => {
  return api.get('/questions').then(({ data }) => data.questions);
};

export const getLeaderboard = (sort_by, timePeriod, page) => {
  const params = { sort_by, page };
  if (timePeriod) {
    params.period = timePeriod;
  }
  return api.get(`/users`, { params }).then(({ data }) => data);
};

export const postUser = (username, score, minutes, seconds) => {
  if (!username) return console.log('No username set');
  return api.post('/users', {
    username: username,
    score: score,
    minutes: minutes,
    seconds: seconds,
  });
};
