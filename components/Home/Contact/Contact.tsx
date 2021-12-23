import userData from "../../userData";

const Contact = () => {
  return (
    <>
      <h1 className="text-xl mt-36 mb-5">got a project/opportunity?</h1>
      <a
        target="_blank"
        rel="noreferrer"
        href={userData.discord}
        className="bg-white text-gray-800 font-bold text-lg pt-3 pb-2 px-5 rounded-full "
      >
        dm me on discord
      </a>
      <div className="text-sm mt-3 text-gray-200">
        open for hackathons, projects, etc
      </div>
    </>
  );
};

export default Contact;
