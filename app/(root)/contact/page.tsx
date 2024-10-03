import { motion } from "framer-motion";
import ContactForm from "./components/ContactForm";
import ContactDetails from "./components/ContactDetails";

function contact() {
  return (
    <div className="container mx-auto flex flex-col-reverse lg:flex-row py-5 lg:py-10 lg:mt-5">
      <ContactForm />
      <ContactDetails />
    </div>
  );
}

export default contact;
