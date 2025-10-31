"use client";

import { Suspense, useMemo, useState } from "react";

import { advocateColumns } from "@/components/advocates-table/columns";
import { DataTable } from "@/components/advocates-table/data-table";
import { AdvocatesTableSkeleton } from "@/components/advocates-table/advocates-table-skeleton";
import { trpc } from "@/trpc/react";

function AdvocatesTableContent({
  searchTerm,
  onSearchTermChange,
}: {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
}) {
  const [advocates] = trpc.advocates.useSuspenseQuery();

  const data = useMemo(() => advocates ?? [], [advocates]);

  return (
    <DataTable
      columns={advocateColumns}
      data={data}
      globalFilter={searchTerm}
      onGlobalFilterChange={onSearchTermChange}
      searchPlaceholder="Search advocates..."
    />
  );
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="space-y-6 p-6">
      <Suspense fallback={<AdvocatesTableSkeleton rows={8} />}>
        <AdvocatesTableContent
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
        />
      </Suspense>
    </main>
  );
}
