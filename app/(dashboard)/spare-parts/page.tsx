"use client";

import { useState } from "react";
import { useSpareParts, useCreateSparePart } from "@/lib/hooks";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

const categories = [
  { value: "FILTERS", label: "Filters" },
  { value: "TOOLS", label: "Tools" },
  { value: "PNEUMATICS", label: "Pneumatics" },
  { value: "HYDRAULICS", label: "Hydraulics" },
];

const units = [
  { value: "PCS", label: "Pieces" },
  { value: "SET", label: "Sets" },
  { value: "KG", label: "Kilograms" },
];

export default function SparePartsPage() {
  const { data: spareParts, isLoading } = useSpareParts();
  const createSparePart = useCreateSparePart();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    category: "",
    unit: "PCS",
    unitPrice: "",
    minimumStock: "",
    supplier: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSparePart.mutateAsync({
        ...formData,
        unitPrice: parseFloat(formData.unitPrice),
        minimumStock: parseInt(formData.minimumStock),
        reorderPoint: parseInt(formData.minimumStock) * 2,
        reorderQuantity: parseInt(formData.minimumStock) * 5,
      });
      setFormData({
        code: "",
        name: "",
        description: "",
        category: "",
        unit: "PCS",
        unitPrice: "",
        minimumStock: "",
        supplier: "",
      });
      setIsFormOpen(false);
      toast.success("Spare part created successfully");
    } catch (error) {
      toast.error("Failed to create spare part");
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
        <h1 className="text-3xl font-bold">Spare Parts</h1>
        <Button onClick={() => setIsFormOpen(!isFormOpen)}>
          {isFormOpen ? "Cancel" : "+ Add Spare Part"}
        </Button>
      </div>

      {isFormOpen && (
        <Card>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Code"
                  placeholder="e.g., SP-001"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  required
                />
                <Input
                  label="Name"
                  placeholder="Spare part name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <Textarea
                label="Description"
                placeholder="Describe the spare part"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <div className="grid grid-cols-3 gap-4">
                <Select
                  label="Category"
                  options={categories}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
                <Select
                  label="Unit"
                  options={units}
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                />
                <Input
                  label="Unit Price"
                  type="number"
                  placeholder="0.00"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Minimum Stock"
                  type="number"
                  placeholder="0"
                  value={formData.minimumStock}
                  onChange={(e) => setFormData({ ...formData, minimumStock: e.target.value })}
                  required
                />
                <Input
                  label="Supplier"
                  placeholder="Supplier name"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                />
              </div>
              <Button type="submit" isLoading={createSparePart.isPending}>
                Create Spare Part
              </Button>
            </form>
          </CardBody>
        </Card>
      )}

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">All Spare Parts</h2>
        </CardHeader>
        <CardBody>
          {spareParts && spareParts.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Code</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Category</TableHeader>
                  <TableHeader>Stock</TableHeader>
                  <TableHeader>Min Stock</TableHeader>
                  <TableHeader>Price</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {spareParts.map((part: any) => (
                  <TableRow key={part.id}>
                    <TableCell className="font-semibold">{part.code}</TableCell>
                    <TableCell>{part.name}</TableCell>
                    <TableCell>{part.category}</TableCell>
                    <TableCell>
                      <Badge className={part.currentStock <= part.minimumStock ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                        {part.currentStock}
                      </Badge>
                    </TableCell>
                    <TableCell>{part.minimumStock}</TableCell>
                    <TableCell>฿{part.unitPrice.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500">No spare parts found</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
