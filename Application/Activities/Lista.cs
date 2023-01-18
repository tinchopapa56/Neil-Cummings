using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MediatR;
using Application.Core;


namespace Application.Activities
{
    public class Lista
    {
        public class Query : IRequest<Result<List<Activity>>>{}
        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<Lista> _logger;

            public Handler(DataContext context, ILogger<Lista> logger)
            {
                _logger = logger;
                _context = context;
            }

            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var listado = await _context.Activities.ToListAsync();
                return Result<List<Activity>>.Success(listado);
            }
        }
    }
}