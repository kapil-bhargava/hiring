import Swal from "sweetalert2";

// 🔴 Delete Alert
export const confirmDelete = async (message = "Are you sure?") => {
  const result = await Swal.fire({
    title: message,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    customClass: {
      popup: "rounded-xl",
    },
  });

  return result.isConfirmed;
};


// 🔵 Logout Alert
export const confirmLogout = async () => {
  const result = await Swal.fire({
    title: "Logout?",
    text: "You will need to login again.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#aaa",
    confirmButtonText: "Logout",
  });

  return result.isConfirmed;
};
