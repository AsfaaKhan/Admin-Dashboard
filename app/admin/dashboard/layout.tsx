"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar for large screens */}
      <aside className="hidden md:block fixed top-0 bottom-0 left-0 w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <Link href="/admin/dashboard">
                <span className="hover:text-gray-300">Overview</span>
              </Link>
            </li>
            {/* <li className="mb-4">
              <Link href="./dashboard/reports">
                <span className="hover:text-gray-300">Reports</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="./dashboard/settings">
                <span className="hover:text-gray-300">Settings</span>
              </Link>
            </li> */}
            <li className="mb-4">
              <Link href="./dashboard/addProduct">
                <span className="hover:text-gray-300">Add Product</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="./dashboard/products">
                <span className="hover:text-gray-300">Product</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile Navbar (visible on small screens) */}
      <div className="md:hidden w-full bg-gray-800 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-gray-800 text-white p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <button onClick={() => setMobileMenuOpen(false)}>
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
          <nav>
            <ul>
              <li className="mb-4">
                <Link href="./dashboard">
                  <span
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-gray-300"
                  >
                    Overview
                  </span>
                </Link>
              </li>
              {/* <li className="mb-4">
                <Link href="./dashboard/reports">
                  <span
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-gray-300"
                  >
                    Reports
                  </span>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="./dashboard/settings">
                  <span
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-gray-300"
                  >
                    Settings
                  </span>
                </Link>
              </li> */}
              <li className="mb-4">
                <Link href="./dashboard/addProduct">
                  <span
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-gray-300"
                  >
                    Add Product
                  </span>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="./dashboard/products">
                  <span
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-gray-300"
                  >
                    Product
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 md:ml-64">
        {children}
      </main>
    </div>
  );
}

