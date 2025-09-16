import React, { useState } from "react";
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

//roles:  3 owner - 2 admin - 1 dev - 0 user
const users = [
  {
    field: 0,
    id: 34556,
    name: "علی",
    email: "john@example.com",
    role: 3,
  },
  {
    field: 1,
    id: 97834,
    name: "mmd",
    email: "john@example.com",
    role: 2,
  },
  {
    field: 2,
    id: 32314,
    name: "sara",
    email: "john@example.com",
    role: 2,
  },
  {
    field: 3,
    id: 47809,
    name: "mahdi",
    email: "john@example.com",
    role: 1,
  },
  {
    field: 4,
    id: 35345,
    name: "zahra",
    email: "john@example.com",
    role: 0,
  },
  {
    field: 5,
    id: 60881,
    name: "omid",
    email: "john@example.com",
    role: 0,
  },
  {
    field: 6,
    id: 78762,
    name: "mahtab",
    email: "mark@gmail.com",
    role: 0,
  },
];

export default function Users() {
  const [isOpen, setIsOpen] = useState(1);
  const renderIcon = (Icon) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

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
                data={users.map((u) => [
                  u.field + 1,
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

                      if (role === 3) {
                        return h(
                          "p",
                          {
                            className:
                              "px-3 py-1 inline rounded text-[.8rem] bg-blue-500/20 text-blue-500",
                          },
                          "مالک"
                        );
                      } else if (role === 2) {
                        return h(
                          "p",
                          {
                            className:
                              "px-3 py-1 inline rounded text-[.8rem] bg-green-500/20 text-green-500",
                          },
                          "ادمین"
                        );
                      } else if (role === 1) {
                        return h(
                          "p",
                          {
                            className:
                              "px-3 py-1 inline rounded text-[.8rem] bg-yellow-500/20 text-yellow-500",
                          },
                          "توسعه دهنده"
                        );
                      } else {
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
                      if (role === 3) {
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
                      } else if (role === 2) {
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
                      } else if (role === 1) {
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
