import HeaderTitle from "../../../../Components/HeaderTitle";
import useAuth from "../../../../Hook/useAuth";



const CreateNotes = () => {
    const { user } = useAuth();
    if (!user) {
        return <div className="flex justify-center items-center w-full text-red-500 h-screen"><span className="loading loading-spinner loading-lg"></span></div>
    }
    return (
        <>
            <div className="flex flex-col justify-center items-center md:py-2  w-full px-4">
                <HeaderTitle heading="Create your notes" title="You can save , update and delete your note easily" ></HeaderTitle>
                <form className="flex flex-col w-full gap-4  items-center ">
                    <label className="input md:w-1/2 w-full input-bordered flex items-center gap-2">
                        Email
                        <input name="email" type="text" className="grow " value={user?.email} readOnly />
                    </label>
                    <label className="input  md:w-1/2 w-full input-bordered flex items-center gap-2">
                        Title
                        <input name="title" type="text" className="grow" placeholder="Title" />
                    </label>

                    <textarea name="description" placeholder="Description" className="textarea  md:w-1/2 w-full textarea-bordered textarea-lg" ></textarea>
                    <button className="btn w-full md:w-1/2 bg-first text-white hover:text-gray-500 btn-lg ">Save</button>
                </form>
            </div>
        </>
    )
};



export default CreateNotes;