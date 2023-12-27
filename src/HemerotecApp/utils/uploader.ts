export const uploadFileToCloudinary = async (formData: any) => {
    try {
        const cloudName = "dhmozdnjd";
        const uploadPreset = "videoPreset";

        /* Crear un objeto FormData para enviar el archivo de video
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", uploadPreset);
        */
       
        // Realizar una solicitud POST a Cloudinary
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );


        
        // Verificar la respuesta de Cloudinary
        if (response.ok) {
            // Obtener la respuesta en formato JSON
            const data = await response.json();
            console.log("El video se ha guardado correctamente en Cloudinary.");
            console.log("URL del video en Cloudinary:", data.secure_url);
            return data.secure_url
        } else {
            return false
        }
    } catch (error) {
        console.error("Error en la solicitud HTTP:", error);
        return false
    }
}