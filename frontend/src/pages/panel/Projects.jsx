import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import {
  Trash2,
  Crown,
  ShieldMinus,
  ShieldUser,
  CodeXml,
  Check,
  Eye,
} from "lucide-react";
import { IoCloseOutline, IoCloseSharp } from "react-icons/io5";

//roles:  3 owner - 2 admin - 1 dev - 0 user
// const projects = [
//   {
//     field: 0,
//     id: 34556,
//     developer: "علی",
//     image: "project1.png",
//     title: "پروژه سایت فیلم و سریال",
//   },
//   {
//     field: 1,
//     id: 97834,
//     developer: "mmd",
//     image: "project2.png",
//     title: "پروژه سایت فیلم و سریال",
//   },
//   {
//     field: 2,
//     id: 32314,
//     developer: "sara",
//     image: "project3.png",
//     title: "پروژه سایت فیلم و سریال",
//   },
//   {
//     field: 3,
//     id: 47809,
//     developer: "mahdi",
//     image: "project4.png",
//     title: "پروژه سایت فیلم و سریال",
//   },
//   {
//     field: 4,
//     id: 35345,
//     developer: "zahra",
//     image: "project5.png",
//     title: "پروژه سایت فیلم و سریال",
//   },
//   {
//     field: 5,
//     id: 60881,
//     developer: "omid",
//     image: "project6.png",
//     title: "پروژه سایت فیلم و سریال",
//   },
//   {
//     field: 6,
//     id: 78762,
//     developer: "mahtab",
//     image: "project7.png",
//     title: "پروژه سایت فیلم و سریال",
//   },
// ];

export default function Projects() {
  const [isOpen, setIsOpen] = useState(1);
  const [products, setProducts] = useState([]);
  const renderIcon = (Icon) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        console.log(data.data);
      });
  }, []);

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
                data={products.map((p) => [
                  p.id,
                  p.title,
                  p.user_id,
                  p.image,
                  p.is_approved,
                  p.id,
                ])}
                columns={[
                  "ردیف",
                  "نام پروژه",
                  "توسعه دهنده",
                  {
                    name: "عکس",
                    formatter: (_, row) => {
                      const image = row.cells[3].data; // ستون id

                      return h("img", {
                        className: "rounded w-[6rem] h-[4rem]",
                        src: `/images/${image}`,
                      });
                    },
                  },
                  {
                    name: "وضعیت",
                    formatter: (cell) =>
                      cell === 2
                        ? h(
                            "p",
                            {
                              className:
                                "text-white bg-green-500 rounded-full px-2 py-1 text-center text-[.8rem]",
                            },
                            "تایید شده"
                          )
                        : cell === 1
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
                      const id = row.cells[5].data; // ستون id
                      const status = row.cells[4].data;

                      return h("div", { className: "flex gap-2" }, [
                        status==2
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
                          : status==1 ? h("div", { className: "flex gap-2" }, [
                              h(
                                "button",
                                {
                                  className:
                                    "p-2 rounded cursor-pointer text-[.8rem] bg-green-500 text-white hover:bg-green-600",
                                  onClick: () => alert("ID: " + id),
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
                                  onClick: () => alert("رد کردن ID: " + id),
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
                            ]):"",
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
