"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

// Machines
export function useMachines() {
  return useQuery({
    queryKey: ["machines"],
    queryFn: async () => {
      const { data } = await api.get("/machines");
      return data;
    },
  });
}

export function useMachine(id: string) {
  return useQuery({
    queryKey: ["machines", id],
    queryFn: async () => {
      const { data } = await api.get(`/machines/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateMachine() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (machine: any) => {
      const { data } = await api.post("/machines", machine);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["machines"] });
    },
  });
}

// Work Orders
export function useWorkOrders() {
  return useQuery({
    queryKey: ["work-orders"],
    queryFn: async () => {
      const { data } = await api.get("/work-orders");
      return data;
    },
  });
}

export function useCreateWorkOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (workOrder: any) => {
      const { data } = await api.post("/work-orders", workOrder);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
    },
  });
}

// Spare Parts
export function useSpareParts() {
  return useQuery({
    queryKey: ["spare-parts"],
    queryFn: async () => {
      const { data } = await api.get("/spare-parts");
      return data;
    },
  });
}

export function useCreateSparePart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sparePart: any) => {
      const { data } = await api.post("/spare-parts", sparePart);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spare-parts"] });
    },
  });
}

// Dashboard
export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const { data } = await api.get("/dashboard/stats");
      return data;
    },
  });
}
