using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LiveComments
{
    public class List
    {
        public class Query : IRequest<Result<List<LiveCommentDto>>>
        {
            public Guid ActivityId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<LiveCommentDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<LiveCommentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var LiveComments = await _context.LiveComments
                    .Where(x => x.Activity.Id == request.ActivityId)
                    .OrderByDescending(x => x.CreatedAt)
                    .ProjectTo<LiveCommentDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<LiveCommentDto>>.Success(LiveComments);
            }
        }
    }
}