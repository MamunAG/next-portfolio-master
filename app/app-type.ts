// //auth=================================================================================
// interface User {
//     id        :    string
//     name   :       string?
//     email   :      string
//     emailVerified :DateTime?
//     image    :     string?
//     role :         string?
//     password  :    string?
//     accounts  :    Account[]
//     sessions :     Session[]

//     createdAt DateTime  @default(now())
//     updatedAt DateTime? @updatedAt

//     BlogMaster BlogMaster[]
//   }

//   interface Account {
//     userId            string
//     type              string
//     provider          string
//     providerAccountId string
//     refresh_token     string?
//     access_token      string?
//     expires_at        Int?
//     token_type        string?
//     scope             string?
//     id_token          string?
//     session_state     string?

//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt

//     user User @relation(fields: [userId], references: [id], onDelete: Cascade)

//     @@id([provider, providerAccountId])
//   }

//   interface Session {
//     sessionToken string   @unique
//     userId       string
//     expires      DateTime
//     user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//   }

//   interface VerificationToken {
//     identifier string
//     token      string
//     expires    DateTime

//     @@id([identifier, token])
//   }

//   // Optional for WebAuthn support
//   interface Authenticator {
//     credentialID         string  @unique
//     userId               string
//     providerAccountId    string
//     credentialPublicKey  string
//     counter              Int
//     credentialDeviceType string
//     credentialBackedUp   Boolean
//     transports           string?

//     user User @relation(fields: [userId], references: [id], onDelete: Cascade)

//     @@id([userId, credentialID])
//   }

//   //end-auth ===================================================================================

interface Tag {
  id: number;
  name: string;
  isActive: Boolean;
  BlogTags: BlogTags[];
}

interface BlogMaster {
  id: number;
  title: string;
  composedById: string;
  // composedBy :  User?        ;
  composedDate: Date;
  isPublished: Boolean;
  BlogDetails: BlogDetails[];
  BlogTags: BlogTags[];
}

interface BlogDetails {
  id: number;
  masterId: number;
  blogMst: BlogMaster;
  sectionType: string;
  imagePreview: string;
  text: string;
  sortingNo: number;
}

interface BlogTags {
  id: number;
  blogMst: BlogMaster;
  tagId: number;
  tag: Tag;
}

interface HireMe {
  id: number;
  name: string;
  email: string;
  contact: string;
  address: string;
  createdDate: Date;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdDate: Date;
}
