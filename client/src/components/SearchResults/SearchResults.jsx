import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import { ImageListItem } from '@mui/material'
import { Image } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export default function SearchResults({ results }) {

    const navigate = useNavigate()
    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">

                <List>
                    {results.map((user) => {
                        return (
                            <ListItem style={{ backgroundColor: 'white' }} disablePadding onClick={() => { navigate(`/profile/${user.id}`) }} >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Image style={{ width: '30px', height: '30px' }} src={user.ProfilePicture ? user.ProfilePicture : 'https://th.bing.com/th/id/R.8ecd3de4a4b57de791895330cf820509?rik=apELQREbj%2fT0oQ&riu=http%3a%2f%2fabdelzaher.cs.illinois.edu%2fimages%2fhead.png&ehk=woU2D0JqIZ5lRV4gZ9UAc69lYaKjywGalBytFcZMmyA%3d&risl=&pid=ImgRaw&r=0'} />
                                    </ListItemIcon>
                                    <ListItemText primary={user.username} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>

            </nav>
            <Divider />
            <nav aria-label="secondary mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary="Trash" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                            <ListItemText primary="Spam" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    )
}


