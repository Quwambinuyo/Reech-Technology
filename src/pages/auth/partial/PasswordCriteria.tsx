import { MdCancel, MdCheckCircle } from "react-icons/md";

interface PasswordProps {
	isPasswordValid: {
		moreThan7: boolean;
		uCase: boolean;
		lCase: boolean;
		specialCha: boolean;
		number: boolean;
	};
}

const PasswordCriteria = ({ isPasswordValid }: PasswordProps) => {
	return (
		<div className="space-y-2 absolute z-10 bg-white border border-primary-purple shadow-xl -right-0 -top-32 rounded-lg p-3">
			<h5 className="text-sm">Password must contain:</h5>
			<div className="space-y-1">
				<Criteria
					text="Between 8 and 250 characters"
					isValid={isPasswordValid.moreThan7}
				/>
				<Criteria
					text="At least 1 uppercase letter"
					isValid={isPasswordValid.uCase}
				/>
				<Criteria
					text="At least 1 lowercase letter"
					isValid={isPasswordValid.lCase}
				/>
				<Criteria
					text="At least 1 special character"
					isValid={isPasswordValid.specialCha}
				/>
				<Criteria text="At least 1 number" isValid={isPasswordValid.number} />
			</div>
		</div>
	);
};

export default PasswordCriteria;

const Criteria = ({ text, isValid }: { text: string; isValid: boolean }) => (
	<p className="flex gap-1.5 md:gap-2 items-center text-xs">
		<span className="text-sm">
			{isValid ? <MdCheckCircle color="green" /> : <MdCancel color="red" />}
		</span>
		<span className="text-gray-500">{text}</span>
	</p>
);
