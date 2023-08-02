
/**
 * Send Data to Local Storage
 */
const sendDataLS = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  

/**
 * Get Data from Local Storage
 */
const getDataLS = (key) => {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
    return [];
  };


/**
 * Create Alert 
 */
const createAlert = (msg, type = "danger") => {
    return`<p class=" alert alert-${type} d-flex justify-content-between"> ${msg} 
        <button class="btn-close" data-bs-dismiss="alert"> </button>
    </p>`
};


/**
 * Number Check
 */
const isNumber = (num) => {
    const pattern = /^[0-9]{6,}$/;
    return pattern.test(num);
  };


 /**
 * Time Ago
 */
const timeAgo = (timestamp) => {
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
    const MONTH = 30 * DAY;
    const YEAR = 365 * DAY;
  
    const timeElapsed = Date.now() - timestamp;
  
    if (timeElapsed < MINUTE) {
      return `${Math.floor(timeElapsed / SECOND)} seconds ago`;
    } else if (timeElapsed < HOUR) {
      return `${Math.floor(timeElapsed / MINUTE)} minutes ago`;
    } else if (timeElapsed < DAY) {
      return `${Math.floor(timeElapsed / HOUR)} hours ago`;
    } else if (timeElapsed < WEEK) {
      return `${Math.floor(timeElapsed / DAY)} days ago`;
    } else if (timeElapsed < MONTH) {
      return `${Math.floor(timeElapsed / WEEK)} weeks ago`;
    } else if (timeElapsed < YEAR) {
      return `${Math.floor(timeElapsed / MONTH)} months ago`;
    } else {
      return `${Math.floor(timeElapsed / YEAR)} years ago`;
    }
  };

 /**
 * Create a random ID 
 */

 const generateRandomUniqueID = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const characterCount = characters.length;
  let result = '';

  while (result.length < length) {
    const randomBytesArray = new Uint8Array(8); // 8 bytes = 64 bits
    window.crypto.getRandomValues(randomBytesArray);
    for (let i = 0; i < randomBytesArray.length && result.length < length; i++) {
      const randomIndex = randomBytesArray[i] % characterCount;
      result += characters.charAt(randomIndex);
    }
  }

  return result;
}
