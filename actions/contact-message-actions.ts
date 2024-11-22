import prismadb from "@/lib/prismadb";
import { ContactMessage } from "@prisma/client";

export async function GetAllContactMessage(): Promise<ContactMessage[]> {
  return await prismadb.contactMessage.findMany();
}

export async function GetContactMessageById(
  id: number
): Promise<ContactMessage | null> {
  return await prismadb.contactMessage.findFirst({
    where: {
      id,
    },
  });
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

  return await prismadb.contactMessage.create({
    data: {
      name,
      email,
      subject,
      message,
      createdDate,
    },
  });
}

export async function Update(
  contactMessage: ContactMessage
): Promise<ContactMessage> {
  const { id, name, email, subject, message } = contactMessage;

  if (Number(id) <= 0) {
    throw new Error("Please select a request.");
  }
  if (Number(id) != Number(id)) {
    throw new Error("Bad request. Request not consistent.");
  }
  if (!name) {
    throw new Error("Name is required.");
  }

  return await prismadb.contactMessage.update({
    data: {
      name,
      email,
      subject,
      message,
    },
    where: {
      id: Number(id),
    },
  });
}

export async function Delete(id: number) {
  if (Number(id) <= 0) {
    throw new Error("Hire me request not selected.");
  }

  const contactMessage = await prismadb.contactMessage.findFirst({
    where: { id: Number(id) },
  });

  if (!contactMessage) {
    throw new Error("Hire me request not found.");
  }
  return await prismadb.contactMessage.delete({
    where: {
      id: Number(id),
    },
  });
}
