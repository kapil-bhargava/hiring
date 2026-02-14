import Swal from "sweetalert2";

// 🔴 Delete Alert (Veridia Theme)
export const confirmDelete = async (message = "Are you sure?") => {
  const result = await Swal.fire({
    title: message,
    text: "This action is permanent and cannot be undone.",
    icon: "warning",

    showCancelButton: true,

    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",

    confirmButtonColor: "#ef4444", // modern red
    cancelButtonColor: "#e5e7eb",

    background: "#ffffff",
    color: "#111827",

    customClass: {
      popup: "rounded-2xl shadow-xl",
      confirmButton: "px-5 py-2 font-semibold",
      cancelButton: "px-5 py-2",
    },
  });

  return result.isConfirmed;
};


// 🔵 Logout Alert (Veridia Theme)
export const confirmLogout = async () => {
  const result = await Swal.fire({
    title: "Sign out from Veridia?",
    text: "You will need to log in again to access your dashboard.",
    icon: "question",

    showCancelButton: true,

    confirmButtonText: "Logout",
    cancelButtonText: "Stay signed in",

    confirmButtonColor: "#4f46e5", // Veridia primary
    cancelButtonColor: "#e5e7eb",

    background: "#ffffff",
    color: "#111827",

    customClass: {
      popup: "rounded-2xl shadow-xl",
      confirmButton: "px-5 py-2 font-semibold",
      cancelButton: "px-5 py-2",
    },
  });

  return result.isConfirmed;
};
