import { useState, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useMachines() {
  return useQuery({
    queryKey: ['machines'],
    queryFn: async () => {
      const response = await fetch('/api/machines');
      if (!response.ok) throw new Error('Failed to fetch machines');
      return response.json();
    },
  });
}

export function useCreateMachine() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/machines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create machine');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['machines'] });
    },
  });
}

export function useWorkOrders() {
  return useQuery({
    queryKey: ['workOrders'],
    queryFn: async () => {
      const response = await fetch('/api/work-orders');
      if (!response.ok) throw new Error('Failed to fetch work orders');
      return response.json();
    },
  });
}

export function useCreateWorkOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/work-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create work order');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workOrders'] });
    },
  });
}

export function useSpareParts() {
  return useQuery({
    queryKey: ['spareParts'],
    queryFn: async () => {
      const response = await fetch('/api/spare-parts');
      if (!response.ok) throw new Error('Failed to fetch spare parts');
      return response.json();
    },
  });
}

export function useCreateSparePart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/spare-parts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create spare part');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spareParts'] });
    },
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/stats');
      if (!response.ok) throw new Error('Failed to fetch dashboard stats');
      return response.json();
    },
  });
}
