const Heading = ({ smallHead, largeHead, text }) => {
  return (
    <div className="text-center flex flex-col gap-2 my-16 max-w-2xl mx-auto">
      <h3 className="text-btncol font-poppins text-lg ">{smallHead}</h3>
      <h1 className="font-bold uppercase font-Roboto text-3xl sm:text-4xl">
        {largeHead}
      </h1>
      <p className="text-base font-poppins">{text}</p>
    </div>
  );
};

export default Heading;
