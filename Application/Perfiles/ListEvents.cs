using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Perfiles
{
    public class ListEvents
    {
        public class Query : IRequest<Result<List<UserActDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<UserActDto>>>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _db;
            public Handler(IMapper mapper, DataContext db)
            {
                _db = db;
                _mapper = mapper;
            }
            public async Task<Result<List<UserActDto>>> Handle(Query req, CancellationToken cancellationToken)
            {
                var query = _db.ActAtts
                    .Where(u => u.AppUser.UserName == req.Username)
                    .OrderBy(a => a.Activity.Date)
                    .ProjectTo<UserActDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                query = req.Predicate switch
                {
                    "past" => query.Where(a => a.Date <= DateTime.Now),
                    "hosting" => query.Where(a => a.HostUsername == req.Username),
                    _ => query.Where(a => a.Date >= DateTime.Now),
                };

                var events = await query.ToListAsync();

                return Result<List<UserActDto>>.Success(events);
            }
        }
    }
}