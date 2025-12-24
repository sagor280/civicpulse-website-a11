import React, { useEffect } from 'react';


import { FaBullseye, FaUsers, FaLightbulb, FaRocket } from 'react-icons/fa';

const AboutSection = () => {

     return (
          <div className="max-w-7xl mx-auto px-4 py-14">

               {/* Header */}
               <div
                    className="text-center max-w-3xl mx-auto mb-14"
                    data-aos="fade-down"
               >
                    <h1 className="text-4xl font-bold text-primary mb-4">
                         About Our Platform
                    </h1>
                    <p className="text-gray-500 text-lg">
                         A smart and transparent system where citizens can report issues
                         and authorities can resolve them efficiently with full tracking.
                    </p>
               </div>

               {/* Info Grid */}
               <div className="grid md:grid-cols-2 gap-8 mb-14">

                    {/* Purpose */}
                    <div
                         className="bg-base-100 rounded-2xl shadow-lg p-8 hover:shadow-xl transition"
                         data-aos="fade-right"
                    >
                         <div className="flex items-center gap-3 mb-4 text-primary">
                              <FaBullseye className="text-2xl" />
                              <h2 className="text-2xl font-semibold">Our Purpose</h2>
                         </div>
                         <p className="text-gray-600 leading-relaxed">
                              Our purpose is to empower citizens by giving them a reliable
                              platform to report real-life issues and track their resolution
                              process transparently without delays or confusion.
                         </p>
                    </div>

                    {/* Why */}
                    <div
                         className="bg-base-100 rounded-2xl shadow-lg p-8 hover:shadow-xl transition"
                         data-aos="fade-left"
                    >
                         <div className="flex items-center gap-3 mb-4 text-primary">
                              <FaLightbulb className="text-2xl" />
                              <h2 className="text-2xl font-semibold">Why We Built This</h2>
                         </div>
                         <p className="text-gray-600 leading-relaxed">
                              Many issues remain unresolved due to lack of communication
                              and accountability. This platform bridges the gap between
                              citizens and administrators through real-time updates,
                              status tracking, and structured workflows.
                         </p>
                    </div>

               </div>

               {/* Who We Are */}
               <div
                    className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl p-10 mb-14"
                    data-aos="zoom-in"
               >
                    <div className="max-w-4xl mx-auto text-center">
                         <FaUsers className="text-4xl text-primary mx-auto mb-4" />
                         <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
                         <p className="text-gray-600 text-lg leading-relaxed">
                              We are a group of passionate developers, designers, and
                              problem-solvers who believe technology can make public services
                              more transparent, efficient, and people-centric.
                         </p>
                    </div>
               </div>

               {/* Mission & Vision */}
               <div className="grid md:grid-cols-2 gap-8">

                    {/* Mission */}
                    <div
                         className="bg-base-100 rounded-2xl shadow-lg p-8"
                         data-aos="fade-up"
                    >
                         <div className="flex items-center gap-3 mb-4 text-primary">
                              <FaRocket className="text-2xl" />
                              <h2 className="text-2xl font-semibold">Our Mission</h2>
                         </div>
                         <p className="text-gray-600 leading-relaxed">
                              Our mission is to create a simple, fast, and trustworthy issue
                              management platform where every reported issue is tracked,
                              prioritized, and resolved efficiently.
                         </p>
                    </div>

                    {/* Vision */}
                    <div
                         className="bg-base-100 rounded-2xl shadow-lg p-8"
                         data-aos="fade-up"
                         data-aos-delay="200"
                    >
                         <div className="flex items-center gap-3 mb-4 text-primary">
                              <FaRocket className="text-2xl rotate-180" />
                              <h2 className="text-2xl font-semibold">Our Vision</h2>
                         </div>
                         <p className="text-gray-600 leading-relaxed">
                              We envision a future where technology-driven governance ensures
                              transparency, accountability, and faster resolution of public
                              issues for better communities.
                         </p>
                    </div>

               </div>

          </div>
     );
};

export default AboutSection;