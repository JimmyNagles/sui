import { useState } from "react";

interface TabProps {
  title: string;
  content: JSX.Element;
}

interface TabsProps {
  tabs: TabProps[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="min-h-screen w-[900px] p-2">
      <div className="flex flex-row justify-evenly w-full ">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 w-[200px] text-black transition-all duration-1000 ease-in ${
              activeTab === index
                ? "bg-gray-900 bg-opacity-70 shadow-inner text-white w-full h-full"
                : "bg-gray-900 bg-opacity-0 hover:text-white hover:bg-opacity-80 hover:shadow-2xl"
            }`}
            onClick={() => {
              setActiveTab(index);
              setTabIndex(index);
            }}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className={`py-2 px-4 text-black `}>{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
