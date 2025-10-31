"use client";

import { useState, useMemo } from "react";
import { trpc } from "@/trpc/react";

export default function Home() {
  const advocatesQuery = trpc.advocates.useQuery();
  const advocates = useMemo(
    () => advocatesQuery.data ?? [],
    [advocatesQuery.data]
  );
  type Advocate = NonNullable<typeof advocatesQuery.data>[number];

  const [searchTerm, setSearchTerm] = useState("");

  // Compute filtered advocates based on search term
  const filteredAdvocates = useMemo(() => {
    if (!searchTerm) {
      return advocates;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return advocates.filter((advocate: Advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(lowerSearchTerm) ||
        advocate.lastName.toLowerCase().includes(lowerSearchTerm) ||
        advocate.city.toLowerCase().includes(lowerSearchTerm) ||
        advocate.degree.toLowerCase().includes(lowerSearchTerm) ||
        advocate.specialties.some((s) =>
          s.toLowerCase().includes(lowerSearchTerm)
        ) ||
        advocate.yearsOfExperience.toString().includes(lowerSearchTerm)
      );
    });
  }, [advocates, searchTerm]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    const searchTermElement = document.getElementById("search-term");
    if (searchTermElement) {
      searchTermElement.innerHTML = newSearchTerm.toLowerCase();
    }

    console.log("filtering advocates...");
  };

  const onClick = () => {
    console.log(advocates);
    setSearchTerm("");
    const searchTermElement = document.getElementById("search-term");
    if (searchTermElement) {
      searchTermElement.innerHTML = "";
    }
  };

  return (
    <main style={{ margin: "24px" }}>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input
          style={{ border: "1px solid black" }}
          onChange={onChange}
          value={searchTerm}
        />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate, index) => {
            return (
              <tr key={index}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s: string) => (
                    <div key={s}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
