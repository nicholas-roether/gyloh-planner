import { Box, Button, CircularProgress, Hidden, makeStyles, MobileStepper, Paper, Step, StepButton, Stepper, useTheme } from "@material-ui/core";
import { FiberManualRecord as CircleIcon, KeyboardArrowLeft as KeyboardArrowLeftIcon, KeyboardArrowRight as KeyboardArrowRightIcon, SvgIconComponent } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles(theme => ({
	step: {
		padding: theme.spacing(0, 5)
	},
	controls: {
		display: "flex",
		justifyContent: "center",
		padding: theme.spacing(0, 2)
	},
	buttonContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center"
	},
	mobileStepper: {
		borderTop: `1px ${theme.palette.divider} solid`,
	}
}));

export interface ResponsiveListViewProps<P> {
	component?: React.ElementType<P>;
	iconComponent?: SvgIconComponent;
	titles?: string[];
	componentProps?: P;
	loading?: boolean;
}

const ResponsiveListView: React.FC<ResponsiveListViewProps<any>> = ({component = "div", iconComponent = CircleIcon, children, componentProps, titles, loading = false}) => {
	const theme = useTheme();
	const [index, setIndex] = React.useState<number>(0);
	const classes = useStyles();

	const Component = component;
	const IconComponent = iconComponent;

	const elements = React.Children.toArray(children);
	
	const toNext = () => setIndex(prev => ++prev);
	const toPrev = () => setIndex(prev => --prev);

	return (
		<Component {...componentProps}>
			<Paper square>
				<Hidden mdUp>
					<MobileStepper
						variant="text"
						position="bottom"
						activeStep={index}
						steps={elements.length}
						className={classes.mobileStepper}
						nextButton={
							<Button size="small" onClick={toNext} disabled={index === elements.length - 1}>
							Weiter
							{theme.direction === 'rtl' ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
							</Button>
						}
						backButton={
							<Button size="small" onClick={toPrev} disabled={index === 0}>
							{theme.direction === 'rtl' ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
							Zurück
							</Button>
						}
					/>
				</Hidden>
				<Hidden smDown>
					<nav className={classes.controls}>
						<div className={classes.buttonContainer}>
							<Button variant="contained" color="primary" onClick={toPrev} disabled={index === 0}>
								{theme.direction === 'rtl' ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
								Zurück
							</Button>
						</div>
						<Stepper activeStep={index} alternativeLabel nonLinear>
							{elements.map((_, i) => (
								<Step className={classes.step} key={i}>
									<StepButton onClick={() => setIndex(i)} icon={<IconComponent color={index === i ? "inherit" : "disabled"} />}>
										{titles ? titles[i] : i + 1}
									</StepButton>
								</Step>
							))}
						</Stepper>
						<div className={classes.buttonContainer}>
							<Button variant="contained" color="primary" onClick={toNext} disabled={index === elements.length - 1}>
								Weiter
								{theme.direction === 'rtl' ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
							</Button>
						</div>
					</nav>
				</Hidden>
			</Paper>
			{loading ? (
				<Box marginX="auto" mt={4} textAlign="center">
					<CircularProgress color="secondary" />
				</Box>
			) : elements.map((e, i) => (
				<div key={i} style={{display: i === index ? "block" : "none"}}>
					{e}
				</div>
			))}
		</Component>
	)
}

export default ResponsiveListView;