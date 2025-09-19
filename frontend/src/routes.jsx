import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import Page404 from "./pages/Page404";
import Saves from "./pages/Saves";
import PrivateRoute from "./components/PrivateRoute";

//panel
import UserInfo from "./pages/panel/UserInfo";
import Skills from "./pages/panel/Skills";
import Transactions from "./pages/panel/Transactions";
import Projects from "./pages/panel/Projects";
import Achievements from "./pages/panel/Achievements";
import Setting from "./pages/panel/Setting";
import Profile from "./pages/Profile";
import Weblog from "./pages/Weblog";
import MoreArticles from "./pages/MoreArticles";
import ArticleInfo from "./pages/ArticleInfo";
import ProductDetails from "./pages/ProductDetails";
import Payment from "./pages/Payment";
import Users from "./pages/panel/Users";
import MyProjects from "./pages/panel/MyProjects";
import MyTickets from "./pages/panel/MyTickets";
import Requests from "./pages/panel/Requests";
import Articles from "./pages/panel/Articles";
import Tickets from "./pages/panel/Tickets";
import MyTransactions from "./pages/panel/MyTransactions";
// import { path } from "framer-motion/client";
import Developer from "./pages/Developer";
import ProjectsList from "./pages/Projects";

let routes = [
    { path: "/", element: <Home /> },
    { path: "*", element: <Page404 /> },
    { path: "/auth", element: <LoginRegister /> },
    { path: "/aboutus/*", element: <AboutUs /> },
    { path: "/Saves", element: <Saves /> },
    { path: "/profile", element: <Profile /> },
    { path: "/Payment", element: <Payment /> },
    { path: "/Weblog", element: <Weblog /> },
    { path: "/MoreArticles/*", element: <MoreArticles /> },
    { path: "/ArticleInfo", element: <ArticleInfo /> },
    { path: "/ProductDetails/:id", element: <ProductDetails/> },
    { path: "/Projects", element: <ProjectsList/> },
    // panel
    { path: "/panel/userInfo", element: <PrivateRoute><UserInfo /></PrivateRoute> },
    { path: "/panel/skills", element: <PrivateRoute><Skills /></PrivateRoute> },
    { path: "/panel/myTransactions", element: <PrivateRoute><MyTransactions /></PrivateRoute> },
    { path: "/panel/myProjects", element: <PrivateRoute><MyProjects /></PrivateRoute> },
    { path: "/panel/achievements", element: <PrivateRoute><Achievements /></PrivateRoute> },
    { path: "/panel/setting", element: <PrivateRoute><Setting /></PrivateRoute> },
    { path: "/panel/users", element: <PrivateRoute><Users /></PrivateRoute> },
    { path: "/panel/projects", element: <PrivateRoute><Projects /></PrivateRoute> },
    { path: "/panel/myTickets", element: <PrivateRoute><MyTickets /></PrivateRoute> },
    { path: "/panel/requests", element: <PrivateRoute><Requests /></PrivateRoute> },
    { path: "/panel/articles", element: <PrivateRoute><Articles /></PrivateRoute> },
    { path: "/panel/tickets", element: <PrivateRoute><Tickets /></PrivateRoute> },
    { path: "/panel/transactions", element: <PrivateRoute><Transactions /></PrivateRoute> },
    {path:'/developer',element:<Developer/>}
]

export default routes