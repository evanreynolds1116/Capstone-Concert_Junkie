import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';

export const url = (publicId, options) => {
  const scOptions = Util.withSnakeCaseKeys(options);
  const cl = CoreCloudinary.new();
  return cl.url(publicId, scOptions);
};

export const openUploadWidgetVideo = (options, callback) => {
  const scOptions = Util.withSnakeCaseKeys(options);
  window.cloudinary.openUploadWidget(scOptions, callback);
};

export async function  fetchVideos  (imageTag, setter)  {
  const options = {
  cloudName: 'emrcloud',
  format: 'json',
  type: 'list',
  version: Math.ceil(new Date().getTime() / 1000),
};

const urlPath = url(imageTag.toString(), options);

fetch(urlPath)
.then(res => res.text())
.then(text => (text ? setter(JSON.parse(text).resources.map(image => image.public_id)) : []))
.catch(err => console.log(err));
};