export const logout = async () => {
  const response = await fetch("http://localhost:3000/logout", {
    method: "POST",
    credentials: "include", // Include cookies to clear them
  });
  
  if (!response.ok) {
    throw new Error("Logout failed");
  }
  
  return response.json();
};

