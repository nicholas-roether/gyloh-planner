import { AppBar, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import PageNav from "./page_nav";
import ThemeSwitch from "./theme_switch";

const useStyles = makeStyles({
	heading: {
		flexGrow: 1,
		display: "inline-flex",
		alignItems: "center",
		flexWrap: "wrap",
	}
})

interface PageBarProps {
	title: string
}

const PageBar: React.FC<PageBarProps> = ({ title }) => {
	const classes = useStyles();
	const theme = useTheme();
	const smallSubtitle = useMediaQuery(theme.breakpoints.down("xs"));
	return (
			<AppBar position="relative" enableColorOnDark color="primary" sx={{ backgroundImage: "none" }}>
				<Toolbar>
					<PageNav />
					<span className={classes.heading}>
						<Typography variant="h6">Gyloh Planner&nbsp;</Typography>
						<Typography variant={smallSubtitle ? "subtitle2" : "subtitle1"}>/ {title}</Typography>
					</span>
					<ThemeSwitch />
				</Toolbar>
			</AppBar>
	);
}

export default PageBar;