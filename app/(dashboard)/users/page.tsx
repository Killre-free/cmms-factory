import { Card, CardHeader, CardBody } from "@/components/ui/card";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Users</h1>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">User Management</h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-500">Coming Soon</p>
        </CardBody>
      </Card>
    </div>
  );
}
