import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../../LoadingError/Error";
import Loading from "../../LoadingError/Loading";
import { registerteacher } from "../../Redux/Actions/userActions";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const RegisterTeacher = ({ location, history }) => {
	window.scrollTo(0, 0);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setCPassword] = useState("");

	const dispatch = useDispatch();
	const redirect =
		location && location.search ? location.search.split("=")[1] : "/";

	const userRegister = useSelector((state) => state.userRegister);
	const { error, loading, success } = userRegister;

	const submitHandler = (e) => {
		e.preventDefault();
		// Vérifier si tous les champs sont remplis
		if (!name || !email || !password || !confirmPassword) {
			// Utilisation de SweetAlert pour afficher un message d'erreur
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Veuillez remplir tous les champs!',
			});
			return; // Arrêter le traitement
		}
		// Appeler la fonction de dispatch seulement si tous les champs sont remplis
		dispatch(registerteacher(name, email, password, confirmPassword));
	};

	return (
		<>
			<div className="container-form">
				<div className="img w-100">
					<img src="https://i.postimg.cc/8chrbRgv/undraw-Mobile-payments-re-7udl.png" />
				</div>
				<div className="login-content">
					<form onSubmit={submitHandler}>
						<h1 className="title" style={{ color: '#cf0000', fontSize: '24px' }}>
							Creer votre compte.
							<br></br>

							<FontAwesomeIcon icon={faUser} /> Enseignant
						</h1>						{error && <Message variant="alert-danger">{error}</Message>}
						{success && (
							Swal.fire({
								title: 'Success!',
								text: 'Please verify your email',
								imageUrl: 'https://i.postimg.cc/8chrbRgv/undraw-Mobile-payments-re-7udl.png',
								imageAlt: 'Success Image',
								confirmButtonText: 'OK',

							})
						)}{" "}
						{loading && <Loading />}
						<div className="input-div one">
							<div className="i">
								<i className="fas fa-envelope"></i>
							</div>

							<div className="div">
								<input
									type="email"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>
						<div className="input-div pass">
							<div className="i">
								<i className="fas fa-user"></i>
							</div>
							<div className="div">
								<input
									type="text"
									placeholder="Username"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
						</div>
						<div className="input-div pass">
							<div className="i">
								<i className="fas fa-lock"></i>
							</div>
							<div className="div">
								<input
									type="password"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>
						<div className="input-div pass">
							<div className="i">
								<i className="fas fa-lock"></i>
							</div>
							<div className="div">
								<input
									type="password"
									placeholder="Confirm Password"
									value={confirmPassword}
									onChange={(e) => setCPassword(e.target.value)}
								/>
							</div>
						</div>
						<Link to={redirect ? `/index?redirect=${redirect}` : "/index"}>
							<a href="#">Forgot Password?</a>
						</Link>
						<input type="submit" className="bttn" value="Register" />
						<Link to={redirect ? `/login?redirect=${redirect}` : "/login"} style={{ textDecoration: "none" }}>
							<a href="/login" style={{ display: "inline-block", marginLeft: "10px", padding: "8px 16px", backgroundColor: "#000", color: "#fff", borderRadius: "4px" }}>
								Connectez-vous à votre compte
							</a>
						</Link>
					</form>
				</div>
			</div>
		</>
	);
};

export default RegisterTeacher;
