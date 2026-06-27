"use client";

import { useState } from "react";
import { useMachines, useCreateMachine } from "@/lib/hooks";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { MachineStatusColors } from "@/lib/utils";

const machineTypes = [
  { value: "CNC_MACHINE", label: "CNC Machine" },
  { value: "HYDRAULIC_PRESS", label: "Hydraulic Press" },
  { value: "WELDING_ROBOT", label: "Welding Robot" },
  { value: "LATHE", label: "Lathe" },
  { value: "DRILL", label: "Drill" },
];

export default function MachinesPage() {
  const { data: machines, isLoading } = useMachines();
  const createMachine = useCreateMachine();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    type: "",
    model: "",
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMachine.mutateAsync(formData);
      setFormData({ code: "", name: "", type: "", model: "", location: "" });
      setIsFormOpen(false);
      toast.success("Machine created successfully");
    } catch (error) {
      toast.error("Failed to create machine");
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
        <h1 className="text-3xl font-bold">Machines</h1>
        <Button onClick={() => setIsFormOpen(!isFormOpen)}>
          {isFormOpen ? "Cancel" : "+ Add Machine"}
        </Button>
      </div>

      {isFormOpen && (
        <Card>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Machine Code"
                placeholder="e.g., MCD-001"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
              />
              <Input
                label="Machine Name"
                placeholder="e.g., CNC Machine A"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Select
                label="Machine Type"
                options={machineTypes}
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              />
              <Input
                label="Model"
                placeholder="e.g., HAAS ST-30"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />
              <Input
                label="Location"
                placeholder="e.g., Factory Floor - Section A"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
              <Button type="submit" isLoading={createMachine.isPending}>
                Create Machine
              </Button>
            </form>
          </CardBody>
        </Card>
      )}

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">All Machines</h2>
        </CardHeader>
        <CardBody>
          {machines && machines.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Code</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Location</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Running Hours</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {machines.map((machine: any) => (
                  <TableRow key={machine.id}>
                    <TableCell className="font-semibold">{machine.code}</TableCell>
                    <TableCell>{machine.name}</TableCell>
                    <TableCell>{machine.type}</TableCell>
                    <TableCell>{machine.location}</TableCell>
                    <TableCell>
                      <Badge className={MachineStatusColors[machine.status]}>
                        {machine.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{machine.runningHours.toFixed(1)} hrs</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500">No machines found</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
