import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-brand-navy/10 bg-brand-navy text-brand-mist">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img src="/estatehub-logo.svg" alt="EstateHub logo" className="h-10 w-10 rounded bg-white object-contain" />
            <span className="text-lg font-semibold text-white">EstateHub</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-brand-mist/70">
            A place to buy, sell, and rent property, built for people who want
            a straightforward path from listing to keys in hand.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Company</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-brand-mist/70">
            <li><Link to="/about" className="hover:text-white">About us</Link></li>
            <li><Link to="/" className="hover:text-white">Listings</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Get started</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-brand-mist/70">
            <li><Link to="/register/buyer" className="hover:text-white">Join as a buyer</Link></li>
            <li><Link to="/register/seller" className="hover:text-white">Join as a seller</Link></li>
            <li><Link to="/login" className="hover:text-white">Log in</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-brand-mist/70">
            <li>hello@estatehub.com</li>
            <li>+92 300 555 0148</li>
            <li>Islamabad and Rawalpindi</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="container-page text-xs text-brand-mist/50">
          &copy; {new Date().getFullYear()} EstateHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
