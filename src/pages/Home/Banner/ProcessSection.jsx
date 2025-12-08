import { Camera, UserCheck, Wrench, CheckCircle2, ArrowRight } from "lucide-react";


const ProcessSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto text-center px-4">

        {/* Title */}
        <span className="px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">
          Simple Process
        </span>

        <h2 className="text-5xl font-bold mt-4">
          How <span className="text-primary">Civic</span>
          <span className="text-primary font-extrabold">Pulse</span> Works
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mt-3 mb-12">
          From reporting to resolution, our streamlined process ensures your voice is heard and issues get fixed efficiently.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <Camera className="w-8 h-8 text-blue-500" />
            </div>
            <h4 className="text-3xl font-bold text-gray-400">01</h4>
            <h3 className="text-lg font-semibold mt-1">Report the Issue</h3>
            <p className="text-gray-600 text-sm mt-2">
              Take a photo, describe the problem & pin the location.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
              <UserCheck className="w-8 h-8 text-purple-500" />
            </div>
            <h4 className="text-3xl font-bold text-gray-400">02</h4>
            <h3 className="text-lg font-semibold mt-1">Admin Assigns</h3>
            <p className="text-gray-600 text-sm mt-2">
              Admin verifies report and assigns it to staff.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
              <Wrench className="w-8 h-8 text-orange-500" />
            </div>
            <h4 className="text-3xl font-bold text-gray-400">03</h4>
            <h3 className="text-lg font-semibold mt-1">Staff Resolves</h3>
            <p className="text-gray-600 text-sm mt-2">
              Staff fixes the issue and uploads proof photos.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h4 className="text-3xl font-bold text-gray-400">04</h4>
            <h3 className="text-lg font-semibold mt-1">Track & Verify</h3>
            <p className="text-gray-600 text-sm mt-2">
              Monitor progress and verify after completion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
