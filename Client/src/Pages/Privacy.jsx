import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Privacy = () => {
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
        
        <div className="container mx-auto px-4 py-4 pt-32 pb-8">
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Privacy Content */}
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                At NextEra ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-purple-400 mb-4">Information We Collect</h2>
              
              <h3 className="text-lg font-semibold text-white mb-3">Personal Information</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li>Register for an account</li>
                <li>Enroll in courses</li>
                <li>Contact us for support</li>
                <li>Subscribe to our newsletter</li>
                <li>Participate in surveys or feedback forms</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mb-3">Automatically Collected Information</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                We automatically collect certain information about your device and usage patterns, including:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>IP address and browser information</li>
                <li>Device type and operating system</li>
                <li>Pages visited and time spent on our platform</li>
                <li>Course progress and learning analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-green-400 mb-4">How We Use Your Information</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Providing and maintaining our educational services</li>
                <li>Processing course enrollments and payments</li>
                <li>Personalizing your learning experience</li>
                <li>Communicating with you about courses and updates</li>
                <li>Improving our platform and developing new features</li>
                <li>Ensuring platform security and preventing fraud</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-orange-400 mb-4">Information Sharing and Disclosure</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our platform</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-red-400 mb-4">Data Security</h2>
              <p className="text-gray-300 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, regular security assessments, and access controls. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-pink-400 mb-4">Your Privacy Rights</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              </ul>
              <p className="text-gray-300 mt-4 leading-relaxed">
                To exercise these rights, please contact us at privacy@nextera.com.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-indigo-400 mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies help us:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze platform usage and performance</li>
                <li>Provide personalized content and recommendations</li>
                <li>Ensure platform security</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                You can control cookie settings through your browser preferences, but disabling cookies may affect platform functionality.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Children's Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.
              </p>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="text-2xl font-bold text-teal-400 mb-4">International Data Transfers</h2>
              <p className="text-gray-300 leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-purple-400 mb-4">Contact Us</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
                <p className="text-white"><strong>Email:</strong> privacy@nextera.com</p>
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

export default Privacy;
