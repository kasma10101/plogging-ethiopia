import {useMutation, useQuery} from "react-query";
import {toast} from "react-toastify";
import Loader from "../commons/loader";
import {useState} from "react";

const fetchProfile = async (member) => {
    try{
        const res = fetch("https://backend.ploggingethiopia.org/api/member");
        const data = await res.json();
        return data;
    } catch (e) {
        return
    }
}

const EditProfile = async (member) => {
    const res = fetch("https://backend.ploggingethiopia.org/api/member", {
        method: "PUT",
        body: JSON.stringify(
            member
        )});
    const data = await res.json();
    return data;
}

const Profile = ()=>{

    const [profileForm, setProfileForm] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
    })

    const {data: profileData, isLoading, error} = useQuery(fetchProfile)

    const mutation = useMutation(EditProfile);

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;

        // Update the form data based on the input type
        setProfileForm((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = async (member) => {
        await mutation.mutateAsync(member);
        if(mutation.isSuccess){
            toast.success("You are now member of Plogging Ethiopia")
        }
        if (mutation.isError){
            toast.error("An error occurred while creating member")
        }
    }


    return (
        <section className="flex flex-col items-center gap-20 w-[90%] pb-10" >

            <div className="w-full flex flex-col gap-5 items-center">
                <h1 className="text-5xl pb-4 border-b-2 w-fit">
                    Profile
                </h1>
                <p className="text-xl">
                    You can Edit your profile
                </p>
            </div>

            <div
                className="grid place-items-center w-full gap-10"
            >

                <form className="w-full max-w-[600px] shadow-lg shadow-form p-10 flex flex-col gap-5 rounded-md">

                    <div className="flex flex-col items-start w-full">
                        <label>
                            Full Name
                        </label>
                        <input
                          value={profileForm.name}
                            onChange={handleChange}
                            name="name" type="text" className="p-2 rounded-md w-full border-input border-2" />
                    </div>

                    <div className="flex flex-col items-start w-full">
                        <label>
                            Email
                        </label>
                        <input
                          value={profileForm.email}
                            onChange={handleChange}
                            name="email" type="email" className="p-2 rounded-md w-full border-input border-2" />
                    </div>

                    <div className="flex flex-col items-start w-full">
                        <label>
                            Phone Number
                        </label>
                        <input
                          value={profileForm.phoneNumber}
                            onChange={handleChange}
                            name="phoneNumber" type="text" className="p-2 rounded-md w-full border-input border-2" />
                    </div>

                    <div className="flex flex-col items-start w-full">
                        <label>
                            Password
                        </label>
                        <input
                          value={profileForm.password}
                            onChange={handleChange}
                            name="password" type="password" className="p-2 rounded-md w-full border-input border-2" />
                    </div>

                    <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
                        {
                            mutation.isLoading &&
                            <Loader />
                        }
                        Save
                    </button>
                </form>
            </div>

        </section>
    )
}

export default Profile;