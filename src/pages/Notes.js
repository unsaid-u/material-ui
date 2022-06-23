import React , {useState, useEffect} from 'react'
import Grid  from '@material-ui/core/Grid'
import Paper  from '@material-ui/core/Paper'		// paper is the simplest card component
import Container  from '@material-ui/core/Container'
import NoteCard from '../components/NoteCard'
import { makeStyles } from '@material-ui/core'
import Masonry from 'react-masonry-css'
import { breakpoints } from '@mui/system'

const useStyles = makeStyles({
	page: {
		backgroundColor : "#f9f9f9"
	},

	grid: {
		marginTop: "0.7rem"
	}
})

export default function Notes() {

	const [notes, setNotes] = useState([])
	const classes = useStyles()

	useEffect(() => {
		fetch("http://localhost:8000/notes")
		.then(res => res.json())
		.then(data => setNotes(data))
	}, [])

	const handleDelete = async (id) => {
		// delete note with id, from the json server as well as the state

		await fetch('http://localhost:8000/notes/' + id , {
			method : 'DELETE'
		})
		
		const newNotes = notes.filter(note => note.id != id)
		setNotes(newNotes)
	}

	const breaks = {
		default : 3,
		1100 : 2,
		700 : 1
	}
	return (
		<Container className={classes.page}>
			
			<Masonry 
				breakpointCols={breaks}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
			{
				notes.map(note => (
					<div  key={note.id} xs ={12} sm={6} md ={4}> 
						<NoteCard note = {note} handleDelete = {handleDelete}/>
					</div>
				))
			}
			</Masonry>
		</Container>
	)
}


/*
<Grid container spacing={3} className={classes.grid}>
			{
				notes.map(note => (
					<Grid item key={note.id} xs ={12} sm={6} md ={4}> 
						<NoteCard note = {note} handleDelete = {handleDelete}/>
					</Grid>
				))
			}
			</Grid>
*/