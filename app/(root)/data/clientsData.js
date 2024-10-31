import { v4 as uuidv4 } from "uuid";

// Import images
import AmazonImage from "@/public/images/brands/amazon_gray.png";
import SonyImage from "@/public/images/brands/sony_gray.png";
import AdidasImage from "@/public/images/brands/adidas_gray.png";
import FilaImage from "@/public/images/brands/fila_gray.png";
import NBImage from "@/public/images/brands/nb_gray.png";
import SamsungImage from "@/public/images/brands/samsung_gray.png";
import CanonImage from "@/public/images/brands/canon_gray.png";
import PumaImage from "@/public/images/brands/puma_gray.png";

export const clientsHeading = "KKK Law House Services offered";

export const clientsData = [
  {
    id: uuidv4(),
    title: "VAT Consultancy Service",
    items: [
      "VAT Return Submission",
      "VAT Registration, IRC, BIN, ERC & Others Registration",
      "Mushok 4.3 Prepared & Submission",
      "Source Tax deduction & Adjustment",
      "VAT Audit",
      "VAT Related activities of a company",
    ],
  },
  {
    id: uuidv4(),
    title: "Tax Related Service",
    items: [
      "Personal Tax Planning, Preparation & Submission",
      "Corporate Tax Planning",
      "Tax Assessment, Appeals & Hearing ",
      "Monthly withholding Return",
    ],
  },
  {
    id: uuidv4(),
    title: "Accounting Services",
    items: [
      "Financial Statement Preparation",
      "Financial Statement Planning",
      "Monthly Accounts Service",
      "Internal Audit Service",
      "Audited Financial Statement review",
    ],
  },
  {
    id: uuidv4(),
    title: "RJSC",
    items: [
      "Annual Return",
      "Change in Structure",
      "Company Formation",
      "Share Transfer",
      "Winding up",
    ],
  },
];
