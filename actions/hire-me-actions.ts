import { HireMe } from "@prisma/client";
import axios from "axios";
import { root } from "./api";

export async function GetAllRequest(): Promise<HireMe[]> {
  const res = await axios.get(root + `/hire-me`);
  return res.data;
}

export async function GetRequestById(id: number): Promise<HireMe | null> {
  const res = await axios.get(root + `/hire-me/${id}`);
  return res.data;
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

  const res = await axios.post(root + `/hire-me`, hireMe);
  return res.data;
}
