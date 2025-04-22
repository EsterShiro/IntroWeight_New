const mongoose = require('mongoose');
const axios = require('axios');

// เชื่อมต่อ MongoDB (เหมือนเดิม)
mongoose.connect('mongodb://localhost:27017/exercisedb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB for ExerciseDB'))
  .catch(err => console.error('Could not connect to MongoDB for ExerciseDB', err));

// สร้าง Schema สำหรับข้อมูลท่าออกกำลังกาย
const exerciseSchema = new mongoose.Schema({
  bodyPart: String,
  equipment: String,
  gifUrl: String,
  id: String,
  name: String,
  target: String,
  secondaryMuscles: [String],
  instructions: [String],
  timestamp: { type: Date, default: Date.now }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

// ฟังก์ชันสำหรับเรียก API จาก ExerciseDB และบันทึกข้อมูล
async function fetchExerciseDataAndSave() {
  try {
    const response = await axios.get('https://exercisedb.p.rapidapi.com', {
      headers: {
        'X-RapidAPI-Key': 'YOUR_EXERCISEDB_API_KEY',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    });

    const exerciseData = response.data;

    // บันทึกข้อมูลลง MongoDB (อาจต้องวน loop และใช้ insertMany)
    await Exercise.insertMany(exerciseData);
    console.log('Exercise data fetched and saved successfully');

  } catch (error) {
    console.error('Error fetching or saving exercise data:', error);
  }
}

// เรียกฟังก์ชันเพื่อดึงและบันทึกข้อมูล
// (ควรพิจารณาว่าจะเรียกเมื่อไหร่ เช่น ตอนเริ่มต้น Server หรือตามกำหนดเวลา)
// fetchDataAndSave();