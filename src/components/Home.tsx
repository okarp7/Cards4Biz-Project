import { FunctionComponent } from "react";
import { Navbar } from "react-bootstrap";
import Footer from "./Footer";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
  return (<>
    <Navbar />

    <div className="container">
      <div className="row">
        <h3 className="display-3 text-center"><strong>Welcome to Cards4Biz </strong></h3>
        <h5 className="display-5 text-center">Your one stop shop for quality Business Cards</h5>
      </div>
      <div className="row">
        <div className="col-md-5">
          <img src="https://www.meraprint.com/wp-content/uploads/2021/09/business-visiting-cards-1.jpg" height="350" alt="" />
        </div>
        <div className="text-start col-md-7">
          <p className="h5">Elevate your business game with Cards4Biz -
            the ultimate destination for sleek and professional business cards. Our expert designer(yes just one, can you believe it??) and cutting-edge printing technology come together to create cards that make a lasting impression. Say goodbye to boring and generic business cards and hello to a personalized and memorable representation of your brand. Join the Cards4Biz community today and watch your business soar!</p>
        </div>
      </div>
    </div>
    <Footer />
  </>);
}

export default Home;