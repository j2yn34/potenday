import axios from "axios";

const serverTest = () => {
  const response = axios.get("/api/api/v1/health");
  console.log("test:", response);
  return <>{response}</>;
};

export default serverTest;
