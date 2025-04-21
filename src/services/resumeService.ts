import axios from 'axios';

const API = 'http://localhost:3001/api/resumes';

//조회
export const getResumes = () => 
    axios.get(API).then(res => res.data);

//등록
export const createResume = (data: Array<string>) => 
    axios.post(API, data).then(res => res.data);

//수정
export const updateResume = (id: string, data: Array<string>) => 
    axios.put(`${API}/${id}`, data).then(res => res.data);

//삭제
export const deleteResume = (id: string) => 
    axios.delete(`${API}/${id}`);


