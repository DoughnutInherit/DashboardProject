import Request from 'superagent';
import moment from 'moment';

export const getWeatherFromUrl = (url) => new Promise(((resolve, reject) => {
  Request('GET', url)
    .end((err, res) => {
      if (err) reject(err);
      if (res !== undefined) {
        resolve(res.body);
      }
    });
}));

export const getApiData = (url, token) => new Promise(((resolve, reject) => {
  Request('GET', url)
    .set('authorization', token)
    .end((err, res) => {
      if (err) reject(err);
      else resolve(res.body);
    });
}));

export const postBackOffice = (url, info, token, httpMethod = 'POST') => new Promise(((resolve, reject) => {
  Request(httpMethod, url)
    .send(info)
    .set('authorization', token)
    .set('Content-Type', 'application/json')
    .end((err, res) => {
      if (err) reject(err);
      else resolve(res.body);
    });
}));

export const deleteEvent = (url, token) => new Promise(((resolve, reject) => {
  Request('DELETE', url)
    .set('authorization', token)
    .end((err, res) => {
      if (err) reject(err);
      else resolve(res.body);
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

export function checkIfShowEvent(actualIndex, events, allDayEvent) {
  let showEvent = false;
  const now = moment();
  
  if (actualIndex < events.length) {
    const eventStartTime = moment(events[actualIndex].entryDate);
    const eventStopTime = moment(events[actualIndex].departureDate);

    if (eventStartTime.diff(now) < 0 && eventStopTime.diff(now) > 0) {
      if (allDayEvent !== undefined && actualIndex !== 0) {
        showEvent = true;
      }
    }
  }

  return showEvent;
}

export const getJwtBearer = (user, method, url) => new Promise(((resolve, reject) => {
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
