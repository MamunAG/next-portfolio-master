import Image from "next/image";

function AboutClientSingle({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div
      className="py-5 px-10 border bg-secondary-light border-ternary-light dark:border-ternary-dark  shadow-sm rounded-lg mb-5
  basis-full  sm:basis-5/12 flex-1
    "
    >
      <h1 className="font-bold">{title}</h1>
      <ul>
        {items.map((ele) => (
          <li key={ele} className="list-disc">
            {ele}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AboutClientSingle;
