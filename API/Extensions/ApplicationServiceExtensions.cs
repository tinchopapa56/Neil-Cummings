using Persistence;
using Application.Activities;
using Application.Interfaces;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using Infrastructure.photos_I;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opts=>
            {
                opts.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt => 
            {
                opt.AddPolicy("CorsPolicy", policy => 
                {
                    policy 
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    // .AllowAnyOrigin()
                    .WithOrigins("http://127.0.0.1:5173");
                });
            });
            // services.AddCors(opt =>
            // {
            //     opt.AddPolicy("CorsPolicy", builder => 
            //         builder .AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
            //     );

            //     opt.AddPolicy("signalr",builder => 
            //     builder
            //         .AllowAnyMethod()
            //         .AllowAnyHeader()

            //         .AllowCredentials()
            //         .SetIsOriginAllowed(hostName => true)
            //     );
            // });
            services.AddMediatR(typeof(Lista.Handler));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
            services.AddSignalR();
            return services;
        }
    }
}