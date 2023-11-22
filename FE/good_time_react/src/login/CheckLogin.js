import axios from "axios";

export const Checklogin = async (Id, Password) => {
  const result = await axios.post("/v1/{roomId}/login", { Id, Password }); //url 수정
  return result.data.data;
};
