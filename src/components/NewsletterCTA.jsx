const NewsletterCTA = () => {
  return (
    <section className="py-12 bg-blue-600 text-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold mb-4">Join our newsletter</h3>
        <p className="mb-6">Get exclusive deals and travel inspiration delivered to your inbox.</p>
        <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
          <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 rounded-l-lg text-black" />
          <button className="bg-white text-blue-600 px-5 py-3 rounded-r-lg font-medium">Subscribe</button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;
