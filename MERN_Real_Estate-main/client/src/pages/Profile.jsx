import { React, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';

import {
  updateUserStart,
  updateUserSuccess,
  updateUerFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutUserStart,
  signoutUserFailure,
  signoutUserSuccess
} from '../redux/user/userSlice';




/* 
  Firebase Storage Rules 
  allow read;
  allow write: if 
  request.resource.size < 2 * 1024 * 1024 &&
  request.resource.contentType.matches('image/.*')

*/

export default function Profile() {

  const dispatch = useDispatch();
  const fileRef = useRef(null);

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileProg, setFileProg] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (file) {
      handleUploadFile(file);
    }
  }, [file]);

  const handleUploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileProg(Math.round(progress));
      },

      (error) => {
        setFileUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUerFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUerFailure(error.message));
    }
  }

  const handleDeleteUser = async (e) => {
    e.preventDefault();

    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUerFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data.message));

    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      dispatch(signoutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));

    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
  }

  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' src={formData.avatar || currentUser.avatar} alt="profile" />
        <p className='text-sm self-center'>
          {
            fileUploadError ? (
              <span className='text-red-700'>Upload Image Error (Image Must be Less Than 2 MB)</span>
            ) : fileProg > 0 && fileProg < 100 ? (
              <span className='text-slate-700'> {`Uploading ${fileProg}%`} </span>
            ) : fileProg === 100 ? (
              <span className='text-green-700'> Image Uploaded Successfuly </span>
            ) : (
              ''
            )
          }
        </p>
        <input type="text" defaultValue={currentUser.username} onChange={handleChange} id='username' placeholder='username' className='border p-3 rounded-lg' />
        <input type="email" defaultValue={currentUser.email} onChange={handleChange} id='email' placeholder='email' className='border p-3 rounded-lg' />
        <input type="text" defaultValue={currentUser.password} onChange={handleChange} id='password' placeholder='password' className='border p-3 rounded-lg' />
        <p className='text-red-700 mt-5 text-center'>
          {error ? error : ''}
        </p>
        <p className='text-green-700 text-center'>
          {updateSuccess ? "User Updated Successfully" : ''}
        </p>
        <button className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80 uppercase'>{
          loading ? 'Loading...' : 'Update'
        }</button>
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={handleDeleteUser}>Delete account</span>
        <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>Sign out</span>
      </div>

    </div>
  )
}
