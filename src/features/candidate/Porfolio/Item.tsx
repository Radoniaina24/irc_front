import { Portfolio } from "../context/FormCandidateContext";
import dayjs from "dayjs";
import DeletePortfolio from "./DeletePortfolio";
import EditPortfolio from "./EditPortfolio";

export default function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  console.log(portfolio);
  const file = portfolio.file as any;
  return (
    <div className="  p-6 bg-white rounded-2xl shadow-lg border border-gray-200 relative">
      <div className="absolute top-3 right-3 flex space-x-2">
        <EditPortfolio portfolio={portfolio} />
        <DeletePortfolio id={portfolio._id} />
      </div>

      <h2 className="text-lg font-semibold text-gray-800">{portfolio.title}</h2>
      <p className="text-gray-600 text-md">{portfolio.role}</p>
      <p className="text-gray-500 ps-2 text-sm">
        {portfolio.description.slice(0, 60)}...
      </p>
      <p className="mt-2 space-x-2">
        {portfolio.skills.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset"
          >
            {item}
          </span>
        ))}
      </p>
      <div className="flex justify-between mt-2">
        <div className="flex items-center gap-2 ">
          <svg
            className="w-6 h-6 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 10.172a4 4 0 015.656 0l2.344 2.344a4 4 0 010 5.656l-3.536 3.536a4 4 0 01-5.656 0l-2.344-2.344a4 4 0 010-5.656"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.172 13.828a4 4 0 010-5.656l2.344-2.344a4 4 0 015.656 0l3.536 3.536a4 4 0 010 5.656"
            ></path>
          </svg>
          <a
            href={`http://${portfolio.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm hover:text-blue-800 font-medium transition duration-300"
          >
            Visit the website
          </a>
        </div>

        {/* Lien vers le fichier PDF */}
        <div className="flex items-center gap-2">
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 text-sm hover:text-red-800 font-medium transition duration-300"
          >
            Download file
          </a>
        </div>
      </div>
    </div>
  );
}
