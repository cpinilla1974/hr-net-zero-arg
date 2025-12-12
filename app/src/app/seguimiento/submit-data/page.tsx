"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Upload, FileSpreadsheet, Download, Send, Save } from "lucide-react";

export default function SubmitDataPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"manual" | "bulk">("manual");
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    production: "",
    emissions: "",
    clinkerFactor: "",
    coProcessing: "",
    biomass: "",
    thermalEfficiency: "",
    electricConsumption: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = () => {
    // TODO: Implement save draft logic
    console.log("Saving draft...", formData);
  };

  const handleSendToSupervisor = () => {
    // TODO: Implement send to supervisor logic
    console.log("Sending to supervisor...", formData);
  };

  // Mock submission history
  const submissionHistory = [
    {
      year: 2023,
      date: "Feb 12, 2024",
      method: "Bulk Upload",
      status: "SUBMITTED",
    },
    {
      year: 2022,
      date: "Jan 28, 2023",
      method: "Manual",
      status: "COMPANY_REJECTED",
    },
    {
      year: 2024,
      date: "Not submitted",
      method: "-",
      status: "DRAFT",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUBMITTED":
        return "bg-green-100 text-green-800 border-green-200";
      case "COMPANY_REJECTED":
        return "bg-red-100 text-red-800 border-red-200";
      case "DRAFT":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <main className="flex-1 p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Data</h1>
          <p className="text-gray-600">
            Enter annual production and emission data for verification. Ensure all figures align with the{" "}
            <a href="#" className="text-[#5B9BD5] hover:underline">MRV Protocols</a>.
          </p>
        </div>

        {/* Download Template Button */}
        <div className="mb-6 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Download Template
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("manual")}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "manual"
                    ? "border-[#5B9BD5] text-[#5B9BD5]"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
                Manual Entry
              </button>
              <button
                onClick={() => setActiveTab("bulk")}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "bulk"
                    ? "border-[#5B9BD5] text-[#5B9BD5]"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <Upload className="w-4 h-4" />
                Bulk Upload
              </button>
            </div>
          </div>

          <div className="p-8">
            {activeTab === "manual" ? (
              <div className="space-y-8">
                {/* Production & Emissions */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Production & Emissions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year
                      </label>
                      <select
                        value={formData.year}
                        onChange={(e) => handleInputChange("year", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B9BD5] focus:border-transparent"
                      >
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Production
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formData.production}
                          onChange={(e) => handleInputChange("production", e.target.value)}
                          placeholder="0"
                          className="w-full px-4 py-2 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B9BD5] focus:border-transparent"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                          tonnes
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Emissions
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          value={formData.emissions}
                          onChange={(e) => handleInputChange("emissions", e.target.value)}
                          placeholder="0.00"
                          className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B9BD5] focus:border-transparent"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                          tCO2
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clinker Factor
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          value={formData.clinkerFactor}
                          onChange={(e) => handleInputChange("clinkerFactor", e.target.value)}
                          placeholder="0"
                          className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B9BD5] focus:border-transparent"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Energy & Efficiency */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Energy & Efficiency</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Co-processing
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          value={formData.coProcessing}
                          onChange={(e) => handleInputChange("coProcessing", e.target.value)}
                          placeholder="0"
                          className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B9BD5] focus:border-transparent"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                          %
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Biomass
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          value={formData.biomass}
                          onChange={(e) => handleInputChange("biomass", e.target.value)}
                          placeholder="0"
                          className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B9BD5] focus:border-transparent"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                          %
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thermal Efficiency
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          value={formData.thermalEfficiency}
                          onChange={(e) => handleInputChange("thermalEfficiency", e.target.value)}
                          placeholder="0"
                          className="w-full px-4 py-2 pr-24 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B9BD5] focus:border-transparent"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 whitespace-nowrap">
                          MJ/t clinker
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Electric Consumption
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          value={formData.electricConsumption}
                          onChange={(e) => handleInputChange("electricConsumption", e.target.value)}
                          placeholder="0"
                          className="w-full px-4 py-2 pr-24 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B9BD5] focus:border-transparent"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 whitespace-nowrap">
                          kWh/t cement
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSaveDraft}
                    className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Draft
                  </button>
                  <button
                    onClick={handleSendToSupervisor}
                    className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#5B9BD5] rounded-lg hover:bg-[#4A8BC4] transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Send to Supervisor
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Excel File</h3>
                <p className="text-gray-600 mb-6">
                  Drag and drop your Excel file here, or click to browse
                </p>
                <label className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#5B9BD5] rounded-lg hover:bg-[#4A8BC4] transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Choose File
                  <input type="file" accept=".xlsx,.xls" className="hidden" />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Submission History */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Submission History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Method
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
                {submissionHistory.map((submission, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {submission.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {submission.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        {submission.method === "Bulk Upload" && <FileSpreadsheet className="w-4 h-4" />}
                        {submission.method}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(submission.status)}`}>
                        {submission.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {submission.status === "DRAFT" ? (
                        <button className="text-[#5B9BD5] hover:text-[#4A8BC4] font-medium">
                          Continue
                        </button>
                      ) : (
                        <button className="text-[#5B9BD5] hover:text-[#4A8BC4] font-medium">
                          View Details
                        </button>
                      )}
                      {submission.status === "COMPANY_REJECTED" && (
                        <button className="ml-4 text-orange-600 hover:text-orange-700 font-medium">
                          Edit & Resubmit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}