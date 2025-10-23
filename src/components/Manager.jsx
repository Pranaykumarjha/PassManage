import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { KeyRound, Eye, EyeOff, Copy } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const passwordRef = useRef(null);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [copied, setCopied] = useState({ index: null, field: "" });

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) setPasswordArray(JSON.parse(passwords));
  }, []);

  const togglePassword = () => setShow(prev => !prev);

  const savePassword = () => {
    const newPasswords = [...passwordArray, { ...form, id: uuidv4() }];
    setPasswordArray(newPasswords);
    localStorage.setItem("passwords", JSON.stringify(newPasswords));
    toast.success("Password saved ✅");
    setForm({ site: "", username: "", password: "" });
  };

  const deletePassword = (id) => {
    if (confirm("Do you really want to delete the password?")) {
      const filtered = passwordArray.filter(item => item.id !== id);
      setPasswordArray(filtered);
      localStorage.setItem("passwords", JSON.stringify(filtered));
    }
  };

  const editPassword = (id) => {
    const item = passwordArray.find(i => i.id === id);
    setForm(item);
    setPasswordArray(passwordArray.filter(i => i.id !== id));
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const copyText = (text, index, field) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.info("Copied to clipboard ✅", {
        position: "top-right",
        autoClose: 1500,
        theme: "light",
      });
    });

    setCopied({ index, field });
    setTimeout(() => setCopied({ index: null, field: "" }), 1200);
  };

  return (
    <div className="relative min-h-screen px-4 sm:px-6 md:px-10">
      {/* Full-page background */}
      <div className="absolute inset-0 -z-10 bg-white [background:radial-gradient(125%_125%_at_50%_10%,#ffffff_20%,#bbf7d0_60%,#22c55e_100%)]"></div>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mt-6">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
        </h1>

        <p className="text-green-900 text-center text-sm sm:text-lg mt-2">
          Your own password manager
        </p>

        {/* Form */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 mt-6 items-center">
          <input
            value={form.site}
            name="site"
            onChange={handleChange}
            placeholder="Enter website URL"
            type="text"
            className="px-4 py-2 rounded-full border border-green-500 w-full sm:w-[48%]"
          />

          <input
            value={form.username}
            name="username"
            onChange={handleChange}
            placeholder="Enter Username"
            type="text"
            className="px-4 py-2 rounded-full border border-green-500 w-full sm:w-[48%]"
          />

          <div className="relative w-full sm:w-[48%]">
            <input
              ref={passwordRef}
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
              type={show ? "text" : "password"}
              name="password"
              className="px-4 py-2 rounded-full border border-green-500 w-full pr-12"
              autoComplete="new-password"
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-green-700 cursor-pointer"
              onClick={togglePassword}
            >
              <AnimatePresence mode="wait" initial={false}>
                {show ? (
                  <motion.div
                    key="eyeoff"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <EyeOff size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="eye"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Eye size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={savePassword}
            className="flex items-center gap-2 text-white bg-green-600 rounded-full px-4 py-2 w-fit border-2 border-green-700 hover:bg-green-500 shadow-md mt-2 sm:mt-0"
          >
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
              <KeyRound size={22} />
            </motion.div>
            Save Password
          </motion.button>
        </div>

        {/* Password list */}
        <h2 className="font-bold text-xl py-4 mt-6">Your Passwords</h2>
        {passwordArray.length === 0 ? (
          <div>No Passwords to show</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full min-w-[600px] rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    {/* Site */}
                    <td className="text-center border-white py-2 relative break-words">
                      <a href={item.site} target="_blank" rel="noreferrer">{item.site}</a>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9, rotate: -15 }}
                        onClick={() => copyText(item.site, index, "site")}
                        className="relative ml-2 text-green-700 hover:text-green-900"
                      >
                        <Copy size={16} />
                        <AnimatePresence>
                          {copied.index === index && copied.field === "site" && (
                            <motion.span
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                              className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-green-700 text-white px-2 py-1 rounded"
                            >
                              Copied!
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </td>

                    {/* Username */}
                    <td className="text-center border-white py-2 relative break-words">
                      {item.username}
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9, rotate: -15 }}
                        onClick={() => copyText(item.username, index, "username")}
                        className="relative ml-2 text-green-700 hover:text-green-900"
                      >
                        <Copy size={16} />
                        <AnimatePresence>
                          {copied.index === index && copied.field === "username" && (
                            <motion.span
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                              className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-green-700 text-white px-2 py-1 rounded"
                            >
                              Copied!
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </td>

                    {/* Password */}
                    <td className="text-center border-white py-2 relative break-words">
                      {item.password}
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9, rotate: -15 }}
                        onClick={() => copyText(item.password, index, "password")}
                        className="relative ml-2 text-green-700 hover:text-green-900"
                      >
                        <Copy size={16} />
                        <AnimatePresence>
                          {copied.index === index && copied.field === "password" && (
                            <motion.span
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                              className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-green-700 text-white px-2 py-1 rounded"
                            >
                              Copied!
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </td>

                    {/* Actions */}
                    <td className="text-center border-white py-2">
                      <div className="flex justify-center gap-4 flex-wrap">
                        {/* Edit */}
                        <motion.button
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          whileTap={{ scale: 0.9 }}
                          className="relative text-green-700 hover:text-green-900"
                          onClick={() => editPassword(item.id)}
                        >
                          {/* SVG */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11 4h2m-1-1v2m4.586 2.586a2 2 0 010 2.828L10 19H7v-3l7.586-7.586a2 2 0 012.828 0z"
                            />
                          </svg>
                        </motion.button>

                        {/* Delete */}
                        <motion.button
                          whileHover={{ scale: 1.2, rotate: -360 }}
                          whileTap={{ scale: 0.9 }}
                          className="relative text-red-600 hover:text-red-800"
                          onClick={() => deletePassword(item.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0v4m4-4v4M4 7h16"
                            />
                          </svg>
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Manager;
