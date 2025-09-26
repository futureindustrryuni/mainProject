import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import { Trash2, Check, Eye } from "lucide-react";
import { IoCloseSharp } from "react-icons/io5";
import Loader from "../../components/Loader";
import { Toast } from "../../components/Toast";

export default function Projects() {
  const [isOpen, setIsOpen] = useState(1);
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);
  const token = localStorage.getItem("token");

  const renderIcon = (Icon) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  async function getUsers() {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const { data } = await res.json();

      console.log(data.data);
      setUsers(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getProducts() {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/products");
      const json = await res.json();
      const products = json.data || [];

      // گرفتن عکس های هر پروژه
      const projectsWithImages = await Promise.all(
        products.map(async (project) => {
          try {
            const imgRes = await fetch(
              `http://127.0.0.1:8000/api/products/${project.id}/images`
            );
            const imgs = await imgRes.json();
            return { ...project, images: imgs }; // اضافه کردن فیلد images
          } catch {
            return { ...project, images: [] };
          }
        })
      );

      setProducts(projectsWithImages);
      console.log(projectsWithImages)
    } catch (error) {
      console.error("خطا تو گرفتن دیتا:", error);
    }
  }

  //تایید پروژه
  function approvedProject(id) {
    console.log(id);
    fetch(`http://127.0.0.1:8000/api/products/${id}/approve`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Toast.fire({ icon: "success", title: "پروژه کاربر تایید شد" });
        getProducts();
      });
  }

  //رد کردن پروژه
  function rejectProject(id) {
    console.log(id);
    fetch(`http://127.0.0.1:8000/api/products/${id}/reject`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Toast.fire({ icon: "success", title: "پروژه کاربر رد شد" });
        getProducts();
      });
  }

  useEffect(() => {
    getUsers();
    getProducts();
  }, []);

  if (!users || !products) return <Loader />;

  return (
    <>
      <div className="flex bg-white dark:bg-dark  text-black dark:text-white">
        {/*sadebar*/}
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/*content*/}
        <div
          className={`${
            isOpen ? "w-[100%] lg:w-[80%] xl:w-[83%] " : "w-[100%]"
          } `}
        >
          <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
          {/*content of dashboard*/}
          <div className="px-5">
            <div className="text-right">
              <Grid
                data={(products || []).map((p) => [
                  p.id,
                  p.images,
                  p.title,
                  p.price,
                  p.technologies,
                  p.user_id,
                  p.is_approved,
                  p.id,
                ])}
                columns={[
                  "ردیف",
                  {
                    name: "عکس",
                    formatter: (_, row) => {
                      const image = row.cells[1].data; // ستون id

                      return h("img", {
                        className: "rounded w-[6rem] h-[4rem]",
                        src: `http://127.0.0.1:8000/storage/${image[0].path}`,
                      });
                    },
                  },
                  "نام پروژه",
                  "قیمت",
                  "تکنولوژی",
                  {
                    name: "توسعه دهنده",
                    formatter: (cell) => {
                      const user = users?.find((u) => u.id === cell);
                      return user ? user.email : "ناشناخته";
                    },
                  },
                  {
                    name: "وضعیت",
                    formatter: (cell) =>
                      cell === "2"
                        ? h(
                            "p",
                            {
                              className:
                                "text-white bg-green-500 rounded-full px-2 py-1 text-center text-[.8rem]",
                            },
                            "تایید شده"
                          )
                        : cell === "1"
                        ? h(
                            "p",
                            {
                              className:
                                "text-white bg-yellow-500 rounded-full px-2 py-1 text-center text-[.8rem]",
                            },
                            "در انتظار تایید"
                          )
                        : h(
                            "p",
                            {
                              className:
                                "text-white bg-red-500 rounded-full px-2 py-1 text-center text-[.8rem]",
                            },
                            "رد شده"
                          ),
                  },
                  {
                    name: "عملیات",
                    formatter: (_, row, cell) => {
                      const id = row.cells[0].data; // ستون id
                      const status = row.cells[6].data;

                      return h("div", { className: "flex gap-2" }, [
                        status === "2" || status ==="0"
                          ? h(
                              "button",
                              {
                                className:
                                  "flex items-center gap-1 px-2 py-2 bg-red-500 text-white rounded hover:bg-green-600",
                                onClick: () => alert("حذف با ID: " + id),
                              },
                              [
                                h("span", {
                                  dangerouslySetInnerHTML: {
                                    __html: renderIcon(Trash2),
                                  },
                                }),
                              ]
                            )
                          : status === "1"
                          ? h("div", { className: "flex gap-2" }, [
                              h(
                                "button",
                                {
                                  className:
                                    "p-2 rounded cursor-pointer text-[.8rem] bg-green-500 text-white hover:bg-green-600",
                                  onClick: () => approvedProject(id),
                                  title: "تایید پروژه",
                                },
                                h("span", {
                                  dangerouslySetInnerHTML: {
                                    __html: renderIcon(Check),
                                  },
                                })
                              ),
                              h(
                                "button",
                                {
                                  className:
                                    "flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600",
                                  onClick: () => rejectProject(id),
                                },
                                [
                                  h("span", {
                                    dangerouslySetInnerHTML: {
                                      __html: renderIcon(IoCloseSharp),
                                    },
                                  }),
                                ]
                              ),
                              h(
                                "button",
                                {
                                  className:
                                    "p-2 rounded cursor-pointer text-[.8rem] bg-gray-500 text-white hover:bg-gray-600",
                                  onClick: () => alert("ID: " + id),
                                  title: "مشاهده کردن",
                                },
                                h("span", {
                                  dangerouslySetInnerHTML: {
                                    __html: renderIcon(Eye),
                                  },
                                })
                              ),
                            ])
                          : "",
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
          </div>
        </div>
      </div>
    </>
  );
}
