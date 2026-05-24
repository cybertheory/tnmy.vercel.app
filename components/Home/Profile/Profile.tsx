import userData from "../../userData";
import { AiFillGithub } from "react-icons/ai";
import { GrLinkedinOption } from "react-icons/gr";

const Profile = () => {
  return (
    <div className="mt-8 sm:mt-12 flex w-full flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-10">
      <img
        src="/images/pfp.jpg"
        alt="Rishabh Singh"
        className="h-24 w-24 sm:h-36 sm:w-36 shrink-0 rounded-full object-cover"
      />
      <div className="flex min-w-0 flex-col items-center text-center sm:items-start sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-medium">{userData.name}</h1>
        <div className="mt-1 mb-3 sm:mb-4 max-w-sm text-sm sm:text-base text-neutral-400">{userData.bio}</div>
        <div className="flex items-center gap-3 text-lg sm:text-xl">
          {userData.github && (
            <a href={userData.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <AiFillGithub />
            </a>
          )}
          {userData.linkedIn && (
            <a href={userData.linkedIn} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <GrLinkedinOption />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
