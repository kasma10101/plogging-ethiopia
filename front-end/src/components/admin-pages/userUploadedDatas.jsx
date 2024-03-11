import {useMutation, useQuery} from "react-query";
import {toast} from "react-toastify";

const fetchUploaded = async () => {
    try{
        const res = await fetch("http://localhost:4532/galleries/userUploadedFiles");

        if (!res.ok){
            throw new Error("An error occurred while fetching data")
        }
        const data = await res.json();
        return data;
    } catch (e){
        throw new Error(e)
    }

}

const deleteUploaded = async (id) => {
    try{
        const res = await fetch(`http://localhost:4532/galleries/userUploadedFiles/${id}`, {
            method: "DELETE"
        });

        const data = await res.json();
        return data;
    } catch (e){
        return
    }

}

const UserUploaded = () => {
    const { data: uploades, isLoading, error } = useQuery("userUploaded", fetchUploaded);
    console.log(uploades)
    const deleteMutation = useMutation(deleteUploaded);
    const handleDelete = async (id) => {
        try{
            await deleteMutation.mutateAsync(id);
            toast.success("file deleted successfully")
        } catch (e) {
            toast.error("file couldn't be deleted")
        }
    }



    return (
        <section className="w-full grid place-items-center gap-5">

            <h1 className="text-3xl w-fit">
                User Uploaded Data
            </h1>

            {
                isLoading &&

                <div className={"w-fit"}>
                    <h1 className="text-2xl">
                        Loading...
                    </h1>
                </div>
            }

            {
                error != null &&

                <div className={"w-fit"}>
                    <h1 className="text-xl">
                        Currently there are no images
                    </h1>
                </div>
            }

            {
                uploades && error === null && !isLoading &&
                uploades.map((upload, index) => (
                    <div
                      className="w-full grid grid-cols-5 place-items-center"
                      key={index}
                    >
                        <p>
                            File type:
                            { " " + upload.fileType}
                        </p>
                        <p>
                            File description:
                            { " " + upload.description}
                        </p>
                        <p>
                            File name:
                            { " " + upload.fileName}
                        </p>

                        <a
                            href={`http://localhost:4532/${upload.fileName}`}
                            download
                        >
                            <button
                              className={"bg-green-500 w-fit hover:bg-green-700 text-white font-bold py-2 px-4 rounded"}

                            >
                                Download
                            </button>
                        </a>

                        <button
                            onClick={() => handleDelete(upload._id)}
                            className="bg-red-500 w-fit hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </div>
                ))
            }
        </section>
    )
}

export default UserUploaded;