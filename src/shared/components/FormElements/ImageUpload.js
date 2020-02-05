import React, { useState, useEffect, useRef } from 'react'
import './ImageUpload.css'
import Button from './Button'

const ImageUpload = props => {

    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState()
    const [isValid, setIsValid] = useState(false)
    const filePickerRef = useRef()

    // when we have picked a image file, sets the preview url using FileReader API
    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)

    }, [file])

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
                {previewUrl && <img src={previewUrl} alt='Preview' />}
                {!previewUrl && <p>Please pick an Image.</p>}
            </div>
            {!isValid && <p>{props.errorText}</p>}
            <Button type='button' onClick={pickImageHandler}>PICK IMAGE</Button>
        </div>
    )
}

export default ImageUpload
