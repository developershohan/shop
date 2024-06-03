import { children } from "react";
import Layout from "../component/Layout/Layout";
import Profile from "../customer/pages/Profile/Profile";
import PrivateGard from "./PrivateGard";

const PrivateRouter = [
  {
    element: <PrivateGard />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/account",
            element: <Profile />,
          },
        ],
      },
    ],
  },
];

export default PrivateRouter;
