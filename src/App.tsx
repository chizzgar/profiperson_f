import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./features/auth/AuthPage";
import RegisterPage from "./features/auth/RegisterPage";
import ProvidersPage from "./features/providers/ProvidersPage";
import UsersPage from "./features/users/UsersPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/providers" element={<ProvidersPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
