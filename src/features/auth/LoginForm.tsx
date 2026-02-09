import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAppDispatch } from "@/app/hooks.ts";
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
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = () => {
    dispatch(setAuthenticated(true));
    navigate(role === "client" ? "/users" : "/providers");
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label htmlFor="email">Email ({role === "client" ? "заказчик" : "исполнитель"})</label>
        <input id="email" type="email" placeholder="name@example.com" {...register("email")} />
        {errors.email ? <span>{errors.email.message}</span> : null}
      </div>
      <div className="field">
        <label htmlFor="password">Пароль</label>
        <input id="password" type="password" placeholder="••••••" {...register("password")} />
        {errors.password ? <span>{errors.password.message}</span> : null}
      </div>
      <button type="submit" className="primary">Войти</button>
    </form>
  );
};

export default LoginForm;
