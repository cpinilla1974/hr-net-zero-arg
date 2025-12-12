"use client";

import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle, XCircle, Eye } from "lucide-react";

export default function ReviewApprovePage() {
  const { user } = useAuth();

  // Mock submissions pending review
  const pendingSubmissions = [
    {
      id: "1",
      company: user?.organization,
      year: 2024,
      submittedBy: "Informante Holcim",
      submittedDate: "Dec 10, 2024",
      status: "ENVIADO",
    },
  ];

  return (
    <main className="flex-1 p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Review & Approve</h1>
          <p className="text-gray-600">
            Review submissions from your company before sending to FICEM for final approval.
          </p>
        </div>

        {/* Pending Submissions */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Pending Review</h3>
          </div>

          {pendingSubmissions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Submitted By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendingSubmissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {submission.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {submission.submittedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {submission.submittedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                          Pending Review
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button className="inline-flex items-center gap-1 text-[#5B9BD5] hover:text-[#4A8BC4] font-medium">
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                        <button className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 font-medium">
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-medium">
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Pending Reviews
              </h3>
              <p className="text-gray-600">
                All submissions have been reviewed
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}