
// import { useState } from "react";
// import {
//   GraduationCap,
//   UserRound,
//   LockKeyhole,
//   ArrowRight,
//   ShieldCheck,
//   Mail,
//   Eye,
//   EyeOff,
//   UserPlus,
//   LogIn,
//   CheckCircle2,
// } from "lucide-react";

// import StudentDashboard from "./pages/StudentDashboard";
// import AdminDashboard from "./pages/AdminDashboard";

// // Initial demo users
// const initialUsers = [
//   {
//     id: "a1",
//     name: "Admin One",
//     email: "admin1@joineazy.com",
//     password: "Admin@123",
//     role: "admin",
//   },
//   {
//     id: "a2",
//     name: "Admin Two",
//     email: "admin2@joineazy.com",
//     password: "Admin@123",
//     role: "admin",
//   },
//   ...Array.from({ length: 5 }, (_, i) => ({
//     id: `s${i + 1}`,
//     name: `Student ${i + 1}`,
//     email: `student${i + 1}@joineazy.com`,
//     password: "Student@123",
//     role: "student",
//   })),
// ];

// function App() {
//   // Authentication mode
//   const [mode, setMode] = useState("login");
//   const [showPassword, setShowPassword] = useState(false);

//   // Registered and seeded users
//   const [users, setUsers] = useState(() => {
//     const saved = localStorage.getItem("users");
//     return saved ? JSON.parse(saved) : initialUsers;
//   });

//   // Restore logged-in user after refresh
//   const [currentUser, setCurrentUser] = useState(() => {
//     const saved = localStorage.getItem("currentUser");
//     return saved ? JSON.parse(saved) : null;
//   });

//   // Form data
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Handle input changes
//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });

//     setError("");
//     setSuccess("");
//   };

//   // Login existing users
//   const handleLogin = (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const user = users.find(
//       (u) =>
//         u.email.toLowerCase() ===
//           form.email.trim().toLowerCase() &&
//         u.password === form.password
//     );

//     if (!user) {
//       setError("Invalid email or password.");
//       return;
//     }

//     localStorage.setItem(
//       "currentUser",
//       JSON.stringify(user)
//     );

//     setCurrentUser(user);
//   };

//   // Register new students
//   const handleRegister = (e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");

//     if (!form.name.trim()) {
//       setError("Please enter your full name.");
//       return;
//     }

//     if (form.password.length < 6) {
//       setError("Password must contain at least 6 characters.");
//       return;
//     }

//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     const exists = users.some(
//       (u) =>
//         u.email.toLowerCase() ===
//         form.email.trim().toLowerCase()
//     );

//     if (exists) {
//       setError("An account with this email already exists.");
//       return;
//     }

//     const newUser = {
//       id: `s${Date.now()}`,
//       name: form.name.trim(),
//       email: form.email.trim().toLowerCase(),
//       password: form.password,
//       role: "student",
//     };

//     const updatedUsers = [...users, newUser];

//     setUsers(updatedUsers);

//     localStorage.setItem(
//       "users",
//       JSON.stringify(updatedUsers)
//     );

//     setSuccess(
//       "Account created successfully! Please sign in."
//     );

//     setForm({
//       name: "",
//       email: newUser.email,
//       password: "",
//       confirmPassword: "",
//     });

//     setTimeout(() => {
//       setMode("login");
//       setSuccess("");
//     }, 1500);
//   };

//   // Switch between login and registration
//   const switchMode = (newMode) => {
//     setMode(newMode);
//     setError("");
//     setSuccess("");

//     setForm({
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     });

//     setShowPassword(false);
//   };

//   // Logout
//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     setCurrentUser(null);
//     switchMode("login");
//   };

//   // Role-based dashboard rendering
//   if (currentUser) {
//     return currentUser.role === "admin" ? (
//       <AdminDashboard
//         user={currentUser}
//         onLogout={handleLogout}
//       />
//     ) : (
//       <StudentDashboard
//         user={currentUser}
//         onLogout={handleLogout}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen flex bg-slate-50">

//       {/* LEFT BRANDING SECTION */}
//       <div className="hidden lg:flex w-1/2 bg-indigo-950
//         text-white flex-col justify-between p-12">

//         <div className="flex items-center gap-3">
//           <div className="bg-indigo-500 p-3 rounded-xl">
//             <GraduationCap size={28} />
//           </div>

//           <span className="text-2xl font-bold">
//             Joineazy
//           </span>
//         </div>

//         <div className="max-w-lg">
//           <span className="text-indigo-300 font-semibold">
//             ASSIGNMENT MANAGEMENT
//           </span>

//           <h1 className="text-5xl font-bold leading-tight mt-5">
//             Learn better.
//             <br />
//             Manage smarter.
//           </h1>

//           <p className="text-indigo-200 mt-6 text-lg">
//             A simple and organized space to manage
//             assignments, track submissions and
//             monitor academic progress.
//           </p>

//           <div className="mt-10 space-y-4 text-indigo-200">

//             <div className="flex items-center gap-3">
//               <CheckCircle2 size={20} />
//               Manage assignments easily
//             </div>

//             <div className="flex items-center gap-3">
//               <CheckCircle2 size={20} />
//               Track your submission progress
//             </div>

//             <div className="flex items-center gap-3">
//               <CheckCircle2 size={20} />
//               Stay organized and productive
//             </div>

//           </div>
//         </div>

//         <p className="text-indigo-300 text-sm">
//           © 2026 Joineazy. All rights reserved.
//         </p>

//       </div>

//       {/* RIGHT AUTHENTICATION SECTION */}
//       <div className="flex-1 flex items-center justify-center
//         p-5 sm:p-8">

//         <div className="w-full max-w-md">

//           {/* MOBILE BRANDING */}
//           <div className="lg:hidden flex items-center
//             justify-center gap-2 mb-8">

//             <GraduationCap
//               className="text-indigo-600"
//               size={32}
//             />

//             <span className="text-2xl font-bold text-slate-900">
//               Joineazy
//             </span>

//           </div>

//           <div className="bg-white rounded-2xl shadow-xl
//             border border-slate-100 p-7 sm:p-9">

//             {/* AUTH HEADER */}
//             <div className="bg-indigo-50 w-14 h-14
//               flex items-center justify-center
//               rounded-xl mb-6">

//               {mode === "login" ? (
//                 <ShieldCheck
//                   className="text-indigo-600"
//                   size={28}
//                 />
//               ) : (
//                 <UserPlus
//                   className="text-indigo-600"
//                   size={28}
//                 />
//               )}

//             </div>

//             <h2 className="text-3xl font-bold text-slate-900">
//               {mode === "login"
//                 ? "Welcome back!"
//                 : "Create an account"}
//             </h2>

//             <p className="text-slate-500 mt-2">
//               {mode === "login"
//                 ? "Sign in to access your dashboard."
//                 : "Join Joineazy and manage your assignments."}
//             </p>

//             {/* SIGN IN / REGISTER TABS */}
//             <div className="flex bg-slate-100 rounded-xl p-1 mt-7">

//               <button
//                 type="button"
//                 onClick={() => switchMode("login")}
//                 className={`flex-1 flex items-center
//                   justify-center gap-2 py-2.5 rounded-lg
//                   text-sm font-semibold transition ${
//                     mode === "login"
//                       ? "bg-white text-indigo-600 shadow-sm"
//                       : "text-slate-500"
//                   }`}
//               >
//                 <LogIn size={17} />
//                 Sign In
//               </button>

//               <button
//                 type="button"
//                 onClick={() => switchMode("register")}
//                 className={`flex-1 flex items-center
//                   justify-center gap-2 py-2.5 rounded-lg
//                   text-sm font-semibold transition ${
//                     mode === "register"
//                       ? "bg-white text-indigo-600 shadow-sm"
//                       : "text-slate-500"
//                   }`}
//               >
//                 <UserPlus size={17} />
//                 Register
//               </button>

//             </div>

//             {/* ERROR MESSAGE */}
//             {error && (
//               <div className="mt-5 bg-red-50 border
//                 border-red-200 text-red-600
//                 text-sm p-3 rounded-lg">
//                 {error}
//               </div>
//             )}

//             {/* SUCCESS MESSAGE */}
//             {success && (
//               <div className="mt-5 bg-green-50 border
//                 border-green-200 text-green-700
//                 text-sm p-3 rounded-lg">
//                 {success}
//               </div>
//             )}

//             {/* AUTHENTICATION FORM */}
//             <form
//               onSubmit={
//                 mode === "login"
//                   ? handleLogin
//                   : handleRegister
//               }
//               className="mt-6 space-y-5"
//             >

//               {/* FULL NAME */}
//               {mode === "register" && (
//                 <div>
//                   <label className="text-sm font-semibold
//                     text-slate-700">
//                     Full Name
//                   </label>

//                   <div className="relative mt-2">

//                     <UserRound className="absolute left-3
//                       top-3.5 text-slate-400"
//                       size={19}
//                     />

//                     <input
//                       type="text"
//                       name="name"
//                       value={form.name}
//                       onChange={handleChange}
//                       placeholder="Enter your full name"
//                       required
//                       className="w-full border border-slate-200
//                         rounded-xl py-3 pl-11 pr-4
//                         outline-none focus:ring-2
//                         focus:ring-indigo-500"
//                     />

//                   </div>
//                 </div>
//               )}

//               {/* EMAIL */}
//               <div>
//                 <label className="text-sm font-semibold
//                   text-slate-700">
//                   Email Address
//                 </label>

//                 <div className="relative mt-2">

//                   <Mail className="absolute left-3
//                     top-3.5 text-slate-400"
//                     size={19}
//                   />

//                   <input
//                     type="email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     placeholder="Enter your email"
//                     required
//                     className="w-full border border-slate-200
//                       rounded-xl py-3 pl-11 pr-4
//                       outline-none focus:ring-2
//                       focus:ring-indigo-500"
//                   />

//                 </div>
//               </div>

//               {/* PASSWORD */}
//               <div>
//                 <label className="text-sm font-semibold
//                   text-slate-700">
//                   Password
//                 </label>

//                 <div className="relative mt-2">

//                   <LockKeyhole className="absolute left-3
//                     top-3.5 text-slate-400"
//                     size={19}
//                   />

//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={form.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password"
//                     required
//                     className="w-full border border-slate-200
//                       rounded-xl py-3 pl-11 pr-12
//                       outline-none focus:ring-2
//                       focus:ring-indigo-500"
//                   />

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowPassword(!showPassword)
//                     }
//                     className="absolute right-3 top-3.5
//                       text-slate-400"
//                   >
//                     {showPassword
//                       ? <EyeOff size={19} />
//                       : <Eye size={19} />}
//                   </button>

//                 </div>
//               </div>

//               {/* CONFIRM PASSWORD */}
//               {mode === "register" && (
//                 <div>
//                   <label className="text-sm font-semibold
//                     text-slate-700">
//                     Confirm Password
//                   </label>

//                   <div className="relative mt-2">

//                     <LockKeyhole className="absolute left-3
//                       top-3.5 text-slate-400"
//                       size={19}
//                     />

//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="confirmPassword"
//                       value={form.confirmPassword}
//                       onChange={handleChange}
//                       placeholder="Confirm your password"
//                       required
//                       className="w-full border border-slate-200
//                         rounded-xl py-3 pl-11 pr-4
//                         outline-none focus:ring-2
//                         focus:ring-indigo-500"
//                     />

//                   </div>
//                 </div>
//               )}

//               {/* SUBMIT BUTTON */}
//               <button
//                 type="submit"
//                 className="w-full bg-indigo-600
//                   hover:bg-indigo-700 text-white
//                   font-semibold py-3.5 rounded-xl
//                   flex items-center justify-center gap-2
//                   transition"
//               >
//                 {mode === "login"
//                   ? "Sign In"
//                   : "Create Account"}

//                 <ArrowRight size={19} />
//               </button>

//             </form>

//             {/* SWITCH AUTH MODE */}
//             <p className="text-center text-sm
//               text-slate-500 mt-7">

//               {mode === "login"
//                 ? "Don't have an account?"
//                 : "Already have an account?"}

//               <button
//                 type="button"
//                 onClick={() =>
//                   switchMode(
//                     mode === "login"
//                       ? "register"
//                       : "login"
//                   )
//                 }
//                 className="text-indigo-600
//                   font-semibold ml-1 hover:underline"
//               >
//                 {mode === "login"
//                   ? "Register"
//                   : "Sign In"}
//               </button>

//             </p>

//           </div>

//           <p className="text-center text-slate-400
//             text-xs mt-6">
//             Secure academic workspace · Joineazy 2026
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;





import { useState } from "react";
import {
  GraduationCap,
  UserRound,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
  Mail,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  CheckCircle2,
} from "lucide-react";

import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Initial demo users
const initialUsers = [
  {
    id: "a1",
    name: "Admin One",
    email: "admin1@joineazy.com",
    password: "Admin@123",
    role: "admin",
  },
  {
    id: "a2",
    name: "Admin Two",
    email: "admin2@joineazy.com",
    password: "Admin@123",
    role: "admin",
  },
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `s${i + 1}`,
    name: `Student ${i + 1}`,
    email: `student${i + 1}@joineazy.com`,
    password: "Student@123",
    role: "student",
  })),
];

function App() {
  // Authentication mode
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  // Registered and seeded users
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : initialUsers;
  });

  // Restore logged-in user after refresh
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  // Form data
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  // Login existing users
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const user = users.find(
      (u) =>
        u.email.toLowerCase() ===
          form.email.trim().toLowerCase() &&
        u.password === form.password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    setCurrentUser(user);
  };

  // Register new students
  const handleRegister = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const exists = users.some(
      (u) =>
        u.email.toLowerCase() ===
        form.email.trim().toLowerCase()
    );

    if (exists) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser = {
      id: `s${Date.now()}`,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      role: "student",
    };

    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    setSuccess(
      "Account created successfully! Please sign in."
    );

    setForm({
      name: "",
      email: newUser.email,
      password: "",
      confirmPassword: "",
    });

    setTimeout(() => {
      setMode("login");
      setSuccess("");
    }, 1500);
  };

  // Switch between login and registration
  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setSuccess("");

    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setShowPassword(false);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    switchMode("login");
  };

  // Role-based dashboard rendering
  if (currentUser) {
    return currentUser.role === "admin" ? (
      <AdminDashboard
        user={currentUser}
        onLogout={handleLogout}
      />
    ) : (
      <StudentDashboard
        user={currentUser}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">

      {/* LEFT BRANDING SECTION */}
      <div className="hidden lg:flex w-1/2 bg-indigo-950
        text-white flex-col justify-between p-12">

        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 p-3 rounded-xl">
            <GraduationCap size={28} />
          </div>

          <span className="text-2xl font-bold">
            Joineazy
          </span>
        </div>

        <div className="max-w-lg">
          <span className="text-indigo-300 font-semibold">
            ASSIGNMENT MANAGEMENT
          </span>

          <h1 className="text-5xl font-bold leading-tight mt-5">
            Learn better.
            <br />
            Manage smarter.
          </h1>

          <p className="text-indigo-200 mt-6 text-lg">
            A simple and organized space to manage
            assignments, track submissions and
            monitor academic progress.
          </p>

          <div className="mt-10 space-y-4 text-indigo-200">

            <div className="flex items-center gap-3">
              <CheckCircle2 size={20} />
              Manage assignments easily
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 size={20} />
              Track your submission progress
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 size={20} />
              Stay organized and productive
            </div>

          </div>
        </div>

        <p className="text-indigo-300 text-sm">
          © 2026 Joineazy. All rights reserved.
        </p>

      </div>

      {/* RIGHT AUTHENTICATION SECTION */}
      <div className="flex-1 flex items-center justify-center
        p-5 sm:p-8">

        <div className="w-full max-w-md">

          {/* MOBILE BRANDING */}
          <div className="lg:hidden flex items-center
            justify-center gap-2 mb-8">

            <GraduationCap
              className="text-indigo-600"
              size={32}
            />

            <span className="text-2xl font-bold text-slate-900">
              Joineazy
            </span>

          </div>

          <div className="bg-white rounded-2xl shadow-xl
            border border-slate-100 p-7 sm:p-9">

            {/* AUTH HEADER */}
            <div className="bg-indigo-50 w-14 h-14
              flex items-center justify-center
              rounded-xl mb-6">

              {mode === "login" ? (
                <ShieldCheck
                  className="text-indigo-600"
                  size={28}
                />
              ) : (
                <UserPlus
                  className="text-indigo-600"
                  size={28}
                />
              )}

            </div>

            <h2 className="text-3xl font-bold text-slate-900">
              {mode === "login"
                ? "Welcome back!"
                : "Create an account"}
            </h2>

            <p className="text-slate-500 mt-2">
              {mode === "login"
                ? "Sign in to access your dashboard."
                : "Join Joineazy and manage your assignments."}
            </p>

            {/* SIGN IN / REGISTER TABS */}
            <div className="flex bg-slate-100 rounded-xl p-1 mt-7">

              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`flex-1 flex items-center
                  justify-center gap-2 py-2.5 rounded-lg
                  text-sm font-semibold transition ${
                    mode === "login"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500"
                  }`}
              >
                <LogIn size={17} />
                Sign In
              </button>

              <button
                type="button"
                onClick={() => switchMode("register")}
                className={`flex-1 flex items-center
                  justify-center gap-2 py-2.5 rounded-lg
                  text-sm font-semibold transition ${
                    mode === "register"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500"
                  }`}
              >
                <UserPlus size={17} />
                Register
              </button>

            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="mt-5 bg-red-50 border
                border-red-200 text-red-600
                text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            {/* SUCCESS MESSAGE */}
            {success && (
              <div className="mt-5 bg-green-50 border
                border-green-200 text-green-700
                text-sm p-3 rounded-lg">
                {success}
              </div>
            )}

            {/* AUTHENTICATION FORM */}
            <form
              onSubmit={
                mode === "login"
                  ? handleLogin
                  : handleRegister
              }
              className="mt-6 space-y-5"
            >

              {/* FULL NAME */}
              {mode === "register" && (
                <div>
                  <label className="text-sm font-semibold
                    text-slate-700">
                    Full Name
                  </label>

                  <div className="relative mt-2">

                    <UserRound className="absolute left-3
                      top-3.5 text-slate-400"
                      size={19}
                    />

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full border border-slate-200
                        rounded-xl py-3 pl-11 pr-4
                        outline-none focus:ring-2
                        focus:ring-indigo-500"
                    />

                  </div>
                </div>
              )}

              {/* EMAIL */}
              <div>
                <label className="text-sm font-semibold
                  text-slate-700">
                  Email Address
                </label>

                <div className="relative mt-2">

                  <Mail className="absolute left-3
                    top-3.5 text-slate-400"
                    size={19}
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full border border-slate-200
                      rounded-xl py-3 pl-11 pr-4
                      outline-none focus:ring-2
                      focus:ring-indigo-500"
                  />

                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-semibold
                  text-slate-700">
                  Password
                </label>

                <div className="relative mt-2">

                  <LockKeyhole className="absolute left-3
                    top-3.5 text-slate-400"
                    size={19}
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full border border-slate-200
                      rounded-xl py-3 pl-11 pr-12
                      outline-none focus:ring-2
                      focus:ring-indigo-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-3.5
                      text-slate-400"
                  >
                    {showPassword
                      ? <EyeOff size={19} />
                      : <Eye size={19} />}
                  </button>

                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              {mode === "register" && (
                <div>
                  <label className="text-sm font-semibold
                    text-slate-700">
                    Confirm Password
                  </label>

                  <div className="relative mt-2">

                    <LockKeyhole className="absolute left-3
                      top-3.5 text-slate-400"
                      size={19}
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required
                      className="w-full border border-slate-200
                        rounded-xl py-3 pl-11 pr-4
                        outline-none focus:ring-2
                        focus:ring-indigo-500"
                    />

                  </div>
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="w-full bg-indigo-600
                  hover:bg-indigo-700 text-white
                  font-semibold py-3.5 rounded-xl
                  flex items-center justify-center gap-2
                  transition"
              >
                {mode === "login"
                  ? "Sign In"
                  : "Create Account"}

                <ArrowRight size={19} />
              </button>

            </form>

            {/* SWITCH AUTH MODE */}
            <p className="text-center text-sm
              text-slate-500 mt-7">

              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                type="button"
                onClick={() =>
                  switchMode(
                    mode === "login"
                      ? "register"
                      : "login"
                  )
                }
                className="text-indigo-600
                  font-semibold ml-1 hover:underline"
              >
                {mode === "login"
                  ? "Register"
                  : "Sign In"}
              </button>

            </p>

          </div>

          <p className="text-center text-slate-400
            text-xs mt-6">
            Secure academic workspace · Joineazy 2026
          </p>

        </div>
      </div>
    </div>
  );
}

export default App;
