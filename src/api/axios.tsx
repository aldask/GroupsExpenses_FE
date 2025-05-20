import axios from "axios";

export type Group = {
  id: number;
  title: string;
};

const api = axios.create({
  baseURL: "https://localhost:7208/api",
});

export const getGroups = async () => {
  try {
    const response = await api.get<Group[]>("/groups");
    return response.data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
};
