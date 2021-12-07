import { timeoutSeconds } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAXCall = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([fetchPro, timeout(timeoutSeconds)]);
    if (!response.ok)
      throw new Error(`${response.status}, ${response.statusText}`);

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};
