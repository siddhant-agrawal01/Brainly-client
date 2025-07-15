import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "sonner";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      toast.error("wrong credetails");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pearl-50 dark:bg-obsidian-950 gradient-mesh-light dark:gradient-mesh-dark transition-all duration-500">
      <div className="w-full max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="bg-pearl-50/95 dark:bg-obsidian-900/95 backdrop-blur-xl p-10 rounded-3xl shadow-2xl shadow-slate-900/10 dark:shadow-black/40 border border-pearl-200/60 dark:border-obsidian-700/60 space-y-8 slide-in-up"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-pearl-50 dark:to-pearl-100 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-slate-600 dark:text-obsidian-300 mt-3 text-lg">
              Sign in to your account
            </p>
          </div>

          <div className="space-y-6">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full border border-pearl-200 dark:border-obsidian-700 px-6 py-4 rounded-2xl focus-professional bg-pearl-100/90 dark:bg-obsidian-800/90 text-slate-900 dark:text-pearl-100 placeholder-slate-500 dark:placeholder-obsidian-300 transition-all duration-300 text-lg backdrop-blur-sm"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border border-pearl-200 dark:border-obsidian-700 px-6 py-4 rounded-2xl focus-professional bg-pearl-100/90 dark:bg-obsidian-800/90 text-slate-900 dark:text-pearl-100 placeholder-slate-500 dark:placeholder-obsidian-300 transition-all duration-300 text-lg backdrop-blur-sm"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-azure-600 to-azure-700 hover:from-azure-700 hover:to-azure-800 text-pearl-50 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-azure-500/25 hover:scale-105 text-lg"
          >
            Sign In
          </button>

          <p className="text-center text-slate-600 dark:text-obsidian-300">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-azure-600 dark:text-azure-400 hover:text-azure-700 dark:hover:text-azure-300 font-semibold transition-colors duration-200"
            >
              Create one
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
