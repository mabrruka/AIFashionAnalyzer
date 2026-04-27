import { Routes, Route, Navigate } from "react-router-dom";

import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Results from "./pages/Results";
import Profile from "./pages/Profile";

function App() {
    return (
        <Routes>

            {/* AUTH */}
            <Route path="/" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />

            {/* ONBOARDING */}
            <Route path="/onboarding" element={<Onboarding />} />

            {/* MAIN APP */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />

            {/* NEW RESULTS PAGE */}
            <Route path="/results" element={<Results />} />

            {/* PROFILE */}
            <Route path="/profile" element={<Profile />} />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" />} />

        </Routes>
    );
}

export default App;