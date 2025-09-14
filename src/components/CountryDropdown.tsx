import CountryList from "country-list-with-dial-code-and-flag";
import CountryFlagSvg from "country-list-with-dial-code-and-flag/dist/flag-svg";
import type { CountryProps } from "../types";
import { useState } from "react";
import { commentImg } from "../assets";

const CountryDropdown = ({
	onSelect,
}: {
	onSelect?: (opt: CountryProps) => void;
}) => {
	const countries = CountryList.getAll();

	const [searchTerm, setSearchTerm] = useState("");

	const filteredCountries = countries.filter(
		(country) =>
			country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			country.dial_code.includes(searchTerm)
	);

	return (
		<div className="bg-white shadow-lg rounded-xl border border-[#CBD5E1]/30 py-2 w-full w-full">
			<div className="px-4">
				<input
					type="text"
					className="py-2.5 px-4 border border-[#CBD5E1] outline-none rounded-[30px] w-full text-sm placeholder:text-[#A8ADBD] capitalize focus:border-gray-400"
					placeholder="Search country..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			<div className="min-h-[160px] max-h-[190px] mt-2 overflow-y-auto">
				{filteredCountries.length > 0 ? (
					filteredCountries.map((country, i) => (
						<div
							key={i}
							className="px-4 lg:px-5 flex items-center gap-3 cursor-pointer hover:bg-gray-100 py-2"
							onClick={() => onSelect?.(country as unknown as CountryProps)}
						>
							<div
								dangerouslySetInnerHTML={{
									__html: CountryFlagSvg[country.code],
								}}
								className="rounded-full h-6 w-6 mt-2"
							></div>
							<span className="text-sm text-gray-700">
								{country.name} ({country.dial_code})
							</span>
						</div>
					))
				) : (
					<div className="h-full flex-center flex-col gap-3 pt-1">
						<img src={commentImg} alt="comment" className="w-[100px]" />
						<p className="text-sm text-gray-700 w-[200px] text-center">
							No country matches this keyword
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default CountryDropdown;
