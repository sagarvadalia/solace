"use client";
import type { ColumnDef } from "@tanstack/react-table";
import type { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/server/routers/_app";

type RouterOutputs = inferRouterOutputs<AppRouter>;
export type Advocate = RouterOutputs["advocates"][number];

const formatPhoneNumber = (value: number) => {
  const digits = value.toString().padStart(10, "0");
  const area = digits.slice(0, 3);
  const prefix = digits.slice(3, 6);
  const line = digits.slice(6);

  return `(${area}) ${prefix}-${line}`;
};

export const advocateColumns: ColumnDef<Advocate>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue<string>("firstName")}</span>
    ),
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => row.getValue("lastName") as string,
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => row.getValue("city") as string,
  },
  {
    accessorKey: "degree",
    header: "Degree",
    cell: ({ row }) => row.getValue("degree") as string,
  },
  {
    id: "specialties",
    header: "Specialties",
    accessorFn: (row) => row.specialties.join(", "),
    cell: ({ row }) => {
      const values = row.original.specialties;

      return (
        <div className="flex flex-wrap gap-1">
          {values.map((specialty) => (
            <span
              key={specialty}
              className="rounded-full bg-muted px-2 py-1 text-xs"
            >
              {specialty}
            </span>
          ))}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "yearsOfExperience",
    header: "Years of Experience",
    cell: ({ row }) => row.original.yearsOfExperience,
    sortingFn: (rowA, rowB) =>
      rowA.original.yearsOfExperience - rowB.original.yearsOfExperience,
  },
  {
    id: "phoneNumber",
    header: "Phone Number",
    accessorFn: (row) => row.phoneNumber.toString(),
    cell: ({ row }) => formatPhoneNumber(row.original.phoneNumber),
    enableSorting: false,
  },
];
