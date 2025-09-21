import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { CiEdit } from "react-icons/ci";
import { LiaUserSolid } from "react-icons/lia";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function UserInfo() {
  const [isOpen, setIsOpen] = useState(1);
  const [profileComplete, setProfileComplete] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    family: "",
    birth_date: "",
    meli_code: "",
    phone: "",
    education: "",
    address: "",
    bio: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

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

  // گرفتن اطلاعات کاربر
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/me/profile", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok)
          return res.text().then((text) => {
            throw new Error(text);
          });
        return res.json();
      })
      .then((data) => setProfile(data.data))
      .catch((err) => setError(err.message));
  }, [token]);

  // ست کردن مقادیر فرم وقتی پروفایل لود شد
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        family: profile.family || "",
        role: profile.role || "",
        birth_date: profile.birth_date || "",
        meli_code: profile.meli_code || "",
        phone: profile.phone || "",
        education: profile.education || "",
        address: profile.address || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const CompleteProfileHandler = (e) => {
    e.preventDefault();

    if (
      formData.name &&
      formData.family &&
      formData.phone &&
      formData.address &&
      formData.bio &&
      formData.birth_date &&
      formData.education &&
      formData.meli_code
    ) {
      fetch("http://127.0.0.1:8000/api/users/store", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (!res.ok)
            return res.text().then((text) => {
              throw new Error(text);
            });
          return res.json();
        })
        .then(() => {
          if (profile.profile_completed) {
            Toast.fire({
              icon: "success",
              title: "پروفایل با موفقیت ویرایش شد",
            });
          }else{
            Toast.fire({
            icon: "success",
            title: "پروفایل با موفقیت تکمیل شد",
          });
          }
          
          setTimeout(() => {
            navigate("/panel/userInfo");
          }, 500);
        });
    } else {
      Toast.fire({
        icon: "error",
        title: "فیلد ها را کاملا پر کنید",
      });
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profile) return <Loader />;

  function EditProfileHandler(e) {
    e.preventDefault();
    CompleteProfileHandler(e);
  }

  console.log(profile);

  return (
    <div className="flex bg-white dark:bg-dark text-black dark:text-white">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`${isOpen ? "w-[80%]" : "w-[100%]"}`}>
        <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="p-5 dark:text-white text-black">
          <div className="flex flex-col bg-white dark:bg-[#1B202C] py-6 px-10 gap-7 rounded-xl shadow-[0_3px_15px_5px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-1">
              <LiaUserSolid className="size-7" />
              <p className=" font-IranYekanBold text-[1rem]">اطلاعات فردی</p>
            </div>

            <form className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
              {[
                { label: "نام", name: "name", type: "text" },
                { label: "نام خانوادگی", name: "family", type: "text" },
                { label: "تاریخ تولد", name: "birth_date", type: "text" },
                { label: "کد ملی", name: "meli_code", type: "text" },
                { label: "شماره تلفن", name: "phone", type: "text" },
                {
                  label: "تحصیلات",
                  name: "education",
                  type: "select",
                  options: [
                    "دیپلم",
                    "فوق دیپلم",
                    "لیسانس",
                    "فوق لیسانس",
                    "دکترا",
                    "پرفسورا",
                  ],
                },
                { label: "محل سکونت", name: "address", type: "text" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label className="text-zinc-700 dark:text-zinc-400">
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="placeholder:text-[.9rem] p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20"
                    >
                      <option value="">انتخاب کنید</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="placeholder:text-[.9rem] p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20"
                      placeholder={field.label + " خود را بنویسید..."}
                    />
                  )}
                </div>
              ))}

              <div className="flex flex-col gap-2 lg:col-span-3">
                <label className="text-zinc-700 dark:text-zinc-400">
                  درباره من
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={5}
                  placeholder="توضیحی درباره خودتان بنویسید..."
                  className="placeholder:text-[.9rem] p-3 outline-0 w-full rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 mt-2"
                />
              </div>

              {profile.profile_completed ? (
                <button
                  onClick={EditProfileHandler}
                  className="w-[10rem] flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 duration-300 cursor-pointer p-2 px-5 rounded-lg text-white text-[.9rem] mt-5 col-span-full"
                >
                  ویرایش پروفایل
                </button>
              ) : (
                <button
                  onClick={CompleteProfileHandler}
                  className="w-[10rem] flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 duration-300 cursor-pointer p-2 px-5 rounded-lg text-white text-[.9rem] mt-5 col-span-full"
                >
                  تکمیل پروفایل
                </button>
              )}
            </form>

            {message && alert(message)}
          </div>
        </div>
      </div>
    </div>
  );
}
