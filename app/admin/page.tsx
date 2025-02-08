"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../components/Loader";

export default function AdminLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (email == "asfaakhan@gmail.com" && password === "yousufzai") {
            localStorage.setItem("isLoggedIn", "true");
            router.push("/admin/dashboard")
            Swal.fire({
                title: "Successfully Login",
                icon: "success",
                showConfirmButton:false,
                showClass: {
                    popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                    popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }

            })
        } else {
            Swal.fire({
                title: "Invalid Password or Email",
                icon: "question",
                showConfirmButton:false,

                showClass: {
                    popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                },
                hideClass: {
                    popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                }
            })
        }
    }

    // Loading Spinner
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        // Simulate a data fetch
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }, []);
      if (loading) {
        return <Loader />;
      }

    return (
        <div className="relative overflow-hidden h-screen">
            <div style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1496262967815-132206202600?q=80&w=1523&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
            }} className="absolute inset-0 bg-cover bg-center filter blur-none">
            </div>
            <div className="relative z-10 flex items-center justify-center h-full">
                <form onSubmit={handleLogin} className="bg-white bg-opacity-50 p-6 rounded shadow-2xl border border-gray-300 max-w-md w-full">
                    <h2 className=" text-xl font-extrabold text-black mb-4 ">
                        Admin login
                    </h2>
                    <input type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 mb-4 border border-gray-500 rounded-full focus:outline-sky-300 focus:ring-2 "
                        value={email} />
                    <input type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 mb-4 border border-gray-500 rounded-full focus:outline-sky-300 focus:ring-2 "
                        value={password} />
                    <button className="bg-slate-950 text-white py-2 px-4 w-full rounded-full  hover:bg-slate-800">
                        Login
                    </button>
                </form>
            </div>

        </div>
    )
}