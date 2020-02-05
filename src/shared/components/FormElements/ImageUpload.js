import React, { useState, useEffect, useRef } from 'react'
import './ImageUpload.css'
import Button from './Button'

const ImageUpload = props => {

    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState()
    const [isValid, setIsValid] = useState(false)

    const pickImageHandler = () => {
        filePickerRef.current.click()
    }
    const pickedHandler = e => {
        let pickedFile;
        let fileIsValid;
        if (e.target.files && e.target.files.length === 1) {
            pickedFile = e.target.files[0]
            setFile(pickedFile)
            setIsValid(true)
            fileIsValid = true;
        } else {
            setIsValid(false)
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid)
    }
    const filePickerRef = useRef()
    return (
        <div className='form-control'>
            <input
                type='file'
                id={`props.id`}
                style={{ display: 'none' }}
                accept='.jpg, .png, .jpeg'
                ref={filePickerRef}
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <img src='' alt='Preview' />
            </div>
            <Button type='button' onClick={pickImageHandler}>PICK IMAGE</Button>
        </div>
    )
}

export default ImageUpload
