import { Alert, Box, Dialog, Grid, Skeleton, Snackbar, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getImages } from '../redux/Features/ImageSlice'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import LoadingImg from '../assests/images/dataloading.gif'



const Heading = styled(Box)({
    textAlign: 'center',
    padding: '0.5em',
    backgroundColor: '#595656'
})

const HeadingText = styled(Typography)({
    fontSize: '18px',
    color: '#fff'
})

const Wrapper = styled(Box)({
    padding: '0.5em',
})

const Container = styled(Box)(({ theme }) => ({

    marginBottom: '17px',
    background: '#fff',
    padding: '5px',
    [theme.breakpoints.down('sm')]: {
        width: '250px',

    }

}))


const CloseBtn = styled(Box)({
    textAlign: 'end',
    cursor: 'pointer',
    zIndex: 2


})

const Key = styled('span')({
    fontWeight: 600
})

const Home = () => {

    const dispatch = useDispatch()
    const [imageDetail, setImageDetails] = useState({})
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true)
    const [SnakOpen, setSnakOpen] = useState(true)
    const [page, setPage] = useState(1)
    const [ImagesToshow, setImagesToshow] = useState([])

    const Images = useSelector(state => {
        return state.Images
    }
    )

    useEffect(() => {
        dispatch(getImages())
    }, [dispatch])

    const handleClose = () => {
        setOpen(false);
    }


    const getDetails = async (id) => {
        try {
            const response = await axios.get(`https://picsum.photos/id/${id}/info`)
            setImageDetails(response.data)
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleClick = (id) => {
        getDetails(id)
        setOpen(true)
    }

    const handleSnakClose = () => {
        setSnakOpen(false)
    }


    // scroll loading logic 

    useEffect(() => {
        if (!Images.loading && Images.Images.length && ImagesToshow.length < Images.Images.length) {
            // Logic to determine which images to show
            let start = (page - 1) * 6;
            const totalImages = Images.Images.length;
            const temp = [];
            let i = start;
            while (i < totalImages && i < start + 6) {
                temp.push(Images.Images[i]);
                i++;
            }
            console.log("🚀 ~ file: Home.jsx:104 ~ useEffect ~ temp:", temp)
            setImagesToshow(prevImages => [...prevImages, ...temp]);
        }
    }, [Images, page]);


    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll);
        return () => window.removeEventListener('scroll', handleInfiniteScroll)
    }, [])

    const handleInfiniteScroll = () => {

        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setPage(prev => prev + 1);
        }

    }

    return (
        <Box>
            <Heading>
                <HeadingText>Image Gallary</HeadingText>
            </Heading>
            <Wrapper>
                {Images.loading &&
                    <Box className='text-center'>
                        <img src={LoadingImg} alt='loading..' id='loading-gif' />
                    </Box>
                }
                <Grid container spacing={2} >
                    {!Images.loading && Images.Images.length ?
                        ImagesToshow.map((image, index) => {
                            return (
                                <Grid item ls={4} md={4} sm={6} xs={12} key={index} onClick={() => handleClick(image.id)}>
                                    <img
                                        src={image?.download_url}
                                        alt='images'
                                        className='img-fluid Images'
                                    />
                                </Grid>
                            )
                        }) : null
                    }
                    {!Images.loading && Images.err !== '' ?
                        <Snackbar
                            open={SnakOpen}
                            autoHideDuration={6000}
                            anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                            onClose={handleSnakClose}
                        >
                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                Network Error
                            </Alert>
                        </Snackbar> : null}

                </Grid>
            </Wrapper>
            <Dialog open={open} onClose={handleClose}>
                <Container >
                    <CloseBtn onClick={handleClose}><CloseIcon /></CloseBtn>
                    <Grid container columnSpacing={4} justifyContent='space-between'>
                        <Grid item lg={4} md={4} sm={4} xs={8}>
                            {
                                loading ? <Skeleton variant="rectangular" width={200} height={200} /> :
                                    <img src={imageDetail?.download_url} alt='Gallary' className='img-fuild detail-image' />
                            }
                        </Grid>
                        <Grid item lg={7} md={7} sm={7} xs={12}>
                            <Box className='details'>
                                <Typography><Key>Author Name : </Key>{imageDetail?.author}</Typography>
                                <Typography><Key>Width :</Key> {imageDetail?.width}</Typography>
                                <Typography><Key>Height : </Key>{imageDetail?.height}</Typography>
                                <Typography><Key>Get More Info :</Key> <a href={imageDetail.url}>Click Here</a></Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Dialog>
        </Box>
    )
}

export default Home
