"use client";

import { Monitor, AlertTriangle, CheckCircle, Clock, Bell } from "lucide-react";

export default function MonitoringDashboardPage() {
  // Mock data for 4 companies
  const companies = [
    { name: "Holcim Argentina", year: 2024, status: "APROBADO_EMPRESA", progress: 100, lastUpdate: "Dec 10, 2024" },
    { name: "Loma Negra", year: 2024, status: "ENVIADO", progress: 75, lastUpdate: "Dec 9, 2024" },
    { name: "Avellaneda", year: 2024, status: "BORRADOR", progress: 30, lastUpdate: "Dec 8, 2024" },
    { name: "PCR", year: 2024, status: "APROBADO_EMPRESA", progress: 100, lastUpdate: "Dec 10, 2024" },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "APROBADO_EMPRESA":
        return { label: "Approved by Company", color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle };
      case "ENVIADO":
        return { label: "Under Review", color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock };
      case "BORRADOR":
        return { label: "Draft", color: "bg-gray-100 text-gray-800 border-gray-200", icon: Clock };
      default:
        return { label: status, color: "bg-gray-100 text-gray-800 border-gray-200", icon: AlertTriangle };
    }
  };

  return (
    <main className="flex-1 p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Monitoring Dashboard</h1>
          <p className="text-gray-600">
            Track submission progress across all Argentine cement companies
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Total Companies</p>
              <Monitor className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900">4</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-green-700">2</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-yellow-700">1</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-3xl font-bold text-red-700">1</p>
          </div>
        </div>

        {/* Company Status Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Company Status - Year 2024</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Last Update
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {companies.map((company, idx) => {
                  const statusInfo = getStatusInfo(company.status);
                  const StatusIcon = statusInfo.icon;

                  return (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {company.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {company.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-xs">
                            <div
                              className="h-full bg-[#5B9BD5] rounded-full transition-all"
                              style={{ width: `${company.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700 min-w-[3rem] text-right">
                            {company.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {company.lastUpdate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button className="text-[#5B9BD5] hover:text-[#4A8BC4] font-medium">
                          View Details
                        </button>
                        {company.status === "BORRADOR" && (
                          <button className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-medium">
                            <Bell className="w-4 h-4" />
                            Send Reminder
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Panel */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#5B9BD5] rounded-lg hover:bg-[#4A8BC4] transition-colors">
              <Bell className="w-4 h-4" />
              Send Reminder to Pending Companies
            </button>
            <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Export Report
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}