import { MapPin, Bell, Shield, BarChart3, Clock, Users, Zap, Globe } from "lucide-react";

const FeaturesSection = () => {

  const features = [
    {
      icon: <MapPin className="h-7 w-7 text-primary group-hover:text-white transition-all duration-300" />,
      title: "Location-Based Reporting",
      description: "Pin exact locations on maps for faster and accurate identification.",
    },
    {
      icon: <Bell className="h-7 w-7 text-primary group-hover:text-white transition-all duration-300" />,
      title: "Real-Time Updates",
      description: "Get instant notifications as your issues move through each stage.",
    },
    {
      icon: <Shield className="h-7 w-7 text-primary group-hover:text-white transition-all duration-300" />,
      title: "Verified Resolution",
      description: "All resolved issues are verified and documented with evidence.",
    },
    {
      icon: <BarChart3 className="h-7 w-7 text-primary group-hover:text-white transition-all duration-300" />,
      title: "Analytics Dashboard",
      description: "See city-wide issue trends and infrastructure conditions in real-time.",
    },
    {
      icon: <Clock className="h-7 w-7 text-primary group-hover:text-white transition-all duration-300" />,
      title: "Priority Handling",
      description: "Urgent reports are escalated for faster action and response.",
    },
    {
      icon: <Users className="h-7 w-7 text-primary group-hover:text-white transition-all duration-300" />,
      title: "Community Voting",
      description: "Upvote issues and let the community highlight what matters most.",
    },
    {
      icon: <Zap className="h-7 w-7 text-primary group-hover:text-white transition-all duration-300" />,
      title: "Quick Response",
      description: "Average response time is under 48 hours with dedicated staff.",
    },
    {
      icon: <Globe className="h-7 w-7 text-primary group-hover:text-white transition-all duration-300" />,
      title: "Transparent Tracking",
      description: "See the full journey of any issue from submission to closure.",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-semibold">Platform Features</p>
          <h2 className="text-4xl font-bold mt-2">
            Everything You Need to <span className="text-primary">Fix Your City</span>
          </h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            CivicPulse brings powerful tools to help citizens, staff and communities work together.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => (
            <div
              key={item.title}
              className="group p-6 bg-white rounded-2xl shadow border border-gray-100 
              hover:shadow-xl hover:border-primary/40 transition-all duration-300"
            >
              {/* Icon Wrapper */}
              <div
                className="mb-4 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center 
                group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-110"
              >
                {item.icon}
              </div>

              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
