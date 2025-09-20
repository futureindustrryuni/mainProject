import React, { useRef, useState } from "react";
import { GoShieldCheck } from "react-icons/go";
import { IoMdFingerPrint } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginRegister() {
  const [loginStatus, setLoginStatus] = useState(true);
  const [registerStatus, setRegisterStatus] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  let imgsShadow = useRef(null);
  const navigate = useNavigate();
  const API_BASE = "http://localhost:8000"; // consider moving to env

  function changePoster() {
    if (imgsShadow.current) {
      imgsShadow.current.className =
        "size-[30rem] scale-[1.1] overflow-hidden duration-500 bg-white rounded-2xl dark:shadow-white/10 shadow-2xl lg:block hidden";
      setTimeout(() => {
        imgsShadow.current.className =
          "size-[30rem] scale-[1] overflow-hidden duration-500 bg-white rounded-2xl dark:shadow-white/10 shadow-xl lg:block hidden";
      }, 2000);
    }
  }

  function loginHandler() {
    changePoster();
    setTimeout(() => {
      setLoginStatus(true);
      setRegisterStatus(false);
    }, 1000);
  }

  function registerHandler() {
    changePoster();
    setTimeout(() => {
      setLoginStatus(false);
      setRegisterStatus(true);
    }, 1000);
  }

  //sweetAlert
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  //check email exists
  async function emailExistsHandler(userEmail) {
    const res = await fetch(`${API_BASE}/api/user/checkmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEmail),
    });
    if (!res.ok) {
      throw new Error("Email check failed");
    }
    return res.json();
  }

  //resetForm
  function resetForm() {
    setRegisterForm({ email: "", password: "", password_confirmation: "" });
  }

  //handle register
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [existsEmail, setExistsEmail] = useState(true);

  // login state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (
      registerForm.email &&
      registerForm.password &&
      registerForm.password_confirmation
    ) {
      if (emailRegex.test(registerForm.email.trim())) {
        if (registerForm.password.trim().length >= 6) {
          if (
            registerForm.password.trim() ===
            registerForm.password_confirmation.trim()
          ) {
            try {
              setRegisterLoading(true);
              const result = await emailExistsHandler({
                email: registerForm.email,
              });
              const emailExists = !!result?.exists;
              setExistsEmail(emailExists);

              if (!emailExists) {
                const res = await fetch(`${API_BASE}/api/auth/register`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(registerForm),
                });
                if (!res.ok) {
                  const errorBody = await res.json().catch(() => ({}));
                  throw new Error(errorBody?.message || "Registration failed");
                }
                const data = await res.json();
                if (data?.token) {
                  localStorage.setItem("token", data.token);
                }
                Toast.fire({
                  icon: "success",
                  title: "ثبت نام با موفقیت انجام شد",
                });
                navigate("/");
                resetForm();
              } else {
                Toast.fire({
                  icon: "error",
                  title: "متاسفانه ایمیل قبلا استفاده شده است",
                });
              }
            } catch (err) {
              Toast.fire({
                icon: "error",
                title: err.message || "خطای غیرمنتظره",
              });
            } finally {
              setRegisterLoading(false);
            }
          } else {
            Toast.fire({
              icon: "error",
              title: "رمز عبور با تایید آن برابر نیست",
            });
          }
        } else {
          Toast.fire({
            icon: "error",
            title: "رمز عبور باید حدقل 6 کاراکتر باشد",
          });
        }
      } else {
        Toast.fire({ icon: "error", title: "ایمیل باید طبق الگو وارد شود" });
      }
    } else {
      Toast.fire({ icon: "error", title: "لطفا همه فیلد ها را پر کنید" });
    }
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      Toast.fire({ icon: "error", title: "ایمیل و رمز عبور را وارد کنید" });
      return;
    }
    try {
      setLoginLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "ورود ناموفق بود");
      }
      const data = await res.json();
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      Toast.fire({ icon: "success", title: "ورود موفق" });
      navigate("/");
    } catch (err) {
      Toast.fire({ icon: "error", title: "خطای غیرمنتظره" });
    } finally {
      setLoginLoading(false);
    }
  }

  return (
    <div className="bg-primaryLight h-[100vh] flex items-center justify-center flex-row-reverse dark:bg-dark/99 ">
      <Link
        to="/"
        className="absolute top-4 right-4 bg-primary px-5 py-1 rounded-lg "
      >
        برگشت
      </Link>

      <div className="relative sm:flex hidden p-[1rem] rounded-tl-xl rounded-bl-xl bg-light dark:bg-dark/90 h-[20rem] items-center justify-between flex-col">
        <span
          style={
            loginStatus
              ? { transform: "translateY(.3rem)" }
              : { transform: "translateY(7rem)" }
          }
          className="bg-primary absolute left-[-.3rem] top-[0] translate-y-[6rem] duration-300 h-[33%] w-[.3rem] rounded-full "
        ></span>
        <div className="grid place-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#fff"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-brand-react"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102" />
            <path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102" />
            <path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2" />
            <path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2" />
            <path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896" />
            <path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897" />
            <path d="M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732z" />
          </svg>
          <p className="font-bold text-dark dark:text-white ">
            پرو<span className="text-primary">ج</span>ه
          </p>
        </div>
        <div className="grid place-items-center cursor-pointer">
          <IoMdFingerPrint
            onClick={loginHandler}
            className={`text-[2.5rem] ${
              loginStatus ? "bg-primary" : "bg-dark/10 dark:bg-white/30"
            }  p-2 rounded-lg duration-400 hover:bg-primary`}
          />
          <p className="text-[.9rem] mt-[.2rem] text-dark dark:text-white">
            ورود
          </p>
        </div>
        <div className="grid place-items-center cursor-pointer">
          <GoShieldCheck
            onClick={registerHandler}
            className={`text-[2.5rem] ${
              registerStatus ? "bg-primary" : "bg-dark/10 dark:bg-white/30"
            } p-2 rounded-lg duration-400 hover:bg-primary`}
          />
          <p className="text-[.8rem] mt-[.2rem] text-dark dark:text-white">
            ثبت نام
          </p>
        </div>
      </div>

      <div
        ref={imgsShadow}
        className={`h-[30rem] lg:block hidden overflow-hidden duration-500 rounded-2xl border border-transparent dark:border-zinc-200/40 shadow-xl dark:shadow-none shadow-dark/20 `}
      >
        <div
          className={`lg:block hidden bg-white dark:bg-dark ${
            loginStatus ? "translate-y-[0rem]" : ""
          } ${registerStatus ? "translate-y-[-30rem]" : ""} duration-700`}
        >
          <img src="/images/Company-amico.svg" alt="" className="w-[30rem] " />
          <img
            src="/images/Authentication-rafiki.svg"
            alt=""
            className="w-[30rem] "
          />
          <img src="/images/Ok-bro.svg" alt="" className="w-[30rem] " />
        </div>
      </div>

      <div className="bg-white dark:bg-dark text-dark dark:text-white h-[28rem] w-[24rem] overflow-hidden  rounded-tr-xl rounded-br-xl p-[.5rem] px-[1rem] ">
        <div
          className={`${
            loginStatus ? " translate-y-[2rem]" : " translate-y-[-26rem]"
          } duration-500`}
        >
          {/*login:2rem - register:-26rem*/}

          {/*login*/}
          <form
            onSubmit={handleLoginSubmit}
            className="flex items-center justify-center flex-col"
          >
            <h1 className="font-bold text-3xl mb-3 mt-3">ورود</h1>
            <div className="mb-5 text-[.9rem] flex gap-1.5">
              اکانتی برای ورود ندارید؟
              <p
                onClick={registerHandler}
                className="text-primary cursor-pointer"
              >
                ثبت نام
              </p>
            </div>
            <div className="w-[100%] px-5">
              <label htmlFor="login-email">ایمیل</label>
              <div className="border-[1.6px] mt-2 mb-4 rounded-lg p-2 dark:border-white/20 border-dark/10 flex items-center justify-center">
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  className="w-full"
                  placeholder="example@gmail.com"
                  value={loginForm.email}
                  autoComplete="email"
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                />
                {/* <TfiEmail className="text-[1.2rem] ml-[.5rem] " /> */}
              </div>
              <label htmlFor="login-password">رمز عبور</label>
              <div className="border-[1.6px] mt-2 p-2 rounded-lg dark:border-white/20 border-dark/10 flex items-center justify-center">
                <input
                  id="login-password"
                  name="password"
                  className="w-full"
                  placeholder="M7aqK#"
                  type={showLoginPassword ? "text" : "password"}
                  value={loginForm.password}
                  autoComplete="current-password"
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                />
                {showLoginPassword ? (
                  <FaRegEyeSlash
                    className="text-[1.2rem] ml-[.5rem] cursor-pointer"
                    onClick={() => setShowLoginPassword(false)}
                  />
                ) : (
                  <FaRegEye
                    className="text-[1.2rem] ml-[.5rem] cursor-pointer"
                    onClick={() => setShowLoginPassword(true)}
                  />
                )}
              </div>
              <div>
                <a
                  href=""
                  className="text-[.8rem] mt-2 text-center inline-block"
                >
                  رمز عبور خود را فراموش کرده اید؟
                </a>
              </div>
              <button
                type="submit"
                className="relative bg-primary duration-300 flex items-center before:content-[''] before:h-[100%] before:w-[100%] before:bg-blue-50/10 before:rotate-180 before:absolute before:bottom-[-100%] before:left-[0] hover:before:translate-y-[-100%] overflow-hidden before:duration-500 justify-center cursor-pointer w-[100%] rounded-xl p-2 mt-5 text-white "
              >
                {!loginLoading ? (
                  <p className="mb-2">ورود</p>
                ) : (
                  <span className="loader"></span>
                )}
              </button>
            </div>
          </form>

          {/*register*/}
          <form
            onSubmit={handleRegisterSubmit}
            className="flex items-center justify-center flex-col mt-[3rem]"
          >
            <h1 className="font-bold text-3xl mb-3 mt-3">ثبت نام</h1>
            <p className="mb-5 text-[.9rem] flex gap-1.5">
              از قبل حسابی برای خود ساخته اید؟{" "}
              <span
                onClick={loginHandler}
                className="text-primary cursor-pointer"
              >
                ورود
              </span>
            </p>
            <div className="w-[100%] px-5">
              <label htmlFor="register-email">ایمیل</label>
              <div className="border-[1.6px] mt-1 mb-4 rounded-lg p-2 dark:border-white/20 border-dark/10 flex items-center justify-center">
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  className="w-full"
                  placeholder="example@gmail.com"
                  value={registerForm.email}
                  autoComplete="email"
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, email: e.target.value })
                  }
                />
              </div>
              <label htmlFor="register-password">رمز عبور</label>
              <div className="border-[1.6px] mt-1 mb-4 rounded-lg p-2 dark:border-white/20 border-dark/10 flex items-center justify-center">
                <input
                  id="register-password"
                  name="password"
                  type={showRegisterPassword ? "text" : "password"}
                  className="w-full"
                  placeholder="M7aqK#"
                  value={registerForm.password}
                  autoComplete="new-password"
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      password: e.target.value,
                    })
                  }
                />
                {showRegisterPassword ? (
                  <FaRegEyeSlash
                    className="text-[1.2rem] ml-[.5rem] cursor-pointer"
                    onClick={() => setShowRegisterPassword(false)}
                  />
                ) : (
                  <FaRegEye
                    className="text-[1.2rem] ml-[.5rem] cursor-pointer"
                    onClick={() => setShowRegisterPassword(true)}
                  />
                )}
              </div>
              <label htmlFor="register-password-confirm">تایید رمز عبور</label>
              <div className="border-[1.6px] mt-1 p-2 rounded-lg dark:border-white/20 border-dark/10 flex items-center justify-center">
                <input
                  id="register-password-confirm"
                  name="password_confirmation"
                  type={showRegisterPassword ? "text" : "password"}
                  className="w-full"
                  placeholder="M7aqK#"
                  value={registerForm.password_confirmation}
                  autoComplete="new-password"
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      password_confirmation: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type="submit"
                className="relative bg-primary duration-300 flex items-center before:content-[''] before:h-[100%] before:w-[100%] before:bg-blue-50/10 before:rotate-180 before:absolute before:bottom-[-100%] before:left-[0] hover:before:translate-y-[-100%] overflow-hidden before:duration-500 justify-center cursor-pointer w-[100%] rounded-xl p-2 mt-3 text-white "
              >
                {!registerLoading ? (
                  <p className="mb-2">ثبت نام</p>
                ) : (
                  <span className="loader"></span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
