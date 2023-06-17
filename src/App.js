import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./App.module.css";

const fieldsScheme = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[\w_@.]*$/,
      "Ошибка логина. Логин может содержать буквы, цифры, '_', '@', '.'"
    )
    .max(20, "Ошибка логина. Логин может содержать не больше 20 символов.")
    .min(12, "Ошибка логина. Логин должен содержать не менее 12-х символов."),
  password: yup
    .string()
    .matches(/^[\w]*$/, "Ошибка пароля. Пароль должен содержать буквы и цифры.")
    .max(20, "Ошибка пароля. Пароль должен содержать не больше 20 символов.")
    .min(6, "Ошибка пароля. Пароль должен содержать не менее 6-х символов."),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли не совпадают"),
});

export const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(fieldsScheme),
  });

  const onSubmit = (formData) => {
    console.log(formData);
  };

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;
  const repeatPasswordError = errors.repeatPassword?.message;

  return (
    <>
      {emailError && <div className={styles.errorMessage}>{emailError}</div>}
      {passwordError && (
        <div className={styles.errorMessage}>{passwordError}</div>
      )}
      {repeatPasswordError && (
        <div className={styles.errorMessage}>{repeatPasswordError}</div>
      )}

      <div className={styles.app}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            name="email"
            placeholder="email"
            {...register("email")}
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            {...register("password")}
          />
          <input
            type="password"
            name="repeatPassword"
            placeholder="Повторите пароль"
            {...register("repeatPassword")}
          />
          <button
            type="submit"
            disabled={!!emailError || !!passwordError || !!repeatPasswordError}
          >
            Зарегестрирваться
          </button>
        </form>
      </div>
    </>
  );
};
