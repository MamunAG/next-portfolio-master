import Image from "next/image";
import React from "react";

function ImageSection({ src }: { src: string }) {
  return (
    <div className="flex justify-center items-center">
      <Image src={src} alt="vat-text" height={300} width={300} />
    </div>
  );
}

function TextSection({ text }: { text: string }) {
  return (
    <div className="flex justify-center items-center mt-5">
      <p>{text}</p>
    </div>
  );
}

export default function Details({ params }: { params: { details: number } }) {
  return (
    <div className="container flex flex-col justify-center">
      <div className="border-b-2 mb-3">
        <h1 className="font-bold text-2xl">This is the title</h1>
      </div>
      <ImageSection src={"/images/vat.jpg"} />
      <TextSection
        text={`
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium,
          incidunt nulla nam illo eum id odit corrupti suscipit placeat? Ratione
          quibusdam provident voluptate quod id quasi autem, unde expedita
          veniam.Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Praesentium, incidunt nulla nam illo eum id odit corrupti suscipit
          placeat? Ratione quibusdam provident voluptate quod id quasi autem,
          unde expedita veniam.Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Praesentium, incidunt nulla nam illo eum id odit
          corrupti suscipit placeat? Ratione quibusdam provident voluptate quod
          id quasi autem, unde expedita veniam.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Praesentium, incidunt nulla nam illo eum
          id odit corrupti suscipit placeat? Ratione quibusdam provident
          voluptate quod id quasi autem, unde expedita veniam.Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Praesentium, incidunt nulla nam
          illo eum id odit corrupti suscipit placeat? Ratione quibusdam
          provident voluptate quod id quasi autem, unde expedita veniam.
          `}
      />
      <TextSection
        text={`
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium,
          incidunt nulla nam illo eum id odit corrupti suscipit placeat? Ratione
          quibusdam provident voluptate quod id quasi autem, unde expedita
          veniam.Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Praesentium, incidunt nulla nam illo eum id odit corrupti suscipit
          placeat? Ratione quibusdam provident voluptate quod id quasi autem,
          unde expedita veniam.Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Praesentium, incidunt nulla nam illo eum id odit
          corrupti suscipit placeat? Ratione quibusdam provident voluptate quod
          id quasi autem, unde expedita veniam.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Praesentium, incidunt nulla nam illo eum
          id odit corrupti suscipit placeat? Ratione quibusdam provident
          voluptate quod id quasi autem, unde expedita veniam.Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Praesentium, incidunt nulla nam
          illo eum id odit corrupti suscipit placeat? Ratione quibusdam
          provident voluptate quod id quasi autem, unde expedita veniam.
          `}
      />
      <TextSection
        text={`
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium,
          incidunt nulla nam illo eum id odit corrupti suscipit placeat? Ratione
          quibusdam provident voluptate quod id quasi autem, unde expedita
          veniam.Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Praesentium, incidunt nulla nam illo eum id odit corrupti suscipit
          placeat? Ratione quibusdam provident voluptate quod id quasi autem,
          unde expedita veniam.Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Praesentium, incidunt nulla nam illo eum id odit
          corrupti suscipit placeat? Ratione quibusdam provident voluptate quod
          id quasi autem, unde expedita veniam.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Praesentium, incidunt nulla nam illo eum
          id odit corrupti suscipit placeat? Ratione quibusdam provident
          voluptate quod id quasi autem, unde expedita veniam.Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Praesentium, incidunt nulla nam
          illo eum id odit corrupti suscipit placeat? Ratione quibusdam
          provident voluptate quod id quasi autem, unde expedita veniam.
          `}
      />
      <TextSection
        text={`
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium,
          incidunt nulla nam illo eum id odit corrupti suscipit placeat? Ratione
          quibusdam provident voluptate quod id quasi autem, unde expedita
          veniam.Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Praesentium, incidunt nulla nam illo eum id odit corrupti suscipit
          placeat? Ratione quibusdam provident voluptate quod id quasi autem,
          unde expedita veniam.Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Praesentium, incidunt nulla nam illo eum id odit
          corrupti suscipit placeat? Ratione quibusdam provident voluptate quod
          id quasi autem, unde expedita veniam.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Praesentium, incidunt nulla nam illo eum
          id odit corrupti suscipit placeat? Ratione quibusdam provident
          voluptate quod id quasi autem, unde expedita veniam.Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Praesentium, incidunt nulla nam
          illo eum id odit corrupti suscipit placeat? Ratione quibusdam
          provident voluptate quod id quasi autem, unde expedita veniam.
          `}
      />
    </div>
  );
}
