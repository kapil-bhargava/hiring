import React, { useState } from 'react'
import AdminSidebar from '../components/admin/adminsidebar'
import { Outlet } from 'react-router-dom'
import AdminBadge from '../components/admin/AdminBadge';


function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
        <div className='flex'>
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
            <div className="flex-1 md:ml-64">
                <header className="sticky top-0 flex items-center justify-between bg-white px-6 py-4 shadow">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className=" text-purple-600 md:hidden text-xl font-bold text-gray-700"
                    >
                        ☰
                    </button>

                    <h1 className="text-xl font-semibold">Admin Panel</h1>

                    <AdminBadge/>
                </header>


                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout