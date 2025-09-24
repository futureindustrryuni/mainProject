import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { Grid } from "gridjs-react";
import { h, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import { XIcon, Eye, Check, Download } from "lucide-react";
import Loader from "../../components/Loader";
import JalaliDate from "../../components/JalaliDate";
import { Toast } from "../../components/Toast";

export default function Requests() {
  const [isOpen, setIsOpen] = useState(1);
  const [requests, setRequests] = useState(null);
  const [users, setUsers] = useState(null);
  const token = localStorage.getItem("token");
  const API_BASE = "http://localhost:8000";

  const renderIcon = (Icon) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/developer/requests", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setRequests(data.data);
      console.log("requests : ", data.data[0].resume_file_path);
    } catch (error) {
      console.error("خطا در گرفتن درخواست ها:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  function approvedDeveloper(id) {
    console.log(id);
    fetch(`http://127.0.0.1:8000/api/developer/approve/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Toast.fire({ icon: "success", title: "رزومه کاربر تایید شد" });
        fetchRequests();
      });
  }

  function rejectDeveloper(id) {
    console.log(id);
    fetch(`http://127.0.0.1:8000/api/developer/reject/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Toast.fire({ icon: "success", title: "رزومه کاربر رد شد" });
        fetchRequests();
      });
  }

  if (!requests) return <Loader />;

  return (
    <>
      <div className="flex">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div
          className={`${
            isOpen ? "w-[100%] lg:w-[80%] xl:w-[83%] " : "w-[100%]"
          } `}
        >
          <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="p-5">
            {/*کداتو اینجا بزن*/}
            <div className="text-right">
              <Grid
                data={requests?.map((r) => [
                  r.id,
                  r.status,
                  r.user_id,
                  new Intl.DateTimeFormat("fa-IR").format(
                    new Date(r.created_at)
                  ), // تاریخ شمسی
                  r.id,
                ])}
                columns={[
                  "ردیف",
                  {
                    name: "وضعیت",
                    formatter: (cell) => {
                      if (cell === "approved") {
                        return h(
                          "p",
                          {
                            className:
                              "text-white w-[7rem] bg-green-500 rounded-full px-2 py-1 text-center text-[.8rem]",
                          },
                          "تایید شد"
                        );
                      }

                      if (cell === "pending") {
                        return h(
                          "p",
                          {
                            className:
                              "text-white w-[7rem] bg-yellow-500 rounded-full px-2 py-1 text-center text-[.8rem]",
                          },
                          "در حال بررسی"
                        );
                      }

                      if (cell === "rejected") {
                        return h(
                          "p",
                          {
                            className:
                              "text-white w-[7rem] bg-red-500 rounded-full px-2 py-1 text-center text-[.8rem]",
                          },
                          "رد شد"
                        );
                      }
                    },
                  },
                  {
                    name: "ارسال کننده",
                    formatter: (cell) => {
                      const user = users?.find((u) => u.id === cell);
                      return user ? user.email : "ناشناخته";
                    },
                  },
                  "تاریخ ارسال",
                  {
                    name: "عملیات",
                    formatter: (_, row) => {
                      const id = row.cells[0].data; // ستون id

                      const rowData = row._cells.map((c) => c.data);
                      // [id, name]
                      const rowId = rowData[0]; // ستون اول = id

                      // حالا مستقیم از requests پیدا کن
                      const request = requests.find((r) => r.id === rowId);
                      const resume = request?.resume_file_path;

                      return h("div", { className: "flex gap-2" }, [
                        h(
                          "button",
                          {
                            className:
                              "p-2 rounded cursor-pointer text-[.8rem] bg-green-500 text-white hover:bg-green-600",
                            onClick: () => approvedDeveloper(id),
                            title: "تایید کردن",
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
                              "p-2 rounded cursor-pointer text-[.8rem] bg-red-500 text-white hover:bg-red-600",
                            onClick: () => rejectDeveloper(id),
                            title: "رد کزدن",
                          },
                          h("span", {
                            dangerouslySetInnerHTML: {
                              __html: renderIcon(XIcon),
                            },
                          })
                        ),
                        h(
                          "a",
                          {
                            href: `${API_BASE}/storage/${resume}`,
                            Download : resume,
                            className:
                              "p-2 rounded cursor-pointer text-[.8rem] bg-blue-500 text-white hover:bg-blue-600",
                            // onClick: () => alert(resume),
                            title: "نمایش رزومه",
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
