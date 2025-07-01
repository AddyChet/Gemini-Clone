export async function uploadToCloudinary(file) {
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  console.log(CLOUD_NAME)
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`; // replace <cloud_name>
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_upload"); // replace <upload_preset>

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url; // URL of the uploaded file
  } catch (err) {
    console.error("Upload failed:", err);
  }
}
