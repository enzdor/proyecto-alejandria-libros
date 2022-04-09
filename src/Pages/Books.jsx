import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BooksContainer from "../Components/BooksContainer";
import Header from "../Components/Header";
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography"
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Grid from "@mui/material/Grid"
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button"

const genresSelect = {
	widht: "200"
}

const fixed = {
	position: "fixed"
}

const listItem = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	px: "0"
}

const empty = {

}

function Books(){
    const {isAuthenticated, user, isLoading} = useAuth0()
    const [processing, setProcessing] = useState()

	const [genre, setGenre] = useState('Genre')
	const [open, setOpen] = useState(false)


	function handleGenreOpen(){
		setOpen(true)
	}

	function handleGenreClose(){
		setOpen(false)
	}
	
	function handleGenreChange(event){
		setGenre(event.target.value)
	}

    const [books, setBooks] = useState([])
    useEffect(() => {
        async function getBooks(){
            let newBooks = await fetch('http://localhost:3001/api/books')
            newBooks = (await newBooks.json()).data
    
            setBooks(newBooks)
        }
        async function getBooksUserSub(){
            let newBooks = await fetch(`http://localhost:3001/api/books/logged/${user.sub}`)
            newBooks = (await newBooks.json()).data

            setBooks(newBooks)
        }

        if (isAuthenticated){
            getBooksUserSub()
        } else {
            getBooks()
        }
    },[isAuthenticated, isLoading])

    async function searchBooks(){


        let newBooks = await fetch(`http://localhost:3001/api/books/search?name=${document.querySelector('#name').value}&author=${document.querySelector('#author').value}&genre=${genre}&priceMin=${document.querySelector('#priceMin').value}&priceMax=${document.querySelector('#priceMax').value}`) 
		newBooks = (await newBooks.json()).data

        setBooks(newBooks)
        setProcessing(false)
    }

    function handleSubmit(event){
        event.preventDefault()
        setProcessing(true)
    }

    useEffect(() => {
        if(processing === true) {
            searchBooks()
        }
    }, [processing])


    return(
        <>
			<form onSubmit={handleSubmit}>
            <Header />
			<Grid container spacing={3}>
				<Grid item xs={12} sm={4} md={3} sx={{display: "flex", flexDirection:"column", alignItems: "center"}}>
					<List 
						sx={{
							position: {
								sm: "fixed",
								md: "fixed",
								lg: "fixed",
								xl: "fixed"
							}	
						}}
					> 
						<ListItem sx={listItem}>
							<Typography variant="h4">Search</Typography>
						</ListItem>
						<ListItem sx={listItem}>
							<TextField variant="outlined" label="Name" id="name"/>
						</ListItem>
						<ListItem sx={listItem}>
							<TextField variant="outlined" label="Author" id="author"/>
						</ListItem>
						<ListItem sx={listItem}>
							<FormControl style={{minWidth:"12em"}}>	
								<Select Label="Genre" id="genre" onChange={handleGenreChange} onOpen={handleGenreOpen} onClose={handleGenreClose} open={open} value={genre}>
									<MenuItem value="Genre" disabled>Genre</MenuItem>
									<MenuItem value="1">Action</MenuItem>
								</Select>
							</FormControl>
						</ListItem>
						<ListItem sx={listItem}>
							<TextField type="number" name="priceMin" id="priceMin" label="Minimum Price" min={0}/>
						</ListItem>
						<ListItem sx={listItem}>
							<TextField type="number" name="priceMax" id="priceMax" label="Max Price"/>
						</ListItem>
						<ListItem sx={listItem}>
							<Button type="submit" id="Submit" variant="contained" color="primary" disabled={isLoading || processing}>Submit</Button>
						</ListItem>
					</List>
				</Grid>
				<Grid item xs={12} sm={8} md={9} sx={{my: "1em"}}>
				{isLoading 
					? <p>Loading</p>
					: <BooksContainer books={books}/>
				}
				</Grid>
			</Grid>
			</form>
        </>
    )
}

export default Books
