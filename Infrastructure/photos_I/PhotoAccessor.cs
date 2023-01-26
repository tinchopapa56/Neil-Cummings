using Application.Interfaces;
using Application.Fotos;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace Infrastructure.photos_I
{
    public class PhotoAccessor : IPhotoAccessor             //CLODUNAIRY MANAGER, nada que ver con mi db
    {
        private readonly Cloudinary _cloudinary;
        public PhotoAccessor(IOptions<CloudinarySettings> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(account);
        }
        public async Task<PhotoUploadResult> AddPhoto(IFormFile file)
        {
           if(file.Length > 0)
           {
            await using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Transformation = new Transformation().Height(500).Width(500).Crop("fill")
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            if(uploadResult.Error != null) throw new Exception(uploadResult.Error.Message);

            return new PhotoUploadResult 
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUrl.ToString()
            };

           }
           return null;
        }

        public async Task<string> DeletePhoto(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var CLOUDINARY_result = await _cloudinary.DestroyAsync(deleteParams);
            return (                                    //POR AHI ESTO TIENE Q SER un 1 LINER
                CLOUDINARY_result.Result == "ok" ? CLOUDINARY_result.Result : null
            );
        }
    }
}