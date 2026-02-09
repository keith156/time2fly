/**
 * Compresses an image file or base64 string to a smaller size and quality.
 * Returns a Blob ready for upload.
 */
export const compressImage = async (
    file: File | string,
    maxWidth = 1024,
    quality = 0.7
): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Resize logic
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Failed to get canvas context'));
                    return;
                }

                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Canvas to Blob conversion failed'));
                        }
                    },
                    'image/jpeg', // Force JPEG for better compression
                    quality
                );
            };

            img.onerror = (err) => reject(err);
        };

        reader.onerror = (err) => reject(err);

        if (typeof file === 'string') {
            // If base64 string
            if (file.startsWith('data:')) {
                fetch(file)
                    .then(res => res.blob())
                    .then(blob => reader.readAsDataURL(blob))
                    .catch(err => reject(err));
            } else {
                // Already a URL? Just fetch it and return blob, maybe re-compress if needed but unlikely for existing URLs
                fetch(file).then(res => res.blob()).then(blob => resolve(blob)).catch(reject);
                return;
            }
        } else {
            reader.readAsDataURL(file);
        }
    });
};
