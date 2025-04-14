import axios from 'axios';

const API = 'http://localhost:3001/api/resumes';

export const getResumes = () => axios.get(API).then(res => res.data);
export const createResume = (data: Array<string>) => axios.post(API, data).then(res => res.data);
export const updateResume = (id: string, data: Array<string>) => axios.put(`${API}/${id}`, data).then(res => res.data);
export const deleteResume = (id: string) => axios.delete(`${API}/${id}`);