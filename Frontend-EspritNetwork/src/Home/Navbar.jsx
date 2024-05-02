import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userActions";
import espritNetwork from "../assets/logo-network.png";
import companyLogo from "../assets/clients/client-9.png";
export function Navbar() {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
		history.push("/login"); // Redirect to login page after logout
	};

	return (
		<>
			{/* ======= Header ======= */}
			<header id="header" className="fixed-top bg-black mb-5">
				<div className="container d-flex justify-content-between">
					<h3 className="logo">
						<NavLink to="/" className="nav-link">
							<img src={espritNetwork} alt="tes" /> Esprit Network
						</NavLink>{" "}
					</h3>
					<nav id="navbar" className="navbar">
						<ul>
							<li>
								<NavLink
									to="/"
									className="nav-link scrollto"
									activeClassName="active"
									exact
								>
									Accueil
								</NavLink>
							</li>

							{!userInfo && (
								<li className="flex d-flex mx-0">
									<NavLink to="/login" className="nav-link getstarted scrollto">
										Connexion
									</NavLink>
									<NavLink
										to="/register"
										className="nav-link getstarted scrollto"
									>
										Inscription
									</NavLink>
								</li>
							)}

							{userInfo && (
								<>
									{(userInfo.role === "student" ||
										userInfo.role === "alumni") && (
										<>
											<li>
												<NavLink
													to="/evalution/test/mestestss"
													className="nav-link scrollto"
												>
													Tests
												</NavLink>
											</li>
											<li>
												<NavLink to="/resume" className="nav-link scrollto">
													Portfolio
												</NavLink>
											</li>
											<li>
												<NavLink
													to="/condidat/mesoffres"
													className="nav-link scrollto"
												>
													Mes Candidatures
												</NavLink>
											</li>

											<li>
												<NavLink to="/offres" className="nav-link scrollto">
													Offres d&apos;emploi
												</NavLink>
											</li>
											<li>
												<NavLink to="/calendrier" className="nav-link scrollto">
													calender
												</NavLink>
											</li>
											<div className=" ms-2 flex d-flex justify-content-between ">
												<li className="nav-item dropdown">
													<a
														className="nav-link nav-profile d-flex align-items-center pe-0"
														href="#"
														data-bs-toggle="dropdown"
													>
														<img
															src={userInfo && userInfo.pic}
															alt="Profile"
															style={{
																width: "40px",
																height: "40px",
																borderRadius: "50%",
																marginRight: "10px",
															}}
														/>
														<span className="nav-link disabled text-white d-flex align-items-center">
															<span style={{ color: "white" }}>
																{userInfo && userInfo.name}
															</span>
														</span>
													</a>
													<ul>
														<li>
															<a
																className="dropdown-item d-flex align-items-center"
																href="/userProfil"
															>
																<i className="bi bi-person" />
																<span>Mon Profil</span>
															</a>
														</li>
														<li>
															<hr className="dropdown-divider" />
														</li>
														<li>
															<NavLink
																className="dropdown-item d-flex align-items-center"
																href="#"
																onClick={logoutHandler}
															>
																<i className="bi bi-box-arrow-right" />
																<span>Déconnecter</span>
															</NavLink>
														</li>
													</ul>
												</li>
											</div>
										</>
									)}
								</>
							)}

							{/* Company */}
							{userInfo && (
								<>
									{(userInfo.role === "ADMIN" ||
										userInfo.role === "company") && (
										<>
											<ul>
												<li>
													<NavLink
														className="nav-link scrollto"
														to="/evalution"
													>
														Évaluation
													</NavLink>
												</li>
												<li className="dropdown">
													<NavLink>
														<span> Offres</span>{" "}
														<i className="bi bi-chevron-down" />
													</NavLink>
													<ul>
														<li>
															<NavLink to="/ajouter-offre">Publier </NavLink>
														</li>
														<li>
															<NavLink to="/mesoffre">Lister </NavLink>
														</li>
														<li>
															<NavLink to="/mesarchives">
																Archives des Offres
															</NavLink>
														</li>
													</ul>
												</li>
												<li>
													<NavLink className="nav-link scrollto" to="/short">
														Collections
													</NavLink>
												</li>
												<li className="nav-item dropdown">
													<a
														className="nav-link nav-profile d-flex align-items-center pe-0"
														href="#"
														data-bs-toggle="dropdown"
													>
														<img
															src={companyLogo}
															className="rounded-circle mx-1"
														/>
														<span className="nav-link disabled text-white d-flex align-items-center">
															{userInfo && userInfo.name}
														</span>
													</a>
													<ul>
														<li>
															<a
																className="dropdown-item d-flex align-items-center"
																href="users-profile.html"
															>
																<i className="bi bi-person" />
																<span>Mon Profil</span>
															</a>
														</li>
														<li>
															<hr className="dropdown-divider" />
														</li>
														<li>
															<NavLink
																className="dropdown-item d-flex align-items-center"
																href="#"
																onClick={logoutHandler}
															>
																<i className="bi bi-box-arrow-right" />
																<span>Déconnecter</span>
															</NavLink>
														</li>
													</ul>
												</li>{" "}
											</ul>
										</>
									)}
								</>
							)}
						</ul>
						<i className="bi bi-list mobile-nav-toggle" />
					</nav>
					{/* .navbar */}
				</div>
			</header>
			{/* End Header */}
		</>
	);
}
