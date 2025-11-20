import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./component/Navbar";
import { Catalog } from "./component/Products/Catalog";
import { Detail } from "./component/Products/Detail";
import { Utils } from "./component/Products/Utils";
import { AllUsers } from "./component/Users/AllUsers";
import { LastUser } from "./component/Users/LastUser";
import { LastProduct } from "./component/Products/LastProduct";
import { Categories } from "./component/Products/Categories";
import { NotFound } from "./component/NotFound";
import { Footer } from "./component/Footer";

function App() {
  return (
    <div className="container">
      {/* NAVBAR */}
      <Navbar />
      {/* PANELES CON BOTONES */}
      <div className="dashboard">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/last-user" element={<LastUser />} />
          <Route path="/last-product" element={<LastProduct />} />
          <Route path="/utils" element={<Utils />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products/:id" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
