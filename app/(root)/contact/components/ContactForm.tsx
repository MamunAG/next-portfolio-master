"use client";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/formInput";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Save } from "@/actions/contact-message-actions";
import { ContactMessage } from "@prisma/client";

type contactDataType = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function ContactForm() {
  const { toast } = useToast();
  const [data, setData] = useState<contactDataType>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function updateState(e: React.ChangeEvent<HTMLInputElement>) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  function updateState_txtArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (data.name == "") {
      showErrorMessage("Name is required.");
      return;
    }
    if (data.email == "") {
      showErrorMessage("Email is required.");
      return;
    }
    const msg: ContactMessage = {
      id: 0,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      createdDate: new Date(),
    };

    await Save(msg);

    toast({
      variant: "success",
      description: "Message has been sent successfully.",
    });

    console.log(data);
  }

  function showErrorMessage(msg: string) {
    toast({
      variant: "destructive",
      title: "Message",
      description: msg,
    });
  }

  return (
    <div className="w-full lg:w-1/2">
      <div className="leading-loose">
        <form
          onSubmit={handleOnSubmit}
          className="max-w-xl m-4 p-6 sm:p-10 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left"
        >
          <p className="font-general-medium text-primary-dark dark:text-primary-light text-2xl mb-8">
            Contact Form
          </p>

          <FormInput
            inputLabel="Full Name*"
            labelFor="name"
            inputType="text"
            inputId="name"
            inputName="name"
            placeholderText="Your Name"
            ariaLabelName="Name"
            onchange={updateState}
          />
          <FormInput
            inputLabel="Email*"
            labelFor="email"
            inputType="email"
            inputId="email"
            inputName="email"
            placeholderText="Your email"
            ariaLabelName="Email"
            onchange={updateState}
          />
          <FormInput
            inputLabel="Subject"
            labelFor="subject"
            inputType="text"
            inputId="subject"
            inputName="subject"
            placeholderText="Subject"
            ariaLabelName="Subject"
            onchange={updateState}
          />

          <div className="mt-6">
            <label
              className="block text-lg text-primary-dark dark:text-primary-light mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
              id="message"
              name="message"
              cols={14}
              rows={6}
              aria-label="Message"
              onChange={updateState_txtArea}
            ></textarea>
          </div>

          <div className="mt-6">
            <Button
              title="Send Message"
              type="submit"
              aria-label="Send Message"
            >
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
