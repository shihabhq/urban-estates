import Heading from "../../../shared/Heading";

const DeveloperCard = ({ src, name }) => {
  return (
    <div
      className="flex flex-col hover:scale-110 transition-all items-center justify-center p-6 rounded-lg
    border border-gray-300"
    >
      <div>
        <img className="w-full max-w-[150px]" src={src} alt={name} />
      </div>
      <div>
        <h1 className="lg:text-xl font-poppins font-semibold">{name}</h1>
      </div>
    </div>
  );
};

const Developers = () => {
  return (
    <div className="overflow-hidden xsm:overflow-visible">
      <Heading largeHead={"Get connected with the top real estate makers"} />
      <div className="text-center text-lg max-w-3xl mx-auto mb-12">
        Discover and connect with the leading experts in the real estate
        industry. Whether you are looking for advice, collaborations, or new
        opportunities, this platform brings you closer to the professionals
        shaping the future of real estate.
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 lg:gap-12 container mx-auto">
        <DeveloperCard
          src={
            "https://res.cloudinary.com/deyzzky20/image/upload/v1739969455/logos/wngmfcqrm7329exj8vl2.png"
          }
          name={"Rangs LTD."}
        />
        <DeveloperCard
          src={
            "https://res.cloudinary.com/deyzzky20/image/upload/v1739969454/logos/z9s0lz2j5leumxevdeb8.png"
          }
          name={"Sanmar Properties"}
        />
        <DeveloperCard
          src={
            "https://res.cloudinary.com/deyzzky20/image/upload/v1739969454/logos/akqhvvgmlk7i8xdh2vc0.png"
          }
          name={"Bashundhara Group"}
        />
        <DeveloperCard
          src={
            "https://res.cloudinary.com/deyzzky20/image/upload/v1739969454/logos/ushysqw4puyei38qvbnk.png"
          }
          name={"Shanta Holdings"}
        />

        <DeveloperCard
          src={
            "https://res.cloudinary.com/deyzzky20/image/upload/v1739969453/logos/ljnv4fitctnuusr1tll1.png"
          }
          name={"BTI"}
        />
        <DeveloperCard
          src={
            "https://res.cloudinary.com/deyzzky20/image/upload/v1739969453/logos/zhblyxjfwxhuhc4uqlvh.png"
          }
          name={"Wecon Properties"}
        />
        <DeveloperCard
          src={
            "https://res.cloudinary.com/deyzzky20/image/upload/v1739969453/logos/gyjkgfwzubn2zjajtthz.png"
          }
          name={"Anwar Landmark"}
        />
        <DeveloperCard
          src={
            "https://res.cloudinary.com/deyzzky20/image/upload/v1739969453/logos/iii6mebexh3eynlb3neg.png"
          }
          name={"Concord Real Estate"}
        />
        <DeveloperCard
          src={
            "https://res.cloudinary.com/deyzzky20/image/upload/v1739969453/logos/bktmtlsmglrhzdf5v9lb.png"
          }
          name={"Rupayan Group"}
        />
        <DeveloperCard
          src={
            "https://res.cloudinary.com/deyzzky20/image/upload/v1739969453/logos/mfmdwckju8sw2l1wx5ob.png"
          }
          name={"Bay Housing"}
        />
      </div>
    </div>
  );
};

export default Developers;
