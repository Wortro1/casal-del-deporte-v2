import React from 'react';
import '../styles/Services.css';

export default function Services() {
  return (
    <section id="servicios" className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-4">
          Nuestros <span className="text-[#45ffca]">Servicios</span>
        </h2>
        <div className="services-underline"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 services-grid">
          {/* Service Card 1 */}
          <div className="bg-gray-900/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all group border-2 border-[#45ffca] service-card">
            <div className="overflow-hidden service-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZ3lmJTIwd29ya291dHxlbnwxfHx8fDE3NzAwMjIzNDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Fitness workout"
                className="w-full group-hover:scale-110 transition-transform duration-500 service-img"
                loading="lazy"
              />
            </div>
            <div className="p-6 service-body">
              <h3 className="text-xl font-bold">Ejercicio Saludable</h3>
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="bg-gray-900/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all group border-2 border-[#45ffca] service-card">
            <div className="overflow-hidden service-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1676655079738-af54dfd6318e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWlnaHRsaWZ0aW5nJTIwZXhlcmNpc2UlMjBkYXJrfGVufDF8fHx8MTc3MDA2MTY2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Weightlifting"
                className="w-full group-hover:scale-110 transition-transform duration-500 service-img"
                loading="lazy"
              />
            </div>
            <div className="p-6 service-body">
              <h3 className="text-xl font-bold">Ejercicio Saludable</h3>
            </div>
          </div>

          {/* Service Card 3 */}
          <div className="bg-gray-900/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all group border-2 border-[#45ffca] service-card">
            <div className="overflow-hidden service-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1758875570120-e156041a857a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBjYXJkaW8lMjB0cmFpbmluZ3xlbnwxfHx8fDE3NzAwNjE2NjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Cardio training"
                className="w-full group-hover:scale-110 transition-transform duration-500 service-img"
                loading="lazy"
              />
            </div>
            <div className="p-6 service-body">
              <h3 className="text-xl font-bold">Ejercicio Saludable</h3>
            </div>
          </div>

          {/* Service Card 4 */}
          <div className="bg-gray-900/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all group border-2 border-[#45ffca] service-card">
            <div className="overflow-hidden service-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1662386392891-688364c5a5d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwZHVtYmJlbGxzfGVufDF8fHx8MTc3MDA0Nzg3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Strength training"
                className="w-full group-hover:scale-110 transition-transform duration-500 service-img"
                loading="lazy"
              />
            </div>
            <div className="p-6 service-body">
              <h3 className="text-xl font-bold">Ejercicio Saludable</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
