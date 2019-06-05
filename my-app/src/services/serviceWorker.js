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

export const getDailyEvents = (url, token) => new Promise(((resolve, reject) => {
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


export function checkIfShowNewEvent(actualIndex, events, allDayEventTitle) {
  let showEvent = true;
  const now = moment();
  try {
    debugger;
    if(allDayEventTitle === undefined  && actualIndex < events.length){
      const eventStartTime = moment(events[actualIndex].entryDate);
      const eventStopTime = moment(events[actualIndex].departureDate);
  
      if(calculateUntilEventStart(now, eventStartTime) < 0 ){
        showEvent = true;
      }
      else{
        showEvent = false;
      } 
    }
    else{
      if(allDayEventTitle === undefined){
        showEvent = false;
      }

    }
   
  } catch (error) {
  }

  return showEvent;

}

export function calculateUntilEventStart(actualTime, startTime) {
  let timeRemaindingToStart = startTime.diff(actualTime)
  return timeRemaindingToStart;

}

export function calculateUntilEventEnd(actualTime, endTime) {
  let  timeRemaindingToFinish =  endTime.diff(actualTime);
  return timeRemaindingToFinish;


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
