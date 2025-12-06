import axios from 'axios';

const BACKEND_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE,
  timeout: 3500,
  headers: {
    'Content-Type': 'application/json'
  }
});

/* ---------- LocalStorage Mock (fallback) ---------- */
const MOCK_KEY = 'sb_modules_v1';

function readMockModules() {
  try {
    const raw = localStorage.getItem(MOCK_KEY);
    if (!raw) {
      const sample = [
        { id: 1, name: 'Calculus I', examType: 'written', notes: [], tokensEarned: 0 },
        { id: 2, name: 'Database Systems', examType: 'presentation', notes: [], tokensEarned: 0 }
      ];
      localStorage.setItem(MOCK_KEY, JSON.stringify(sample));
      return sample;
    }
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeMockModules(arr) {
  localStorage.setItem(MOCK_KEY, JSON.stringify(arr));
}

/* ---------- API wrapper with fallback ---------- */
async function safeRequest(promise, fallback) {
  try {
    const res = await promise;
    return res.data;
  } catch (err) {
    // If fallback is provided (function) use it
    if (typeof fallback === 'function') return fallback();
    throw err;
  }
}

/* Module APIs */
export const getModules = () =>
  safeRequest(
    axiosInstance.get('/modules'),
    () => new Promise((resolve) => setTimeout(() => resolve(readMockModules()), 300))
  );

export const createModule = (moduleData) =>
  safeRequest(
    axiosInstance.post('/modules', moduleData),
    () =>
      new Promise((resolve) => {
        const arr = readMockModules();
        const id = arr.length ? Math.max(...arr.map(m => m.id)) + 1 : 1;
        const newModule = { id, ...moduleData, notes: [], tokensEarned: 0 };
        arr.push(newModule);
        writeMockModules(arr);
        setTimeout(() => resolve(newModule), 250);
      })
  );

export const getModuleById = (id) =>
  safeRequest(
    axiosInstance.get(`/modules/${id}`),
    () =>
      new Promise((resolve) => {
        const arr = readMockModules();
        setTimeout(() => resolve(arr.find(m => Number(m.id) === Number(id))), 200);
      })
  );

export const updateModule = (id, patch) =>
  safeRequest(
    axiosInstance.put(`/modules/${id}`, patch),
    () =>
      new Promise((resolve) => {
        const arr = readMockModules();
        const idx = arr.findIndex(m => Number(m.id) === Number(id));
        if (idx === -1) return resolve(null);
        arr[idx] = { ...arr[idx], ...patch };
        writeMockModules(arr);
        setTimeout(() => resolve(arr[idx]), 250);
      })
  );

export const deleteModule = (id) =>
  safeRequest(
    axiosInstance.delete(`/modules/${id}`),
    () =>
      new Promise((resolve) => {
        const arr = readMockModules().filter(m => Number(m.id) !== Number(id));
        writeMockModules(arr);
        setTimeout(() => resolve({ success: true }), 200);
      })
  );

