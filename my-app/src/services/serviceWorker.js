import Request from 'superagent';

export const getWeatherFromUrl = (url) => new Promise(((resolve, reject) => {
  Request('GET', url)
    .end((err, res) => {
      if (err) reject(err);
      resolve(res.body);
    });
}));

export function compare(a, b) {
  debugger;
  if (a.dateIni < b.dateIni) {
    return -1;
  }
  if (a.dateIni > b.dateIni) {
    return 1;
  }
  return 0;
}

export default getWeatherFromUrl;
