export const login = async (email: string, password: string) => {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include cookies
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    console.error("Login failed");
  }
  
  return response.json();
};