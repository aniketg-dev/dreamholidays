const Stats = () => {
  const stats = [
    { id: 1, label: 'Destinations', value: '120+' },
    { id: 2, label: 'Happy Travelers', value: '15k+' },
    { id: 3, label: 'Countries', value: '45+' }
  ];

  return (
    <section className="relative pt-24 pb-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {stats.map(s => (
            <div key={s.id}>
              <div className="text-3xl font-bold text-blue-600">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
