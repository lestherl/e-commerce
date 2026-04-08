import Header from "../components/header";
import Contacts from "../components/contact"
import "../style/pcontact.css"
import Footer from "../components/footer"

function Contact(){
    return(
        <>
          <Header/>
            <div className='contact-page'>
           <Contacts/>
        </div>
        <Footer/>
        </>
    )
}
export default Contact;