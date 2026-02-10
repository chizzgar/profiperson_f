import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { useCreateUserMutation } from "@/app/services/api";

type FormValues = {
  username: string;
  email: string;
  role: "customer" | "worker" | "";
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  username: yup.string().required("Имя обязательно"),
  email: yup
    .string()
    .email("Введите корректный email")
    .required("Email обязателен"),
  role: yup
    .mixed<FormValues["role"]>()
    .oneOf(["customer", "worker"], "Выберите роль")
    .required("Роль обязательна")
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver<FormValues>(schema) });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setSubmitError(null);
    setIsSuccess(false);

    if (!values.role) {
      setSubmitError("Выберите роль.");
      return;
    }

    try {
      await createUser({
        username: values.username,
        email: values.email,
        role: [values.role],
        isActive: true
      }).unwrap();
      setIsSuccess(true);
      navigate("/");
    } catch (error) {
      console.error("Failed to register user:", error);
      setSubmitError("Не удалось зарегистрировать пользователя.");
    }
  };

  return (
    <div className="page">
      <div className="shell">
        <section className="hero">
          <h1>Регистрация</h1>
          <p>
            Заполните данные, чтобы создать учетную запись и выбрать роль в
            сервисе.
          </p>
        </section>

        <section className="card">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label htmlFor="username">Имя</label>
              <input
                id="username"
                type="text"
                placeholder="Иван Петров"
                {...register("username")}
              />
              {errors.username ? <span>{errors.username.message}</span> : null}
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register("email")}
              />
              {errors.email ? <span>{errors.email.message}</span> : null}
            </div>
            <div className="field">
              <label htmlFor="role">Роль</label>
              <select id="role" {...register("role")}>
                <option value="">Выберите роль</option>
                <option value="customer">Заказчик</option>
                <option value="worker">Исполнитель</option>
              </select>
              {errors.role ? <span>{errors.role.message}</span> : null}
            </div>
            {submitError ? <span className="form-error">{submitError}</span> : null}
            {isSuccess ? (
              <span className="form-success">Регистрация прошла успешно.</span>
            ) : null}
            <button type="submit" className="primary" disabled={isLoading}>
              {isLoading ? "Отправка..." : "Зарегистрироваться"}
            </button>
          </form>
          <div className="auth-footer">
            <Link to="/">Уже есть аккаунт? Войти</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RegisterPage;
