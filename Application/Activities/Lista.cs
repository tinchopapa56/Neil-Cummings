
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
// using Microsoft.AspNetCore.Mvc;

namespace Application.Activities
{
    public class Lista
    {
        public class Query : IRequest<List<Activity>>{}
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync();

            }
        }
    }
}