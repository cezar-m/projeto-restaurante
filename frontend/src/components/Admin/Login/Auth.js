import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import api from "./api";

export const setToken = (token) => {
	localStorage.setItem('Token', token);
}

export const fetchToken = (token) => {
	return localStorage.getItem('Token');
}

export function RequireToken({children}) {
	
	let auth = fetchToken();
	let location = useLocation();
	
	if(!auth) {
		return <Navigate to="/login" state={{ from: location }} />;
	}
	
	return children;
}