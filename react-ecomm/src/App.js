import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/Protected";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchItemsByUserIdAsync } from "./features/cart/CartSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUser } from "./features/user/userAPI";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import ProductForm from "./features/admin/components/ProductForm";
import ProductFormPage from "./pages/ProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch, user]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home></Home>
            </Protected>
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminHome></AdminHome>
            </ProtectedAdmin>
          }
        ></Route>

        <Route
          path="/Home"
          element={
            <Protected>
              <Home></Home>
            </Protected>
          }
        ></Route>
        <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>

        <Route
          path="/cart"
          element={
            <Protected>
              <CartPage></CartPage>
            </Protected>
          }
        ></Route>
        <Route
          path="/checkout"
          element={
            <Protected>
              <CheckoutPage></CheckoutPage>
            </Protected>
          }
        ></Route>
        <Route
          path="/Product-detail/:id"
          element={
            <Protected>
              <ProductDetailPage></ProductDetailPage>
            </Protected>
          }
        ></Route>
        <Route
          path="/admin/Product-detail/:id"
          element={
            <ProtectedAdmin>
              <AdminProductDetailPage></AdminProductDetailPage>
            </ProtectedAdmin>
          }
        ></Route>
        <Route
          path="/admin/Product-form"
          element={
            <ProtectedAdmin>
              <ProductFormPage></ProductFormPage>
            </ProtectedAdmin>
          }
        ></Route>
        <Route
          path="/admin/orders"
          element={
            <ProtectedAdmin>
              <AdminOrdersPage></AdminOrdersPage>
            </ProtectedAdmin>
          }
        ></Route>
        <Route
          path="/admin/Product-form/edit/:id"
          element={
            <ProtectedAdmin>
              <ProductFormPage></ProductFormPage>
            </ProtectedAdmin>
          }
        ></Route>
        <Route
          path="/order-success/:id"
          element={
          // <Protected>
             <OrderSuccessPage></OrderSuccessPage>
          // </Protected>
          }
        ></Route>
        <Route
          path="/orders"
          element={
         
             <UserOrdersPage></UserOrdersPage>
        
          }
        ></Route>
        <Route
          path="/profile"
          element={
         <UserProfilePage></UserProfilePage>
        
          }
        ></Route>
        <Route
          path="/logout"
          element={
         <Logout></Logout>
        
          }
        ></Route>
        <Route
          path="/forgot-password"
          element={
         <ForgotPasswordPage></ForgotPasswordPage>
        
          }
        ></Route>
        <Route
          path="*"
          element={
           <PageNotFound></PageNotFound>
          }
        ></Route>

        {/* Onl for test  */}
      </Routes>
    </>
  );
}

export default App;
