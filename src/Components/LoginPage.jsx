import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Boxes, UserPlus, LogIn } from "lucide-react";
import { supabase } from "../supabaseClient";

function LoginPage({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          alert(error.message);
          return;
        }

        alert("Signup successful. Check email if confirmation is enabled.");
        onLogin(data.user);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          alert(error.message);
          return;
        }

        onLogin(data.user);
      }
    } catch (error) {
      console.log(error);
      alert("Authentication failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-black text-white flex items-center justify-center p-6 overflow-hidden">
      <div className="fixed -top-32 -left-32 h-96 w-96 rounded-full bg-purple-500/30 blur-3xl" />
      <div className="fixed -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative w-full max-w-md rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-2xl p-8 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
      >
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-cyan-400 to-lime-400 flex items-center justify-center text-black shadow-xl">
            <Boxes size={32} />
          </div>
        </div>

        <h1 className="text-3xl font-black text-center bg-gradient-to-r from-cyan-300 via-lime-300 to-yellow-300 bg-clip-text text-transparent">
          Retail Inventory Manager
        </h1>

        <p className="text-center opacity-70 mt-2 mb-8">
          {isSignup ? "Create your inventory account" : "Login to your inventory workspace"}
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-2xl border border-white/15 bg-white/10">
            <Mail size={20} />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl border border-white/15 bg-white/10">
            <Lock size={20} />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleAuth}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-lime-400 to-yellow-300 text-black font-black shadow-xl flex items-center justify-center gap-2"
          >
            {isSignup ? <UserPlus size={20} /> : <LogIn size={20} />}
            {isSignup ? "Create Account" : "Login"}
          </motion.button>
        </div>

        <button
  onClick={() => setIsSignup(!isSignup)}
>
  {isSignup
    ? "Already have an account? Login"
    : "New user? Create account"}
</button>
      </motion.div>
    </div>
  );
}

export default LoginPage;