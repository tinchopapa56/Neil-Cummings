using Persistence;
using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;

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
                    // policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://127.0.0.1:5173");
                    policy.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
                });
            });
            services.AddMediatR(typeof(Lista.Handler));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            return services;
        }
    }
}