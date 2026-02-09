import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import LoginForm from "./LoginForm";
import { setRole, type UserRole } from "./authSlice";

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const [role, setRoleState] = useState<UserRole>(null);

  return (
    <div className="page">
      <div className="shell">
        <section className="hero">
          <h1>Выберите роль и войдите в сервис</h1>
          <p>
            Платформа для быстрых заказов и проверенных специалистов. Дальше
            можно подключить ваш backend без смены UI.
          </p>
        </section>

        <section className="card">
          <div className="role-grid">
            <button
              type="button"
              className={`button ${role === "client" ? "active" : ""}`}
              onClick={() => {
                setRoleState("client");
                dispatch(setRole("client"));
              }}
            >
              Заказчик
            </button>
            <button
              type="button"
              className={`button ${role === "provider" ? "active" : ""}`}
              onClick={() => {
                setRoleState("provider");
                dispatch(setRole("provider"));
              }}
            >
              Исполнитель
            </button>
          </div>

          {role ? <LoginForm role={role} /> : null}
        </section>
      </div>
    </div>
  );
};

export default AuthPage;
