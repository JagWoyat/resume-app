import styles from "./Main.module.css";
import certificateReact from "../../assets/react-udemy-cert.jpg";
import certificateASPNET from "../../assets/aspdotnet-udemy-cert.jpg";

export default function Main() {
	return (
		<div>
			<section className={styles.introductionWrapper}>
				<h3 className={styles.mainTitle}>
					Resume App <span>(in progress)</span>
				</h3>
				<p>I'm an aspiring web developer with focus on React.</p>
				<p>You can find some of my projects on the sidebar</p>
				<div className={styles.certMain}>
					<div className={styles.certWrapper}>
						<img src={certificateReact} alt="React Udemy Certificate" />
						<a
							target="_blank"
							href="https://ude.my/UC-55664585-7154-45f4-b636-740d9a9e89b3"
						>
							<strong>
								React - The Complete Guide 2023 (incl. React Router & Redux)
							</strong>
						</a>
					</div>
					<div className={styles.certWrapper}>
						<img src={certificateASPNET} alt="ASP.NET Udemy Certificate" />
						<a
							target="_blank"
							href="https://ude.my/UC-0e5be112-dc44-4e13-a093-5137bbf78084"
						>
							<strong>Ultimate ASP.NET Core Web API Development Guide</strong>
						</a>
					</div>
				</div>
			</section>
		</div>
	);
}
