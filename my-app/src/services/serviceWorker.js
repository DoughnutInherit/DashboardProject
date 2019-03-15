import Request from 'superagent';

export const getWeatherFromUrl = (url) => new Promise(((resolve, reject) => {
  Request('GET', url)
    .end((err, res) => {
      if (err) reject(err);
      if (res !== undefined) {
        resolve(res.body);
      }
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

export const getJwtBearer = (user, method, url) => new Promise(((resolve, reject) => {
  debugger;
  Request(method, url)
    .set('Content-Type', 'application/json')
    .set('email', user.email)
    .set('password', user.password)
    .end((err, result) => {
      if (err) reject(err);
      resolve(result);
    });
}));

export const authorizedRequest = (bearerToken, method, url) => new Promise(((resolve, reject) => {
  Request(method, url)
    .set('bearer', bearerToken)
    .end((err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result.body);
    });
}));

export default getWeatherFromUrl;
