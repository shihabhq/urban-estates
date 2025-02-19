import { useState } from "react";
import { toast } from "react-toastify";
import Heading from "../../../../shared/Heading";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Message sent successfully!");

    setFormData({ email: "", phoneNumber: "", message: "" });
  };

  return (
    <div className="bg-white mt-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <Heading largeHead={"Contact Us"} />
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#f1913d] focus:border-[#f1913d]"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#f1913d] focus:border-[#f1913d]"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#f1913d] focus:border-[#f1913d]"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-[#f1913d] border border-transparent rounded-md shadow-sm py-2 px-4 text-white font-medium hover:bg-[#e07d2d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f1913d]"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
