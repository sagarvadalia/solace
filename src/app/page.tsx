"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/trpc/react";

export default function Home() {
  const advocatesQuery = trpc.advocates.useQuery();
  const advocates = advocatesQuery.data ?? [];
  type Advocate = NonNullable<typeof advocatesQuery.data>[number];
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  // Update filtered advocates when data loads
  useEffect(() => {
    if (advocates.length > 0) {
      setFilteredAdvocates(advocates);
    }
  }, [advocates]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    const searchTermElement = document.getElementById("search-term");
    if (searchTermElement) {
      searchTermElement.innerHTML = searchTerm;
    }

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate: Advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.some((s) => s.includes(searchTerm)) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
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
        <input style={{ border: "1px solid black" }} onChange={onChange} />
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
