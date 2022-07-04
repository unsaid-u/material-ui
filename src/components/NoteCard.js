import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Avatar, IconButton, makeStyles, Typography } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import { green, yellow } from '@material-ui/core/colors';
import { blue, pink } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';

const useStyles = makeStyles({
	
	avatar: {
		backgroundColor : (note) => {
			if(note.category == "work")
				return yellow[700]
			if(note.category == "money")
				return green[500]
			if(note.category == "reminders")
				return pink[500]
			
			return blue[500]
		}
	}
})

export default function NoteCard({note, handleDelete, handleEdit}){
	const classes = useStyles(note)
	return(
		
			<Card elevation={1} >
				<CardHeader
					avatar = {
						<Avatar className={classes.avatar} >{note.category[0].toUpperCase()}</Avatar>
					}
					action = {
						<>
						<IconButton onClick={() => handleEdit(note.id)}>
							<EditIcon/>
						</IconButton>
						<IconButton onClick={() => handleDelete(note.id)}>
							<DeleteIcon/>
						</IconButton>

						</>
					}

					title = {note.title}
					subheader = {note.category}
					
				/>

				<CardContent>
					<Typography variant='body2' color='textSecondary'> {note.desc} </Typography>
				</CardContent>
			</Card>
		
	)
}

