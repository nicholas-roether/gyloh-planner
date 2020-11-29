import { Card, Collapse, makeStyles, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import React, { useState } from "react";
import SubstitutionView from "./substitution_view";
import { COLUMN_TITLES, TimeTableSubViewProps, TimeTableViewEntryProps } from "./time_table_view";

const useStyles = makeStyles(theme => ({
	card: {
		padding: theme.spacing(2, 3),
		margin: theme.spacing(2, 1),
	},
	topBar: {
		display: "flex",
		justifyContent: "space-between",
	},
	textWrapper: {
		height: "100%",
		flex: 4,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between"
	},
	subTextWrapper: {
		width: "100%",
		maxWidth: 200,
		display: "inline-flex",
		justifyContent: "space-between"
	},
	buttonWrapper: {
		flex: 1,
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center"
	}
}))


const TimeTableMobileViewEntry: React.FC<TimeTableViewEntryProps> = ({ fields }) => {
	const [open, setOpen] = useState<boolean>(false);
	const toggleOpen = () => setOpen(prev => !prev);
	const classes = useStyles();

	return (
		<Card className={classes.card} variant="outlined" onClick={toggleOpen}>
			<div className={classes.topBar}>
				<div className={classes.textWrapper}>
					<Typography variant="subtitle1">{fields.class.longName}</Typography>
					<span className={classes.subTextWrapper}>
						<Typography variant="subtitle2">{fields.subject.longName}</Typography>
						<Typography variant="subtitle2">{fields.lesson}</Typography>
					</span>
				</div>
				<div className={classes.buttonWrapper}>
					{open ? <ExpandLessIcon color="action" /> : <ExpandMoreIcon color="action" />}
				</div>
			</div>
			<Collapse appear={false} in={open}>
				<Table>
					<TableBody>
							<TableRow>
								<TableCell><b>{COLUMN_TITLES.teacher}</b></TableCell>
								<TableCell><SubstitutionView value={fields.teacher} current={c => c} subst={s => s} /></TableCell>
							</TableRow>
							<TableRow>
								<TableCell><b>{COLUMN_TITLES.room}</b></TableCell>
								<TableCell>
									{fields.rooms.map((room, i) => (
										<SubstitutionView key={i} value={room} current={r => r?.longName} subst={r => r?.longName} />
									))}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><b>{COLUMN_TITLES.info}</b></TableCell>
								<TableCell>{fields.info}</TableCell>
							</TableRow>
					</TableBody>
				</Table>
			</Collapse>
		</Card>
	);
}

const TimeTableMobileView: React.FC<TimeTableSubViewProps> = ({ data }) => {
	const entries = data.map((ef, i) => (
		<TimeTableMobileViewEntry
			key={i}
			fields={ef}
		/>
	));

	return (
		<React.Fragment>
			{entries}
		</React.Fragment>
	)
}

export default TimeTableMobileView;