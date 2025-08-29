import React from 'react';

const EntitiesSubtopic = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">Entities & Attributes</h1>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          Learn about entities, attributes, and their types in Entity-Relationship modeling for database design.
        </p>
      </div>

      <div className="space-y-8">
        {/* Entities Overview */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-4">What are Entities?</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              An <strong className="text-white">Entity</strong> is a real-world object or concept that can be distinctly identified and has an independent existence in the database.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-cyan-500">
                <h4 className="font-semibold text-cyan-400 mb-2">Entity Types:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm sm:text-base">
                  <li><strong className="text-white">Strong Entity:</strong> Has its own primary key</li>
                  <li><strong className="text-white">Weak Entity:</strong> Depends on another entity</li>
                </ul>
              </div>
              
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-cyan-500">
                <h4 className="font-semibold text-cyan-400 mb-2">Examples:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm sm:text-base">
                  <li>Student, Employee, Product</li>
                  <li>Order, Course, Department</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Attributes */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-4">Attributes</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Attributes</strong> are properties or characteristics that describe an entity.
            </p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-400 mb-2">Simple Attributes:</h4>
                  <p className="text-gray-300 text-sm mb-2">Cannot be divided further</p>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs sm:text-sm">
                    Name, Age, Email
                  </div>
                </div>
                
                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-400 mb-2">Composite Attributes:</h4>
                  <p className="text-gray-300 text-sm mb-2">Can be divided into sub-attributes</p>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs sm:text-sm">
                    Address → Street, City, ZIP
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-400 mb-2">Single-valued:</h4>
                  <p className="text-gray-300 text-sm mb-2">Has only one value</p>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs sm:text-sm">
                    Student_ID, Birth_Date
                  </div>
                </div>
                
                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-400 mb-2">Multi-valued:</h4>
                  <p className="text-gray-300 text-sm mb-2">Can have multiple values</p>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs sm:text-sm">
                    Phone_Numbers, Skills
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Attributes */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-4">Key Attributes</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-400 mb-2">Primary Key:</h4>
                <p className="text-gray-300 mb-2">Uniquely identifies each entity instance</p>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                  <pre>Student(Student_ID, Name, Email, Age)
Primary Key: Student_ID</pre>
                </div>
              </div>
              
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-400 mb-2">Composite Key:</h4>
                <p className="text-gray-300 mb-2">Combination of attributes that uniquely identifies an entity</p>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                  <pre>Enrollment(Student_ID, Course_ID, Semester)
Composite Key: (Student_ID, Course_ID)</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Derived Attributes */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-green-400 mb-4">Derived Attributes</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Derived attributes</strong> are calculated from other attributes and are not stored directly in the database.
            </p>
            
            <div className="space-y-3">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 mb-2">Example 1: Age from Birth Date</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                  <pre>Employee(Emp_ID, Name, Birth_Date, [Age])
Age = Current_Date - Birth_Date</pre>
                </div>
              </div>
              
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 mb-2">Example 2: Total from Components</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                  <pre>Order(Order_ID, Quantity, Unit_Price, [Total])
Total = Quantity × Unit_Price</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Entity Set */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-red-400 mb-4">Entity Sets</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              An <strong className="text-white">Entity Set</strong> is a collection of entities of the same type that share the same properties.
            </p>
            
            <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
              <h4 className="font-semibold text-red-400 mb-2">Example: Student Entity Set</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-2 text-white">Student_ID</th>
                      <th className="text-left p-2 text-white">Name</th>
                      <th className="text-left p-2 text-white">Email</th>
                      <th className="text-left p-2 text-white">Age</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="p-2">S001</td>
                      <td className="p-2">John Doe</td>
                      <td className="p-2">john@email.com</td>
                      <td className="p-2">20</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">S002</td>
                      <td className="p-2">Jane Smith</td>
                      <td className="p-2">jane@email.com</td>
                      <td className="p-2">19</td>
                    </tr>
                    <tr>
                      <td className="p-2">S003</td>
                      <td className="p-2">Bob Johnson</td>
                      <td className="p-2">bob@email.com</td>
                      <td className="p-2">21</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EntitiesSubtopic;
