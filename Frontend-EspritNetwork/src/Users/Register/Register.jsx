import { Link } from "react-router-dom";

const Register = () => {
	return (
		<>
			<div className="wave-container">
				<div className="wave-text">
					<p>Bienvenue sur notre plateforme d'inscription.</p>
				</div>
			</div>
			<div className="container-form">
				<div className="img">
					<img
						src="https://i.postimg.cc/65VQMTXp/Cream-Brown-Hand-International-Day-for-the-Elimination-of-Racial-Discrimination-Instagram-Post-1.png"
						alt="logo"
					/>
				</div>
				
				<div className="login-content">
					<form>
						<h2 className="title">Créez votre compte</h2>
						<div className="button-options">
							<Link to="/RegisterStudent">
								<button className="bttn ">Student</button>
							</Link>
							<Link to="/RegisterComapany">
								<button className="bttn ">Entreprise</button>
							</Link>
							<Link to="/RegisterAlumni">
								<button className="bttn ">Alumni</button>
							</Link>
							<Link to="/RegisterEspr">
								<button className="bttn ">Esprit Staff</button>
							</Link>
							<Link to="/RegisterTeacherr">
								<button className="bttn ">Enseignant</button>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Register;
