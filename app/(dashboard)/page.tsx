"use client";

import { useDashboardStats } from "@/lib/hooks";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { SimpleLineChart, SimpleBarChart, SimplePieChart } from "@/components/charts";
import { Spinner } from "@/components/ui/spinner";

export default function DashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardBody>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">
                {stats?.totalMachines || 0}
              </div>
              <p className="text-gray-600 mt-2">Total Machines</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">
                {stats?.activeMachines || 0}
              </div>
              <p className="text-gray-600 mt-2">Active Machines</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600">
                {stats?.openWorkOrders || 0}
              </div>
              <p className="text-gray-600 mt-2">Open Work Orders</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">
                {stats?.lowStockParts?.length || 0}
              </div>
              <p className="text-gray-600 mt-2">Low Stock Items</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Recent Work Orders</h2>
          </CardHeader>
          <CardBody>
            {stats?.recentWorkOrders?.length ? (
              <div className="space-y-2">
                {stats.recentWorkOrders.slice(0, 5).map((wo: any) => (
                  <div key={wo.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium">{wo.title}</p>
                      <p className="text-sm text-gray-600">{wo.machine.name}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      wo.status === "OPEN" ? "bg-blue-100 text-blue-800" :
                      wo.status === "COMPLETED" ? "bg-green-100 text-green-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {wo.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No work orders</p>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Low Stock Parts</h2>
          </CardHeader>
          <CardBody>
            {stats?.lowStockParts?.length ? (
              <div className="space-y-2">
                {stats.lowStockParts.map((part: any) => (
                  <div key={part.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium">{part.name}</p>
                      <p className="text-sm text-gray-600">Stock: {part.currentStock}</p>
                    </div>
                    <span className="text-red-600 font-semibold">Min: {part.minimumStock}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">All items in stock</p>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
