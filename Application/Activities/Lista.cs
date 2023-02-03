using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using Microsoft.Extensions.Logging;
using MediatR;
using Application.Core;
using AutoMapper;
using Application.Interfaces;

namespace Application.Activities
{
    public class Lista
    {
        public class Query : IRequest<Result<PagedList<ActivityDto>>>{
            public ActivityParams Params {get;set;}
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<Lista> _logger;
            private readonly IMapper _mapper;
             private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, ILogger<Lista> logger, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                _logger = logger;
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                //necesitas un DTO que exluya ACT_ATTENDES porq hace un loop infinito
                    // var listado = await _context.Activities
                    //     .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, new {currentUsername = _userAccessor.GetUsername()})  //+ return listado directo
                    //         // .Include(a => a.Attendees)
                    //         // .ThenInclude(u => u.AppUser)
                    //     .ToListAsync(cancellationToken);
                    
                var query = _context.Activities
                    .Where(d => d.Date >= request.Params.StartDate) //&& d.Date <= request.Params.EndDate
                    .OrderBy(d => d.Date)
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, new {currentUsername = _userAccessor.GetUsername()})  //+ return listado directo
                    .AsQueryable();

                    if (request.Params.IsGoing && !request.Params.IsHostDeACT)
                    {
                        query = query.Where(x => x.Attendees.Any(a => a.Username == _userAccessor.GetUsername()));
                    }

                    if (request.Params.IsHostDeACT && !request.Params.IsGoing)
                    {
                        query = query.Where(x => x.HostUsername == _userAccessor.GetUsername());
                    }

                return Result<PagedList<ActivityDto>>.Success(
                    await PagedList<ActivityDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}