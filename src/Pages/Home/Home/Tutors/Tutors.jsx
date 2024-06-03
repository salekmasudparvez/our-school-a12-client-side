import HeaderTitle from "../../../../Components/HeaderTitle";
import TutorCard from "./TutorCard";


const Tutors = () => {
    return (
        <div className="lg:py-10 py-6 space-y-3">
            <HeaderTitle heading="Meet our tutors" title="Our teachers are exceptionally hardworking and talented, dedicated to fostering students' growth and success through their expertise and commitment." />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 place-items-center px-3">
              <TutorCard/>
              <TutorCard/>
              <TutorCard/>
            </div>
            <div className="flex justify-center items-center ">
                <a className="btn rounded border-second hover:bg-first hover:text-white btn-outline">See All</a>
            </div>
            
        </div>
    );
};

export default Tutors;