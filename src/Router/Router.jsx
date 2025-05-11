import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import SignupEmploy from "../Authentication/SignupEmploy";
import SignupHr from "../Authentication/SignupHr";
import Login from "../Authentication/Login";
import Dashboard from "../Layout/Dashboard";
import AddAssets from "../Dashboard/HrPages/AddAssets/AddAssets";
import RequestForAssets from "../Dashboard/EmployPages/RequestForAssets/RequestForAssets";
import MyAssets from "../Dashboard/EmployPages/MyAssets/MyAssets";
import RequestAll from "../Dashboard/HrPages/RequestAll/RequestAll";
import MyAssetsList from "../Dashboard/HrPages/MyAssetsList/MyAssetsList";
import AssetsUpdate from "../Dashboard/HrPages/MyAssetsList/AssetsUpdate";
import AddEmploy from "../Dashboard/HrPages/AddEmploy/AddEmploy";
import MyEmploy from "../Dashboard/HrPages/MyEmploy/MyEmploy";
import MyTeam from "../Dashboard/EmployPages/MyTeam/MyTeam";
import EmployHome from "../Dashboard/EmployPages/EmployHome/EmployHome";
import HrHome from "../Dashboard/HrPages/HrHome/HrHome";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/join-employee',
                element: <SignupEmploy></SignupEmploy>
            },
            {
                path: '/join-hr',
                element: <SignupHr></SignupHr>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,

        children: [
            {
              path:'hr-home',
              element:<HrHome></HrHome>
            },
            {
                path: 'addAssets',
                element:<AdminRoute> <AddAssets></AddAssets></AdminRoute>
            },
            {
                path: 'all-requests',
                element:<AdminRoute> <RequestAll></RequestAll></AdminRoute>
            },
            {
                path: 'asset-list',
                element:<AdminRoute> <MyAssetsList></MyAssetsList></AdminRoute>
            },
            {
                path: 'assets-update/:id',
                element: <AssetsUpdate></AssetsUpdate>
            },
            {
                path: 'add-employee',
                element:<AdminRoute> <AddEmploy></AddEmploy></AdminRoute>
            },
            {
                path: 'employee-list',
                element: <AdminRoute><MyEmploy></MyEmploy></AdminRoute>
            },














            {
                path: 'emHome',
                element: <PrivateRoute><EmployHome></EmployHome></PrivateRoute>
            },

            {
                path: 'request-asset',
                element: <RequestForAssets></RequestForAssets>
            },
            {
                path: 'my-assets',
                element: <MyAssets></MyAssets>
            },
            {
                path: 'my-team',
                element: <MyTeam></MyTeam>
            }
        ]
    }
]);