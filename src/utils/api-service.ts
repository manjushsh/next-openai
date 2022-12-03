/* eslint-disable newline-before-return */
import axiosDefault from "axios";

export const API_BASE_URL =
  process?.env?.API_BASE_URL || "http://3.86.200.86:8080";
export const AxiosConfig = {
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
};
export const axios = axiosDefault.create(AxiosConfig);

const ApiService = {
  fetchUserProfile: () => {
    return axios
      .get("/get_profile")
      .then((response) => response)
      .catch((error) => console.debug(error))
      .finally(() => {
        /* Do Something */
      });
  },
  fetchSkills: () => {
    return axios
      .get("/get_skills")
      .then((response) => response)
      .catch((error) => console.debug(error));
  },
  fetchRoles: () => {
    return axios
      .get("/get_roles")
      .then((response) => response)
      .catch((error) => console.debug(error));
  },
  fetchSuggestedJobs: (page) => {
    return axios
      .get(`/get_jobs?${page}`)
      .then((response) => response)
      .catch((error) => console.debug(error));
  },
  fetchSimilarJobs: (jobId, page) => {
    return axios
      .get(`/get_jobs?jobId=${jobId}&page=${page}`)
      .then((response) => response)
      .catch((error) => console.debug(error));
  },

  // POST API

  createApplication: (data: {
    candidateID: string | number;
    jobPostId: string | number;
  }) => {
    return axios
      .post("/create_application", data)
      .then((response) => response)
      .catch((error) => console.debug(error));
  },
  uploadFile: ({ file }) => {
    const formData = new FormData();
    formData.append("File", file);
    return fetch(`${API_BASE_URL}/upload_avatar`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        return result;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  patchProfile: (data) => {
    return axios
      .patch("/update_profile", data)
      .then((response) => response)
      .catch((error) => console.debug(error));
  },
  patchEducation: (data) => {
    return axios
      .patch("/update_education", data)
      .then((response) => response)
      .catch((error) => console.debug(error));
  },
  patchExperience: (data) => {
    return axios
      .patch("/update_experience", data)
      .then((response) => response)
      .catch((error) => console.debug(error));
  },
};

export default ApiService;
