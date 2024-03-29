import searchImg from "@/public/images/search.svg";
import clearIcon from "@/public/images/clear.svg";
import { ClearIcon, LinkSearchInputWrapper } from "./style";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";

const LinkSearchInput = ({
	onSubmit
}: {
	onSubmit: (keyword: string) => void;
}) => {
	const [searchValue, setSearchValue] = useState<string>("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const handleClick = () => {
		setSearchValue("");
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit(searchValue);
	};

	return (
		<LinkSearchInputWrapper onSubmit={handleSubmit}>
			<Image width={16} height={16} src={searchImg} alt="검색 이미지" />
			<input
				placeholder="링크를 검색해 보세요"
				value={searchValue}
				onChange={handleChange}
			/>
			<ClearIcon>
				<Image fill src={clearIcon} alt="내용 지우기" onClick={handleClick} />
			</ClearIcon>
		</LinkSearchInputWrapper>
	);
};

export default LinkSearchInput;
