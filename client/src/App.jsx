import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Zustand Auth Store
import { useAuthStore } from "@/store/authStore";

// Layout and Pages
import Layout from "./Layout/Layout";
import Index from "./pages/Index";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignUpPage";
import Profile from "./pages/Profile";
import AddCategory from "./pages/Category/AddCategory";
import CategoryDetails from "./pages/Category/CategoryDetails";
import EditCategory from "./pages/Category/EditCategory";
import AddBlog from "./pages/Blog/AddBlog";
import BlogDetails from "./pages/Blog/BlogDetails";
import EditBlog from "./pages/Blog/EditBlog";
import SingleBlogDetails from "./pages/SingleBlogDetails";
import BlogByCategory from "./pages/Blog/BlogByCategory";
import SearchResult from "./pages/SearchResult";
import Comments from "./pages/Comments";
import User from "./pages/User";
import VerifyEmail from "./pages/VerificationEmailPage"; // Email verification page

// Route Protections
import AuthRouteProtechtion from "./components/AuthRouteProtechtion";
import OnlyAdminAllowed from "./components/OnlyAdminAllowed";

// Route Paths
import {
  RouteAddCategory,
  RouteBlog,
  RouteBlogAdd,
  RouteBlogByCategory,
  RouteBlogDetails,
  RouteBlogEdit,
  RouteCategoryDetails,
  RouteCommentDetails,
  RouteEditCategory,
  RouteIndex,
  RouteProfile,
  RouteSearch,
  RouteSignIn,
  RouteSignUp,
  RouteUser,
  RouteVerifyEmail,
} from "./helpers/RouteName";

const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth(); // 🔄 Load auth state on app start or refresh
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Layout */}
        <Route path={RouteIndex} element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Index />} />
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteSearch()} element={<SearchResult />} />

          {/* Protected Routes (Need login) */}
          <Route element={<AuthRouteProtechtion />}>
            <Route path={RouteProfile} element={<Profile />} />
            <Route path={RouteBlogAdd} element={<AddBlog />} />
            <Route path={RouteBlog} element={<BlogDetails />} />
            <Route path={RouteBlogEdit()} element={<EditBlog />} />
            <Route path={RouteCommentDetails} element={<Comments />} />
          </Route>

          {/* Admin-only Routes */}
          <Route element={<OnlyAdminAllowed />}>
            <Route path={RouteAddCategory} element={<AddCategory />} />
            <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
            <Route path={RouteEditCategory()} element={<EditCategory />} />
            <Route path={RouteUser} element={<User />} />
          </Route>
        </Route>

        {/* Auth Pages */}
        <Route path={RouteSignIn} element={<Login />} />
        <Route path={RouteSignUp} element={<Signup />} />
        <Route path={RouteVerifyEmail} element={<VerifyEmail />} />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="text-center mt-20 text-xl font-semibold">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
