const API_KEY = 'ecc9b9653871055c523fddbb1d0a95a7';
const BASE_URL  = 'http://api.positionstack.com/v1';

export async function forward(query) {
    try {
      const url = `${BASE_URL}/forward?access_key=${API_KEY}&query=${query}`;
      const response = await fetch(url);
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.log(`Error with function forward ${error.message}`);
      throw error;
    }
  };

export async function reverse(latitude, longitude) {
    try {
      const url = `${BASE_URL}/reverse?access_key=${API_KEY}&query=${latitude},${longitude}`;
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(`Error with function forward ${error.message}`);
      throw error;
    }
  };