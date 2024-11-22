import prismadb from "@/lib/prismadb";
import { HireMe, Tag } from "@prisma/client";

export async function GetAllRequest(): Promise<HireMe[]> {
  return await prismadb.hireMe.findMany();
}

export async function GetRequestById(id: number): Promise<HireMe | null> {
  return await prismadb.hireMe.findFirst({
    where: {
      id,
    },
  });
}

export async function Save(hireMe: HireMe): Promise<HireMe> {
  const { name, email, contact, address, createdDate } = hireMe;

  if (!name) {
    throw new Error("Name is required");
  }
  if (name.length < 3) {
    throw new Error("Tag name must be at least 3 character.");
  }
  if (!contact) {
    throw new Error("Contact number is required");
  }
  if (contact.length < 10) {
    throw new Error("Please provide a valid contact number.");
  }

  return await prismadb.hireMe.create({
    data: {
      name,
      email,
      contact,
      address,
      createdDate,
    },
  });
}

export async function Update(hireMe: HireMe): Promise<HireMe> {
  const { id, name, email, contact, address } = hireMe;

  if (Number(id) <= 0) {
    throw new Error("Please select a request.");
  }
  if (Number(id) != Number(id)) {
    throw new Error("Bad request. Request not consistent.");
  }
  if (!name) {
    throw new Error("Name is required.");
  }

  return await prismadb.hireMe.update({
    data: {
      name,
      email,
      contact,
      address,
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

  const hireMe = await prismadb.hireMe.findFirst({
    where: { id: Number(id) },
  });

  if (!hireMe) {
    throw new Error("Hire me request not found.");
  }
  return await prismadb.hireMe.delete({
    where: {
      id: Number(id),
    },
  });
}
