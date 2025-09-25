import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import { Trash2, Eye } from "lucide-react";
import { TbEditCircle } from "react-icons/tb";
import Loader from "../../components/Loader";
import { Toast } from "../../components/Toast";

export default function Articles() {
  const [isOpen, setIsOpen] = useState(1);
  const [addArticle, setAddArticle] = useState(false);
  const [categories, setCategories] = useState(null);
  const [article, setArticle] = useState({
    title: "",
    category_id: "",
    author_id: "",
    reading_time: "",
    tags: "",
    image: null,
    description: "",
  });
  const [articles, setArticles] = useState(null);
  const [files, setFiles] = useState([]);
  const [users, setUsers] = useState(null);
  const token = localStorage.getItem("token");

  //گرفتن کاربران
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/admin/users", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await res.json();
      setUsers(data.data);
      console.log("users : ", data.data);
    } catch (error) {
      console.error("خطا در گرفتن کاربرها:", error);
    }
  };

  //ریست فرم
  function resetForm() {
    setArticle({
      title: "",
      category_id: "",
      author_id: "",
      reading_time: "",
      tags: "",
      image: null,
      description: "",
    });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const preventDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  //درگ دراپ عکس مقاله
  const handleDrop = (e) => {
    preventDefault(e);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
    if (droppedFiles.length > 0) {
      setArticle({ ...article, image: droppedFiles[0] });
    }
  };

  //عکس مقاله
  const handleSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    if (selectedFiles.length > 0) {
      setArticle({ ...article, image: selectedFiles[0] });
    }
  };

  //ریختن اینپوت ها توی استیت
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setArticle({ ...article, [name]: files[0] });
      setFiles([files[0]]);
    } else {
      setArticle({ ...article, [name]: value });
    }
  };

  const renderIcon = (Icon) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  // دریافت دسته‌بندی‌ها
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/categories/show", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setCategories(data);
      console.log("cat : ", data);
    } catch (error) {
      console.log(error);
    }
  };

  // دریافت مقالات
  const fetchArticles = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/articles/show", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setArticles(data);
      console.log(data);
    } catch (err) {
      console.error("خطا در دریافت مقالات:", err);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  // اضافه کردن مقاله جدید
  function handleAddArticle(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("category_id", article.category_id);
    formData.append("author_id", article.author_id);
    formData.append("reading_time", article.reading_time);
    formData.append("tags", article.tags);
    formData.append("description", article.description);

    // فقط اگر فایل انتخاب شده باشد
    if (article.image instanceof File) {
      formData.append("image", article.image);
    }

    if (
      article.title &&
      article.author_id &&
      article.category_id &&
      article.description &&
      article.image &&
      article.reading_time &&
      article.tags
    ) {
      fetch("http://127.0.0.1:8000/api/articles/create", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          Toast.fire({
            icon: "success",
            title: "مقاله ایجاد شد",
          });
          resetForm();
          setAddArticle(false);
          fetchArticles();
        })
        .catch((err) => console.error(err));
    } else {
      Toast.fire({
        icon: "error",
        title: "لطفا فیلد هارا پر کنید",
      });
    }
  }

  //حذف مقاله
  async function handleDeleteArticle(id) {
    // fetchArticle(id);
    console.log(article);
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/articles/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/vnd.api+json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log(data);
      Toast.fire({
        icon: "success",
        title: "مقاله حذف شد",
      });
      // دوباره گرفتن لیست
      fetchArticles();
    } catch (err) {
      console.error("خطا در حذف مقاله:", err);
    }
  }

  //ویرایش مقاله
const handleUpdateArticle = async (id) => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/articles/show/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    console.log("API Response:", result); // ببین چه ساختاری داره

    const data = result.data ?? result; // اگر data وجود نداشت، خود نتیجه را بگیر

    setArticle({
      title: data.title ?? "",
      category_id: data.category_id?.toString() ?? "",
      author_id: data.author_id?.toString() ?? "",
      reading_time: data.reading_time ?? "",
      tags: data.tags ?? "",
      description: data.description ?? "",
      image: null,
    });

    setAddArticle(id);
  } catch (err) {
    console.error("خطا در دریافت مقاله:", err);
  }
};


  // هندل ذخیره (اضافه یا ویرایش)
  function handleSubmitArticle(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("category_id", article.category_id);
    formData.append("author_id", article.author_id);
    formData.append("reading_time", article.reading_time);
    formData.append("tags", article.tags);
    formData.append("description", article.description);

    if (article.image instanceof File) {
      formData.append("image", article.image);
    }

    if (
      article.title &&
      article.author_id &&
      article.category_id &&
      article.description &&
      article.reading_time &&
      article.tags
    ) {
      const url =
        addArticle === true
          ? "http://127.0.0.1:8000/api/articles/create"
          : `http://127.0.0.1:8000/api/articles/update/${addArticle}`;

      const method = addArticle === true ? "POST" : "POST"; // اگر بک‌اندت PUT/POST رو ساپورت کنه تغییر بده
      // لاراول معمولا با POST + _method: PUT آپدیت رو می‌گیره
      if (addArticle !== true) {
        formData.append("_method", "PUT");
      }

      fetch(url, {
        method: method,
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          Toast.fire({
            icon: "success",
            title: addArticle === true ? "مقاله ایجاد شد" : "مقاله ویرایش شد",
          });
          resetForm();
          setAddArticle(false);
          fetchArticles();
        })
        .catch((err) => console.error(err));
    } else {
      Toast.fire({
        icon: "error",
        title: "لطفا فیلد هارا پر کنید",
      });
    }
  }

  if (!articles) return <Loader />;

  return (
    <div className="flex h-screen bg-white dark:bg-dark text-black dark:text-white">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`${isOpen ? "w-[100%] lg:w-[80%] xl:w-[83%]" : "w-[100%]"}`}
      >
        <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="px-5">
          {addArticle ? (
            <form
              onSubmit={
                addArticle === true ? handleAddArticle : handleSubmitArticle
              }
              className="border-[#EEEBEB] dark:border-[#1B202C] dark:bg-[#1B202C] p-5 rounded-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-3">
                  <label className="text-zinc-700 dark:text-zinc-400">
                    عنوان
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={article.title}
                    onChange={handleInputChange}
                    className="placeholder:text-[.9rem] p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20"
                    placeholder="مثال : ساخت ربات تلگرام"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-zinc-700 dark:text-zinc-400">
                    دسته بندی
                  </label>
                  <select
                    name="category_id"
                    value={article.category_id}
                    onChange={handleInputChange}
                    className="placeholder:text-[.9rem] p-2 outline-0 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20"
                  >
                    <option value="">انتخاب کنید</option>
                    {categories?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-zinc-700 dark:text-zinc-400">
                    نویسنده
                  </label>
                  <select
                    name="author_id"
                    value={article.author_id}
                    onChange={handleInputChange}
                    className="placeholder:text-[.9rem] p-2 outline-0 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20"
                  >
                    <option value="">انتخاب کنید</option>
                    {users
                      .filter((user) => user.role === "admin")
                      .map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.email}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-zinc-700 dark:text-zinc-400">
                    زمان مطالعه
                  </label>
                  <input
                    type="text"
                    name="reading_time"
                    value={article.reading_time}
                    onChange={handleInputChange}
                    placeholder="مثال : 12 (به دقیقه)"
                    className="placeholder:text-[.9rem] p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-zinc-700 dark:text-zinc-400">
                    برچسب‌ها
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={article.tags}
                    onChange={handleInputChange}
                    placeholder="مثال : هک و امنیت-شبکه"
                    className="placeholder:text-[.9rem] p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20"
                  />
                </div>
              </div>

              <div className="w-full py-6">
                <div
                  className="rounded-2xl bg-white dark:bg-[#1B202C] flex items-center justify-center flex-col gap-3 h-[20rem] w-full border-2 border-dashed border-gray-300  p-6 text-center"
                  onDragEnter={preventDefault}
                  onDragOver={preventDefault}
                  onDrop={handleDrop}
                >
                  <img
                    src="/images/iconsax-document-upload.png"
                    className="object-cover size-[4rem]"
                    alt=""
                  />
                  <p className="text-lg font-medium">
                    میتوانید عکس ها را درگ کنید در اینجا
                  </p>
                  <p className="text-[.8rem] md:text-[1.1rem] text-gray-400">
                    اندازه پیشنهادی عکس با طول 1600px و با حداکثر 10MB
                  </p>
                  <p className="text-sm">یا</p>

                  <label className="inline-block cursor-pointer rounded-full border border-zinc-300 text-zinc-600 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-sm">
                    اضافه کردن تصویر پروژه
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleSelect}
                    />
                  </label>

                  <div className="text-left">
                    {files.length === 0 ? (
                      <p className="text-[.7rem] text-center text-gray-400">
                        هنوز فایلی انتخاب نشده
                      </p>
                    ) : (
                      <ul className="space-y-1 text-sm">
                        {files.map((file, i) => (
                          <li key={i} className="truncate">
                            📄 {file.name.slice(1, 20)}... {""}
                            <span className="text-gray-400">
                              ({file.size} bytes)
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <label className="text-zinc-700 dark:text-zinc-400 mt-10">
                توضیحات
              </label>
              <textarea
                name="description"
                value={article.description}
                onChange={handleInputChange}
                rows={5}
                placeholder="توضیحی درباره پروژه..."
                className="placeholder:text-[.9rem] p-3 outline-0 w-full rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 mt-2"
              />

              <div className="flex items-center flex-wrap gap-1 mt-5">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-green-500 cursor-pointer duration-300 hover:bg-green-600 p-2 px-5 rounded-lg text-white text-[.9rem]"
                >
                  {addArticle === true ? "ایجاد" : "ویرایش"}
                </button>
                <button
                  onClick={() => setAddArticle(false)}
                  className="flex items-center justify-center gap-2 bg-gray-500 cursor-pointer duration-300 hover:bg-gray-600 p-2 px-5 rounded-lg text-white text-[.9rem]"
                >
                  کنسل
                </button>
              </div>
            </form>
          ) : (
            <div className="text-right mt-10">
              <button
                onClick={() => setAddArticle(true)}
                className="bg-green-600 cursor-pointer duration-300 text-white px-4 py-2 rounded-lg hover:bg-green-500"
              >
                مقاله جدید
              </button>
              <Grid
                data={articles?.map((a) => [
                  a.title,
                  a.category_id, // نام دسته‌بندی
                  a.author_id, // نام نویسنده یا id
                  a.id, // برای عملیات
                ])}
                columns={[
                  { name: "عنوان" },
                  {
                    name: "موضوع",
                    formatter: (cell) => {
                      const category = categories?.find((c) => c.id === cell);
                      return category ? category.name : "ناشناخته";
                    },
                  },
                  {
                    name: "نویسنده",
                    formatter: (cell) => {
                      const user = users?.find((u) => u.id === cell);
                      return user ? user.email : "ناشناخته";
                    },
                  },
                  {
                    name: "عملیات",
                    formatter: (_, row) => {
                      const id = row.cells[3].data; // ستون id برای عملیات
                      return h("div", { className: "flex gap-2" }, [
                        h(
                          "button",
                          {
                            className:
                              "p-2 rounded cursor-pointer text-[.8rem] bg-yellow-500 text-white hover:bg-yellow-600",
                            onClick: () => handleUpdateArticle(id),
                            title: "ویرایش",
                          },
                          h("span", {
                            dangerouslySetInnerHTML: {
                              __html: renderIcon(TbEditCircle),
                            },
                          })
                        ),
                        h(
                          "button",
                          {
                            className:
                              "p-2 rounded cursor-pointer text-[.8rem] bg-red-500 text-white hover:bg-red-600",
                            onClick: () => handleDeleteArticle(id),
                            title: "حذف",
                          },
                          h("span", {
                            dangerouslySetInnerHTML: {
                              __html: renderIcon(Trash2),
                            },
                          })
                        ),
                      ]);
                    },
                  },
                ]}
                search={true}
                pagination={{ enabled: true, limit: 5 }}
                sort={true}
                language={{
                  search: {
                    placeholder: "جستجو...",
                  },
                  pagination: {
                    previous: "قبلی",
                    to: "تا",
                    of: "از",
                    next: "بعدی",
                    showing: "نمایش",
                    results: () => "رکورد",
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
