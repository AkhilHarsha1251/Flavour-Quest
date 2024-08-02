"use strict";

window.ACCESS_POINT = "https://api.edamam.com/api/recipes/v2";

const /** {String} */ APP_ID = 'f954b53c';
const /** {String} */ API_KEY = 'fb9587238fc9fcbf395830f5fcd958d0';
const /** {String} */ TYPE = 'public'; // Use public for free tier

/**
 * @param {Array} queries Query array
 * @param {Function} successCallback Success callback function
 * @param {Function} errorCallback Error callback function (optional)
 */
export const fetchData = async function (queries, successCallback, errorCallback) {
  const query = queries?.join("&")
    .replace(/,/g, "=")
    .replace(/ /g, "%20")
    .replace(/\+/g, "%2B");

  const url = `${ACCESS_POINT}?app_id=${APP_ID}&app_key=${API_KEY}&type=${TYPE}${query ? `&${query}` : ""}`;

  console.log(url); // Log the URL for debugging

  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    successCallback(data);
  } else {
    if (errorCallback) {
      errorCallback(new Error('Error fetching recipes'));
    } else {
      console.error('Error fetching recipes');
    }
  }
};
