export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)} ${formatTime(date)}`;
}

export function calculateWorkOrderStats(workOrders: any[]) {
  const total = workOrders.length;
  const completed = workOrders.filter((w) => w.status === 'COMPLETED').length;
  const pending = workOrders.filter((w) => w.status === 'PENDING').length;
  const inProgress = workOrders.filter((w) => w.status === 'IN_PROGRESS').length;

  return {
    total,
    completed,
    pending,
    inProgress,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

export function calculateMachineHealth(machine: any): string {
  const health = machine.healthScore || 100;
  if (health >= 80) return 'Excellent';
  if (health >= 60) return 'Good';
  if (health >= 40) return 'Fair';
  return 'Poor';
}

export function getHealthColor(health: number): string {
  if (health >= 80) return 'bg-green-100 text-green-800';
  if (health >= 60) return 'bg-blue-100 text-blue-800';
  if (health >= 40) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}
