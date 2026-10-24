import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, Flame, ArrowRight, Award } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Button from '../components/common/Button';
import ImageFallback from '../components/common/ImageFallback';

export const AboutPage = () => {
  const pillars = [
    {
      icon: Flame,
      title: 'Small Batch Frying',
      description: 'We eschew mega-industrial continuous fryers. Every batch is extruded fresh and fried in modest brass and iron cauldrons to achieve the perfect, non-greasy crunch.'
    },
    {
      icon: Sparkles,
      title: 'Stone-Ground Flours',
      description: 'Slow-milled aged rice and gently dry-roasted lentils preserve natural aromatics and provide that light, airy snap traditional snacks are revered for.'
    },
    {
      icon: ShieldCheck,
      title: 'Pure Country Ingredients',
      description: 'We believe real flavor requires real ingredients: whole black peppercorns from Idukki, fragrant carom seeds (omam), and slow-infused country garlic.'
    },
    {
      icon: Award,
      title: 'Time-Honored Recipes',
      description: 'Our formulations honor authentic Chettinad, Madurai, and Manamadurai savouries passed down through regional culinary practitioners.'
    }
  ];

  return (
    <div className="py-6 sm:py-10 bg-warmwhite min-h-screen">
      <div className="page-container">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Our Story' }]} />

        {/* Hero Section */}
        <div className="mt-4 mb-16 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream border border-bordercream text-xs font-bold uppercase tracking-wider text-maroon">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Handcrafted Heritage</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-darktext tracking-tight leading-[1.15]">
            Preserving the Soul of <br />
            <span className="text-maroon">South Indian Snacking.</span>
          </h1>

          <p className="text-mutedtext text-base sm:text-lg leading-relaxed">
            Raji Snacks was born from a desire to bring the unmistakable, honest crunch of festival kitchen savouries into everyday homes across India.
          </p>
        </div>

        {/* Hero Image Showcase */}
        <div className="mb-20 relative rounded-brand-xl overflow-hidden border-2 border-bordercream shadow-soft-lg bg-cream">
          <div className="relative w-full h-64 sm:h-80">
            <ImageFallback
              src="/images/hero_snack_spread.jpg"
              alt="Traditional South Indian snacks assortment"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-darktext/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-warmwhite max-w-xl">
              <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
                Authentic Craftsmanship
              </span>
              <p className="font-display font-bold text-xl sm:text-2xl leading-snug">
                Where every spiral is pressed with care and every handful carries pure nostalgic flavor.
              </p>
            </div>
          </div>
        </div>

        {/* Story Block 1: The Culinary Craft */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-dark block">
              The Art of Murukku
            </span>
            <h2 className="font-display font-extrabold text-3xl text-darktext tracking-tight">
              More than a snack, a cultural heirloom.
            </h2>
            <p className="text-mutedtext text-sm sm:text-base leading-relaxed">
              In Tamil culture, the word <em>Murukku</em> means to twist or coil. Preparing it has always been an occasion of shared joy — aunts, grandmothers, and cousins gathering around large wooden pressers (sevu urul) as fragrant spirals dropped into sizzling hot oil.
            </p>
            <p className="text-mutedtext text-sm sm:text-base leading-relaxed">
              We recreate that same familial reverence in our production. Rather than relying on shortcuts or artificial enhancers, we prioritize the balance of lentils, wholesome rice, and pure butter.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative w-full h-64 sm:h-72 rounded-brand-xl overflow-hidden border border-bordercream shadow-soft bg-cream">
              <ImageFallback
                src="/images/garlic_muruku.jpg"
                alt="Golden handmade murukku"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Story Block 2: Regional Legends */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative w-full h-64 sm:h-72 rounded-brand-xl overflow-hidden border border-bordercream shadow-soft bg-cream">
              <ImageFallback
                src="/images/madurai_special_mixture.jpg"
                alt="Madurai spicy mixture"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5 order-1 lg:order-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-dark block">
              Regional Specialties
            </span>
            <h2 className="font-display font-extrabold text-3xl text-darktext tracking-tight">
              Flavors shaped by iconic towns.
            </h2>
            <p className="text-mutedtext text-sm sm:text-base leading-relaxed">
              Each corner of South India boasts its own savory signature. Madurai is renowned for its spicy, nutty mixture layered with crispy curry leaves. Manamadurai earned legendary status for its coarse Kara Sevu, studded with tellicherry black pepper and garlic.
            </p>
            <p className="text-mutedtext text-sm sm:text-base leading-relaxed">
              At Raji Snacks, we celebrate these distinct regional traditions under one roof, keeping their classic taste profiles intact.
            </p>
          </div>
        </div>

        {/* 4 Pillars Section */}
        <div className="py-16 bg-cream/40 rounded-brand-xl border border-bordercream p-8 sm:p-12 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-dark block mb-1">
              Our Core Commitments
            </span>
            <h2 className="font-display font-extrabold text-3xl text-darktext">
              What Defines Every Pack
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="bg-warmwhite p-6 rounded-brand border border-bordercream shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-gold-soft flex items-center justify-center text-maroon mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-darktext mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-mutedtext leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA to Shop */}
        <div className="text-center py-12 space-y-4">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-darktext">
            Ready to experience authentic traditional crunch?
          </h2>
          <p className="text-mutedtext text-sm sm:text-base max-w-md mx-auto">
            Order your freshly packed batch of our signature murukku, mixture, and kara sevu today.
          </p>
          <div className="pt-2">
            <Link to="/shop">
              <Button variant="primary" size="lg">
                <span>Explore the Snack Collection</span>
                <ArrowRight className="w-4 h-4 ml-1 text-gold" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
