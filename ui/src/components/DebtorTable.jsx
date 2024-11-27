import React, { useState } from "react";

const debtors = [
  {
    name: "Juana Rivera",
    email: "ja@jygasoft.com",
    interest: 5,
    amountOwed: 450,
    amountPaid: 100,
    finalAmount: 650,
    payments: [
      { amount: 50, period: 1, date: "12/07/2018", onTime: true },
      { amount: 25, period: 2, date: "15/08/2018", onTime: true },
      { amount: 25, period: 3, date: "12/09/2018", onTime: false },
    ],
  },
  {
    name: "Pedro Morales",
    email: "pr@jygasoft.com",
    interest: 13,
    amountOwed: 300,
    amountPaid: 150,
    finalAmount: 500,
    payments: [
      { amount: 100, period: 1, date: "15/08/2018", onTime: true },
      { amount: 50, period: 2, date: "15/09/2018", onTime: false },
    ],
  },
];

function DebtorTable({ debtors }) {
  const [filters, setFilters] = useState({ name: "", email: "" });
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [expandedRow, setExpandedRow] = useState(null); // Controla la fila expandida

  // Filtro por nombre y e-mail
  const filteredDebtors = debtors.filter(
    (debtor) =>
      debtor.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      debtor.email.toLowerCase().includes(filters.email.toLowerCase())
  );

  // Ordenar los resultados
  const sortedDebtors = [...filteredDebtors].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    return sortDirection === "asc"
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
        ? 1
        : -1;
  });

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Listado de Deudores</h1>

      {/* Filtros */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Buscar por email"
          value={filters.email}
          onChange={(e) => setFilters({ ...filters, email: e.target.value })}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Tabla */}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            {[
              "Nombre",
              "Email",
              "Interés",
              "Monto Debe",
              "Monto Pagado",
              "Monto Final",
            ].map((column, index) => (
              <th
                key={index}
                onClick={() => {
                  setSortColumn(column.toLowerCase().replace(" ", ""));
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                }}
                className="border border-gray-300 px-4 py-2 cursor-pointer"
              >
                {column}{" "}
                {sortColumn === column.toLowerCase().replace(" ", "") &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
            ))}
            <th className="border border-gray-300 px-4 py-2">Pagos</th>
          </tr>
        </thead>
        <tbody>
          {sortedDebtors.map((debtor, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  {debtor.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {debtor.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {debtor.interest}%
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${debtor.amountOwed}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${debtor.amountPaid}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${debtor.finalAmount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => toggleRow(index)}
                    className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    {expandedRow === index ? "Cerrar" : "Ver"}
                  </button>
                </td>
              </tr>
              {expandedRow === index && (
                <tr>
                  <td colSpan="7" className="border border-gray-300 px-4 py-2">
                    <ul>
                      {debtor.payments.map((payment, pIndex) => (
                        <li
                          key={pIndex}
                          className={`flex justify-between ${
                            payment.onTime ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          <span>${payment.amount}</span>
                          <span>Periodo: {payment.period}</span>
                          <span>Fecha: {payment.date}</span>
                          <span>
                            {payment.onTime ? "En Tiempo" : "Retrasado"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DebtorTable;
