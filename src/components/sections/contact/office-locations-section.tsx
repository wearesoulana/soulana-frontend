import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const offices = [
  {
    city: "San Francisco",
    country: "United States",
    address: "123 Market Street, Suite 456",
    phone: "+1 (555) 123-4567",
    email: "sf@charitychain.org",
    coordinates: "37.7749° N, 122.4194° W"
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "45 Oxford Street",
    phone: "+44 20 7123 4567",
    email: "london@charitychain.org",
    coordinates: "51.5074° N, 0.1278° W"
  },
  {
    city: "Singapore",
    country: "Singapore",
    address: "88 Market Street, #12-01",
    phone: "+65 6789 0123",
    email: "sg@charitychain.org",
    coordinates: "1.3521° N, 103.8198° E"
  }
];

export const OfficeLocationsSection = () => {
  return (
    <section className="mt-32">
      <h2 className="text-3xl sm:text-4xl font-bold text-red-950 dark:text-rose-50 text-center mb-16">
        Our Offices
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {offices.map((office) => (
          <div 
            key={office.city}
            className="group bg-white/30 dark:bg-black/30 rounded-2xl border border-red-200 dark:border-red-900 p-8 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-red-600 dark:text-red-400" />
              <h3 className="text-xl font-bold text-red-950 dark:text-rose-50">
                {office.city}
              </h3>
            </div>
            <p className="text-red-800/80 dark:text-rose-100/80 mb-6">
              {office.address}
              <br />
              {office.country}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-red-800/80 dark:text-rose-100/80">
                <Phone className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>{office.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-red-800/80 dark:text-rose-100/80">
                <Mail className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>{office.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}; 