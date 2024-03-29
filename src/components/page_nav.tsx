import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Theme, SwipeableDrawer } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CalendarToday as CalendarTodayIcon, CalendarViewDay as CalendarViewDayIcon, Close as CloseIcon, Code as CodeIcon, Feedback as FeedbackIcon, Info as InfoIcon, Menu as MenuIcon } from "@mui/icons-material";
import React from "react";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) => ({
	menuButton: {
		marginRight: theme.spacing(1)
	},
	toolbar: {
		...theme.mixins.toolbar,
		display: "flex",
		alignItems: "center",
		paddingLeft: theme.spacing(0.5)
	},
	drawerContent: {
		width: "100vw",
		maxWidth: 270
	}
}));

const PageNav: React.FC = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState<boolean>(false);

	return (
		<React.Fragment>
			<IconButton edge="start" color="inherit" className={classes.menuButton} onClick={() => setOpen(true)}>
				<MenuIcon />
			</IconButton>
			<SwipeableDrawer
				anchor="left"
				open={open}
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}
			>
				<aside className={classes.drawerContent}>
					<div className={classes.toolbar}>
						<IconButton onClick={() => setOpen(false)}>
							<CloseIcon />
						</IconButton>
					</div>
					<Divider />
					<List>
						<Link href="/">
							<ListItem button>
								<ListItemIcon><CalendarTodayIcon /></ListItemIcon>
								<ListItemText>Vertretungsplan</ListItemText>
							</ListItem>
						</Link>
						<Link href="/table-finder">
							<ListItem button>
								<ListItemIcon><CalendarViewDayIcon /></ListItemIcon>
								<ListItemText>Tabellenfinder</ListItemText>
							</ListItem>
						</Link>
						<Link href="/about">
							<ListItem button>
								<ListItemIcon><InfoIcon /></ListItemIcon>
								<ListItemText>Was Ist Das Hier?</ListItemText>
							</ListItem>
						</Link>
						<Link href="/api-reference">
							<ListItem button>
								<ListItemIcon><CodeIcon /></ListItemIcon>
								<ListItemText>API-Referenz</ListItemText>
							</ListItem>
						</Link>
					</List>
				</aside>
			</SwipeableDrawer>
		</React.Fragment>
	);
}

export default PageNav;