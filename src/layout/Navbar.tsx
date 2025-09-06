import { IoIosArrowDown } from "react-icons/io";
import person from "../assets/person.jpg";
import { useLocation } from "react-router-dom";

const Navbar = () => {
	const { pathname } = useLocation();

	const displayPath = pathname.split("/")[1].replace("-", " ");
	// console.log(pathname);

	return (
		<nav className="fixed sm:h-[65px] md:h-[70px] lg:h-[75px] xl:h-[80px] w-full left-0 top-0 z-[1000] hidden sm:flex max-w-[1655px] mx-auto bg-[#F0F1FE]">
			<div className="flex w-full items-center border-b border-[#00000014]">
				<div className="md:ml-[220px] lg:ml-[230px] xl:ml-[256px] flex gap-3 items-center justify-between w-full px-6">
					<h4 className="text-xl lg:text-[22px] xl:text-2xl text-[#060606] sm:w-2/5 capitalize">
						{displayPath}
					</h4>

					<div className="flex items-center gap-3 xl:gap-4 sm:w-3/5">
						<input
							type="text"
							placeholder="Search for anything..."
							className="placeholder:text-[#06060666] bg-white pl-8 pr-3 lg:pr-4 py-2.5 rounded-[30px] text-[15px] outline-0 focus:border focus:border-[#00000014] w-3/4 xl:w-full h-[46px] lg:h-[47px] xl:h-[48px]"
						/>
						<div className="bg-white rounded-[30px] flex-between gap-2 lg:gap-4 pl-2 py-1 lg:py-1.5 pr-3 xl:pr-5 xl:min-w-[200px]">
							<div className="flex items-center gap-2">
								<img
									src={person}
									alt="person"
									className="w-[37px] xl:w-[38px] h-[37px] xl:h-[38px] object-fit rounded-full"
								/>
								<p className="text-nowrap text-[#292D32] text-[15px] hidden sm:block md:hidden lg:block truncate">
									Alex Meian
								</p>
							</div>
							<button>
								<IoIosArrowDown size={20} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
