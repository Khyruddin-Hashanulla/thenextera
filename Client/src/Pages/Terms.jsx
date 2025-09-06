import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Animated Background Elements - matching Home page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/40 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/40 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/30 rounded-full blur-2xl animate-ping" style={{ animationDuration: "4s" }}></div>
      </div>
      
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-4 pt-32 pb-8">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Agreement to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms of Service ("Terms") govern your use of NextEra's website and educational services. By accessing or using our platform, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            {/* Acceptance */}
            <section>
              <h2 className="text-2xl font-bold text-purple-400 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By creating an account, enrolling in courses, or using any part of our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. These Terms apply to all users, including students, instructors, and visitors.
              </p>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-bold text-green-400 mb-4">User Accounts</h2>
              
              <h3 className="text-lg font-semibold text-white mb-3">Account Creation</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                To access certain features, you must create an account with accurate and complete information. You are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Ensuring your account information remains current and accurate</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mb-3">Account Termination</h3>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to suspend or terminate your account at any time for violations of these Terms, illegal activities, or other reasons we deem necessary to protect our platform and users.
              </p>
            </section>

            {/* Course Enrollment */}
            <section>
              <h2 className="text-2xl font-bold text-orange-400 mb-4">Course Enrollment and Access</h2>
              
              <h3 className="text-lg font-semibold text-white mb-3">Course Access</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Upon successful enrollment and payment, you will receive access to course materials for the duration specified in the course description. Course access includes:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li>Video lectures and educational content</li>
                <li>Downloadable resources and materials</li>
                <li>Assignments and assessments</li>
                <li>Community forums and discussions</li>
                <li>Certificate upon successful completion</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mb-3">Course Completion</h3>
              <p className="text-gray-300 leading-relaxed">
                Certificates are awarded upon completion of all required course components, including assignments, quizzes, and projects, with a passing grade as defined by the course instructor.
              </p>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className="text-2xl font-bold text-red-400 mb-4">Payment and Refunds</h2>
              
              <h3 className="text-lg font-semibold text-white mb-3">Payment Processing</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                All payments are processed securely through our payment partners. By making a purchase, you authorize us to charge your selected payment method for the course fees and any applicable taxes.
              </p>

              <h3 className="text-lg font-semibold text-white mb-3">Refund Policy</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                We offer a 30-day money-back guarantee for most courses. Refund eligibility requirements:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Request must be made within 30 days of purchase</li>
                <li>Course completion must be less than 30%</li>
                <li>No violations of our Terms of Service</li>
                <li>Refunds are processed to the original payment method</li>
              </ul>
            </section>

            {/* User Conduct */}
            <section>
              <h2 className="text-2xl font-bold text-pink-400 mb-4">User Conduct and Prohibited Activities</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                You agree not to engage in any of the following prohibited activities:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Sharing account credentials or course materials with unauthorized users</li>
                <li>Downloading or distributing copyrighted content without permission</li>
                <li>Harassing, threatening, or discriminating against other users</li>
                <li>Attempting to hack, disrupt, or compromise platform security</li>
                <li>Using the platform for illegal activities or spam</li>
                <li>Creating multiple accounts to circumvent restrictions</li>
                <li>Reverse engineering or copying our proprietary technology</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-indigo-400 mb-4">Intellectual Property Rights</h2>
              
              <h3 className="text-lg font-semibold text-white mb-3">Our Content</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                All course materials, including videos, text, graphics, logos, and software, are owned by NextEra or our content partners and are protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-lg font-semibold text-white mb-3">User Content</h3>
              <p className="text-gray-300 leading-relaxed">
                By submitting content to our platform (assignments, forum posts, etc.), you grant us a non-exclusive, worldwide, royalty-free license to use, modify, and display such content for educational and platform improvement purposes.
              </p>
            </section>

            {/* Disclaimers */}
            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Disclaimers and Limitations</h2>
              
              <h3 className="text-lg font-semibold text-white mb-3">Service Availability</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                We strive to maintain continuous service availability but cannot guarantee uninterrupted access. We may temporarily suspend services for maintenance, updates, or technical issues.
              </p>

              <h3 className="text-lg font-semibold text-white mb-3">Educational Outcomes</h3>
              <p className="text-gray-300 leading-relaxed">
                While we provide high-quality educational content, we cannot guarantee specific learning outcomes, job placement, or career advancement. Success depends on individual effort, prior knowledge, and market conditions.
              </p>
            </section>

            {/* Liability */}
            <section>
              <h2 className="text-2xl font-bold text-teal-400 mb-4">Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                To the maximum extent permitted by law, NextEra shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses resulting from your use of our services.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Governing Law and Disputes</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                These Terms are governed by the laws of the State of California, United States. Any disputes arising from these Terms or your use of our services will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-purple-400 mb-4">Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of material changes via email or platform notifications. Continued use of our services after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-green-400 mb-4">Contact Information</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
                <p className="text-white"><strong>Email:</strong> legal@nextera.com</p>
                <p className="text-white"><strong>Address:</strong> 123 Innovation Drive, Tech Valley, CA 94000</p>
                <p className="text-white"><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </section>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default Terms;
