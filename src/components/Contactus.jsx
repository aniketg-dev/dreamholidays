import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      // Basic validation check
      if (!Object.values(formData).every((field) => field.trim() !== '')) {
        throw new Error('Please fill in all fields.');
      }

      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    } catch (error) {
      setStatus('error');
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-white text-black">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4">Contact Us</h3>
          <p className="text-gray-600 mb-6">
            Have questions about your dream holiday? Get in touch with us!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-vertical transition-all duration-300"
              placeholder="Tell us about your dream holiday or ask any questions..."
            ></textarea>
          </div>

          {status === 'success' && (
            <div className="text-center text-green-600 font-medium">
              Thank you! Your message has been sent.
            </div>
          )}
          {status === 'error' && (
            <div className="text-center text-red-600 font-medium">
              Oops! Something went wrong. Please try again.
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`
                bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-md
                ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 transform hover:scale-105'}
              `}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;