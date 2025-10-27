import Logo from "../../assets/icons/Logo block.png";

const Header2 = ({ heading, paragraph }) => {
  return (
    <div className="text-center mx-auto mb-[10px] gap-2">
      <img src={Logo} alt="Site Logo" className=" fixed top-4 left-4" />
      <p className="font-semibold text-[#EB5017] text-2xl">{heading}</p>
      <p className="text-base font-normal text-[#667185]">{paragraph} </p>
    </div>
  );
};

export default Header2;
