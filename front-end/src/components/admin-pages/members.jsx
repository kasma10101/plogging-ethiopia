import {useMutation, useQuery} from "react-query";
import { toast } from "react-toastify";

const fetchMember = async () => {
  const res = await fetch("http://localhost:4532/members");
  const data = await res.json();
  console.log(data,'this is data')
  return data;

}
const deleteMember = async (id) => {
  const res = await fetch(`http://localhost:4532/members/${id}`, {
    method: "DELETE",
  });
  
  // Check if the response is ok and has content
  if (!res.ok) {
    toast.error( 'Network response was not ok')

    throw new Error('Network response was not ok');
  }

  const text = await res.text(); 
  if (text) {
    const data = JSON.parse(text);
    return data;
  } else {
     toast.success( 'Member deleted successfully')
    return { message: 'Member deleted successfully', id };
  }
};


const Members = () => {

  const {data:members, isLoading, error } = useQuery("members", fetchMember)

  const deleteMutation = useMutation(deleteMember)

  const handleDelete = async (id) => {
    await deleteMutation.mutateAsync(id);
    deleteMutation.reset()
  }

  return (
    <section classNameName="w-full flex flex-col items-center gap-10">
      {
        isLoading &&

        <div classNameName={"w-fit"}>
          <h1 classNameName="text-2xl">
            Loading...
          </h1>
        </div>
      }

      {
        error &&
        <div classNameName={"w-fit"}>
          <h1 classNameName="text-2xl">
            Error occurred while fetching data
          </h1>
        </div>
      }
      
      <div className="relative overflow-x-auto w-full h-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && error === null && members?.members?.map((member, index) => (
              <tr key={index} className="bg-white  dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {member.name}
                </td>
                <td className="px-6 py-4">
                  {member.email}
                </td>
                <td className="px-6 py-4">
                  {member.phoneNumber}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Members;

