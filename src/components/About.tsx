import { FunctionComponent } from "react";
/* import { Navbar } from "react-bootstrap";
 */
interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {
    return (<>

        <div className="container">
            <div className="row">
                <span>
                    <h1 className="display-3">Who Are We?</h1>
                    <h5 className="display-5">And what The hell is it that we do?</h5>
                </span>
            </div>
            <div className="row">
                <div className="col-md-7">
                    <img src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80" height="450" alt="" />
                </div>
                <div className="text-start col-md-5 display-7">
                    <p className="aboutText">At Cards4Biz, we take business cards seriously, but we don't take ourselves too seriously. We believe that a little bit of humor goes a long way, especially in the world of business. That's why we're not your average, run-of-the-mill business card company. Our team of one designer is made up of aprofessional jokester, who specialize in crafting cards that are sure to make your clients smile. Our cutting-edge printing technology is powered by unicorn magic and rainbow dust, ensuring that each and every card is a work of art. And if you're not completely satisfied with your cards, we'll personally send a team of singing, dancing flamingos to make things right. So, if you're ready to take your business to the next level (and have a little fun while you're at it), Cards4Biz is the only choice for you.</p>
                </div>
            </div>
        </div>
    </>);
}

export default About;