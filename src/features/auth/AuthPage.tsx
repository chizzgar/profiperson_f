import { useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "@/app/hooks.ts";
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
              className={`button ${role === "customer" ? "active" : ""}`}
              onClick={() => {
                setRoleState("customer");
                dispatch(setRole("customer"));
              }}
            >
              Заказчик
            </button>
            <button
              type="button"
              className={`button ${role === "worker" ? "active" : ""}`}
              onClick={() => {
                setRoleState("worker");
                dispatch(setRole("worker"));
              }}
            >
              Исполнитель
            </button>
          </div>

          {role ? <LoginForm role={role} /> : null}

          <div className="auth-footer">
            <Link to="/register">Регистрация</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthPage;
