import HeaderTitle from "../../../Components/HeaderTitle";
import StudySectionCard from "./StudySectionCard";


const StudySection = () => {
    return (
        <div>
            <HeaderTitle heading="Study Time" title="Find all the study sessions easily, and don&#39;t be late." />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 place-items-center px-3">
            <StudySectionCard
              image="https://i.ibb.co/r2zns1m/image-01.jpg"
              CardTitle="50+ Best creative website themes & templates"
              titleHref="/#"
              btnHref="/#"
              CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
              Button="Read More"
            />
            <StudySectionCard
              image="https://i.ibb.co/0nbbWM9/image-02-1.jpg"
              CardTitle="Creative Card Component designs graphic elements"
              CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
              Button="Read More"
            />
            <StudySectionCard
              image="https://i.ibb.co/dL9fH7N/image-03-1.jpg"
              CardTitle="The ultimate UX and UI guide to card design"
              CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
              Button="Read More"
            />
            </div>
            <div className="flex justify-center items-center ">
                <a className="btn rounded border-second hover:bg-first hover:text-white btn-outline">See All</a>
            </div>
            
        </div>
    );
};

export default StudySection;