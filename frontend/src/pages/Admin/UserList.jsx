import { useEffect, useState } from "react";
import {
  FaTrash,
  FaEdit,
  FaPen,
  FaKeyboard,
  FaTasks,
  FaCheck,
  FaUser,
} from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User deleted.");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
      toast.success("User updated.");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white px-6 py-6 ml-14">
      <h1 className="text-3xl font-bold mb-8 text-[#1e3a8a] flex items-center gap-2">
        <FaTasks className="text-[#1e3a8a]" /> Manage Users
      </h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="overflow-x-auto">
          <motion.table
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full text-left border-collapse"
          >
            <thead>
              <tr className="bg-[#121217] text-[#1e3a8a] uppercase text-sm tracking-wider">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Admin</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {users.map((user) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="border-b border-[#1e1e1e] hover:bg-[#1a1a1d]"
                  >
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {user._id}
                    </td>
                    <td className="px-6 py-4">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editableUserName}
                            onChange={(e) =>
                              setEditableUserName(e.target.value)
                            }
                            className="bg-[#121217] text-white border border-[#2c2c2e] rounded-lg p-2 w-full"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          {user.username}
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                          >
                            <FaEdit className="ml-3 text-blue-400 hover:text-blue-300" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editableUserEmail}
                            onChange={(e) =>
                              setEditableUserEmail(e.target.value)
                            }
                            className="bg-[#121217] text-white border border-[#2c2c2e] rounded-lg p-2 w-full"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <a
                            href={`mailto:${user.email}`}
                            className="text-cyan-400 hover:underline"
                          >
                            {user.email}
                          </a>
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                          >
                            <FaEdit className="ml-3 text-blue-400 hover:text-blue-300" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {user.isAdmin ? (
                        <FaPen className="text-yellow-400 mx-auto text-base" />
                      ) : (
                        <FaUser className="text-gray-400 mx-auto text-base" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {!user.isAdmin ? (
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-lg"
                        >
                          <FaTrash />
                        </button>
                      ) : (
                        <FaKeyboard className="text-green-600 mx-auto text-lg" />
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </motion.table>
        </div>
      )}
    </div>
  );
};

export default UserList;
