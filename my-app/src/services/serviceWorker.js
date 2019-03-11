import Request from 'superagent';

export const getWeatherFromUrl = (url) => new Promise(((resolve, reject) => {
  Request('GET', url)
    .end((err, res) => {
      if (err) reject(err);
      resolve(res.body);
    });
}));

export const getDailyEvents = (url) => new Promise(((resolve, reject) => {
  Request('GET', url)
    .end((err, res) => {
      if (err) reject(err);
      resolve(res.body);
    });
}));

export function compare(a, b) {
  if (a.entryDate < b.entryDate) {
    return -1;
  }
  if (a.entryDate > b.entryDate) {
    return 1;
  }
  return 0;
}

export default getWeatherFromUrl;
