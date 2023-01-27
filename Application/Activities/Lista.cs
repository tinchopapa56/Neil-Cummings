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
        public class Query : IRequest<Result<List<ActivityDto>>>{}
        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
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

            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                //necesitas un DTO que exluya ACT_ATTENDES porq hace un loop infinito
                var listado = await _context.Activities
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, new {currentUsername = _userAccessor.GetUsername()})  //+ return listado directo
                    // .Include(a => a.Attendees)
                    // .ThenInclude(u => u.AppUser)
                    .ToListAsync(cancellationToken);

                // var activitiesToReturn = _mapper.Map<List<ActivityDto>>(listado);
                return Result<List<ActivityDto>>.Success(listado);
            }
        }
    }
}