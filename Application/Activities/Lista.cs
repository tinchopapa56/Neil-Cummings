using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MediatR;


namespace Application.Activities
{
    public class Lista
    {
        public class Query : IRequest<List<Activity>>{}
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
            private readonly ILogger<Lista> _logger;

            public Handler(DataContext context, ILogger<Lista> logger)
            {
                _logger = logger;
                _context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync();
            }
        }
    }
}