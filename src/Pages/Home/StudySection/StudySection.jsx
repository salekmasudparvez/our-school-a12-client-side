import StudySectionCard from "./StudySectionCard";


const StudySection = () => {
    return (
        <div>
            <div className="text-center space-y-4 py-6">
                <h1 className="text-5xl font-bold uppercase font-sans">Study Time</h1>
                <p className="text-second">Find all the study sessions easily, and don&#39;t be late.</p>
            </div>
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
            
        </div>
    );
};

export default StudySection;