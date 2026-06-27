"use client";

import { useState } from "react";
import { useWorkOrders, useCreateWorkOrder, useMachines } from "@/lib/hooks";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { StatusColors, PriorityColors } from "@/lib/utils";

const workOrderTypes = [
  { value: "CORRECTIVE", label: "Corrective" },
  { value: "PREVENTIVE", label: "Preventive" },
  { value: "PREDICTIVE", label: "Predictive" },
  { value: "INSPECTION", label: "Inspection" },
  { value: "EMERGENCY", label: "Emergency" },
];

const priorities = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "URGENT", label: "Urgent" },
  { value: "CRITICAL", label: "Critical" },
];

export default function WorkOrdersPage() {
  const { data: workOrders, isLoading } = useWorkOrders();
  const { data: machines } = useMachines();
  const createWorkOrder = useCreateWorkOrder();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    machineId: "",
    type: "CORRECTIVE",
    priority: "MEDIUM",
    estimatedHours: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createWorkOrder.mutateAsync({
        ...formData,
        estimatedHours: formData.estimatedHours ? parseFloat(formData.estimatedHours) : undefined,
      });
      setFormData({
        title: "",
        description: "",
        machineId: "",
        type: "CORRECTIVE",
        priority: "MEDIUM",
        estimatedHours: "",
      });
      setIsFormOpen(false);
      toast.success("Work order created successfully");
    } catch (error) {
      toast.error("Failed to create work order");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Work Orders</h1>
        <Button onClick={() => setIsFormOpen(!isFormOpen)}>
          {isFormOpen ? "Cancel" : "+ New Work Order"}
        </Button>
      </div>

      {isFormOpen && (
        <Card>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Title"
                placeholder="Work order title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Textarea
                label="Description"
                placeholder="Describe the work to be done"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <Select
                label="Machine"
                options={machines?.map((m: any) => ({ value: m.id, label: m.name })) || []}
                value={formData.machineId}
                onChange={(e) => setFormData({ ...formData, machineId: e.target.value })}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Type"
                  options={workOrderTypes}
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                />
                <Select
                  label="Priority"
                  options={priorities}
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                />
              </div>
              <Input
                label="Estimated Hours"
                type="number"
                placeholder="0.0"
                value={formData.estimatedHours}
                onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
              />
              <Button type="submit" isLoading={createWorkOrder.isPending}>
                Create Work Order
              </Button>
            </form>
          </CardBody>
        </Card>
      )}

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">All Work Orders</h2>
        </CardHeader>
        <CardBody>
          {workOrders && workOrders.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>ID</TableHeader>
                  <TableHeader>Title</TableHeader>
                  <TableHeader>Machine</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Priority</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Created</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {workOrders.map((wo: any) => (
                  <TableRow key={wo.id}>
                    <TableCell className="font-semibold text-sm">{wo.code.substring(0, 8)}</TableCell>
                    <TableCell>{wo.title}</TableCell>
                    <TableCell>{wo.machine.name}</TableCell>
                    <TableCell>{wo.type}</TableCell>
                    <TableCell>
                      <Badge className={PriorityColors[wo.priority]}>
                        {wo.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={StatusColors[wo.status]}>
                        {wo.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(wo.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500">No work orders found</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
