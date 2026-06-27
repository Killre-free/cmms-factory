import { Card, CardHeader, CardBody } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Work Orders</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600">Work order analytics</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Machine Health</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600">Machine status reports</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
