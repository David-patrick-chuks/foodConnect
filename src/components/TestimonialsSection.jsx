import { testimonials } from "../utils/testimonials";
export const TestimonialsSection = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(({ id, name, role, image, quote }) => (
            <div key={id} className="bg-white p-6 rounded-lg shadow-md">
              <img
                src={image}
                alt={`${name}'s profile`}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-center">{name}</h3>
              <p className="text-sm text-center text-gray-500 mb-2">{role}</p>
              <p className="text-center text-gray-700">"{quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

