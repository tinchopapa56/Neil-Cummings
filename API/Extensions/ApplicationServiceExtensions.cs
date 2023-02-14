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

        // //SOLO DOCKER
            services.AddDbContext<DataContext>(opts=>
            {
                // opts.UseSqlite(config.GetConnectionString("DefaultConnection"));
                opts.UseNpgsql (config.GetConnectionString("DefaultConnection"));

            });
            
            //SOLO FLY io
        // services.AddDbContext<DataContext>(options =>
        // {
        //         // Use connection string provided at runtime by FlyIO.
        //         var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

        //         // Parse connection URL to connection string for Npgsql
        //         connUrl = connUrl.Replace("postgres://", string.Empty);
        //         var pgUserPass = connUrl.Split("@")[0];
        //         var pgHostPortDb = connUrl.Split("@")[1];
        //         var pgHostPort = pgHostPortDb.Split("/")[0];
        //         var pgDb = pgHostPortDb.Split("/")[1];
        //         var pgUser = pgUserPass.Split(":")[0];
        //         var pgPass = pgUserPass.Split(":")[1];
        //         var pgHost = pgHostPort.Split(":")[0];
        //         var pgPort = pgHostPort.Split(":")[1];

        //         var connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
        //         options.UseNpgsql(connStr);
            
        // });

        //intento ambos FLY io
        // services.AddDbContext<DataContext>(options =>
        // {
        //     var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

        //     string connStr;
        //     if (env == "Development")
        //     {
        //         connStr = config.GetConnectionString("DefaultConnection");
        //     }
        //     else
        //     {
        //         // Use connection string provided at runtime by FlyIO.
        //         var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

        //         // Parse connection URL to connection string for Npgsql
        //         connUrl = connUrl.Replace("postgres://", string.Empty);
        //         var pgUserPass = connUrl.Split("@")[0];
        //         var pgHostPortDb = connUrl.Split("@")[1];
        //         var pgHostPort = pgHostPortDb.Split("/")[0];
        //         var pgDb = pgHostPortDb.Split("/")[1];
        //         var pgUser = pgUserPass.Split(":")[0];
        //         var pgPass = pgUserPass.Split(":")[1];
        //         var pgHost = pgHostPort.Split(":")[0];
        //         var pgPort = pgHostPort.Split(":")[1];

        //         connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
        //     }
        //     options.UseNpgsql(connStr);
        // });


            services.AddCors(opt => 
            {
                opt.AddPolicy("CorsPolicy", policy => 
                {
                    policy 
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                        // .AllowCredentials()
                    .AllowAnyOrigin();
                        // .WithOrigins("http://127.0.0.1:5173");

                 //NEIL code
                    // .AllowAnyMethod()
                    // .AllowAnyHeader()
                    //     .AllowCredentials()
                    //     .WithExposedHeaders("WWW-Authenticate", "Pagination")
                    // .WithOrigins("http://localhost:3000");
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