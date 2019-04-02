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

export function calculateDifference(firstTime, secondTime) {
  const result = firstTime.diff(secondTime);
  return result;
}

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

function nextEvent(title, length, index) {
  if (title !== undefined) {
    if (index === length) {
      return 0;
    }
    if (index === 0) {
      return 1;
    }
  }
  return index;
}

export function calculateTotalEventTime(index, events) {
  const startEventTime = moment(events[index].entryDate);
  const endEventTime = moment(events[index].departureDate);
  const totalTime = calculateDifference(endEventTime, startEventTime);
  return totalTime;
}

export function calculateUntilEventEnd(events, index, title) {
  const indexAux = nextEvent(title, events.length, index);
  const now = moment();
  const actionTime = moment(events[indexAux].departureDate);
  const timeRemeaning = calculateDifference(actionTime, now);
  return timeRemeaning;
}


export function checkNextActionTime(index, title, events) {
  const now = moment();
  let check;
  const indexAux = nextEvent(title, events.length, index);
  if (index === 0 && title !== undefined) {
    check = false;
  } else {
    let eventTimeIni;
    if (indexAux === 0 && title !== undefined) {
      check = true;
    } else {
      try {
        eventTimeIni = moment(events[indexAux].entryDate);
        const timeRemeaning = calculateDifference(eventTimeIni, now);
        if (timeRemeaning <= 0) {
          check = true;
        } else {
          check = false;
        }
      } catch (error) {
        return false;
      }
    }
  }
  return check;
}

export function setCheckedIndex(index, setIndex) {
  if (index === 0) {
    setIndex(1);
  }
}

export function calculateUntilEventStart(events, index, title, allDayEvent, setEvent) {
  const now = moment();
  const indexAux = nextEvent(title, events.length, index);
  setEvent(allDayEvent);
  const actionTime = moment(events[indexAux].entryDate);
  const timeRemeaning = calculateDifference(actionTime, now);
  return timeRemeaning;
}
