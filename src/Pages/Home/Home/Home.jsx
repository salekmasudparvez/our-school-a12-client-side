import useAuth from "../../../Hook/useAuth";
import Banner from "../Banner/Banner";
import StudySection from "../StudySection/StudySection";
import Tutors from "../Tutors/Tutors";


const Home = () => {
    const {user}=useAuth();
    console.log(user)
    return (
        <>
            <Banner></Banner>
            <StudySection></StudySection>
            <Tutors/>
        </>
    );
};

export default Home;