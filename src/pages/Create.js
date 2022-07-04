import React , {useState } from 'react'
import Container  from '@material-ui/core/Container'
import Typography  from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import { Navigate, useHistory, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

// creating custom CSS 
const useStyles = makeStyles({
	btn : {
		fontSize : 30,
		backgroundColor : "peach",
		'&:hover' : {
			backgroundColor : "red"
		}
	},
	
	title : {
		marginBottom : 10,
		marginTop : 20
	},

	field : {
		marginTop : "1rem",
		marginBottom : "1rem"
	}
})

// NoteList.find(id) -- if found i will update form state

export default function Create({edit}) {
	let id = ""
	
	
//	const history = useHistory()
	const navigate = useNavigate()
	const classes = useStyles()
	const [title , setTitle] = useState("")
	const [desc, setDesc] = useState("")
	const [category, setCategory] = useState("todo")
	const [titleError , setTitleError] = useState(false)
	const [descError, setDescError] = useState(false)
	// could have made objects for these states
	const {noteId} = useParams()
	

	useEffect(() => {
		if(edit){
			fetch(`http://localhost:8000/notes/${noteId}`)
			.then(res => res.json())
			.then(data => {
				setTitle(data.title)
				setDesc(data.desc)
				setCategory(data.category)
			})
		}
	}, [])

	function handleSubmit(event){
		event.preventDefault()
		setTitleError(false)
		setDescError(false)

		if(!title)
			setTitleError(true)

		if(!desc)
			setDescError(true)

		if(title && desc){
			// if edit is true we will make a PUT request
			if(edit){
				fetch(`http://localhost:8000/notes/${noteId}`, {
					method: 'PUT',
    				headers: { 'Content-Type': 'application/json' },
    				body: JSON.stringify({ title: title, desc : desc, category : category })
				})
				.then(() => (navigate('/')))
			}

			// else we will add this new note to our json server
			else{

				fetch("http://localhost:8000/notes", {		// making a POST request to the server
					method : "POST",							
					headers : {"Content-type" : "application/json"}	,
					body : JSON.stringify({
						title, desc, category			// it will automatically add a unique id
					})
				}).then(() => navigate('/'))		// redirect to homepage, done using react router (useHistory hook)
			}	
			setTitle("")
			setDesc("")
		}
	
	}
  	return (
		<Container>
			<Typography 
				className = {classes.title}
				variant='h6'
				component='h2'
				color='textSecondary'
				gutterBottom
			>
				Create a new note
			</Typography>

			<form noValidate autoComplete='off' onSubmit={handleSubmit}>
				<TextField
					onChange={(event) => setTitle(event.target.value)}
					color='secondary'
					className={classes.field}
					label= "Note Title"
					variant= 'outlined'
					fullWidth
					required
					value = {title}
					error = {titleError}
				/>
				<TextField
					onChange={(event) => setDesc(event.target.value)}
					color='secondary'
					className={classes.field}
					label= "Description"
					variant= 'outlined'
					fullWidth
					required
					multiline
					rows={4}
					value = {desc}
					error = {descError}
				/>

				<FormControl className={classes.field}>		{/*formControl is used for wrapping a label around a section of form */}
					<FormLabel>Category</FormLabel>
					<RadioGroup  row value={category} onChange= {e => setCategory(e.target.value)}> 
						<FormControlLabel control={<Radio/>} value="money" label="Money" />
						<FormControlLabel control={<Radio/>} value="work" label="Work" />
						<FormControlLabel control={<Radio/>} value="reminder" label="Reminder" />
						<FormControlLabel control={<Radio/>} value="todo" label="Todos" />
					</RadioGroup>
				</FormControl>
				
				<br/>
				<Button
					type='submit'
					variant= 'contained'
					color = "secondary"
				>
					Submit
				</Button>
			</form>
			
			

			
			
		</Container>
  )
}
