import React, { useState } from "react";
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
import { TbEditCircle } from "react-icons/tb";

const transactions = [
  {
    field: 0,
    id: 34556,
    title: "ربات تلگرام",
    Seller:"ali",
    customer: "علی",
    code: "h78gsdfg8sdf",
    create_at: "1404/06/11",
    image: "project1.png",
  },
  {
    field: 1,
    id: 97834,
    title: "ربات تلگرام",
    Seller:"ali",
    customer: "mmd",
    code: "h78gsdfg8sdf",
    create_at: "1404/06/11",
    image: "project2.png",
  },
  {
    field: 2,
    id: 32314,
    title: "ربات تلگرام",
    Seller:"ali",
    customer: "sara",
    code: "h78gsdfg8sdf",
    create_at: "1404/06/11",
    image: "project3.png",
  },
  {
    field: 3,
    id: 47809,
    title: "ربات تلگرام",
    Seller:"ali",
    customer: "mahdi",
    code: "h78gsdfg8sdf",
    create_at: "1404/06/11",
    image: "project4.png",
  },
  {
    field: 4,
    id: 35345,
    title: "ربات تلگرام",
    Seller:"ali",
    customer: "zahra",
    code: "h78gsdfg8sdf",
    create_at: "1404/06/11",
    image: "project5.png",
  },
  {
    field: 5,
    id: 60881,
    title: "ربات تلگرام",
    Seller:"ali",
    customer: "omid",
    code: "h78gsdfg8sdf",
    create_at: "1404/06/11",
    image: "project6.png",
  },
  {
    field: 6,
    id: 78762,
    title: "ربات تلگرام",
    Seller:"ali",
    customer: "mahtab",
    code: "h78gsdfg8sdf",
    create_at: "1404/06/11",
    image: "project7.png",
  },
];

export default function Transactions() {
  const [isOpen, setIsOpen] = useState(1);
  const [addArticle, setAddArticle] = useState(false);

  const renderIcon = (Icon) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  return (
    <>
      <div className="flex h-screen bg-white dark:bg-dark  text-black dark:text-white">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div
          className={`${
            isOpen ? "w-[100%] lg:w-[80%] xl:w-[83%] " : "w-[100%]"
          } `}
        >
          <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="px-5">
            <div className="text-right">
              <Grid
                data={transactions.map((t) => [
                  t.field + 1,
                  t.title,
                  t.customer,
                  t.Seller,
                  t.code,
                  t.create_at,
                  t.id,
                ])}
                columns={[
                  "ردیف",
                  "نام محصول",
                  "خریدار",
                  "فروشنده",
                  "کد رهگیری",
                  "تاریخ",
                  {
                    name: "عملیات",
                    formatter: (_, row) => {
                      const id = row.cells[3].data; // ستون id

                      return h("div", { className: "flex gap-2" }, [
                        h(
                          "button",
                          {
                            className:
                              "p-2 rounded cursor-pointer text-[.8rem] bg-red-500 text-white hover:bg-red-600",
                            onClick: () => alert("بن کاربر با ID: " + id),
                            title: "رد کردن پروژه",
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
          </div>
        </div>
      </div>
    </>
  );
}
