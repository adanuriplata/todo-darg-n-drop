import React, { useContext } from 'react'
import { Box, Drawer, List, ListItem, ListItemIcon, Typography, ListItemText, Divider } from '@mui/material';

import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/Inbox';
import { UIContext } from '../../context/ui';

const menuItems: string[] = ['inbox', 'Starred', 'Send Email', 'Drafts']

export const Sidebar = () => {

  const { sidemenuOpen, closeSideMenu  } = useContext( UIContext )

  return (
    <Drawer
    anchor='left'
    open={ sidemenuOpen }
    onClose={ closeSideMenu }
    >
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding:'5px 10px'}}>
          <Typography variant='h4'>Menú</Typography>

        </Box>

        <List>
          {
            menuItems.map( (text, index ) => (
              <ListItem button key={ text }>
                <ListItemIcon>
                  { index % 2 ? <InboxIcon /> : <MailIcon /> }
                </ListItemIcon>
                <ListItemText primary={ text }></ListItemText>
              </ListItem>
            ))
          }
        </List>

        <Divider />

        <List>
          {
            menuItems.map( (text, index ) => (
              <ListItem button key={ text }>
                <ListItemIcon>
                  { index % 2 ? <InboxIcon /> : <MailIcon /> }
                </ListItemIcon>
                <ListItemText primary={ text }></ListItemText>
              </ListItem>
            ))
          }
        </List>
      </Box>


    </Drawer>
  )
}

export default Sidebar