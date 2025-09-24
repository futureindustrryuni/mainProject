import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import { Trash2, Eye, CheckCheck } from "lucide-react";
import TicketModal from "../../components/TicketModal";
import Loader from "../../components/Loader";

export default function Tickets() {
  const [isOpen, setIsOpen] = useState(1);
  const [tickets, setTickets] = useState(null);
  const [users, setUsers] = useState(null);
  const token = localStorage.getItem("token");
  const [openModal, setOpenModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const renderIcon = (Icon) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  //get tickets
  const fetchTickets = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/tickets", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setTickets(data.data);
      console.log("tickets : ", data.data);
    } catch (error) {
      console.error("خطا در گرفتن تیکت‌ها:", error);
    }
  };

  //get tickets
  const  fetchUsers= async () => {
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

  useEffect(() => {
    fetchTickets();
    fetchUsers();
  }, []);

  function approvedTicket(id) {
    console.log(id);
    fetch(`http://127.0.0.1:8000/api/tickets/approve/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchTickets();
      });
  }

  function deleteTicket(id) {
    console.log(id);
    fetch(`http://127.0.0.1:8000/api/tickets/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchTickets();
      });
  }

  if (!tickets) return <Loader />;

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
                  t.id,
                  t.subject,
                  t.user_id,
                  t.status,
                  t.id,
                ])}
                columns={[
                  "ردیف",
                  "موضوع تیکت",
                  {
                    name: "ارسال کننده",
                    formatter: (cell) => {
                      const user = users?.find((u) => u.id === cell); 
                      return user ? user.email : "ناشناخته"; 
                    },
                  },

                  {
                    name: "وضعیت",
                    formatter: (cell) => {
                      if (cell === "open") {
                        return h(
                          "p",
                          {
                            className:
                              "text-white w-[7rem] bg-green-500 rounded-full px-2 py-1 text-center text-[.8rem]",
                          },
                          "بررسی شد"
                        );
                      }

                      if (cell === "in_progress") {
                        return h(
                          "p",
                          {
                            className:
                              "text-white w-[7rem] bg-yellow-500 rounded-full px-2 py-1 text-center text-[.8rem]",
                          },
                          "در حال بررسی"
                        );
                      }
                    },
                  },
                  {
                    name: "عملیات",
                    formatter: (_, row) => {
                      const id = row.cells[0].data;
                      const ticketText = tickets.find((t) => t.id === id)?.text;

                      return h("div", { className: "flex gap-2" }, [
                        h(
                          "button",
                          {
                            className:
                              "p-2 rounded cursor-pointer text-[.8rem] bg-green-500 text-white hover:bg-green-600",
                            onClick: () => approvedTicket(id),
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
                            onClick: () => deleteTicket(id),
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
                            onClick: () => {
                              setSelectedTicket(ticketText); // ticket مربوطه
                              setOpenModal(true);
                            },
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

      <TicketModal
        ticket={selectedTicket}
        open={openModal}
        setOpen={setOpenModal}
      />
    </>
  );
}
