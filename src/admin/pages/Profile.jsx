import React, { useState } from 'react';
import {
  User,
  Shield,
  Mail,
  Phone,
  Key,
  CheckCircle2,
  Lock,
  Save,
  Building
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function Profile() {
  const { settings } = useAdmin();

  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Administrator',
    email: 'admin@rajisnacks.com',
    phone: '+91 98401 23456',
    role: 'Super Administrator',
    department: 'Operations & Fulfillment',
    joinedDate: '2026-01-15',
    notifyNewOrders: true,
    notifyLowStock: true,
    notifyReturns: true,
    weeklyReport: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E8DDCB]/60">
        <div>
          <h1 className="text-2xl font-serif font-bold text-darktext">
            Admin Profile & Permissions
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Manage your credentials, notification preferences and operational access role
          </p>
        </div>
        {saved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest/15 text-forest text-xs font-semibold animate-in fade-in-50">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile Updated</span>
          </div>
        )}
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-xl border border-[#E8DDCB] p-6 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-maroon via-maroon-dark to-gold text-white flex items-center justify-center text-2xl font-serif font-bold shadow-md flex-shrink-0">
          AD
        </div>
        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-xl font-serif font-bold text-darktext">
              {profile.name}
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gold/20 text-maroon self-center sm:self-auto border border-gold/40">
              <Shield className="w-3 h-3" />
              <span>{profile.role}</span>
            </span>
          </div>
          <p className="text-xs text-muted">
            {profile.department} • Member since January 2026
          </p>
          <p className="text-xs text-darktext font-mono mt-2">
            {profile.email} • {profile.phone}
          </p>
        </div>
      </div>

      {/* Profile Edit Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Information */}
        <div className="bg-white rounded-xl border border-[#E8DDCB] p-5 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-sm text-darktext border-b border-[#E8DDCB]/60 pb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-maroon" />
            <span>Personal Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-darktext mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-darktext mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-darktext mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-darktext mb-1">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={profile.department}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
              />
            </div>
          </div>
        </div>



        {/* Security & Access Demonstration Info */}
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 text-xs text-amber-900 space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-amber-700" />
            <span>Role-Based Access Control Architecture</span>
          </p>
          <p className="leading-relaxed">
            This profile interface operates in local frontend demonstration mode.
            The architecture is pre-configured with role labels and state
            handlers ready for plug-in connection to Firebase Auth or Node.js JWT
            role validation in subsequent development phases.
          </p>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-maroon text-white text-xs font-semibold hover:bg-maroon-dark transition-all shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}
