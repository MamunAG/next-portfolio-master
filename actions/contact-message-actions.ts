import prismadb from "@/lib/prismadb";
import { ContactMessage } from "@prisma/client";
import axios from "axios";
import { root } from "./api";

export async function GetAllContactMessage(): Promise<ContactMessage[]> {
  const res = await axios.get(root + `/contact-msg`);
  return res.data;
}

export async function GetContactMessageById(
  id: number
): Promise<ContactMessage | null> {
  const res = await axios.get(root + `/contact-msg/${id}`);
  return res.data;
}

export async function Save(
  contactMessage: ContactMessage
): Promise<ContactMessage> {
  const { name, email, subject, message, createdDate } = contactMessage;

  if (!name) {
    throw new Error("Name is required");
  }
  if (name.length < 3) {
    throw new Error("Tag name must be at least 3 character.");
  }
  if (!email) {
    throw new Error("Contact number is required");
  }
  if (email.length < 10) {
    throw new Error("Please provide a valid contact number.");
  }

  const res = await axios.post(root + `/contact-msg`, contactMessage);
  return res.data;
}
