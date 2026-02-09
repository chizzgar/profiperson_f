import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./features/auth/AuthPage";
import ProvidersPage from "./features/providers/ProvidersPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/providers" element={<ProvidersPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
