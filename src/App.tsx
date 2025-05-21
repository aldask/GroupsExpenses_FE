import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GroupsPage from "./pages/GroupsPage";
import MembersPage from "./pages/MembersPage";
import TransactionsPage from "./pages/TransactionsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/groups" replace />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/groups/:groupId/members" element={<MembersPage />} />
        <Route
          path="/groups/:groupId/transactions"
          element={<TransactionsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
