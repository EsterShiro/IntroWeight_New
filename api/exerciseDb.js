// api/exerciseDb.js
const baseUrl = 'https://exercisedb.p.rapidapi.com';

const apiHeaders = {
  'X-RapidAPI-Key': '58829529d2msh972c1ce84984284p19b7e4jsn1ac2ddef1c4f',
  'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
};

const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const fetchExercises = async (bodyPart) => {
  const url = `${baseUrl}/exercises/bodyPart/${bodyPart}`;
  return fetchData(url, { headers: apiHeaders });
};

export const fetchExerciseDetail = async (exerciseId) => {
  const url = `${baseUrl}/exercises/exercise/${exerciseId}`;
  return fetchData(url, { headers: apiHeaders });
};

// คุณสามารถเพิ่มฟังก์ชันอื่น ๆ สำหรับเรียก API อื่น ๆ ที่เกี่ยวข้องได้