import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAppDispatch } from "@/app/hooks.ts";
import { useLoginMutation } from "@/app/services/api";
import { setAuthenticated, UserRole } from "./authSlice";

type LoginFormProps = {
  role: UserRole;
};

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .email("Введите корректный email")
    .required("Email обязателен"),
  password: yup
    .string()
    .min(6, "Минимум 6 символов")
    .required("Пароль обязателен")
});

const LoginForm = ({ role }: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null);

    try {
      await login({ email: values.email, password: values.password }).unwrap();
      dispatch(setAuthenticated(true));
      navigate("/users");
    } catch (error) {
      console.error("Failed to authenticate:", error);
      setSubmitError("Неверный email или пароль.");
    }
  };

  const roleLabel = role === "customer" ? "заказчик" : "исполнитель";

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label htmlFor="email">Email ({roleLabel})</label>
        <input id="email" type="email" placeholder="name@example.com" {...register("email")} />
        {errors.email ? <span>{errors.email.message}</span> : null}
      </div>
      <div className="field">
        <label htmlFor="password">Пароль</label>
        <input id="password" type="password" placeholder="••••••" {...register("password")} />
        {errors.password ? <span>{errors.password.message}</span> : null}
      </div>
      {submitError ? <span className="form-error">{submitError}</span> : null}
      <button type="submit" className="primary" disabled={isLoading}>
        {isLoading ? "Проверка..." : "Войти"}
      </button>
    </form>
  );
};

export default LoginForm;
