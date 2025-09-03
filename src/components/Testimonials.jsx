const testimonials = [
  {
    id: 1,
    name: 'Aisha K.',
    text: 'Our trip was flawless. Dream Holidays took care of everything and exceeded expectations.'
  },
  {
    id: 2,
    name: 'Carlos M.',
    text: 'Amazing service and great value. Will book again!' 
  },
  {
    id: 3,
    name: 'Priya S.',
    text: 'Beautifully planned itinerary and friendly guides. Highly recommend.'
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">What Travelers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.id} className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-700 mb-4">“{t.text}”</p>
              <div className="text-sm font-medium text-gray-900">— {t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
