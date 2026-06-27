"use client";

import { cn } from "@/lib/utils";

interface TableProps {
  className?: string;
  children: React.ReactNode;
}

export function Table({ className, children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full border-collapse", className)}>
        {children}
      </table>
    </div>
  );
}

export function TableHead({ className, children }: TableProps) {
  return (
    <thead className={cn("bg-gray-100 border-b border-gray-200", className)}>
      {children}
    </thead>
  );
}

export function TableBody({ className, children }: TableProps) {
  return <tbody className={className}>{children}</tbody>;
}

export function TableRow({ className, children }: TableProps) {
  return (
    <tr className={cn("border-b border-gray-200 hover:bg-gray-50", className)}>
      {children}
    </tr>
  );
}

export function TableCell({ className, children }: TableProps) {
  return (
    <td className={cn("px-4 py-3 text-sm text-gray-900", className)}>
      {children}
    </td>
  );
}

export function TableHeader({ className, children }: TableProps) {
  return (
    <th className={cn("px-4 py-3 text-left text-sm font-semibold text-gray-900", className)}>
      {children}
    </th>
  );
}
