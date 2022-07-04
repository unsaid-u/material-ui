import { makeStyles } from '@material-ui/core';
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { fontWeight } from '@mui/system';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Outlet, useHistory, useLocation, useNavigate } from 'react-router-dom';

const drawerWidth  = 240

const useStyles = makeStyles((theme) => {		// this theme object is the default theme
	return ({
		page: {
			width : "100%",
			backgroundColor :"#f9f9f9" 
		},

		drawer : {
			width : drawerWidth,
		},

		drawerPaper : {
			width : drawerWidth
		},

		root : {
			display : 'flex'
		},

		active : {
			backgroundColor : "#f4f4f4"
		},
		 
		title : {
			padding : theme.spacing(2)		// instead of hardcoding the padding we used the theme object 
		}
	})
})

export default function Layout({children}){
	const classes = useStyles()
	//const history = useHistory()
	const location = useLocation()
	const navigate = useNavigate()

	const drawerItems = [
		{
			text : "My Notes",
			icon : <SubjectOutlinedIcon color='secondary'/>,
			path : '/'
		},

		{
			text : "Create Note",
			icon : <AddCircleOutlineOutlinedIcon color='secondary'/>,
			path : '/create'
		}
	]

	return(
		<div className={classes.root}>
			<Drawer
				variant='permanent'
				anchor='left'
				className={classes.drawer}
				classes={{ paper : classes.drawerPaper}}		//this helps us override the paper component inside drawer
			>
				<div>
					<Typography variant='h5' className={classes.title}>
						SmallNotes
					</Typography>
				</div>

				<List>
					{
						drawerItems.map(item => (
							<ListItem 
								key={item.text} 
								button
								onClick = {() => (navigate(item.path))}
								className= {location.pathname == item.path ? classes.active : null}
							>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.text}/>
							</ListItem>
						))
					}

				</List>
			</Drawer>

			<div className={classes.page} >
				<Outlet/>
			</div>
			
		</div>
	)
}