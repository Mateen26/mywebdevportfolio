import Image from "next/image";

interface ProjectCardProps {
  img: string;
  title: string;
  desc: string;
}

export function ProjectCard({ img, title, desc }: ProjectCardProps) {
  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden shadow-sm">
      <div className="mx-0 mt-0 mb-6 h-48">
        <Image
          src={img}
          alt={title}
          width={768}
          height={768}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <a
          href="#"
          className="text-primary-white transition-colors hover:text-gray-800"
        >
          <h5 className="mb-2 text-lg font-semibold !text-primary-white">
            {title}
          </h5>
        </a>
        <p className="mb-6 font-normal !text-gray-500">
          {desc}
        </p>
        <button className="bg-primary-brown text-white text-sm px-4 py-2 rounded">
          see details
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
