import { useRouter } from "next/router";
function CandidateDetails() {
  const router = useRouter();
  const { name, role, title, image, email } = router.query;
  console.log(image);

  //campaign speech random
  const campaignSpeeches = [
    "Elect a leader who listens, cares, and takes action.",
    "Vote for experience, integrity, and a proven track record.",
    "Choose a candidate committed to transparency, accountability, and inclusivity.",
    "Support a leader who will fight for your rights, values, and aspirations.",
    "Vote for a fresh perspective, innovative ideas, and bold solutions.",
    "Elect a candidate who understands your concerns, challenges, and aspirations.",
    "Choose a leader who will prioritize the needs of the community and its people.",
    "Support a candidate dedicated to unity, collaboration, and positive change.",
    "Vote for a leader who will champion equality, justice, and opportunity for all.",
    "Elect a representative who will be a voice for the voiceless and fight for social progress.",
  ];

  // Generate a random index
  const randomIndex = Math.floor(Math.random() * campaignSpeeches.length);

  // Get the random campaign speech
  const randomSpeech = campaignSpeeches[randomIndex];

  return (
    <div className="flex flex-col">
      <img className="sticky max-w-[screen] mt-[-115px] " src="/bgForCandidateCard.png" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="absolute m-16 w-6 h-6 hover:cursor-pointer"
        onClick={() => router.back()}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      </svg>
      <div
        className="absolute text-center text-white 
            ml-[420px] mt-16"
      >
        <h1 className="text-6xl p-1 ml-28 mb-3">Vote for {name} </h1>
        <h2 className="text-2xl ml-28">
          For   {title} Election
        </h2>
      </div>
      <div className="text-2xl absolute w-10/12  mt-56 ml-40 ">
        <img
          className="rounded-full absolute h-40 w-40 ml-[70px] mt-10"
          src={image}
          alt="w"
        />
        <p
          className="text-2xl mt-20 ml-[280px] font-semibold 
                     text-white"
        >
          {name}
        </p>
        <p
          className="text-xl mt-5 ml-[280px]
                     text-white"
        >
          {role}
          <br />
        </p>
        <p
          className="text-xl mt-5 ml-[280px]
                     text-white"
        >
          {email}
          <br />
        </p>
        <p className="text-xl ml-[265px] p-1.5 font-italic text-white">
          “ {randomSpeech} “<br />
        </p>
      </div>
      <h2 className="text-4xl font-bold mt-5 ml-24">Campaign Promise</h2>
      <p className="text-2xl ml-24 mt-10">Ladies and gentlemen,</p>
      <p className="text-xl ml-24 my-20">
        Today, I stand before you as a candidate for the upcoming election,
        ready to serve and represent your interests. I humbly ask for your
        support and trust in this crucial time.
        <br />
        <br />
        My vision for our community is rooted in unity, progress, and
        inclusivity. I aim to foster an environment where every voice is heard,
        where diversity is celebrated, and where opportunities are accessible to
        all.
        <br />
        <br />
        Together, we can shape a brighter future. Let's embark on this journey
        together, hand in hand, and make our community a beacon of hope and
        prosperity. Vote for a leader who will listen, act, and deliver. Vote
        for a better tomorrow.
        <br />
        <br />
        <br /> Thank You!
      </p>
    </div>
  );
}

export default CandidateDetails;
