import { z } from "zod";

export const SignInSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const MachineSchema = z.object({
  code: z.string().min(1, "Machine code is required"),
  name: z.string().min(1, "Machine name is required"),
  description: z.string().optional(),
  type: z.string().min(1, "Machine type is required"),
  model: z.string().optional(),
  serialNumber: z.string().optional(),
  manufacturer: z.string().optional(),
  location: z.string().min(1, "Location is required"),
});

export const WorkOrderSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  machineId: z.string().min(1, "Machine is required"),
  type: z.string().min(1, "Type is required"),
  priority: z.string().default("MEDIUM"),
  estimatedHours: z.number().optional(),
});

export const SparePartSchema = z.object({
  code: z.string().min(1, "Code is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  unit: z.string().min(1, "Unit is required"),
  unitPrice: z.number().min(0, "Price must be positive"),
  minimumStock: z.number().min(0),
});

export const PreventiveMaintenanceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  machineId: z.string().min(1, "Machine is required"),
  frequency: z.string().min(1, "Frequency is required"),
  interval: z.number().min(1, "Interval must be at least 1"),
});
