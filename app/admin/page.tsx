"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (email == "asfaakhan@gmail.com" && password === "yousufzai") {
            localStorage.setItem("isLoggedIn", "true");
            router.push("/admin/dashboard")
        } else {
            alert("Invalid Email or Passord")
        }
    }

    return (
        <div className=" flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
                <h2 className=" text-xl font-bold mb-4 ">
                    Admin login
                </h2>
                <input type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded"
                    value={email} />

                <input type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded"
                    value={password} />
                <button className="bg-red-500 text-white py-2 px-4 w-full">
                    Login
                </button>
            </form>
        </div>
    )
}