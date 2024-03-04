import Grid from '@mui/material/Grid'
import AddressCard from '../AddressCard/AddressCard'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import { Form } from 'react-router-dom';
import TextField from '@mui/material/TextField'
import { useState } from 'react';
import { createToast } from '../../../helper/helpers';



const DeliveryAddressForm = () => {


    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phoneNumber: ""
    })

    const handleInputChange= (e) =>{
       const data =  setInput((prevInput) => ({

            ...prevInput,
            [e.target.name]: e.target.value


        }))
        console.log(data)
    }
    const handleUserReg = (e) => {
        e.preventDefault()
        if (!input.firstName || !input.lastName || !input.address || !input.city || !input.state || !input.zip || !input.phoneNumber) {
            createToast("All fields are required")
        }
        else {
            createToast("Delivery Address added", "success")
        }

    }

    return (
        <div>

            <Grid container spacing={4} alignItems="top" justifyContent="center">
                <Grid xs={12} lg={5} className='border shadow-sm' p={"1rem"} >
                    <AddressCard />
                    <Button sx={{ mt: "1rem" }} variant="contained" >
                        Deliver Here
                    </Button>
                </Grid>
                <Grid item xs={12} lg={7}>
                    <Box className=" border rounded-sm shadow-sm p-5">
                        <Form onSubmit={handleUserReg}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="firstName"
                                        label="First Name"
                                        name='firstName'
                                        value={input.firstName}
                                        onChange={handleInputChange}
                                        fullWidth
                                        autoComplete='givenName'
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        
                                        id="lastName"
                                        label="Last Name"
                                        onChange={handleInputChange}
                                        name='lastName'
                                        value={input.lastName}
                                        fullWidth
                                        autoComplete='givenName'
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        
                                        id="address"
                                        label="Address"
                                        name='address'
                                        value={input.address}
                                        onChange={handleInputChange}
                                        fullWidth
                                        autoComplete='givenName'
                                        multiline
                                        rows={4}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        
                                        id="city"
                                        label="city"
                                        name='city'
                                        value={input.city}
                                        onChange={handleInputChange}
                                        fullWidth
                                        autoComplete='givenName'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        
                                        id="state"
                                        label="State/Province/Region"
                                        name='state'
                                        value={input.state}
                                        onChange={handleInputChange}
                                        fullWidth
                                        autoComplete='givenName'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        
                                        id="zip"
                                        label="Zip"
                                        name='zip'
                                        value={input.zip}
                                        onChange={handleInputChange}
                                        fullWidth
                                        autoComplete='givenName'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField

                                        
                                        id="phoneNumber"
                                        label="Phone Number"
                                        name='phoneNumber'
                                        value={input.phoneNumber}
                                        onChange={handleInputChange}
                                        fullWidth
                                        autoComplete='givenName'
                                    />
                                </Grid>

                            </Grid>
                            <Button sx={{ mt: "1rem" }} variant="contained" type='submit' >
                                Deliver Here
                            </Button>
                        </Form>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default DeliveryAddressForm