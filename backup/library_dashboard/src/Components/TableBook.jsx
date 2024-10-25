import React from 'react'

const TableBook = () => {
  return (
    <div class="overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Title
            </th>
            <th scope="col" class="px-6 py-3">
              author
            </th>
            <th scope="col" class="px-6 py-3">
              publisher
            </th>
            <th scope="col" class="px-6 py-3">
              yop
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td class="px-6 py-4">Silver</td>
            <td class="px-6 py-4">Laptop</td>
            <td class="px-6 py-4">$2999</td>
            <td class="px-6 py-4 text-right">
              <div class='space-x-4'>
                <button class="font-medium text-red-500 dark:text-blue-500 hover:underline">
                  Delete
                </button>
                <button class="font-medium text-blue-500 dark:text-blue-500 hover:underline">
                  Edit
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableBook