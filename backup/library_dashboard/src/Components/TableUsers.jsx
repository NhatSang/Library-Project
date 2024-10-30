import React from "react";
const TableUsers = ({ data , handleToggleStatus}) => {

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              name
            </th>
            <th scope="col" className="px-6 py-3">
              code
            </th>
            <th scope="col" className="px-6 py-3">
              dob
            </th>
            <th scope="col" className="px-6 py-3">
              gender
            </th>
            <th scope="col" className="px-6 py-3">
              email
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((u) => (
            <tr
              key={u._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {u.name}
              </th>
              <td className="px-6 py-4">20001531</td>
              <td className="px-6 py-4">2002/1/2</td>
              <td className="px-6 py-4">{u.gender}</td>
              <td className="px-6 py-4">{u.email}</td>
              <td className="px-6 py-4 text-right">
                {u.status == "active" ? (
                  <button
                    onClick={() => handleToggleStatus(u._id, u.status)}
                    className="font-medium text-red-500 dark:text-blue-500 hover:underline"
                  >
                    Ban
                  </button>
                ) : (
                  <button
                    onClick={() => handleToggleStatus(u._id, u.status)}
                    className="font-medium text-blue-500 dark:text-blue-500 hover:underline"
                  >
                    Unban
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
