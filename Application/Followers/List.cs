using Application.Core;
using Application.Interfaces;
using Application.Perfiles;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Followers
{
    public class List
    {
        public class Query : IRequest<Result<List<Perfil>>>
        {
            public string Predicate { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Perfil>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<Perfil>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profiles = new List<Perfil>();

                switch (request.Predicate)
                {
                    case "followers":
                        profiles = await _context.UserFollowings.Where(x => x.Target.UserName == request.Username)
                            .Select(u => u.Observer)
                            .ProjectTo<Perfil>(_mapper.ConfigurationProvider, 
                                new {currentUsername = _userAccessor.GetUsername()})
                            .ToListAsync();
                        break;
                    case "following":
                        profiles = await _context.UserFollowings.Where(x => x.Observer.UserName == request.Username)
                            .Select(u => u.Target)
                            .ProjectTo<Perfil>(_mapper.ConfigurationProvider, 
                                new {currentUsername = _userAccessor.GetUsername()})
                            .ToListAsync();
                        break;
                }

                return Result<List<Perfil>>.Success(profiles);
            }
        }
    }
}