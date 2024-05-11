import { ReactNode } from "react";
import styles from "./LoginBtn.module.css";

interface Props {
	children: ReactNode;
}

const LoginBtn = ({ children }: Props) => {
	return <button className={styles.login}>{children}</button>;
};

export default LoginBtn;
