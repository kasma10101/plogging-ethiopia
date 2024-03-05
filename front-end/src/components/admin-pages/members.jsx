import {useMutation, useQuery} from "react-query";

const fetchMember = async () => {
  const res = await fetch("https://backend.ploggingethiopia.org/members");
  const data = await res.json();
  return data;

}

const deleteMember = async (id) => {
  const res = await fetch(`https://backend.ploggingethiopia.org/members/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return data;
}

const Members = () => {

  const {data:members, isLoading, error } = useQuery("members", fetchMember)

  const deleteMutation = useMutation(deleteMember)

  const handleDelete = async (id) => {
    await deleteMutation.mutateAsync(id);
    deleteMutation.reset()
  }

  return (
    <section className="w-full flex flex-col items-center gap-10">
      {
        isLoading &&

        <div className={"w-fit"}>
          <h1 className="text-2xl">
            Loading...
          </h1>
        </div>
      }

      {
        error &&
        <div className={"w-fit"}>
          <h1 className="text-2xl">
            Error occurred while fetching data
          </h1>
        </div>
      }

      {
        !isLoading && error === null &&
        members.members.map((member, index) => (
          <div key={index} className="w-fit grid grid-cols-5 place-items-center">
            <p>
              {member.name}
            </p>
            <p>
              {member.email}
            </p>
            <p>
              {member.phoneNumber}
            </p>
            <p>
              {member.password}
            </p>
            <button
              onClick={()=>{handleDelete(member._id)}}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </div>
        ))
      }
    </section>
  )
}

export default Members;