import React from 'react';
import { MapPin, Phone, Clock, MessageSquare, Star, CheckCircle, Award, HeartHandshake } from 'lucide-react';
import { REVIEWS } from '../data/products';

export default function StoreInfo() {
  return (
    <section className="my-20 max-w-7xl mx-auto px-4 md:px-8 space-y-16">
      
      {/* Physical Store Locator & WhatsApp Booking Card */}
      <div className="bg-gradient-to-r from-charcoal-950 via-charcoal-900 to-charcoal-950 text-cream-50 rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-block bg-maroon-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Visit Our Flagship Store
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-cream-100">
              Dinesh Readymade Store
            </h2>
            <p className="text-sm text-cream-300 font-light leading-relaxed max-w-xl">
              Experience our full range of ready-to-wear kurtas, suits, bridal sarees, and custom tailoring alterations in person. Our master tailors are available on-site for immediate custom fits.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-maroon-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-cream-100">Location:</strong>
                  <span className="text-cream-300">Shop No. 42-45, Main Market, City Centre</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-maroon-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-cream-100">Store Hours:</strong>
                  <span className="text-cream-300">Mon - Sun: 10:00 AM - 9:30 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-5 h-5 text-maroon-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-cream-100">Customer Care:</strong>
                  <span className="text-cream-300">+91 98765 43210</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
            <div className="bg-white/10 p-6 rounded-2xl border border-white/15 backdrop-blur-md w-full max-w-sm text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-cream-100 uppercase">
                Instant WhatsApp Assistance
              </h3>
              <p className="text-xs text-cream-300">
                Want custom sizing or video call product demo? Chat directly with Dinesh Store manager.
              </p>
              <a
                href="https://wa.me/919876543210?text=Hello%20Dinesh%20Readymade%20Store%2C%20I%20want%20to%20inquire%20about%20clothing%20items."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Customer Reviews & Testimonials Carousel */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-maroon-700">
            Real Customer Experiences
          </span>
          <h2 className="font-display text-3xl font-extrabold uppercase text-charcoal-900">
            What Our Patrons Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-cream-50 p-6 rounded-xl border border-charcoal-900/10 shadow-sm flex flex-col justify-between space-y-4 hover:border-maroon-700/30 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-charcoal-900/50">{rev.date}</span>
                </div>
                <p className="text-xs text-charcoal-900/80 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-charcoal-900/10 pt-3">
                <span className="font-display font-bold text-xs text-charcoal-900">{rev.name}</span>
                {rev.verified && (
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Verified Buyer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
