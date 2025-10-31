"use client";

import { useMemo, useState } from "react";

import { DataTable } from "@/components/advocates-table/data-table";
import { advocateColumns } from "@/components/advocates-table/columns";
import { trpc } from "@/trpc/react";

export default function Home() {
  const advocatesQuery = trpc.advocates.useQuery();
  const advocates = useMemo(
    () => advocatesQuery.data ?? [],
    [advocatesQuery.data]
  );

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="space-y-6 p-6">
      <DataTable
        columns={advocateColumns}
        data={advocates}
        globalFilter={searchTerm}
        onGlobalFilterChange={setSearchTerm}
        searchPlaceholder="Search advocates..."
      />
    </main>
  );
}
