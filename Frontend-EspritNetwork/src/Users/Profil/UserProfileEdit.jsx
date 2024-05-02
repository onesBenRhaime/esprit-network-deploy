import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../Redux/Actions/userActions";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { QRCode } from "react-qr-code";

const UserProfileEdit = () => {
	const [showImageCard, setShowImageCard] = useState(false);
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const [name, setName] = useState(userInfo?.name || "");
	const [email, setEmail] = useState(userInfo?.email || "");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const userData = {
		name: name,
		email: email,
	};

	const qrCodeData = JSON.stringify(userData);

	const submitHandler = (e) => {
		e.preventDefault();
		// Vérifier si les mots de passe sont définis et correspondent
		if (password && confirmPassword && password !== confirmPassword) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Passwords do not match!",
			});
		} else {
			dispatch(
				updateUserProfile({ id: userInfo?._id, name, email, password })
			).then((response) => {
				if (response && response.error) {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Failed to update profile!",
					});
				} else {
					Swal.fire({
						icon: "success",
						title: "Success!",
						text: "Profile updated successfully!",
						timer: 90000, // Fermer automatiquement après 2 secondes
					});
				}
			});
		}
	};
	const [isHovered, setIsHovered] = useState(false);
	const handleImageClick = () => {
		setShowImageCard(true);
	};

	const handleCloseCard = () => {
		setShowImageCard(false);
	};

	return (
		<>
			<div className="container-form">
				<div className="img w-100">
					<img
						src="https://i.postimg.cc/htzBHD0W/handball-11.png"
						alt="Profile"
					/>
					<div style={{ textAlign: "center", marginTop: "20px" }}>
						<h2>QR Code</h2>
						<QRCode
							value={qrCodeData}
							size={200}
							style={{ width: "200px", height: "200px" }}
						/>
					</div>
				</div>

				<div className="login-content">
					<form className="row  form-container" onSubmit={submitHandler}>
						<div style={{ display: "flex", alignItems: "center" }}>
							<div style={{ display: "flex", alignItems: "center" }}>
								<div>
									<button
										style={{
											borderRadius: "50%",
											width: "50px",
											height: "50px",
											backgroundColor: "#cf0000",
											color: "#fff",
											border: "none",
											cursor: "pointer",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
											position: "relative", // Ensure position is set to relative for absolute positioning
											transition: "transform 0.3s ease", // Transition for animation
											transform: isHovered ? "rotate(360deg)" : "none", // Rotate 360 degrees when hovered
										}}
										onMouseEnter={() => {
											setIsHovered(true);
											Swal.fire({
												icon: "info",
												title:
													"Vous pouvez uniquement modifier le mot de passe",
												showConfirmButton: false,
												timer: 9000, // Fermer automatiquement après 2 secondes
											});
										}}
										onMouseLeave={() => setIsHovered(false)} // Set isHovered to false on mouse leave
									>
										<FontAwesomeIcon icon={faComments} />
									</button>
								</div>
								<h1 className="title" style={{ color: "#cf0000" }}>
									User Profil
								</h1>
							</div>
						</div>

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
									disabled
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
									disabled
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
									placeholder="changer password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									style={{ color: "#cf0000" }}
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
									onChange={(e) => setConfirmPassword(e.target.value)}
									style={{ color: "#cf0000" }}
								/>
							</div>
						</div>

						<button
							type="submit"
							className="btn btn-primary"
							style={{
								backgroundColor: "#cf0000",
								color: "white",
								transition: "transform 0.3s ease", // Ajoutez une transition à la transformation
								cursor: "pointer", // Définissez le curseur sur "pointer" pour indiquer qu'il est cliquable
								outline: "none", // Supprimez la bordure de focus
							}}
							onMouseEnter={(e) => {
								e.target.style.transform = "scale(1.05)"; // Augmentez légèrement l'échelle lors du survol
							}}
							onMouseLeave={(e) => {
								e.target.style.transform = "scale(1)"; // Réinitialisez l'échelle à la taille d'origine lorsque vous quittez le survol
							}}
						>
							<FontAwesomeIcon icon={faUserEdit} /> Update Profile
						</button>

						<div
							style={{
								display: "flex",
								alignItems: "center",
								marginTop: "20px",
								padding: "20px",
								backgroundColor: "#f8f9fa",
								borderRadius: "8px",
								boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
							}}
						>
							<img
								src={userInfo && userInfo.pic}
								alt="Profile"
								style={{
									width: "80px",
									height: "80px",
									borderRadius: "50%",
									marginRight: "20px",
									border: "2px solid #007bff",
									padding: "2px",
									cursor: "pointer", // Ajout du curseur pointer pour indiquer qu'il est cliquable
								}}
								onClick={handleImageClick} // Ajout de l'événement onClick pour détecter le clic sur l'image
							/>
							<div>
								<p style={{ margin: 0, fontSize: "16px", color: "#495057" }}>
									Dernière connexion :{" "}
									{userInfo && userInfo.previousLogin
										? new Date(userInfo.previousLogin).toLocaleString()
										: "Never"}
								</p>
							</div>
						</div>

						{/* Condition pour afficher la carte d'image */}
						{showImageCard && (
							<div
								style={{
									position: "fixed",
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -50%)",
								}}
							>
								<div className="card" style={{ maxWidth: "300px" }}>
									<div className="card-body">
										<h2>Profile Image</h2>
										<img
											src={userInfo && userInfo.pic}
											alt="Profile"
											style={{
												width: "100%",
												borderRadius: "8px",
												marginTop: "10px",
											}}
										/>
										<button onClick={handleCloseCard}>Close</button>
									</div>
								</div>
							</div>
						)}
					</form>
				</div>
			</div>
		</>
	);
};

export default UserProfileEdit;
