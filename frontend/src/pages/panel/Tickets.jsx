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
  CheckCheck,
} from "lucide-react";
import { TbEditCircle } from "react-icons/tb";

const tickets = [
  {
    field: 0,
    id: 34556,
    title: "پرداخت و فاکتور",
    sender: "علی",
  },
  {
    field: 1,
    id: 97834,
    title: "پرداخت و فاکتور",
    sender: "mmd",
  },
  {
    field: 2,
    id: 32314,
    title: "پرداخت و فاکتور",
    sender: "sara",
  },
  {
    field: 3,
    id: 47809,
    title: "پرداخت و فاکتور",
    sender: "mahdi",
  },
  {
    field: 4,
    id: 35345,
    title: "پرداخت و فاکتور",
    sender: "zahra",
  },
  {
    field: 5,
    id: 60881,
    title: "پرداخت و فاکتور",
    sender: "omid",
  },
  {
    field: 6,
    id: 78762,
    title: "پرداخت و فاکتور",
    sender: "mahtab",
  },
];

export default function Tickets() {
  const [isOpen, setIsOpen] = useState(1);
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
                data={tickets.map((t) => [
                  t.field + 1,
                  t.title,
                  t.sender,
                  t.id,
                ])}
                columns={[
                  "ردیف",
                  "موضوع تیکت",
                  "ارسال کننده",
                  {
                    name: "عملیات",
                    formatter: (_, row) => {
                      const id = row.cells[3].data; // ستون id

                      return h("div", { className: "flex gap-2" }, [
                        h(
                          "button",
                          {
                            className:
                              "p-2 rounded cursor-pointer text-[.8rem] bg-green-500 text-white hover:bg-green-600",
                            onClick: () => alert("خواندن مقاله با ID: " + id),
                            title: "خوانده شد",
                          },
                          h("span", {
                            dangerouslySetInnerHTML: {
                              __html: renderIcon(CheckCheck),
                            },
                          })
                        ),
                        h(
                          "button",
                          {
                            className:
                              "p-2 rounded cursor-pointer text-[.8rem] bg-red-500 text-white hover:bg-red-600",
                            onClick: () => alert("حذف تیکت با ID: " + id),
                            title: "حذف تیکت",
                          },
                          h("span", {
                            dangerouslySetInnerHTML: {
                              __html: renderIcon(Trash2),
                            },
                          })
                        ),
                        h(
                          "button",
                          {
                            className:
                              "p-2 rounded cursor-pointer text-[.8rem] bg-gray-500 text-white hover:bg-gray-600",
                            onClick: () => alert("مشاهده کردن  با ID: " + id),
                            title: "مشاهده کردن",
                          },
                          h("span", {
                            dangerouslySetInnerHTML: {
                              __html: renderIcon(Eye),
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
