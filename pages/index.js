import { useState, useEffect } from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ImageForm from '../components/image';
import VideoForm from '../components/video';

const Home = () => {
  const [image, setImage] = useState({});
  const [video, setVideo] = useState({});
  const [preview, setPreview] = useState('');
  const [progress, setProgress] = useState(0);

  const router = useRouter();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    // console.log(file);
    setPreview(window.URL.createObjectURL(file));

    //Reziser
    Resizer.imageFileResizer(file, 720, 500, 'JPEG', 100, 0, async (uri) => {
      try {
        let { data } = await axios.post(
          `http://localhost:8000/api/upload-image`,
          {
            image: uri,
          }
        );
        // console.log(data);
        setImage(data);
        toast('Imagen Guardada');
      } catch (err) {
        console.log(err);
        toast('Image upload failed. Try later.');
      }
    });
  };

  const handleImageRemove = async () => {
    try {
      // console.log(values);
      const res = await axios.post(`http://localhost:8000/api/remove-image`, {
        image,
      });
      setImage({});
      setPreview('');
      toast('Imagen Eliminada');
      router.push('/');
    } catch (err) {
      console.log(err);
      toast('Image upload failed. Try later.');
    }
  };

  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0];
      const videoData = new FormData();
      videoData.append('video', file);

      const { data } = await axios.post(
        `http://localhost:8000/api/video-upload`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );

      setVideo(data);

    } catch (err) {
      console.log(err);
      toast('Video upload failed');
    }
  };

  const handleVideoRemove = async () => {
    try {
      setUploading(true);
      const { data } = await axios.post(
        `http://localhost:8000/api/video-remove`,
        video
      );
      console.log(data);
      setVideo({});
    } catch (err) {
      console.log(err);
      toast('Video remove failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className="grid grid-cols-2">
      <div>
        <h1 className="text-center mt-10 text-4xl font-bold text-white">
          Subir imagenes
        </h1>
        <div className="bg-white w-7/12  mx-auto  text-black">
          <ImageForm
            handleImage={handleImage}
            handleImageRemove={handleImageRemove}
            preview={preview}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <div>
        <h1 className="text-center mt-10 text-4xl font-bold text-white">
          Subir videos
        </h1>
        <div className="bg-white w-7/12  mx-auto  text-black">
          <VideoForm 
            handleVideo={handleVideo}
            handleVideoRemove={handleVideoRemove}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
