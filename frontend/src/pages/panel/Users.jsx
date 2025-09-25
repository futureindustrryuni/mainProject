import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import {
  Trash2,
  UserX,
  UserCog,
  Crown,
  ShieldMinus,
  ShieldUser,
  CodeXml,
} from "lucide-react";
import Loader from "../../components/Loader";

export default function Users() {
  const [isOpen, setIsOpen] = useState(1);
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
      const {data} = await res.json();

      console.log(data.data);
      setUsers(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);


    if (!users) return <Loader />;
  

  return (
    <>
      <div className="flex h-svh bg-white dark:bg-dark  text-black dark:text-white">
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
                data={users?.map((u) => [
                  u.id,
                  u.name,
                  u.email,
                  u.role,
                  u.id,
                ])}
                columns={[
                  "ردیف",
                  "نام کاربری",
                  "ایمیل",
                  {
                    name: "سطح کاربری",
                    formatter: (_, row) => {
                      const role = row.cells[3].data;

                      if (role === "supervisor") {
                        return h(
                          "p",
                          {
                            className:
                              "px-3 py-1 inline rounded text-[.8rem] bg-blue-500/20 text-blue-500",
                          },
                          "مالک"
                        );
                      } else if (role === "admin") {
                        return h(
                          "p",
                          {
                            className:
                              "px-3 py-1 inline rounded text-[.8rem] bg-green-500/20 text-green-500",
                          },
                          "ادمین"
                        );
                      } else if (role === "developer") {
                        return h(
                          "p",
                          {
                            className:
                              "px-3 py-1 inline rounded text-[.8rem] bg-yellow-500/20 text-yellow-500",
                          },
                          "توسعه دهنده"
                        );
                      } else if (role === "user"){
                        return h(
                          "p",
                          {
                            className:
                              "px-3 py-1 inline rounded text-[.8rem] bg-gray-500/20 text-gray-500 dark:text-gray-300",
                          },
                          "کاربر عادی"
                        );
                      }
                    },
                  },
                  {
                    name: "عملیات",
                    formatter: (_, row) => {
                      const id = row.cells[4].data; // ستون id
                      const role = row.cells[3].data; // ستون role

                      // شرط براساس role
                      if (role === "supervisor") {
                        return h(
                          "button",
                          {
                            className:
                              "p-2 rounded cursor-pointer text-[.8rem] bg-gray-500 text-white hover:bg-gray-600",
                            onClick: () => alert("حذف مالک با ID: " + id),
                            title: "حذف مالکیت",
                          },
                          h("span", {
                            dangerouslySetInnerHTML: {
                              __html: renderIcon(ShieldMinus),
                            },
                          })
                        );
                      } else if (role === "admin") {
                        return h("div", { className: "flex gap-2" }, [
                          h(
                            "button",
                            {
                              className:
                                "p-2 rounded cursor-pointer text-[.8rem] bg-gray-500 text-white hover:bg-gray-600",
                              onClick: () => alert("حذف ادمین با ID: " + id),
                              title: "حذف ادمین",
                            },
                            h("span", {
                              dangerouslySetInnerHTML: {
                                __html: renderIcon(ShieldMinus),
                              },
                            })
                          ),
                          h(
                            "button",
                            {
                              className:
                                "p-2 rounded cursor-pointer text-[.8rem] bg-blue-500 text-white hover:bg-blue-600",
                              onClick: () =>
                                alert("تبدیل به مالک با ID: " + id),
                              title: "مالک",
                            },
                            h("span", {
                              dangerouslySetInnerHTML: {
                                __html: renderIcon(Crown),
                              },
                            })
                          ),
                          h(
                            "button",
                            {
                              className:
                                "p-2 rounded cursor-pointer text-[.8rem] bg-red-500 text-white hover:bg-red-600",
                              onClick: () => alert("بن کاربر با ID: " + id),
                              title: "بن",
                            },
                            h("span", {
                              dangerouslySetInnerHTML: {
                                __html: renderIcon(Trash2),
                              },
                            })
                          ),
                        ]);
                      } else if (role === "developer") {
                        return h("div", { className: "flex gap-2" }, [
                          h(
                            "button",
                            {
                              className:
                                "p-2 rounded cursor-pointer text-[.8rem] bg-gray-500 text-white hover:bg-gray-600",
                              onClick: () => alert("حذف مالک با ID: " + id),
                              title: "حذف توسعه دهنده",
                            },
                            h("span", {
                              dangerouslySetInnerHTML: {
                                __html: renderIcon(ShieldMinus),
                              },
                            })
                          ),
                          h(
                            "button",
                            {
                              className:
                                "p-2 rounded cursor-pointer text-[.8rem] bg-red-500 text-white hover:bg-red-600",
                              onClick: () =>
                                alert("بن کردن توسعه دهنده با ID: " + id),
                              title: "بن",
                            },
                            h("span", {
                              dangerouslySetInnerHTML: {
                                __html: renderIcon(Trash2),
                              },
                            })
                          ),
                        ]);
                      } else {
                        return h("div", { className: "flex gap-2" }, [
                          h(
                            "button",
                            {
                              className:
                                "p-2 rounded cursor-pointer text-[.8rem] bg-blue-500 text-white hover:bg-blue-600",
                              onClick: () =>
                                alert("ارتقا به مالک با ID: " + id),
                              title: "مالک",
                            },
                            h("span", {
                              dangerouslySetInnerHTML: {
                                __html: renderIcon(Crown),
                              },
                            })
                          ),
                          h(
                            "button",
                            {
                              className:
                                "p-2 rounded cursor-pointer text-[.8rem] bg-green-500 text-white hover:bg-green-600",
                              onClick: () =>
                                alert("ارتقا به ادمین با ID: " + id),
                              title: "ادمین",
                            },
                            h("span", {
                              dangerouslySetInnerHTML: {
                                __html: renderIcon(ShieldUser),
                              },
                            })
                          ),
                          h(
                            "button",
                            {
                              className:
                                "p-2 rounded cursor-pointer text-[.8rem] bg-yellow-500 text-white hover:bg-yellow-600",
                              onClick: () =>
                                alert("توسعه دهنده کردن کاربر با ID: " + id),
                              title: "توسعه دهنده",
                            },
                            h("span", {
                              dangerouslySetInnerHTML: {
                                __html: renderIcon(CodeXml),
                              },
                            })
                          ),
                          h(
                            "button",
                            {
                              className:
                                "p-2 rounded cursor-pointer text-[.8rem] bg-red-500 text-white hover:bg-red-600",
                              onClick: () => alert("بن کاربر با ID: " + id),
                              title: "بن",
                            },
                            h("span", {
                              dangerouslySetInnerHTML: {
                                __html: renderIcon(Trash2),
                              },
                            })
                          ),
                        ]);
                      }
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
