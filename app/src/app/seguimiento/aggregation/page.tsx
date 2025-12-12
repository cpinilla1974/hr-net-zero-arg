"use client";

import { GitMerge, Calculator, CheckCircle, FileText, AlertCircle } from "lucide-react";

export default function AggregationPage() {
  // Mock data
  const year = 2024;
  const approvedCompanies = [
    { name: "Holcim Argentina", production: 5200, emissions: 505, clinkerFactor: 66.5, status: "APROBADO_FICEM" },
    { name: "Loma Negra", production: 3800, emissions: 508, clinkerFactor: 67.2, status: "APROBADO_FICEM" },
    { name: "Avellaneda", production: 2100, emissions: 510, clinkerFactor: 67.8, status: "APROBADO_EMPRESA" },
    { name: "PCR", production: 1500, emissions: 512, clinkerFactor: 68.1, status: "APROBADO_FICEM" },
  ];

  const allApproved = approvedCompanies.every(c => c.status === "APROBADO_FICEM");
  const approvedCount = approvedCompanies.filter(c => c.status === "APROBADO_FICEM").length;

  const calculateNationalAggregation = () => {
    const total Production = approvedCompanies.reduce((sum, c) => sum + c.production, 0);
    const weightedEmissions = approvedCompanies.reduce(
      (sum, c) => sum + (c.emissions * c.production),
      0
    ) / totalProduction;
    const weightedClinkerFactor = approvedCompanies.reduce(
      (sum, c) => sum + (c.clinkerFactor * c.production),
      0
    ) / totalProduction;

    return {
      totalProduction,
      avgEmissions: weightedEmissions.toFixed(2),
      avgClinkerFactor: weightedClinkerFactor.toFixed(2),
    };
  };

  const aggregation = calculateNationalAggregation();

  return (
    <main className="flex-1 p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">National Aggregation</h1>
          <p className="text-gray-600">
            Execute production-weighted national averages when all companies are FICEM-approved
          </p>
        </div>

        {/* Status Alert */}
        {!allApproved && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-yellow-900 mb-1">
                  Waiting for FICEM Approval
                </h3>
                <p className="text-yellow-800">
                  {approvedCount} of 4 companies approved. Aggregation can only be executed when all 4 companies have FICEM approval.
                </p>
              </div>
            </div>
          </div>
        )}

        {allApproved && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-green-900 mb-1">
                  Ready for Aggregation
                </h3>
                <p className="text-green-800 mb-4">
                  All 4 companies have been approved by FICEM. You can now execute national aggregation.
                </p>
                <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                  <GitMerge className="w-4 h-4" />
                  Execute National Aggregation {year}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Company Data Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Company Data - Year {year}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Production (kt)
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Emissions (kgCO₂/t)
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Clinker Factor (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {approvedCompanies.map((company, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {company.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                      {company.production.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                      {company.emissions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                      {company.clinkerFactor}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                          company.status === "APROBADO_FICEM"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-yellow-100 text-yellow-800 border-yellow-200"
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                        {company.status.replace("_", " ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Aggregation Preview */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-[#5B9BD5]" />
            <h3 className="text-lg font-bold text-gray-900">National Aggregation Preview (Production-Weighted)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-sm font-medium text-gray-600 mb-2">Total Production</p>
              <p className="text-3xl font-bold text-gray-900">{aggregation.totalProduction.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">kt cement</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-sm font-medium text-gray-600 mb-2">Average Emissions</p>
              <p className="text-3xl font-bold text-gray-900">{aggregation.avgEmissions}</p>
              <p className="text-xs text-gray-500 mt-1">kgCO₂/t cement</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-sm font-medium text-gray-600 mb-2">Average Clinker Factor</p>
              <p className="text-3xl font-bold text-gray-900">{aggregation.avgClinkerFactor}%</p>
              <p className="text-xs text-gray-500 mt-1">weighted average</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Formula:</strong> National Average = Σ(Company_Value × Company_Production) / Total_Production
            </p>
          </div>

          {allApproved && (
            <div className="mt-6 flex items-center gap-4">
              <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#5B9BD5] rounded-lg hover:bg-[#4A8BC4] transition-colors">
                <FileText className="w-4 h-4" />
                Generate Report PDF
              </button>
              <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                <GitMerge className="w-4 h-4" />
                Publish to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}