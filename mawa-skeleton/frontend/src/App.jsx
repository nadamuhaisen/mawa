import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OwnerDashboard from "./pages/OwnerDashboard";
import RenterDashboard from "./pages/RenterDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import AddListing from "./pages/AddListing";
import OwnerListings from "./pages/OwnerListings";
import OwnerRequests from "./pages/OwnerRequests";
import OwnerSettings from "./pages/OwnerSettings";
import EditListing from "./pages/EditListing";
import Layout from "./components/Layout";
import AdminUsers from "./pages/AdminUsers";
import AdminListings from "./pages/AdminListings";
import AdminApprovals from "./pages/AdminApprovals";
import AdminSettings from "./pages/AdminSettings";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/listings" element={<OwnerListings />} />
        <Route path="/owner/requests" element={<OwnerRequests />} />
        <Route path="/owner/settings" element={<OwnerSettings />} />
        <Route path="/owner/listings/new" element={<AddListing />} />
        <Route path="/listings/edit/:id" element={<EditListing />} />
        <Route path="/listings/:id" element={<ListingDetail />} />

        <Route path="/renter/dashboard" element={<RenterDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/listings" element={<AdminListings />} />
      <Route path="/admin/approvals" element={<AdminApprovals />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
    </Routes>
  );
}
